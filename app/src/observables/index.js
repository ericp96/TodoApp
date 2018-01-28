const Rx = require('rxjs');
const { List, Map } = require('immutable');

const StateRecord = require('models/StateRecord').default;

const editorPartialState = require('views/editor/EditorView.state').default;
const todoPartialState = require('./todos').default;

export default StateRecord.fromPartialStates(
    editorPartialState, 
    todoPartialState
);