function createActionCallbackWithPredefinedArgs(action$, ...args) {
    return function () {
        action$.next(...args);
    }
}

function createActionCallback(action$){
    return function(...args) {
        action$.next(...args);
    }
}

export {
    createActionCallbackWithPredefinedArgs,
    createActionCallback
};