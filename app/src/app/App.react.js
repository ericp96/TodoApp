const React = require('react');

const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const AppBar = require('material-ui/AppBar').default;

const ObservableProvider = require('stredux/ObservableProvider.react').default;
const EditorView = require('views/editor/EditorView.react').default;

const observables = require('observables').default;

class App extends React.PureComponent {
    render() {
        return (
            <MuiThemeProvider>
                <ObservableProvider store={observables}>
                    <AppBar title="Todos" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                    <EditorView />
                </ObservableProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;