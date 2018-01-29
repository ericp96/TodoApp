const React = require('react');

const TodoEditor = require('./components/todoEditor/TodoEditor.react').default;
const Todos = require('./components/Todos.react').default;

import {editorWrapper} from 'sass/styles.scss';

class EditorView extends React.PureComponent {
    render() {
        return (
            <div className={editorWrapper}>
                <Todos />
                <TodoEditor />
            </div>
        );
    }
}

export default EditorView;