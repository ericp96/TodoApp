function compose(...fns) {
    return function _compose(initialValue) {
        return fns.reduce((val, fn) => fn(val), initialValue);
    };
}

export default compose;