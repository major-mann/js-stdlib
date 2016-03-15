/** Defines the tests to run for the regex functions. */
(function regexTests() {

    var regex = require('../src/regex.js');

    describe('encode', function () {
        it('should be a function', function () {
            expect(regex.encode).toEqual(jasmine.any(Function));
        });
        it('should encode regex control characters', function () {
            var test = '^$()',
                check = '\\^\\$\\(\\)',
                res;
            res = regex.encode(test);
            expect(res).toBe(check);
        });
    });
    describe('decode', function () {
        it('should be a function', function () {
            expect(regex.decode).toEqual(jasmine.any(Function));
        });
        it('should decode regex control characters', function () {
            var check = '^$()',
                test = '\\^\\$\\(\\)',
                res;
            res = regex.decode(test);
            expect(res).toBe(check);
        });
    });
    describe('registration', function () {
        it('should have a function called register', function () {
            expect(regex.register).toEqual(jasmine.any(Function));
        });
        it('should have a function called deregister', function () {
            expect(regex.deregister).toEqual(jasmine.any(Function));
        });
        it('should bind the encode function to the RegExp constructor when register is called', function () {
            var str, check;
            regex.register();
            regex.register();
            str = '[]()^$';
            check = '\\[\\]\\(\\)\\^\\$';
            expect(RegExp.encode).toEqual(jasmine.any(Function));
            expect(RegExp.decode).toEqual(jasmine.any(Function));
            expect(RegExp.encode(str)).toBe(check);
            expect(RegExp.decode(check)).toBe(str);
        });
        it('should remove the encode and decode functions if deregister is called', function () {
            regex.register();
            expect(RegExp.encode).toEqual(jasmine.any(Function));
            expect(RegExp.decode).toEqual(jasmine.any(Function));
            regex.deregister();
            expect(RegExp.encode).toBe(undefined);
            expect(RegExp.decode).toBe(undefined);
            regex.deregister();
        });
    });

}());
