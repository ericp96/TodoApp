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
class UpcomingTasks extends React.PureComponent {
    static defaultProps = {
        todoState: new TodoStateRecord()
    };

    get upcomingTasks() {
        const { todoState } = this.props;
        const upcomingTs = moment().add(3, 'days').endOf('day').valueOf();
        const currentTs = moment().valueOf();

        const tasks = todoState && todoState.todos ?
            todoState.todos.filter(todo => 
                !todo.complete && 
                todo.targetCompletionDate <= upcomingTs && 
                todo.targetCompletionDate >= currentTs)
            : Immutable.List();

        return tasks.count();
    }

    render() {
        return (
            <Paper zDepth={1} className={dashboardCard} rounded={false}>
                <Subheader>Upcoming ToDos</Subheader>
                <div className={dashboardCardLabelTitle}>
                    {this.upcomingTasks}
                </div>
            </Paper>
        );
    }
}

export default UpcomingTasks;