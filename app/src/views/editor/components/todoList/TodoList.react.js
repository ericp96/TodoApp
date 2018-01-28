const React = require('react');
const Immutable = require('immutable');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;
const DeleteButton = require('./DeleteButton.react').default;

const { todoList } = require('sass/styles.scss');

const todosStateSelector = getStateSelector(Immutable.List(['stores', 'todos', 'state']));
const deleteTodoSelector = getActionSelector(Immutable.List(['stores', 'todos', 'deleteTodo']));
const setTodoSelector = getActionSelector(Immutable.List(['views', 'editor', 'editor', 'set']));

function getDeleteAction(todoId, deleteTodo$) {
    return () => deleteTodo$.next(todoId);
}

function getDeleteButton(todoId, deleteTodo$) {
    return <DeleteButton onClick={getDeleteAction(todoId, deleteTodo$)} />
}

function setTodo(todo, setTodo$) {
    return function () {
        setTodo$.next(todo);
    }
}

const mapObservablesToProps = createObservableSelector(
    deleteTodoSelector,
    setTodoSelector,
    (deleteTodo$, setTodo$) => ({ deleteTodo$, setTodo$ })
);

const mapObservableValuesToProps = createObservableSelector(
    todosStateSelector,
    (todoState) => ({ todoState })
);

@ObservableConnector(mapObservablesToProps, mapObservableValuesToProps)
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
                    { this.todos.map(todo => (
                        <ListItem key={todo.id} onClick={setTodo(todo, this.props.setTodo$)} rightIconButton={getDeleteButton(todo.id, this.props.deleteTodo$)}>
                            { todo.title }
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default TodoList;