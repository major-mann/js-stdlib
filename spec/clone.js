/** Defines the tests to run for the clone function. */
(function cloneTests() {
    var clone = require('../src').clone;

    describe('clone', function () {
        it('should be a function', function () {
            expect(clone).toEqual(jasmine.any(Function));
        });
        it('should return the same value if the supplied value is a value type', function () {
            expect(clone(123)).toBe(123);
            expect(clone('foo')).toBe('foo');
            expect(clone(true)).toBe(true);
            expect(clone(null)).toBe(null);
            expect(clone(undefined)).toBe(undefined);
        });
        it('should make a copy of the same type as the supplied value', function () {
            var obj = {}, arr = [];

            expect(clone(obj)).not.toBe(obj);
            expect(clone(obj)).toEqual(jasmine.any(Object));
            expect(clone(arr)).not.toBe(arr);
            expect(clone(arr)).toEqual(jasmine.any(Array));
            noop.foo = 'bar';
            expect(clone(noop)).not.toBe(noop);
            expect(clone(noop)).toEqual(jasmine.any(Function));
            expect(clone(noop).foo).toBe('bar');
        });
        it('should process properties recursively', function () {
            var obj, sub, res;
            sub = { foo: 'baz' };
            obj = { foo: 'bar', sub: sub };
            res = clone(obj);
            expect(res).not.toBe(obj);
            expect(res.foo).toBe('bar');
            expect(res.sub).not.toBe(sub);
            expect(res.sub.foo).toBe('baz');
        });
        it('should handle circular references without error', function () {
            var obj, sub, res;
            sub = { foo: 'baz' };
            obj = { foo: 'bar', sub: sub };
            sub.obj = obj;
            res = clone(obj);
            expect(res).not.toBe(obj);
            expect(res.sub).not.toBe(sub);
            expect(res.sub.obj).toBe(res);
            expect(res.sub.obj.sub.obj.sub.obj.foo).toBe('bar');
            expect(res.sub.obj.sub.obj.sub.obj.sub.foo).toBe('baz');
        });
        it('should clone regexp', function () {
            var rexp = new RegExp('abc', 'igm'),
                cln;
            cln = clone(rexp);
            expect(cln).not.toBe(rexp);
            expect(cln.source).toBe(rexp.source);
            rexp = new RegExp('abc', '');
            cln = clone(rexp);
            expect(cln).not.toBe(rexp);
            expect(cln.source).toBe(rexp.source);
        });
        it('should clone dates', function () {
            var dt = new Date(0),
                cln;
            cln = clone(dt);
            expect(cln.getTime()).toBe(0);
        });
    });

    describe('register', function () {
        it('should be a function', function () {
            expect(clone.register).toEqual(jasmine.any(Function));
        });
        it('should add a clone function to Object.prototype', function () {
            var cln;
            expect(Object.prototype.clone).not.toEqual(jasmine.any(Function));
            clone.register();
            clone.register();
            expect(Object.prototype.clone).toEqual(jasmine.any(Function));
            cln = { foo: 'bar' }.clone();
            expect(cln.foo).toBe('bar');
            clone.deregister();
            clone.deregister();
        });
    });
    describe('deregister', function () {
        it('should be a function', function () {
            expect(clone.deregister).toEqual(jasmine.any(Function));
        });
        it('should remove the clone function from Object.prototype', function () {
            expect(Object.prototype.clone).not.toEqual(jasmine.any(Function));
            clone.register();
            expect(Object.prototype.clone).toEqual(jasmine.any(Function));
            clone.deregister();
            expect(Object.prototype.clone).not.toEqual(jasmine.any(Function));
        });
    });

    function noop() {}

}());
