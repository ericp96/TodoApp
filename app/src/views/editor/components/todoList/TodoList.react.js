const React = require('react');
const { Paper, Subheader, List, ListItem } = require('material-ui');

import { todoList } from 'sass/styles.scss';

class TodoList extends React.PureComponent {
    render() {
        return (
            <Paper zDepth={1} className={todoList} rounded={false}>
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