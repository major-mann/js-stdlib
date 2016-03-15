/** Defines the tests to run for the copy function. */
(function copyTests() {

    var copy = require('../src').copy;

    describe('copy', function () {
        it('should be a function', function () {
            expect(copy).toEqual(jasmine.any(Function));
        });
        it('should return the same value if the supplied value is a value type', function () {
            expect(copy(123)).toBe(123);
            expect(copy('foo')).toBe('foo');
            expect(copy(true)).toBe(true);
            expect(copy(null)).toBe(null);
            expect(copy(undefined)).toBe(undefined);
        });
        it('should make a copy of the same type as the supplied value', function () {
            expect(typeof copy(123)).toBe('number');
            expect(typeof copy('foo')).toBe('string');
            expect(typeof copy(true)).toBe('boolean');
            expect(typeof copy(undefined)).toBe('undefined');
            expect(typeof copy({})).toBe('object');
            expect(Array.isArray(copy([]))).toBe(true);
            expect(typeof copy(function () { })).toBe('function');
        });
        it('should copy all properties to the copied object', function () {
            var res, obj;
            obj = {
                foo: 'bar',
                sub: {
                    baz: 'baz'
                }
            };
            res = copy(obj);
            expect(res).not.toBe(obj);
            expect(res.foo).toBe('bar');
            expect(res.sub.baz).toBe('baz');
        });
        it('should not process properties recursively', function () {
            var res, obj, sub;
            sub = {};
            obj = {
                foo: 'bar',
                sub: sub
            };
            res = copy(obj);
            expect(res).not.toBe(obj);
            expect(res.sub).toBe(sub);
        });
        it('should copy regular expressions', function () {
            var rexp = new RegExp('abc', 'igm'),
                cpy;
            cpy = copy(rexp);
            expect(cpy).not.toBe(rexp);
            expect(cpy.source).toBe(rexp.source);
            rexp = new RegExp('abc', '');
            cpy = copy(rexp);
            expect(cpy).not.toBe(rexp);
            expect(cpy.source).toBe(rexp.source);
        });

        it('should copy dates', function () {
            var dt = new Date(0),
                cpy;
            cpy = copy(dt);
            expect(cpy.getTime()).toBe(0);
        });

        it('should copy functions', function () {
            var called = false,
                func = function test() { called = true; },
                cpy;
            func.foo = 'bar';
            cpy = copy(func);
            cpy = copy(func);
            expect(cpy.foo).toBe('bar');
            copy.dynamic = false;
            cpy = copy(func);
            expect(cpy.foo).toBe('bar');
            cpy();
            expect(called).toBe(true);
            cpy = new cpy();
            expect(cpy instanceof func).toBe(true);
        });
    });

    describe('register', function () {
        it('should be a function', function () {
            expect(copy.register).toEqual(jasmine.any(Function));
        });
        it('should add a copy function to Object.prototype', function () {
            var cpy;
            expect(Object.prototype.copy).not.toEqual(jasmine.any(Function));
            copy.register();
            copy.register();
            expect(Object.prototype.copy).toEqual(jasmine.any(Function));
            cpy = { foo: 'bar' }.copy();
            expect(cpy.foo).toBe('bar');
            copy.deregister();
            copy.deregister();
        });
    });
    describe('deregister', function () {
        it('should be a function', function () {
            expect(copy.deregister).toEqual(jasmine.any(Function));
        });
        it('should remove the copy function from Object.prototype', function () {
            expect(Object.prototype.copy).not.toEqual(jasmine.any(Function));
            copy.register();
            expect(Object.prototype.copy).toEqual(jasmine.any(Function));
            copy.deregister();
            expect(Object.prototype.copy).not.toEqual(jasmine.any(Function));
        });
    });

}());
