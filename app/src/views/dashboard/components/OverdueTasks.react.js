const React = require('react');
const Immutable = require('immutable');
const moment = require('moment');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector } = require('utility/selectors');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const { dashboardCard, dashboardCardLabelTitle } = require('sass/styles.scss');

const TodoStateRecord = require('models/TodoStateRecord').default;

const todosStateSelector = getStateSelector(Immutable.List(['stores', 'todos', 'state']));

const mapObservableValuesToProps = createObservableSelector(
    todosStateSelector,
    (todoState) => ({ todoState })
);

@ObservableConnector(undefined, mapObservableValuesToProps)
class OverdueTasks extends React.PureComponent {
    static defaultProps = {
        todoState: new TodoStateRecord()
    };

    get overdueTasks() {
        const { todoState } = this.props;
        const currentTs = moment().valueOf();

        const tasks = todoState && todoState.todos ?
            todoState.todos.filter(todo =>
                !todo.complete &&
                todo.targetCompletionDate < currentTs)
            : Immutable.List();

        return tasks.count();
    }

    render() {
        return (
            <Paper zDepth={1} className={dashboardCard} rounded={false}>
                <Subheader>Overdue ToDos</Subheader>
                <div className={dashboardCardLabelTitle}>
                    {this.overdueTasks}
                </div>
            </Paper>
        );
    }
}

export default OverdueTasks;