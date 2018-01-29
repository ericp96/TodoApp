const Rx = require('rxjs');
const { List, Map, Record } = require('immutable');

const PartialStateRecord = require('models/PartialStateRecord').default;
const TodoStateRecord = require('models/TodoStateRecord').default;

const actions = Map({
    'initialize': Rx.Observable.interval(0).take(1)
        .map(() => state => getInitialState()),
    'addTodo': new Rx.Subject()
        .map(todo => state => state
            .update('todos', todos => 
                todos.filter(t => t.id !== todo.id).unshift(todo))),
    'deleteTodo': new Rx.Subject()
        .map((todoId) => state => state
            .update('todos', todos => 
                todos.filter(todo => todo.id !== todoId))),
    'setTodoComplete': new Rx.Subject()
        .map((todo) => state => state
            .update('todos', todos =>
                todos.filter(t => t.id !== todo.id)
                    .push(todo.set('complete', !todo.complete)))),
    'addTodoToGroup': new Rx.Subject()
        .map((groupId, todoId) => state => state
            .setIn(['groupTodos', groupId], todoId)),
    'addGroup': new Rx.Subject()
        .map(groupName => state => state.set('groups', state.groups.push(groupName))) 
}).mapKeys(key => List([key]));

const state = Map({
    'state': Rx.Observable.merge(...actions.valueSeq())
        .scan((state, changeFn) => changeFn(state), new TodoStateRecord())
}).mapKeys(key => List([key]));

function getInitialState() {
    const localStorageTodos = JSON.parse(window.localStorage.getItem('todos'));
    return localStorageTodos ? TodoStateRecord.fromJS(localStorageTodos) : new TodoStateRecord();
}

state.first().subscribe(todos => 
    window.localStorage.setItem('todos', JSON.stringify(todos)));

export default new PartialStateRecord({
    actions,
    state,
    path: List(['stores', 'todos'])
});