const React = require('react');

const ObservableProvider = require('stredux/ObservableProvider.react').default;
const Layout = require('./components/Layout.react').default;
const EditorView = require('views/editor/EditorView.react').default;

const observables = require('observables').default;

class App extends React.PureComponent {
    render() {
        return (
            <ObservableProvider store={observables}>
                <Layout>
                    <EditorView />
                </Layout>
            </ObservableProvider>
        );
    }
}

export default App;