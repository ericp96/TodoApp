const React = require('react');
const PropTypes = require('prop-types');
const { Map, List } = require('immutable');

// not the most extensible, but serves for the purpose of the demo
function getNameFromKeyName(keyName) {
    return keyName.last ? keyName.last() : keyName;
}

function observableConnector(...streamNames) {
    return function _observableConnector(Component) {
        return class ObservableConnectorHOC extends React.PureComponent {
            static contextTypes = {
                observableStore: PropTypes.object
            };

            state = {
                observables: Map()
            };

            componentWillMount() {
                const observableNames = List(streamNames)
                    .toMap()
                    .mapKeys((_, name) => getNameFromKeyName(name));

                const observableValues = observableNames
                    .map(() => undefined);

                const observablesWithValueNames = observableNames
                    .map(name => this.context.observableStore.get$(name));

                const observables = observablesWithValueNames
                    .mapKeys(name => `${name}$`)

                this.setState({
                    observables: observableValues
                        .merge(observables)
                });

                observablesWithValueNames.forEach((observable, name) =>
                    observable.subscribe(newValue => 
                        this.setState(({ observables }) => ({
                            observables: observables.set(name, newValue)
                        }))));
            }

            get componentProps() {
                return this.state.observables.reduce((acc, entry, key) => ({
                    ...acc,
                    [key]: entry
                }), {});
            }

            render() {
                return <Component {...this.componentProps} />
            }
        }
    }
};

export default observableConnector;