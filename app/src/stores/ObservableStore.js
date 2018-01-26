const { Map } = require('immutable');

class ObservableStore {
    state = Map();

    constructor() {
        this.register$ = this.register$.bind(this);
        this.get$ = this.get$.bind(this);
    }

    register$(name, observable) {
        this.state = this.state.set(name, observable);
    }

    get$(name) {
        return this.state.get(name);
    }

    get state$() {
        return this.state;
    }
}

export default ObservableStore;