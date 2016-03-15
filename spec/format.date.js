/** Holds the tests for date formatting. */
(function formatDateModuleTests() {

    describe('formatDate(num, fmt, locale)', function () {
        var fdate = require('../src/format.date.js'),
            dt;

        beforeEach(function () {
            dt = new Date(1987, 1, 3, 4, 5, 6, 987);
        });

        it('should be a function', function () {
            expect(fdate).toEqual(jasmine.any(Function));
        });

        describe('standard', function () {
            it('should allow a short date pattern to be applied using "d"', function () {
                var res = fdate(dt, 'd', 'us');
                expect(res).toBe('2/3/1987');
            });
            it('should allow a long date pattern to be applied using "D"', function () {
                var res = fdate(dt, 'D', 'us');
                expect(res).toBe('Tuesday, February 3, 1987');
            });
            it('should allow a full date with short time pattern to be applied using "f"', function () {
                var res = fdate(dt, 'f', 'us');
                expect(res).toBe('Tuesday, February 3, 1987, 4:05 AM');
            });
            it('should allow a full date with long time pattern to be applied using "F"', function () {
                var res = fdate(dt, 'F', 'us');
                expect(res).toBe('Tuesday, February 3, 1987, 4:05:06 AM');
            });
            it('should allow a general date with short time pattern to be applied using "g"', function () {
                var res = fdate(dt, 'g', 'us');
                expect(res).toBe('2/3/1987, 4:05 AM');
            });
            it('should allow a general date with long time pattern to be applied using "G"', function () {
                var res = fdate(dt, 'G', 'us');
                expect(res).toBe('2/3/1987, 4:05:06 AM');
            });
            it('should allow a month day pattern to be applied using "m" or "M"', function () {
                var res = fdate(dt, 'm', 'us');
                expect(res).toBe('February 3');
                res = fdate(dt, 'M', 'us');
                expect(res).toBe('February 3');
            });
            it('should allow a sortable date pattern to be applied using "s"', function () {
                var res = fdate(dt, 's', 'us');
                expect(res).toBe('1987-02-03T04:05:06');
            });
            it('should allow a short time pattern to be applied using "t"', function () {
                var res = fdate(dt, 't', 'us');
                expect(res).toBe('4:05 AM');
            });
            it('should allow a long time pattern to be applied using "T"', function () {
                var res = fdate(dt, 'T', 'us');
                expect(res).toBe('4:05:06 AM');
            });
            it('should allow an ISO format using "u"', function () {
                var res;
                dt = new Date(Date.UTC(1987, 1, 3, 4, 5, 6, 987));
                res = fdate(dt, 'u', 'us');
                expect(res).toBe('1987-02-03T04:05:06.987Z');
            });
            it('should allow a full date and time pattern to be applied using "U"', function () {
                var res = fdate(dt, 'U', 'us');
                expect(res).toBe('Tuesday, February 3, 1987, 4:05:06 AM');
            });
            it('should allow a year month pattern to be applied using "y" or "Y"', function () {
                var res = fdate(dt, 'y', 'us');
                expect(res).toBe('February 1987');
                res = fdate(dt, 'Y', 'us');
                expect(res).toBe('February 1987');
            });
        });

        describe('custom', function () {
            it('should replace "d" with the day of the month single digit', function () {
                var res = fdate(dt, '\\hello world!');
                expect(res).toBe('hello worl3!');
            });
            it('should replace "dd" with the day of the month double digit', function () {
                var res = fdate(dt, '\\hello worldd!');
                expect(res).toBe('hello worl03!');
            });
            it('should replace "ddd" with the abbrieviated name of the day of the week', function () {
                var res = fdate(dt, '----ddd----');
                expect(res).toBe('----Tue----');
            });
            it('should replace "dddd" with the full name of the day of the week', function () {
                var res = fdate(dt, '----dddd----');
                expect(res).toBe('----Tuesday----');
            });
            it('should replace "f" with the 10th of a second value', function () {
                var res = fdate(dt, '----f----');
                expect(res).toBe('----9----');
            });
            it('should replace "ff" with the 100th of a second value', function () {
                var res = fdate(dt, '----ff----');
                expect(res).toBe('----98----');
            });
            it('should replace "fff" with the 1000th of a second value', function () {
                var res = fdate(dt, '----fff----');
                expect(res).toBe('----987----');
            });
            it('should replace "F" with the 10th of a second value if non-zero', function () {
                var res = fdate(dt, '----F----');
                expect(res).toBe('----9----');
                dt = new Date(1987, 1, 3, 4, 5, 6, 87);
                res = fdate(dt, '----F----');
                expect(res).toBe('--------');
            });
            it('should replace "FF" with the 100th of a second value if non-zero', function () {
                var res = fdate(dt, '----FF----');
                expect(res).toBe('----98----');
                dt = new Date(1987, 1, 3, 4, 5, 6, 908);
                res = fdate(dt, '----FF----');
                expect(res).toBe('----9----');
                dt = new Date(1987, 1, 3, 4, 5, 6, 8);
                res = fdate(dt, '----FF----');
                expect(res).toBe('--------');
            });
            it('should replace "FFF" with the 1000th of a second value if non-zero', function () {
                var res = fdate(dt, '----FFF----');
                expect(res).toBe('----987----');
                dt = new Date(1987, 1, 3, 4, 5, 6, 980);
                res = fdate(dt, '----FFF----');
                expect(res).toBe('----98----');
            });
            it('should replace "h" with the single digit hour for a 12 hour clock', function () {
                var res = fdate(dt, '----h----');
                expect(res).toBe('----4----');
                dt = new Date(1987, 1, 3, 16, 5, 6, 980);
                res = fdate(dt, '----h----');
                expect(res).toBe('----4----');
            });
            it('should replace "hh" with the double digit hour for a 12 hour clock', function () {
                var res = fdate(dt, '----hh----');
                expect(res).toBe('----04----');
                dt = new Date(1987, 1, 3, 16, 5, 6, 980);
                res = fdate(dt, '----hh----');
                expect(res).toBe('----04----');
            });
            it('should replace "H" with the single digit hour for a 24 hour clock', function () {
                var res = fdate(dt, '----H----');
                expect(res).toBe('----4----');
                dt = new Date(1987, 1, 3, 16, 5, 6, 980);
                res = fdate(dt, '----H----');
                expect(res).toBe('----16----');
            });
            it('should replace "HH" with the double digit hour for a 24 hour clock', function () {
                var res = fdate(dt, '----HH----');
                expect(res).toBe('----04----');
                dt = new Date(1987, 1, 3, 16, 5, 6, 980);
                res = fdate(dt, '----HH----');
                expect(res).toBe('----16----');
            });
            it('should replace "m" with the single digit minute', function () {
                var res = fdate(dt, '----m----');
                expect(res).toBe('----5----');
            });
            it('should replace "mm" with the double digit minute', function () {
                var res = fdate(dt, '----mm----');
                expect(res).toBe('----05----');
            });
            it('should replace "M" with the single digit month', function () {
                var res = fdate(dt, '----M----');
                expect(res).toBe('----2----');
            });
            it('should replace "MM" with the double digit month', function () {
                var res = fdate(dt, '----MM----');
                expect(res).toBe('----02----');
            });
            it('should replace "MMM" with the abbreviated name of the month', function () {
                var res = fdate(dt, '----MMM----');
                expect(res).toBe('----Feb----');
            });
            it('should replace "MMMM" with the full name of the month', function () {
                var res = fdate(dt, '----MMMM----');
                expect(res).toBe('----February----');
            });
            it('should replace "s" with the single digit second', function () {
                var res = fdate(dt, '----s----');
                expect(res).toBe('----6----');
                dt = new Date(1987, 1, 3, 16, 5, 54, 980);
                res = fdate(dt, '----s----');
                expect(res).toBe('----54----');
            });
            it('should replace "ss" with the double digit second', function () {
                var res = fdate(dt, '----ss----');
                expect(res).toBe('----06----');
                dt = new Date(1987, 1, 3, 16, 5, 54, 980);
                res = fdate(dt, '----ss----');
                expect(res).toBe('----54----');
            });
            it('should replace "yy" with the double digit year', function () {
                var res = fdate(dt, '----yy----');
                expect(res).toBe('----87----');
                res = fdate(dt, '----yyy----');
                expect(res).toBe('----87y----');
                res = fdate(dt, '----y----');
                expect(res).toBe('----y----');
            });
            it('should replace "yyyy" with the quadruple digit year', function () {
                var res = fdate(dt, '----yyyy----');
                expect(res).toBe('----1987----');
            });
            it('should replace "z" with the single digit utc hours offset', function () {
                var res, tzo = (new Date()).getTimezoneOffset() * -1;
                tzo = String(Math.floor(tzo / 60));
                res = fdate(dt, '----z----');
                expect(res).toBe('----' + tzo + '----');
            });
            it('should replace "zz" with the double digit utc hours offset', function () {
                var res, tzo = (new Date()).getTimezoneOffset() * -1;
                tzo = String(Math.floor(tzo / 60));
                if (tzo[0] === '-' && tzo.length < 3) {
                    tzo = tzo[0] + '0' + tzo.substr(1);
                } else  if (tzo.length < 2) {
                    tzo = '0' + tzo;
                }
                res = fdate(dt, '----zz----');
                expect(res).toBe('----' + tzo + '----');
            });
            it('should replace "zzz" with the hours and minutes utc offset', function () {
                var res, min, neg, tzo = (new Date()).getTimezoneOffset() * -1;
                neg = tzo < 0;
                tzo = Math.abs(tzo);
                min = String(tzo % 60);
                if (min.length < 2) {
                    min = '0' + min;
                }
                tzo = String(Math.floor(tzo / 60));
                if (tzo.length < 2) {
                    tzo = '0' + tzo;
                }
                if (neg) {
                    tzo = '-' + tzo;
                }
                tzo = tzo + ':' + min;
                res = fdate(dt, '----zzz----');
                expect(res).toBe('----' + tzo + '----');
            });
        });
    });

}());
