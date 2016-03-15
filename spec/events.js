/** Holds the tests for the events module. */
(function eventTests() {
    var EventEmitter = require('../lib/events.js');
    describe('EventEmitter', function () {
        it('should allow creation of an event emitting object', function () {
            var testCalled, ee = new EventEmitter();
            ee.on('test', function () {
                testCalled = true;
            });
            ee.emit('test');
            expect(testCalled).toBe(true);
        });
    });
}());
