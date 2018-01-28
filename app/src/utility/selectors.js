const compose = require('utility/compose').default;

function actionsSelector(observableStore) {
    return observableStore.actions;
}

function stateSelector(observableStore) {
    return observableStore.state;
}

function getStateSelector(statePath) {
    return compose(
        stateSelector,
        state => state.get(statePath)
    );
}

function getActionSelector(actionPath) {
    return compose(
        actionsSelector,
        actions => actions.get(actionPath)
    );
}

function getScopedActionSelector(basePath) {
    return partialPath => getActionSelector(basePath.push(partialPath));
}

export {
    getStateSelector,
    getActionSelector,
    getScopedActionSelector
};