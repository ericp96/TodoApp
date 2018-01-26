function setObservableFromInput(observable) {
    return function _setObservableFromInput(event) {
        observable.next(event.target.value);
    }
}

export default setObservableFromInput;