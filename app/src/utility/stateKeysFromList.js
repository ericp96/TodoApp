const { List } = require('immutable');

function stateKeysFromList(path, keys) {
    return keys.map(key => List([path, key]));
}

export default stateKeysFromList;