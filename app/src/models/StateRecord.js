const { Record, Map, List } = require('immutable');

const shape = {
    actions: Map(),
    state: Map()
};

class StateRecord extends Record(shape) {
    static fromPartialStates(...partialStates) {
        const partialStateList = List(partialStates);

        const actions = partialStateList
            .map(partialState => partialState.actions
                .mapKeys(actionName => partialState.path.concat(actionName)))
            .reduce((actionMap, partialActionMap) => actionMap.merge(partialActionMap));

        const state = partialStateList
            .map(partialState => partialState.state
                .mapKeys(stateName => partialState.path.concat(stateName)))
            .reduce((stateMap, partialStateMap) => stateMap.merge(partialStateMap));

        return new StateRecord({
            actions,
            state
        });
    }
}

export default StateRecord;