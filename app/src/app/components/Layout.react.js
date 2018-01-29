const React = require('react');
const Immutable = require('immutable');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const { AppBar, Drawer, MenuItem } = require('material-ui');

const { getStateSelector, getActionSelector } = require('utility/selectors');
const { createActionCallbackWithPredefinedArgs } = require('utility/createActionCallback');
const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;
const createObservableSelector = require('stredux/createObservableSelector').default;

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
                    <AppBar title="Todos" 
                        iconClassNameRight="muidocs-icon-navigation-expand-more" 
                        onLeftIconButtonClick={onToggleMenu} />
                    <Drawer open={showMenu} docked={false} onRequestChange={onToggleMenu}>
                        <MenuItem>Dashboard</MenuItem>
                        <MenuItem>Todos</MenuItem>
                    </Drawer>
                    { this.props.children }
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default Layout;