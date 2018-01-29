const React = require('react');
const Immutable = require('immutable');
const moment = require('moment');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector } = require('utility/selectors');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const TodoStateRecord = require('models/TodoStateRecord').default;
const { dashboardCard, dashboardCardLabelTitle } = require('sass/styles.scss');

const todosStateSelector = getStateSelector(Immutable.List(['stores', 'todos', 'state']));

const mapObservableValuesToProps = createObservableSelector(
    todosStateSelector,
    (todoState) => ({ todoState })
);

@ObservableConnector(undefined, mapObservableValuesToProps)
class CompletedTasks extends React.PureComponent {
    static defaultProps = {
        todoState: new TodoStateRecord()
    };

    get completedTasks() {
        const { todoState } = this.props;
        const tasks = todoState && todoState.todos ? 
            todoState.todos.filter(todo => todo.complete)
            : Immutable.List();

        return tasks.count();
    }

    render() {
        return (
            <Paper zDepth={1} rounded={false} className={dashboardCard}>
                <Subheader>Completed ToDos</Subheader>
                <div className={dashboardCardLabelTitle}>
                    {this.completedTasks}
                </div>
            </Paper>
        );
    }
}

export default CompletedTasks;