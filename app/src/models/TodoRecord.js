const { Record } = require('immutable');
const moment = require('moment');

const shape = {
    id: null,
    title: '',
    description: '',
    estimatedHours: 2,
    complete: false,
    targetCompletionDate: moment().startOf('day').toDate()
};

class TodoRecord extends Record(shape) {
    static fromJS(todoState = {}) {
        return new TodoRecord({
            id: todoState.id,
            title: todoState.title,
            description: todoState.description,
            estimatedHours: todoState.estimatedHours,
            complete: !!todoState.complete,
            targetCompletionDate: todoState.targetCompletionDate
        });
    }
}

export default TodoRecord;