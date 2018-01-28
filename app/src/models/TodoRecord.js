const { Record } = require('immutable');

const shape = {
    id: null,
    title: '',
    description: '',
    estimatedHours: 0,
    targetCompletionDate: new Date()
};

class TodoRecord extends Record(shape) {
    static fromJS(todoState = {}) {
        return new TodoRecord({
            id: todoState.id,
            title: todoState.title,
            description: todoState.description,
            estimatedHours: todoState.estimatedHours,
            targetCompletionDate: todoState.targetCompletionDate
        });
    }
}

export default TodoRecord;