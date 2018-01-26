const React = require('react');
const { List } = require('immutable');

const ObservableConnector = require('connector/ObservableConnector.hoc.react').default;

const stateKeysFromList = require('utility/stateKeysFromList').default;
const setObservableFromInput = require('utility/setObservableFromInput').default;

const keysToGrab = stateKeysFromList('editor', ['id', 'title', 'description', 'estimated_hours', 'target_completion']);

@ObservableConnector(...keysToGrab)
class EditorView extends React.PureComponent {
    render() {
        const updateTitle = setObservableFromInput(this.props.title$);
        const updateDescription = setObservableFromInput(this.props.description$);
        const updateEstimatedHours = setObservableFromInput(this.props.estimated_hours$);
        const updateTargetCompletion = setObservableFromInput(this.props.target_completion$);

        return (
            <div>
                <div>
                    <div>
                        Title: {this.props.title}
                    </div>
                    <input type="text" value={this.props.title} onChange={updateTitle} />
                </div>

                <div>
                    Description: {this.props.description}
                    <input type="text" value={this.props.description} onChange={updateDescription} />
                </div>

                <div>
                    Estimated Hours: {this.props.estimated_hours}
                    <input type="text" value={this.props.estimated_hours} onChange={updateEstimatedHours} />
                </div>

                <div>
                    Target Completion Date: {this.props.target_completion}
                    <input type="text" value={this.props.target_completion} onChange={updateTargetCompletion} />
                </div>
            </div>
        );
    }
}

export default EditorView;