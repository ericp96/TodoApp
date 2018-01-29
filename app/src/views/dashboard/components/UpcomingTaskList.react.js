const React = require('react');
const Immutable = require('immutable');
const moment = require('moment');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;
const TodoStateRecord = require('models/TodoStateRecord').default;

const { dashboardCard } = require('sass/styles.scss');

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
class UpcomingTaskList extends React.PureComponent {
    static defaultProps = {
        todoState: new TodoStateRecord()
    };

    get todos() {
        const { todoState } = this.props;
        const upcomingTs = moment().add(3, 'days').endOf('day').valueOf();
        const currentTs = moment().valueOf();

        return todoState && todoState.todos ?
            todoState.todos.filter(todo =>
                !todo.complete &&
                todo.targetCompletionDate <= upcomingTs &&
                todo.targetCompletionDate >= currentTs)
                .sort((a, b) => getSortValue(a) < getSortValue(b)).reverse()
            : Immutable.List();
    }

    render() {
        const { setTodo$ } = this.props;

        return (
            <TodoList className={dashboardCard} onClick$={setTodo$} todos={this.todos} />
        );
    }
}

export default UpcomingTaskList;