const React = require('react');
const Immutable = require('immutable');

const CompleteButton = require('./CompleteButton.react').default;
const DeleteButton = require('./DeleteButton.react').default;

const compose = require('utility/compose').default;
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
            top: '10px',
            right: '40px'
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

        const onClickComplete = compose(
            event => event.stopPropagation(),
            createActionCallbackWithPredefinedArgs(setTodoComplete$, todo)
        );

        const onClickDelete = compose(
            event => event.stopPropagation(),
            createActionCallbackWithPredefinedArgs(deleteTodo$, todo.id)
        );

        return (
            <div>
                <CompleteButton style={this.completeButtonStyles} onClick={onClickComplete} todo={todo} />
                <DeleteButton style={this.deleteButtonStyles} onClick={onClickDelete} />
            </div>
        );
    }
}

export default TodoControls;