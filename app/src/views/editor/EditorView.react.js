const React = require('react');

const TodoEditor = require('./components/todoEditor/TodoEditor.react').default;
const TodoList = require('./components/todoList/TodoList.react').default;

import {editorWrapper} from 'sass/styles.scss';

class EditorView extends React.PureComponent {
    render() {
        return (
            <div className={editorWrapper}>
                <TodoList />
                <TodoEditor />
            </div>
        );
    }
}

export default EditorView;