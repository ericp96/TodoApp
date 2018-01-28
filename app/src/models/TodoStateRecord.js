const { List, Map, Record } = require('immutable');

const TodoRecord = require('./TodoRecord').default;

const shape = {
    groups: List(),
    todos: List(),
    groupTodos: Map()
};

class TodoStateRecord extends Record(shape) {
    static fromJS(todoState = {}) {
        return new TodoStateRecord({
            groups: List(todoState.groups),
            todos: List(todoState.todos).map(TodoRecord.fromJS),
            groupTodos: Map(todoState.groupTodos),
        });
    }
}

export default TodoStateRecord;