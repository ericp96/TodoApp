const React = require('react');

const TodoEditor = require('./components/todoEditor/TodoEditor.react').default;

class EditorView extends React.PureComponent {
    render() {
        return (
            <div>
                <TodoEditor />
            </div>
        );
    }
}

export default EditorView;