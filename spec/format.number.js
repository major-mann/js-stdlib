/** Holds the tests for number formatting. */
(function formatNumberModuleTests() {

    describe('formatNumber(num, fmt, locale)', function () {
        var fnum = require('../src/format.number.js');

        it('should be a function', function () {
            expect(fnum).toEqual(jasmine.any(Function));
        });

        describe('standard', function () {
            it('should allow a currency format to be applued using "C<decimal count>:<currency code>[:<symbol|code|name>]"', function () {
                var res = fnum(123.456, 'c:usd');
                expect(res).toBe('$123.46');
                res = fnum(123.456, 'c1:usd');
                expect(res).toBe('$123.5');
                res = fnum(123.456, 'c3:eur:symbol');
                expect(res).toBe('€123.456');
                res = fnum(123.456, 'c3:eur:code');
                expect(res).toBe('EUR123.456');
                res = fnum(123.456, 'c3:eur:name');
                expect(res).toBe('123.456 euros');
            });
            it('should allow a integer only format to be specified using d<zero padded count>', function () {
                var res = fnum(123.456, 'd5');
                expect(res).toBe('00123');
                res = fnum(123.456, 'd');
                expect(res).toBe('123');
                res = fnum(-123, 'd5');
                expect(res).toBe('-00123');
            });
            it('should allow an exponential format to be specified using e<decimal count>', function () {
                var res = fnum(123456, 'e2');
                expect(res).toBe('1.23e+5');
                res = fnum(123456, 'e');
                expect(res).toBe('1.23456e+5');
                res = fnum(123456, 'e3');
                expect(res).toBe('1.235e+5');
                res = fnum(123456, 'e4');
                expect(res).toBe('1.2346e+5');
                res = fnum(123456, 'e5');
                expect(res).toBe('1.23456e+5');
            });
            it('should allow a fixed point format to be specified using f<decimal count>', function () {
                var res = fnum(123456, 'f2');
                expect(res).toBe('123456.00');
                res = fnum(123.456, 'f2');
                expect(res).toBe('123.46');
                res = fnum(123.456, 'f2');
                expect(res).toBe('123.46');
                res = fnum(123.456, 'f');
                expect(res).toBe('123.46');
            });
            it('should allow a general format to be specified using g<significant digits> which returns the most compact between fixed and scientific notation', function () {
                var fxd, exp, gen;

                fxd = fnum(123456, 'f2');
                exp = fnum(123456, 'e2');
                gen = fnum(123456, 'g2');
                expect(gen).toBe(exp);

                fxd = fnum(123456, 'f');
                exp = fnum(123456, 'e');
                gen = fnum(123456, 'g');
                expect(gen).toBe(fxd);
            });
            it('should allow a number format to be specified using n<decimal count> which returns the number with grouping separators', function () {
                var num = fnum(1234.5678, 'n3');
                expect(num).toBe('1,234.568');
                num = fnum(1234.5678, 'n');
                expect(num).toBe('1,234.57');
            });
            it('should allow a percentage format to be specified using p<decimal count> which multiples the number by 100 and appends a % sign', function () {
                var num = fnum(0.123456, 'p3');
                expect(num).toBe('12.346%');
                num = fnum(0.123456, 'p');
                expect(num).toBe('12.35%');
            });
            it('should allow a hexidecimal format to be specified using x<final length> converts the number to hexidecimal', function () {
                var num = fnum(510, 'x4');
                expect(num).toBe('01fe');
                num = fnum(510, 'X4');
                expect(num).toBe('01FE');
                num = fnum(510, 'x');
                expect(num).toBe('1fe');
                num = fnum(510, 'X');
                expect(num).toBe('1FE');
            });
        });

        describe('custom', function () {
            it('should replace "0" with either the digit, if it exists, or 0 if it does not', function () {
                var res = fnum(123, '0000000');
                expect(res).toBe('0000123');
                res = fnum(123.045, '000.0000');
                expect(res).toBe('123.0450');
            });
            it('should replace "#" with the digit if it exists, or nothing if it does not', function () {
                var res = fnum(123, '#######');
                expect(res).toBe('123');
                res = fnum(123.456, '###.####');
                expect(res).toBe('123.456');
                res = fnum(123.456, '0##.###');
                expect(res).toBe('123.456');
            });
            it('should use number grouping when a comma is defined anywhere except the last position of the integral or followed by only commans to the end of the integral', function () {
                var res = fnum(12345, '#,######');
                expect(res).toBe('12,345');
                res = fnum(12345, '##,#####');
                expect(res).toBe('12,345');
                res = fnum(12345, '##,#,####');
                expect(res).toBe('12,345');
                res = fnum(12345, '######,#');
                expect(res).toBe('12,345');
                res = fnum(123456, '######,#');
                expect(res).toBe('123,456');
                res = fnum(12345, '#######,');
                expect(res).not.toBe('12,345');
                res = fnum(12345, '#,##abc####');
                expect(res).toBe('1abc2,345');
            });
            it('should should mutltiply the number by 100 if a % sign (not preceded by \\) appears in the format string as well as printing the % as a literal', function () {
                var res = fnum(-123.45, '#%');
                expect(res).toBe('-12345%');
                res = fnum(12345, '#\\%');
                expect(res).toBe('12345%');
            });
            it('should should mutltiply the number by 1000 if a ‰ sign (not preceded by \\) appears in the format string as well as printing the % as a literal', function () {
                var res = fnum(12.345, '#‰');
                expect(res).toBe('12345‰');
                res = fnum(12345, '#\\‰');
                expect(res).toBe('12345‰');
            });
            it('should round the fraction to the last speified placeholder', function () {
                var res = fnum(123.4564, '###.###');
                expect(res).toBe('123.456');
                res = fnum(123.4565, '###.###');
                expect(res).toBe('123.457');
            });
            it('should include any non control characters as literals into the result', function () {
                var res = fnum(123456, '##-##-##');
                expect(res).toBe('12-34-56');
                res = fnum(123456, 'hello world');
                expect(res).toBe('hello world');
                res = fnum(123456, 'a6');
                expect(res).toBe('a6');
            });
            it('should allow a custom formatting for negative numbers by separating the 2 formats with a ";"', function () {
                var res = fnum(123456, 'pos;neg');
                expect(res).toBe('pos');
                res = fnum(-123456, 'pos;neg');
                expect(res).toBe('neg');
            });
            it('should allow a custom formatting for zero by adding a third section after the negative format (which may be left as 0 to use the positive)', function () {
                var res = fnum(123456, 'pos;neg;zero;');
                expect(res).toBe('pos');
                res = fnum(-123456, 'pos;neg;zero');
                expect(res).toBe('neg');
                res = fnum(0, 'pos;neg;zero');
                expect(res).toBe('zero');
                res = fnum(123456, 'pos;;zero;');
                expect(res).toBe('pos');
                res = fnum(-123456, 'pos;;zero;');
                expect(res).toBe('pos');
            });
        });
    });

}());
