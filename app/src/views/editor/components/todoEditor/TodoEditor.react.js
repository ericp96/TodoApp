const React = require('react');
const { List } = require('immutable');

const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const setObservableFromInput = require('utility/setObservableFromInput').default;
const { getScopedActionSelector, getStateSelector } = require('utility/selectors');

const statePath = List(['views', 'editor', 'editor']);

const getEditorActionSelector = getScopedActionSelector(statePath)

const setTitleSelector = getEditorActionSelector('setTitle');
const setDescriptionSelector = getEditorActionSelector('setDescription');
const setEstimatedHoursSelector = getEditorActionSelector('setEstimatedHours');
const setTargetCompletionSelector = getEditorActionSelector('setTargetCompletion');
const viewStateSelector = getStateSelector(statePath.push('state'));

const mapObservablesToProps = createObservableSelector(
    setTitleSelector,
    setDescriptionSelector,
    setEstimatedHoursSelector,
    setTargetCompletionSelector,
    (setTitle$, setDescription$, setEstimatedHours$, setTargetCompletion$) => ({
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
        todoEditState: {}
    };

    render() {
        const { title, description, estimatedHours, targetCompletionDate } = this.props.todoEditState;
        const updateTitle = setObservableFromInput(this.props.setTitle$);
        const updateDescription = setObservableFromInput(this.props.setDescription$);
        const updateEstimatedHours = setObservableFromInput(this.props.setEstimatedHours$);
        const updateTargetCompletion = setObservableFromInput(this.props.setTargetCompletion$);

        return (
            <div>
                <div>
                    Title:
                    <input type="text" value={title} onChange={updateTitle} />
                </div>

                <div>
                    Description:
                    <input type="text" value={description} onChange={updateDescription} />
                </div>

                <div>
                    Estimated Hours:
                    <input type="text" value={estimatedHours} onChange={updateEstimatedHours} />
                </div>

                <div>
                    Target Completion Date:
                    <input type="text" value={targetCompletionDate} onChange={updateTargetCompletion} />
                </div>
            </div>
        );
    }
}

export default TodoEditor;