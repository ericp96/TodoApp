const Rx = require('rxjs');
const { List, Map } = require('immutable');

export default Map()
    .set('id', new Rx.Subject())
    .set('title', new Rx.Subject())
    .set('description', new Rx.Subject())
    .set('estimated_hours', new Rx.Subject())
    .set('target_completion', new Rx.Subject())
    .mapKeys(key => List(['editor', key]));