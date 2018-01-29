const React = require('react');
const { BrowserRouter, Switch, Route } = require('react-router-dom');

const ObservableProvider = require('stredux/ObservableProvider.react').default;
const Layout = require('./components/Layout.react').default;

const EditorView = require('views/editor/EditorView.react').default;
const DashboardView = require('views/dashboard/DashboardView.react').default;
const Error404View = require('views/error404/Error404View.react').default;

const observables = require('observables').default;

class App extends React.PureComponent {
    render() {
        return (
            <ObservableProvider store={observables}>
                <Layout>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={EditorView} />
                            <Route path="/dashboard" exact component={DashboardView} />
                            <Route component={Error404View} />
                        </Switch>
                    </BrowserRouter>
                </Layout>
            </ObservableProvider>
        );
    }
}

export default App;