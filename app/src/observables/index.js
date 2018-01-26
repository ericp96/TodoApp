const Rx = require('rxjs');
const { List, Map } = require('immutable');

const EditorViewState = require('views/editor/EditorView.state').default;

export default Map({
    button_click: new Rx.Subject(),
    add_item: new Rx.Subject()
        .scan((items, item) => items.push(item), List())
}).merge(EditorViewState);