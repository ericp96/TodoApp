const Rx = require('rxjs');
const { List, Map, Record } = require('immutable');

const PartialStateRecord = require('models/PartialStateRecord').default;

const TodoRecord = Record({
    groups: List(),
    todos: List(),
    groupTodos: Map()
});

const actions = Map({
    'addTodo': new Rx.Subject()
        .map(todo => state => state
            .set('todos', state.todos.unshift(todo))),
    'deleteTodo': new Rx.Subject()
        .map((todoId) => state => state
            .update('todos', todos => 
                todos.filter(todo => todo.id !== todoId))),
    'addTodoToGroup': new Rx.Subject()
        .map((groupId, todoId) => state => state
            .setIn(['groupTodos', groupId], todoId)),
    'addGroup': new Rx.Subject()
        .map(groupName => state => state.set('groups', state.groups.push(groupName))) 
}).mapKeys(key => List([key]));

const state = Map({
    'state': Rx.Observable.merge(...actions.valueSeq())
        .scan((state, changeFn) => changeFn(state), new TodoRecord())
}).mapKeys(key => List([key]));
    
export default new PartialStateRecord({
    actions,
    state,
    path: List(['stores', 'todos'])
});