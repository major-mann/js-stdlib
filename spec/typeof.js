/** Defines the tests to run for the typeof function. */
(function typeOfTests() {

    var typeOf = require('../src/typeof.js');

    describe('typeOf', function () {

        afterEach(function () {
            typeOf.handlersClear();
        });
        it('should be a function', function () {
            expect(typeOf).toEqual(jasmine.any(Function));
        });
        it('should return "undefined" when the supplied value is undefined, or no arguments are supplied', function () {
            expect(typeOf()).toBe('undefined');
            expect(typeOf(undefined)).toBe('undefined');
        });
        it('should return "string" when the value is a string', function () {
            expect(typeOf('foo bar')).toBe('string');
            expect(typeOf('hello world')).toBe('string');
            expect(typeOf(100)).not.toBe('string');
        });
        it('should return "number" when the value is a number, but not NaN', function () {
            expect(typeOf(-100)).toBe('number');
            expect(typeOf(-100.234)).toBe('number');
            expect(typeOf(0)).toBe('number');
            expect(typeOf(1024)).toBe('number');
            expect(typeOf(1024.3656)).toBe('number');
            expect(typeOf(NaN)).not.toBe('number');
        });
        it('should return "nan" when the value is a number that is NaN', function () {
            expect(typeOf(NaN)).toBe('nan');
            expect(typeOf(1024.3656)).not.toBe('nan');
            expect(typeOf(1024.3656 + undefined)).toBe('nan');
        });
        it('should return "boolean" when the value is a boolean', function () {
            expect(typeOf(true)).toBe('boolean');
            expect(typeOf(false)).toBe('boolean');
            expect(typeOf(0)).not.toBe('boolean');
            expect(typeOf('foo bar')).not.toBe('boolean');
        });
        it('should return "function" when the value is a function', function () {
            var func = function () {};
            expect(typeOf(function () {})).toBe('function');
            expect(typeOf(function named() {})).toBe('function');
            expect(typeOf(func)).toBe('function');
            expect(typeOf(0)).not.toBe('function');
            expect(typeOf('foo bar')).not.toBe('function');
        });
        it('should return "regexp" when the value is a regular expression', function () {
            expect(typeOf(/abc/)).toBe('regexp');
            expect(typeOf(new RegExp('abc'))).toBe('regexp');
            expect(typeOf(0)).not.toBe('regexp');
            expect(typeOf('foo bar')).not.toBe('regexp');
        });
        it('should return "date" when the value is a Date', function () {
            expect(typeOf(new Date())).toBe('date');
            expect(typeOf(new Date(2013, 3, 5, 6, 7))).toBe('date');
            expect(typeOf(Date.now())).not.toBe('date');
            expect(typeOf('foo bar')).not.toBe('date');
        });
        it('should return "null" when the value is null', function () {
            expect(typeOf(null)).toBe('null');
            expect(typeOf(undefined)).not.toBe('null');
            expect(typeOf(0)).not.toBe('null');
            expect(typeOf('')).not.toBe('null');
        });
        it('should return "array" when the value is an array', function () {
            expect(typeOf([])).toBe('array');
            expect(typeOf(new Array(100))).toBe('array');
            expect(typeOf(0)).not.toBe('array');
            expect(typeOf('foo bar')).not.toBe('array');
        });
        it('should return "object" when the value is an object that is not a regular expression, date, null or an array', function () {
            expect(typeOf({})).toBe('object');
            expect(typeOf(new Object())).toBe('object');
            expect(typeOf(new Date())).not.toBe('object');
            expect(typeOf([])).not.toBe('object');
            expect(typeOf(/foo bar/)).not.toBe('object');
            expect(typeOf('foo bar')).not.toBe('object');
        });
        it('should allow custom handlers to be defined to add additional types', function () {
            var obj = {};
            expect(typeOf.handlersAdd).toEqual(jasmine.any(Function));
            typeOf.handlersAdd(testFunc);
            typeOf.handlersAdd('foo bar');

            expect(typeOf('foo')).toBe('string');
            expect(typeOf(1)).toBe('number');
            expect(typeOf({})).toBe('object');
            expect(typeOf(obj)).toBe('custom');

            function testFunc(val) {
                if (val === obj) {
                    return 'custom';
                }
            }
        });
        it('should allow custom handlers to be listed', function () {
            var list;
            typeOf.handlersAdd(testFunc);
            list = typeOf.handlersList();
            expect(list).toEqual(jasmine.any(Array));
            expect(list.length).toBe(1);
            expect(list[0]).toBe(testFunc);
            function testFunc() { }
        });
        it('should allow custom handlers to be removed', function () {
            var list;
            typeOf.handlersAdd(testFunc);
            list = typeOf.handlersList();
            expect(list).toEqual(jasmine.any(Array));
            expect(list.length).toBe(1);
            expect(list[0]).toBe(testFunc);
            typeOf.handlersRemove(testFunc);
            typeOf.handlersRemove(testFunc);
            function testFunc() { }
        });
    });

    describe('registration', function () {
        it('should have a function called register', function () {
            expect(typeOf.register).toEqual(jasmine.any(Function));
        });
        it('should have a function called deregister', function () {
            expect(typeOf.deregister).toEqual(jasmine.any(Function));
        });
        it('should bind the typeOf function to Object.prototype when register is called', function () {
            typeOf.register();
            typeOf.register();
            expect(Object.prototype.typeOf).toEqual(jasmine.any(Function));
            expect({}.typeOf()).toBe('object');
            expect('foo bar'.typeOf()).toBe('string');
            expect((123).typeOf()).toBe('number');
            expect(true.typeOf()).toBe('boolean');
            expect((function () {}).typeOf()).toBe('function');
        });
        it('should remove the typeOf function from Object.prototype if deregister is called', function () {
            typeOf.register();
            expect(Object.prototype.typeOf).toEqual(jasmine.any(Function));
            typeOf.deregister();
            expect(Object.prototype.typeOf).toBe(undefined);
            typeOf.deregister();
        });
    });
}());
