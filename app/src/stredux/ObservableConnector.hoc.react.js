const React = require('react');
const PropTypes = require('prop-types');
const { Map, List } = require('immutable');
const Rx = require('rxjs');

// not the most extensible, but serves for the purpose of the demo
function getNameFromKeyName(keyName) {
    return keyName.last ? keyName.last() : keyName;
}

function observableConnector(mapObservablesToProps, mapObservableValuesToProps) {
    return function _observableConnector(Component) {
        return class ObservableConnectorHOC extends React.PureComponent {
            static contextTypes = {
                observableStore: PropTypes.object
            };

            state = {};

            get observableProps() {
                return mapObservablesToProps ? 
                    mapObservablesToProps(this.context.observableStore) : 
                    undefined;
            }

            componentWillMount() {
                const observableValueMapper = mapObservableValuesToProps ? 
                    Map(mapObservableValuesToProps(this.context.observableStore)) : Map();

                const observableKeySeq = observableValueMapper.keySeq();
                const observableValueSeq = observableValueMapper.valueSeq();

                const aggregatedObservable = Rx.Observable.combineLatest(...observableValueSeq)
                    .map((args) => Map(observableKeySeq.zip(List(args))));

                aggregatedObservable.subscribe(newMap => this.setState(newMap.toJSON()));
            }

            render() {
                return <Component {...this.observableProps} {...this.state} />
            }
        }
    }
};

export default observableConnector;