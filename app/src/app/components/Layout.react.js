const React = require('react');
const Immutable = require('immutable');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const { AppBar, Drawer, MenuItem } = require('material-ui');
const { matchPath } = require('react-router');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

const urlTitleTuples = Immutable.Map([
    ['ToDo Dashboard', { path: '/dashboard', exact: true, strict: false }],
    ['ToDos', { path: '/', exact: true, strict: false }]
]);

function navigateToNewPage(url) {
    return function _navigateToNewPage() {
        window.location = url;
    };
}

function titleForBar() {
    const path = window.location.pathname;
    return urlTitleTuples.findKey(match => matchPath(path, match), undefined, '404 Page');
}

const layoutStateSelector = getStateSelector(Immutable.List(['layout', 'state']));
const toggleMenuSelector = getActionSelector(Immutable.List(['layout', 'toggleMenu']));

const mapObservablesToProps = createObservableSelector(
    toggleMenuSelector,
    (toggleMenu$) => ({ toggleMenu$ })
);

const mapObservableValuesToProps = createObservableSelector(
    layoutStateSelector,
    (layoutState) => ({ layoutState })
);

@ObservableConnector(mapObservablesToProps, mapObservableValuesToProps)
class Layout extends React.PureComponent {
    render() {
        const { showMenu=false } = this.props.layoutState || {};
        const onToggleMenu = createActionCallbackWithPredefinedArgs(this.props.toggleMenu$);
        return (
            <React.Fragment>
                <MuiThemeProvider>
                    <div>
                        <AppBar title={titleForBar()}
                            iconClassNameRight="muidocs-icon-navigation-expand-more" 
                            onLeftIconButtonClick={onToggleMenu} />
                        <Drawer open={showMenu} docked={false} onRequestChange={onToggleMenu}>
                            <MenuItem onClick={navigateToNewPage('/dashboard')}>Dashboard</MenuItem>
                            <MenuItem onClick={navigateToNewPage('/')}>ToDos</MenuItem>
                        </Drawer>
                        { this.props.children }
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default Layout;