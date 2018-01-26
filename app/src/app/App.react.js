const React = require('react');

const ObservableProvider = require('connector/ObservableProvider.react').default;
const Main = require('./Main.react').default;
const EditorView = require('views/editor/EditorView.react').default;

const observables = require('observables').default;

class App extends React.PureComponent {
    render() {
        return (
            <div>
                <ObservableProvider store={observables}>
                    <Main />
                    <EditorView />
                </ObservableProvider>
            </div>
        );
    }
}

export default App;