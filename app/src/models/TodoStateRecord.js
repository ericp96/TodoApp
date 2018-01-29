const { List, Map, Record } = require('immutable');

const TodoRecord = require('./TodoRecord').default;

const shape = {
    todos: List()
};

class TodoStateRecord extends Record(shape) {
    static fromJS(todoState = {}) {
        return new TodoStateRecord({
            todos: List(todoState.todos).map(TodoRecord.fromJS),
        });
    }
}

export default TodoStateRecord;