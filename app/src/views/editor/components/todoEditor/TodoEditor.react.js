const React = require('react');
const { List } = require('immutable');
const { Paper, Subheader, TextField, DatePicker, RaisedButton } = require('material-ui');
const uuid = require('uuid/v4');

const TodoRecord = require('models/TodoRecord').default;
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const setObservableFromInput = require('utility/setObservableFromInput').default;
const { getScopedActionSelector, getActionSelector, getStateSelector } = require('utility/selectors');

const { todoEditor, editorEntry } = require('sass/styles.scss');

const statePath = List(['views', 'editor', 'editor']);

const getEditorActionSelector = getScopedActionSelector(statePath)

const addTodoSelector = getActionSelector(List(['stores', 'todos', 'addTodo']));
const deleteTodoSelector = getActionSelector(List(['stores', 'todos', 'deleteTodo']));

const clearSelector = getEditorActionSelector('clear');
const setTitleSelector = getEditorActionSelector('setTitle');
const setDescriptionSelector = getEditorActionSelector('setDescription');
const setEstimatedHoursSelector = getEditorActionSelector('setEstimatedHours');
const setTargetCompletionSelector = getEditorActionSelector('setTargetCompletionDate');
const viewStateSelector = getStateSelector(statePath.push('state'));

const mapObservablesToProps = createObservableSelector(
    addTodoSelector,
    deleteTodoSelector,
    clearSelector,
    setTitleSelector,
    setDescriptionSelector,
    setEstimatedHoursSelector,
    setTargetCompletionSelector,
    (addTodo$, deleteTodo$, clear$, setTitle$, setDescription$, setEstimatedHours$, setTargetCompletion$) => ({
        addTodo$,
        deleteTodo$,
        clear$,
        setTitle$,
        setDescription$,
        setEstimatedHours$,
        setTargetCompletion$
    })
);

const mapObservableValuesToProps = createObservableSelector(
    viewStateSelector,
    (todoEditState) => ({ todoEditState })
);

@ObservableConnector(mapObservablesToProps, mapObservableValuesToProps)
class TodoEditor extends React.PureComponent {
    static defaultProps = {
        todoEditState: new TodoRecord()
    };

    constructor() {
        super();
        this.saveTodo = this.saveTodo.bind(this);
    }

    saveTodo() {
        const { todoEditState, addTodo$, clear$ } = this.props; 
        const todo = todoEditState
            .update('id', id => id || uuid());
        
        addTodo$.next(todo);
        clear$.next();
    }

    render() {
        const { title, description, estimatedHours, targetCompletionDate } = this.props.todoEditState;
        const updateTitle = setObservableFromInput(this.props.setTitle$);
        const updateDescription = setObservableFromInput(this.props.setDescription$);
        const updateEstimatedHours = setObservableFromInput(this.props.setEstimatedHours$);
        const updateTargetCompletion = (value) => this.props.setTargetCompletion$.next(value);

        return (
            <Paper zDepth={1} className={todoEditor} rounded={false}>
                <Subheader>Create Todo</Subheader>

                <div className={editorEntry}>
                    <TextField
                        hintText="Email Tracy"
                        floatingLabelText="Todo Name"
                        floatingLabelFixed={true} 
                        value={title}
                        onChange={updateTitle} />
                </div>

                <div className={editorEntry}>
                    <TextField
                        hintText="Invite her to the meeting"
                        floatingLabelText="Description"
                        floatingLabelFixed={true}
                        value={description} 
                        onChange={updateDescription} />
                </div>

                <div className={editorEntry}>
                    <TextField
                        hintText="4"
                        floatingLabelText="Estimated Hours"
                        floatingLabelFixed={true}
                        value={estimatedHours} 
                        onChange={updateEstimatedHours} />
                </div>

                <div className={editorEntry}>
                    <DatePicker
                        floatingLabelText="Target Completion Date"
                        mode="landscape"
                        value={targetCompletionDate}
                        onChange={updateTargetCompletion} />
                </div>

                <div className={editorEntry}>
                    <RaisedButton label="Save" primary={true} onClick={this.saveTodo} />
                </div>
            </Paper>
        );
    }
}

export default TodoEditor;