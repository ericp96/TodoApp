const { Record, Map, List } = require('immutable');

const shape = {
    actions: Map(),
    state: Map(),
    path: List()
};

class PartialStateRecord extends Record(shape) {
    mergePartialState(...partialState) {
        const partialStateList = List(partialState);

        const actionMaps = partialStateList
            .map(partialState => partialState.actions
                .mapKeys(actionName => partialState.path.concat(actionName)));

        const stateMaps = partialStateList
            .map(partialState => partialState.state
                .mapKeys(stateName => partialState.path.concat(stateName)));

        return this.update('actions', actions => actions.merge(...actionMaps))
            .update('state', state => state.merge(...stateMaps));
    }
}

export default PartialStateRecord;