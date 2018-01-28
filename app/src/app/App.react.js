const React = require('react');

const ObservableProvider = require('stredux/ObservableProvider.react').default;
const EditorView = require('views/editor/EditorView.react').default;

const observables = require('observables').default;

class App extends React.PureComponent {
    render() {
        return (
            <div>
                <ObservableProvider store={observables}>
                    <EditorView />
                </ObservableProvider>
            </div>
        );
    }
}

export default App;