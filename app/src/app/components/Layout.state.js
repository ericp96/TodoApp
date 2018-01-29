const Rx = require('rxjs');
const { List, Map, Record } = require('immutable');

const PartialStateRecord = require('models/PartialStateRecord').default;
const LayoutRecord = require('models/LayoutRecord').default;

const actions = Map({
    'toggleMenu': new Rx.Subject()
        .map(() => state => state.set('showMenu', !state.showMenu))
}).mapKeys(key => List([key]));

const state = Map({
    'state': Rx.Observable.merge(...actions.valueSeq())
        .scan((state, changeFn) => changeFn(state), new LayoutRecord())
}).mapKeys(key => List([key]));

export default new PartialStateRecord({
    actions,
    state,
    path: List(['layout'])
});