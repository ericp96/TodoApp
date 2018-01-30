
const observableState = require('../../src/observables');

var assert = require('assert');
describe('Observable state tree', function () {
    describe('partial states merged', function () {
        it('should contain an action from each partial state tree', function () {
            const partialTreeKeys = observableState.actions
                .keySeq()
                .flatMap(list => list.first())
                .toSet();
            assert.equal(partialTreeKeys.count(), 3);
        });

        it('should contain state from each partial state tree', function () {
            const partialTreeKeys = observableState.state
                .keySeq()
                .flatMap(list => list.first())
                .toSet();
            assert.equal(partialTreeKeys.count(), 3);
        })
    });
});