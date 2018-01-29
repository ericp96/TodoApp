const React = require('react');
const Immutable = require('immutable');

const CompleteButton = require('./CompleteButton.react').default;
const DeleteButton = require('./DeleteButton.react').default;

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const deleteTodoSelector = getActionSelector(Immutable.List(['stores', 'todos', 'deleteTodo']));
const setTodoCompletedSelector = getActionSelector(Immutable.List(['stores', 'todos', 'setTodoComplete']));

const mapObservablesToProps = createObservableSelector(
    deleteTodoSelector,
    setTodoCompletedSelector,
    (deleteTodo$, setTodoComplete$) => ({ deleteTodo$, setTodoComplete$ })
);

@ObservableConnector(mapObservablesToProps)
class TodoControls extends React.PureComponent {
    get completeButtonStyles() {
        return {
            ...(this.props.style || {}),
            right: '35px'
        };
    }

    get deleteButtonStyles() {
        return {
            ...(this.props.style || {}),
            top: '10px',
            right: '15px'
        };
    }

    render() {
        const { todo, deleteTodo$, setTodoComplete$ } = this.props;

        return (
            <div>
                <CompleteButton style={this.completeButtonStyles} onClick={createActionCallbackWithPredefinedArgs(setTodoComplete$, todo)} todo={todo} />
                <DeleteButton style={this.deleteButtonStyles} onClick={createActionCallbackWithPredefinedArgs(deleteTodo$, todo.id)} />
            </div>
        );
    }
}

export default TodoControls;