/**
* Holds the date formatting code for the format module.
* @param {object} module The module to attach exports to.
* @param {object} Intl The javascript internationalization object.
*/
(function formatDateModule(module, Intl) {
    'use strict';

    // Expose the format function
    module.exports = formatDate;

    /**
    * Formats the date
    * @param {Date} date The date to format.
    * @param {string} fmt The format string.
    * @param {string} locale Optional locale to use when formatting the date.
    *   When not supplied, the default system locale will be used.
    */
    function formatDate(date, fmt, locale) {
        switch (fmt) {
            case 'd':
                return short();
            case 'D':
                return long();
            case 'f':
                return fullShort();
            case 'F':
                return fullLong();
            case 'g':
                return generalShort();
            case 'G':
                return generalLong();
            case 'm':
            case 'M':
                return monthDay();
            case 's':
                return sortableDateTime();
            case 'u':
                return sortableISO();
            case 'U':
                return universal();
            case 't':
                return timeShort();
            case 'T':
                return timeLong();
            case 'y':
            case 'Y':
                return yearMonth();
            default:
                return formatCustom(fmt);
        }

        /** Formats the date for the "d" specifier */
        function short() {
            return date.toLocaleDateString(locale);
        }

        /** Formats the date for the "D" specifier */
        function long() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        }

        /** Formats the date for the "f" specifier */
        function fullShort() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "F" specifier */
        function fullLong() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "g" specifier */
        function generalShort() {
            return doFormat(date, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "G" specifier */
        function generalLong() {
            return doFormat(date, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "G" specifier */
        function monthDay() {
            return doFormat(date, {
                month: 'long',
                day: 'numeric'
            });
        }

        /** Formats the date for the "s" specifier */
        function sortableDateTime() {
            return formatCustom('yyyy-MM-ddTHH:mm:ss');
        }

        /** Formats the date for the "u" specifier */
        function sortableISO() {
            return date.toISOString();
        }

        /** Formats the date for the "U" specifier */
        function universal() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "t" specifier */
        function timeShort() {
            return doFormat(date, {
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "T" specifier */
        function timeLong() {
            return doFormat(date, {
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "y" specifier */
        function yearMonth() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long'
            });
        }

        /**
        * Performs custom formatting
        * @param {string} fmt The format string.
        */
        function formatCustom(fmt) {
            var pos, sub, tmp, skip, res, timemin1d, timemin2d, timesec1d,
                timesec2d, timems1d, timems2d, timems3d, dayFull, dayAbr,
                monthAbbr, monthFull, date1d, date2d, month1d, month2d, year2d,
                year4d, tzhour1d, tzhour2d, tzhourmin;
            timemin1d = new Intl.DateTimeFormat(locale, { minute: 'numeric' });
            timemin2d = { format: patch({ minute: '2-digit' }) };
            timesec1d = new Intl.DateTimeFormat(locale, { second: 'numeric' });
            timesec2d = { format: patch({ second: '2-digit' }) };
            timems1d = { format: msFetch.bind(null, 1) };
            timems2d = { format: msFetch.bind(null, 2) };
            timems3d = { format: msFetch.bind(null, 3) };
            dayFull = new Intl.DateTimeFormat(locale, { weekday: 'long' });
            dayAbr = new Intl.DateTimeFormat(locale, { weekday: 'short' });
            date1d = new Intl.DateTimeFormat(locale, { day: 'numeric' });
            date2d = new Intl.DateTimeFormat(locale, { day: '2-digit' });
            month1d = new Intl.DateTimeFormat(locale, { month: 'numeric' });
            month2d = new Intl.DateTimeFormat(locale, { month: '2-digit' });
            monthAbbr = new Intl.DateTimeFormat(locale, { month: 'short' });
            monthFull = new Intl.DateTimeFormat(locale, { month: 'long' });
            year2d = new Intl.DateTimeFormat(locale, { year: '2-digit' });
            year4d = new Intl.DateTimeFormat(locale, { year: 'numeric' });
            tzhour1d = { format: tzFetch.bind(null, 'z') };
            tzhour2d = { format: tzFetch.bind(null, 'zz') };
            tzhourmin = { format: tzFetch.bind(null, 'zzz') };

            res = [];
            for (pos = 0; pos < fmt.length; pos++) {
                if (skip) {
                    skip = false;
                    res.push(fmt[pos]);
                    continue;
                }
                switch (fmt[pos]) {
                    case '\\':
                        skip = true;
                        break;
                    case 'h':
                        sub = readBlock(2);
                        tmp = String(date.getHours() % 12);
                        if (sub.length === 1) {
                            res.push(tmp);
                        } else {
                            tmp = zeroPad(2, tmp);
                            res.push(tmp);
                        }
                        break;
                    case 'H':
                        sub = readBlock(2);
                        tmp = String(date.getHours());
                        if (sub.length === 1) {
                            res.push(tmp);
                        } else {
                            tmp = zeroPad(2, tmp);
                            res.push(tmp);
                        }
                        break;
                    case 'm':
                        sub = readBlock(2);
                        if (sub.length === 1) {
                            res.push(timemin1d.format(date));
                        } else {
                            res.push(timemin2d.format(date));
                        }
                        break;
                    case 's':
                        sub = readBlock(2);
                        if (sub.length === 1) {
                            res.push(timesec1d.format(date));
                        } else {
                            res.push(timesec2d.format(date));
                        }
                        break;
                    case 'f':
                        sub = readBlock(3);
                        if (sub.length === 1) {
                            res.push(timems1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(timems2d.format(date));
                        } else {
                            res.push(timems3d.format(date));
                        }
                        break;
                    case 'F':
                        sub = readBlock(3);
                        tmp = date.getMilliseconds();
                        tmp = String(tmp);
                        tmp = zeroPad(3, tmp);
                        tmp = tmp.split('');
                        while (tmp.length > sub.length) {
                            tmp.pop();
                        }
                        while (tmp[tmp.length - 1] === '0') {
                            tmp.pop();
                        }
                        res.push(tmp.join(''));
                        break;
                    case 'd':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push(date1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(date2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(dayAbr.format(date));
                        } else {
                            res.push(dayFull.format(date));
                        }
                        break;
                    case 'M':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push(month1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(month2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(monthAbbr.format(date));
                        } else {
                            res.push(monthFull.format(date));
                        }
                        break;
                    case 'y':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push('y');
                        } else if (sub.length === 2) {
                            res.push(year2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(year2d.format(date));
                            res.push('y');
                        } else {
                            res.push(year4d.format(date));
                        }
                        break;
                    case 'z':
                        sub = readBlock(3);
                        if (sub.length === 1) {
                            res.push(tzhour1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(tzhour2d.format(date));
                        } else {
                            res.push(tzhourmin.format(date));
                        }
                        break;
                    default:
                        res.push(fmt[pos]);
                        break;
                }
            }

            return res.join('');

            /**
            * Reads a block off the stream. The max is the maximum number of
            *   repeated characters that may appear in a block.
            * @param {number} max The maximum number of characters the block can
            *   contain.
            */
            function readBlock(max) {
                var start = fmt[pos],
                    res = start;
                while (fmt[pos + 1] === start && res.length < max) {
                    res += start;
                    pos++;
                }
                return res;
            }
        }

        /**
        * Performs an Intl format.
        * @param {date} date The date to format.
        * @param {object} args The arguments to pass to the formatter.
        * @returns {string} The value from the date as formatted by the
        *   date time formatter.
        */
        function doFormat(date, args) {
            var formatter = new Intl.DateTimeFormat(locale, args);
            return formatter.format(date);
        }

        /**
        * Fixes the fact that sometimes the 2-digit seems to return a single
        *   digit.
        * @param {object} args The format args to pass to the formatter.
        * @returns {function} A function which can be executes to format
        *   the date and lengthen the return.
        */
        function patch(args) {
            var formatter = new Intl.DateTimeFormat(locale, args);
            // Not sure why this returns a single digit...
            //  easy enough to work around.
            return ensure2;

            /**
            * Formats the date, and ensures the return is at least 2 characters
            *   long.
            */
            function ensure2() {
                var res = formatter.format(date);
                if (res.length < 2) {
                    return '0' + res;
                } else {
                    return res;
                }
            }
        }

        /**
        * Gets the ms as a string of lenght size.
        * @param {number} size The number of digits to get from the
        *   milliseconds.
        * @param {date} dt The date to get the milliseconds from.
        * @returns {string} The milliseconds as a string.
        */
        function msFetch(size, dt) {
            var ms = String(dt.getMilliseconds());
            ms = zeroPad(3, ms);
            return ms.substr(0, size);
        }

        /**
        * Fetches the timezone value.
        * @param {string} type The return form identifier. Can be "z" for the
        *   single digit hour, "zz" for the double digit hour or "zzz" for the
        *   hours and minutes.
        * @param {date} dt The date to get the timezone offset for.
        */
        function tzFetch(type, dt) {
            var tzo = dt.getTimezoneOffset() * -1,
                h = Math.floor(tzo / 60),
                m = tzo % 60;
            /* istanbul ignore else */
            if (type === 'z') {
                return String(h);
            } else if (type === 'zz') {
                return zeroPad(2, String(h));
            } else if (type === 'zzz') {
                return zeroPad(2, String(h)) + ':' + zeroPad(2, String(m));
            }
        }

        /**
        * Adds zeros to the front of the string.
        * @param {number} len The desired total length of the string.
        * @param {string} val The string to pad with zeros.
        * @returns val zero padded if it was less than len.
        */
        function zeroPad(len, val) {
            var neg = val[0] === '-';
            if (neg) {
                val = val.substr(1);
            }
            while (val.length < len) {
                val = '0' + val;
            }
            if (neg) {
                val = '-' + val;
            }
            return val;
        }
    }
}(module, global.Intl));
