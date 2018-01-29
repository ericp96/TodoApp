const React = require('react');
const Immutable = require('immutable');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;
const TodoControls = require('./buttons/TodoControls.react').default;

const { todoList } = require('sass/styles.scss');

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
        const { setTodo$ } = this.props;
        return (
            <Paper zDepth={1} className={todoList} rounded={false}>
                <List>
                    <Subheader>Group Todos</Subheader>
                    { this.todos.map(todo => (
                        <ListItem key={todo.id} 
                            onClick={createActionCallbackWithPredefinedArgs(setTodo$, todo)} 
                            rightIconButton={<TodoControls todo={todo} />}>
                            { todo.title }
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default TodoList;