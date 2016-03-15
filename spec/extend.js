/** Defines the tests to run for the typeof function. */
(function extendTests() {

    var extend = require('../src/extend.js');

    describe('extend', function () {
        it('should be a function', function () {
            expect(extend).toEqual(jasmine.any(Function));
        });
        it('should return the first argument when the first or second argument is not an object, function or array', function () {
            expect(extend('foo', { foo: 'bar' })).toBe('foo');
            expect(extend(123, { foo: 'bar' })).toBe(123);
            expect(extend(true, { foo: 'bar' })).toBe(true);
            expect(extend(undefined, { foo: 'bar' })).toBe(undefined);
            expect(extend(null, { foo: 'bar' })).toBe(null);
        });
        it('should overwrite the properties in dest with the properties in source', function () {
            var src, dest;
            dest = {
                foo: 1,
                bar: 'yeah',
                baz: true
            };
            src = {
                foo: 'changed',
                bar: 123
            };
            dest = extend(dest, src);
            expect(dest.foo).toBe('changed');
            expect(dest.bar).toBe(123);
            expect(dest.baz).toBe(true);
            return dest;
        });
        it('should change the type of dest if it is different to source while maintaining the properties', function () {
            var src, dest;
            dest = {
                foo: 1,
                bar: true,
                test: {
                    hello: 'world!'
                }
            };
            src = {
                baz: 2,
                test: [0, 1, 2]
            };
            dest = extend(dest, src);
            expect(dest).toEqual(jasmine.any(Object));
            expect(dest.foo).toBe(1);
            expect(dest.bar).toBe(true);
            expect(dest.baz).toBe(2);
            expect(dest.test).toEqual(jasmine.any(Array));
            expect(dest.test.hello).toBe('world!');
            expect(dest.test[0]).toBe(0);
            expect(dest.test[1]).toBe(1);
            expect(dest.test[2]).toBe(2);

            dest = {
                foo: 1,
                bar: true,
                test: [0, 1, 2]
            };
            src = {
                baz: 2,
                test: {
                    hello: 'world!'
                }
            };
            dest = extend(dest, src);
            expect(dest.test.hello).toBe('world!');
            expect(dest.test[0]).toBe(0);
            expect(dest.test[1]).toBe(1);
            expect(dest.test[2]).toBe(2);

            dest = {
                foo: 1,
                bar: true,
                test: {
                    hello: 'world!'
                }
            };
            src = {
                baz: 2,
                test: function () {}
            };
            dest = extend(dest, src);
            expect(dest.test).toEqual(jasmine.any(Function));
            expect(dest.test.hello).toBe('world!');
        });
        it('should should overwrite properties when either the source, or destination properties is a value type', function () {
            var src, dest;
            dest = {
                foo: 1,
                bar: 'yeah',
                baz: true,
                testSub: {
                    val: 123
                }
            };
            src = {
                foo: { },
                bar: 123,
                testSub: {
                    val: 456
                }
            };
            dest = extend(dest, src);
        });
        it('should continuosly process until no arguments are left', function () {
            var dest = {};
            extend(dest, { foo: 'bar' }, { bar: 'foo' });
            expect(dest.foo).toBe('bar');
            expect(dest.bar).toBe('foo');
        });
    });
    describe('register', function () {
        afterEach(function () {
            extend.deregister();
        });
        it('should be a function', function () {
            expect(extend.register).toEqual(jasmine.any(Function));
        });
        it('should add the extend function to Object.prototype', function () {
            var src, dest;
            extend.register();
            extend.register();
            expect(Object.prototype.extend).toEqual(jasmine.any(Function));

            dest = {
                foo: 1,
                bar: 'yeah',
                baz: true
            };
            src = {
                foo: 'changed',
                bar: 123
            };
            dest = dest.extend(src);
            expect(dest.foo).toBe('changed');
            expect(dest.bar).toBe(123);
            expect(dest.baz).toBe(true);
        });
    });
    describe('rdeegister', function () {
        it('should be a function', function () {
            expect(extend.deregister).toEqual(jasmine.any(Function));
        });
        it('should remove the extend function from Object.prototype', function () {
            extend.register();
            expect(Object.prototype.extend).toEqual(jasmine.any(Function));
            extend.deregister();
            expect(Object.prototype.extend).not.toEqual(jasmine.any(Function));
        });
    });

}());
