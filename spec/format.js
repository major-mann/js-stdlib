/** Holds the tests for formatting. */
(function formatModuleTests() {

    describe('format(str)', function () {
        var format = require('../src/format.js');

        it('should be a function', function () {
            expect(format).toEqual(jasmine.any(Function));
        });
        it('should replace {n} with the string value of the supplied argument', function () {
            var str = 'Hello {2}{0} how are you {{3}} today? How is your {1}?';
            str = format(str, 'Jones', 'sister', 'Mr ');
            expect(str).toBe('Hello Mr Jones how are you {3} today? How is your sister?');
        });
        it('should pad the right with spaces if the parameter is passed with a positive align value. ie {0,10}', function () {
            var str = 'Hello{0,6}!',
                res;
            res = format(str, 'World');
            expect(res).toBe('HelloWorld !');
        });
        it('should pad the left with spaces if the parameter is passed with a negative align value. ie {0,-10}', function () {
            var str = 'Hello{0,-6}!',
                res;
            res = format(str, 'World');
            expect(res).toBe('Hello World!');
        });
        it('should replace {n:json<m>} with the json value of the the argument with tabs equal to m', function () {
            expect(format('{0:json4}', 'foo')).toBe('"foo"');
            expect(format('{0:json4}', 123)).toBe('123');
            expect(format('{0:json4}', true)).toBe('true');
            expect(format('{0:json4}', { foo: 'bar', bar: 'foo' })).toBe('{\n    "foo": "bar",\n    "bar": "foo"\n}');
        });
        it('should allow %i or %d to be passed which parses the supplied value, regardless of type as int and print it', function () {
            expect(format('{0:%i}', 'foo')).toBe('NaN');
            expect(format('{0:%d}', 'foo')).toBe('NaN');
            expect(format('{0:%i}', {})).toBe('NaN');
            expect(format('{0:%d}', {})).toBe('NaN');
            expect(format('{0:%d}', undefined)).toBe('NaN');

            expect(format('{0:%i}', 123)).toBe('123');
            expect(format('{0:%d}', 456)).toBe('456');
            expect(format('{0:%d}', 456.876)).toBe('456');
        });
        it('should allow %f to be passed which parses the supplied value, regardless of type as float and print it', function () {
            expect(format('{0:%f}', 'foo')).toBe('NaN');
            expect(format('{0:%f}', {})).toBe('NaN');
            expect(format('{0:%f}', undefined)).toBe('NaN');
            expect(format('{0:%f}', 456)).toBe('456');
            expect(format('{0:%f}', 456.876)).toBe('456.876');
        });
        it('should allow %o to be passed which calls json.stringify on the supplied value', function () {
            expect(format('{0:%o}', 'foo')).toBe('"foo"');
            expect(format('{0:%o}', 123)).toBe('123');
            expect(format('{0:%o}', true)).toBe('true');
            expect(format('{0:%o}', { foo: 'bar' })).toBe('{\n    "foo": "bar"\n}');
        });
        it('should allow %s to be passed which prints the value as normal', function () {
            expect(format('{0:%s}', 'foo')).toBe('foo');
            expect(format('{0:%s}', 123)).toBe('123');
            expect(format('{0:%s}', true)).toBe('true');
            expect(format('{0:%s}', { foo: 'bar' })).toBe('[object Object]');
        });
    });

    describe('formattersAdd', function () {
        var format = require('../src/format.js');
        it('should be a function', function () {
            expect(format.formattersAdd).toEqual(jasmine.any(Function));
        });
        it('should allow a formatter to be registered for a given type', function () {
            format.formattersAdd('object', function () {
                return 'foo bar';
            });
            expect(format('testing "{0}"', {})).toBe('testing "foo bar"');
        });
        it('should ensure the supplied handler is a function', function () {
            expect(format.formattersAdd.bind(null, 'foo', {})).toThrowError(/must.*function/i);
            expect(format.formattersAdd.bind(null, 'foo', 123)).toThrowError(/must.*function/i);
        });
    });

    describe('formattersRemove', function () {
        var format = require('../src/format.js');
        it('should be a function', function () {
            expect(format.formattersRemove).toEqual(jasmine.any(Function));
        });
        it('should remove the formatter for the supplied type', function () {
            var list = format.formattersList();
            // Note: we are checking for the object handler added in previous
            //  tests... not very isolated :o
            expect(list.length).toBe(3);
            format.formattersRemove('object');
            list = format.formattersList();
            expect(list.length).toBe(2);
        });
        it('should return the removed formatter', function () {
            var testFmtr = function () {},
                res;
            format.formattersAdd('test', testFmtr);
            res = format.formattersRemove('test');
            expect(res).toBe(testFmtr);
        });
    });

    describe('formattersList', function () {
        var format = require('../src/format.js');
        it('should be a function', function () {
            expect(format.formattersList).toEqual(jasmine.any(Function));
        });
        it('should return all the registered formatters', function () {
            var list = format.formattersList(),
                hasNumber,
                hasDate;
            expect(list.length).toBe(2);
            if (list[0].name === 'number' || list[1].name === 'number') {
                hasNumber = true;
            }
            if (list[1].name === 'date' || list[0].name === 'date') {
                hasDate = true;
            }
            expect(hasNumber).toBe(true);
            expect(hasDate).toBe(true);
        });
    });

    describe('register', function () {
        var format = require('../src/format.js');
        it('should be a function', function () {
            expect(format.register).toEqual(jasmine.any(Function));
        });
        it('should bind the format function to string.prototype', function () {
            expect(String.prototype.format).not.toEqual(jasmine.any(Function));
            format.register();
            format.register();
            expect(String.prototype.format).toEqual(jasmine.any(Function));
            expect('foo {0}'.format('bar')).toBe('foo bar');
        });
    });

    describe('deregister', function () {
        var format = require('../src/format.js');
        it('should be a function', function () {
            expect(format.deregister).toEqual(jasmine.any(Function));
        });
        it('should unbind the format function to string.prototype', function () {
            expect(String.prototype.format).toEqual(jasmine.any(Function));
            format.deregister();
            expect(String.prototype.format).not.toEqual(jasmine.any(Function));
            format.deregister();
        });
    });

}());
