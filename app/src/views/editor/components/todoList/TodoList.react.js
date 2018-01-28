const React = require('react');
const Immutable = require('immutable');
const { Paper, Subheader, List, ListItem } = require('material-ui');
const DeleteIcon = require('material-ui/svg-icons/action/delete').default;

const { getStateSelector } = require('utility/selectors');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const { todoList } = require('sass/styles.scss');

const todosStateSelector = getStateSelector(Immutable.List(['stores', 'todos', 'state']));

const mapObservableValuesToProps = createObservableSelector(
    todosStateSelector,
    (todoState) => ({ todoState })
);

@ObservableConnector(undefined, mapObservableValuesToProps)
class TodoList extends React.PureComponent {
    static defaultProps = {
        todoState: Immutable.List()
    };

    get todos() {
        const { todoState } = this.props;
        return todoState && todoState.todos ? todoState.todos : Immutable.List();
    }

    render() {
        return (
            <Paper zDepth={1} className={todoList} rounded={false}>
                <List>
                    <Subheader>Group Todos</Subheader>
                    { this.todos.map(d => (
                        <ListItem key={d.id} rightIconButton={<DeleteIcon />}>
                            { d.title }
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default TodoList;