const React = require('react');
const PropTypes = require('prop-types');
const { Map } = require('immutable');

const ObservableStore = require('./ObservableStore').default;

class ObservableProvider extends React.PureComponent {
    observableStore = new ObservableStore();

    static childContextTypes = {
        observableStore: PropTypes.object
    };

    static defaultProps = {
        store: Map()
    };

    getChildContext() {
        return {
            observableStore: this.props.store
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.props.children }
            </React.Fragment>
        );
    }
}

export default ObservableProvider;