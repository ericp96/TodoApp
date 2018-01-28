const Rx = require('rxjs');
const { List, Map, Record } = require('immutable');

const PartialStateRecord = require('models/PartialStateRecord').default;
const TodoRecord = require('models/TodoRecord').default;

const actions = Map({
    'setId': new Rx.Subject()
        .map(id => state => state.set('id', id)),
    'setTitle': new Rx.Subject()
        .map(title => state => state.set('title', title)),
    'setDescription': new Rx.Subject()
        .map(description => state => state.set('description', description)),
    'setEstimatedHours': new Rx.Subject()
        .map(estimatedHours => state => state.set('estimatedHours', estimatedHours)),
    'setTargetCompletionDate': new Rx.Subject()
        .map(targetCompletionDate => state => state.set('targetCompletionDate', targetCompletionDate)),
    'clear': new Rx.Subject()
        .map(() => state => new TodoRecord()),
    'set': new Rx.Subject()
        .map(todo => state => todo),
}).mapKeys(key => List([key]));

const state = Map({
    'state': Rx.Observable.merge(...actions.valueSeq())
        .scan((state, changeFn) => changeFn(state), new TodoRecord())
}).mapKeys(key => List([key]));

export default new PartialStateRecord({
    actions,
    state,
    path: List(['editor'])
});