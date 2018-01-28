const Rx = require('rxjs');
const { List, Map, Record } = require('immutable');

const PartialStateRecord = require('models/PartialStateRecord').default;
const editorPartialState = require('./components/todoEditor/TodoEditor.state').default;
export default new PartialStateRecord({
    path: List(['views', 'editor'])
}).mergePartialState(editorPartialState);