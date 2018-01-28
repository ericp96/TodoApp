const React = require('react');
const Immutable = require('immutable');
const { Paper, Subheader, List, ListItem } = require('material-ui');

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
        return this.props.todoState ? this.props.todoState.todos : Immutable.List();
    }

    render() {
        return (
            <Paper zDepth={1} className={todoList} rounded={false}>
                {(this.todos || []).map(d => (<div key={d.title}>{ d.title }</div>))}
                <List>
                    <Subheader>Group Todos</Subheader>
                    <ListItem>Todo #1</ListItem>
                    <ListItem>Todo #2</ListItem>
                    <ListItem>Todo #3</ListItem>
                    <ListItem>Todo #4</ListItem>
                    <ListItem>Todo #5</ListItem>
                </List>
            </Paper>
        );
    }
}

export default TodoList;