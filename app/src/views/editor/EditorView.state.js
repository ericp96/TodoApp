const Rx = require('rxjs');
const { List, Map } = require('immutable');

export default Map()
    .set(List(['id']), new Rx.Subject())
    .set(List(['title']), new Rx.Subject())
    .set(List(['description']), new Rx.Subject())
    .set(List(['estimated_hours']), new Rx.Subject())
    .set(List(['target_completion']), new Rx.Subject())
    .mapKeys(key => key.unshift('editor'));