
function applySelectorForMap(valueForMap) {
    return function selectorForMap(fn) {
        return fn(valueForMap);
    }
}

function createObservableSelector(...args) {
    const selectors = args.filter((_, i) => i !== args.length - 1);
    const reducer = args[args.length - 1];
    
    return function observableSelector(observableStore) {
        const observables = selectors.map(applySelectorForMap(observableStore));
        
        return reducer(...observables);
    }
}

export default createObservableSelector;