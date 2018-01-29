const React = require('react');
const Immutable = require('immutable');
const moment = require('moment');
const { Paper, Subheader, List, ListItem } = require('material-ui');

const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const TodoControls = require('./buttons/TodoControls.react').default;

const { todoListDate, todoListTitle } = require('sass/styles.scss');

class TodoList extends React.PureComponent {
    static defaultProps = {
        todos: Immutable.List()
    };

    render() {
        const { onClick$, className } = this.props;
        return (
            <Paper zDepth={1} className={className} rounded={false}>
                <Subheader>ToDos</Subheader>
                <List>
                    { this.props.todos.map(todo => (
                        <ListItem key={todo.id} 
                            onClick={createActionCallbackWithPredefinedArgs(onClick$, todo)} 
                            rightIconButton={<TodoControls todo={todo} />}>
                            <div>
                                <div className={todoListTitle}>
                                    {todo.title}
                                </div>
                                <div className={todoListDate}>
                                    Due: {moment(todo.targetCompletionDate).format('MMM DD, YY')}
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default TodoList;