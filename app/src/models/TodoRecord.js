const { Record } = require('immutable');

const TodoRecord = Record({
    id: null,
    title: '',
    description: '',
    estimatedHours: 0,
    targetCompletionDate: new Date()
});

export default TodoRecord;