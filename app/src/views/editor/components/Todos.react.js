const React = require('react');
const Immutable = require('immutable');
const moment = require('moment');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;
const TodoStateRecord = require('models/TodoStateRecord').default;

const { todoList } = require('sass/styles.scss');

const TodoList = require('components/todoList/TodoList.react').default;

const todosStateSelector = getStateSelector(Immutable.List(['stores', 'todos', 'state']));
const setTodoSelector = getActionSelector(Immutable.List(['views', 'editor', 'editor', 'set']));

const mapObservablesToProps = createObservableSelector(
    setTodoSelector,
    (setTodo$) => ({ setTodo$ })
);

const mapObservableValuesToProps = createObservableSelector(
    todosStateSelector,
    (todoState) => ({ todoState })
);

function getSortValue(todo) {
    return (todo.complete ? 1 : -1) / todo.targetCompletionDate;
}

@ObservableConnector(mapObservablesToProps, mapObservableValuesToProps)
class Todos extends React.PureComponent {
    static defaultProps = {
        todoState: new TodoStateRecord()
    };

    get todos() {
        const { todoState } = this.props;
        return todoState && todoState.todos ?
            todoState.todos.sort((a, b) => getSortValue(a) < getSortValue(b)).reverse()
            : Immutable.List();
    }

    render() {
        const { setTodo$ } = this.props;

        return (
            <TodoList className={todoList} onClick$={setTodo$} todos={this.todos} />
        );
    }
}

export default Todos;