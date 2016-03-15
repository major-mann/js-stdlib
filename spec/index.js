(function indexModuleTests() {
    var index = require('../src/index.js');
    describe('register', function () {
        it('should be a function', function () {
            expect(index.register).toEqual(jasmine.any(Function));
            index.register();
        });
    });
    describe('safeRegister', function () {
        it('should be a function', function () {
            expect(index.safeRegister).toEqual(jasmine.any(Function));
            index.safeRegister();
        });
    });
    describe('deregister', function () {
        it('should be a function', function () {
            expect(index.deregister).toEqual(jasmine.any(Function));
            index.deregister();
        });
    });
}());
