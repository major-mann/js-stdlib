/**
* Holds the number formatting code for the format module.
* @param {object} module The module to attach exports to.
* @param {object} console The logging console to report development warnings.
* @param {object} Intl The internationalization global.
*/
(function formatNumberModule(module, console, Intl) {
    'use strict';

    // Constants
    var REGEX_NUMBER_CURRENCY = new RegExp('^c(\\d*)(?:\\:([a-z]{3}))' +
        '(?:\\:(symbol|code|name))?$', 'i'),
        REGEX_NUMBER_PRECISION = /^([a-z])(\d*)$/i,
        CUSTOM_FORMAT_SECTIONS = ['positive', 'negative', 'zero'];

    // Public API
    module.exports = formatNumber;

    /**
    * Formats the given number according to the supplied format string.
    * Formating closely follows .NET string formatting as seen at
    *   Standard formatting
    *       https://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx
    *   Custom formatting
    *       https://msdn.microsoft.com/en-us/library/0c899ak8(v=vs.110).aspx
    * The following major differences exist
    *   * Currency "c" requires a currency code to be specified in addition
    *       to any locale, and may also take an additional parameter determining
    *       how to display the currency.
    *       c<decimal places>:<3 digit currency code>[:<symbol|code|name>]
    * @param {number} num The number to format
    * @param {string} fmt The format string that determines how to display the
    *   value.
    * @param {string} locale The locale to use when formatting the number
    *   output.
    */
    function formatNumber(num, fmt, locale) {
        var match, precision;
        match = /^c(\d*)(\:[a-z]{3})?(\:(?:symbol|code|name))?$/i;
        /*jshint -W084 */
        if (match = REGEX_NUMBER_CURRENCY.exec(fmt)) {
            precision = parseInt(match[1], 10);
            return formatCurrency(precision, match[2], match[3]);
        } else if (match = REGEX_NUMBER_PRECISION.exec(fmt)) {
            /*jshint +W084 */
            precision = parseInt(match[2], 10);
            switch (match[1].toLowerCase()) {
                case 'd':
                    return formatDecimal(precision);
                case 'e':
                    return formatScientific(precision);
                case 'f':
                    return formatFixedPoint(precision);
                case 'g':
                    return formatGeneral(precision);
                case 'n':
                    return formatNumeric(precision);
                case 'p':
                    return formatPercent(precision);
                case 'x':
                    return formatHex(match[1], precision);
                default:
                    return formatCustom();
            }
        } else {
            return formatCustom();
        }

        /**
        * Performs a currency format of the value. The following currency forms
        *   are accepted.
        * C[<Decimal digits>][:<Currency code>][:<symbol|code|name>]
        * @param {number} precision The number of decimal places.
        * @param {string} code The currency code.
        * @param {string} display The display method to use for the currency.
        *   Can be symbol, code or name.
        */
        function formatCurrency(precision, code, display) {
            var opts;
            if (isNaN(precision)) {
                precision = 2;
            }
            opts = {
                style: 'currency',
                currency: code,
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: false
            };
            if (display) {
                opts.currencyDisplay = display;
            }
            return numFormat(num, opts);
        }

        /**
        * Performs decimal formatting.
        * @param {number} precision The shortest length of the
        *   number (0 padded).
        */
        function formatDecimal(precision) {
            var val = String(Math.floor(num)),
                len;
            if (!isNaN(precision)) {
                len = precision;
                val = zeroPad(len, val);
            }
            return val;
        }

        /**
        * Formats the value in scientific notation.
        * @param {number} precision The number of decimal places.
        */
        function formatScientific(precision) {
            var res;
            if (isNaN(precision)) {
                res = num.toExponential();
            } else {
                res = num.toExponential(precision);
            }
            res = localizeNum(res);
            return res;
        }

        /**
        * Formats the number in fixed point.
        * @param {number} precision The number of decimal places.
        */
        function formatFixedPoint(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: false
            });
        }

        /**
        * The most compact of fixed point or scientific.
        * @param {number} precision The number of decimal places.
        */
        function formatGeneral(precision) {
            var fp, sn;
            fp = formatFixedPoint(precision);
            sn = formatScientific(precision);
            if (sn.length < fp.length) {
                return sn;
            } else {
                return fp;
            }
        }

        /**
        * Performs numeric formatting
        * @param {number} precision The number of decimal places.
        */
        function formatNumeric(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: true
            });
        }

        /**
        * Formats the number as a percentage value.
        * @param {number} precision The number of decimal places.
        */
        function formatPercent(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                style: 'percent',
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: true
            });
        }

        /**
        * Formats the number as a hexidecimal value.
        * @param {string} command The command (x or X).
        * @param {number} precision The shortest length of the resulting string.
        */
        function formatHex(command, precision) {
            var val = num.toString(16);
            if (!isNaN(precision)) {
                val = zeroPad(precision, val);
            }
            if (command === 'x') {
                val = val.toLowerCase();
            } else { // If command === 'X'
                val = val.toUpperCase();
            }
            return val;
        }

        /**
        * Ensures the supplied number is correct for the specified locale.
        * @param {number} num The number to localize.
        * @returns {string} The localized number.
        */
        function localizeNum(num) {
            var dseps, seps;
            num = String(num);
            if (locale) {
                dseps = separators();
                seps = separators(locale);
                if (dseps.decimal !== seps.decimal) {
                    num = num.replace(/[,.]/g, swap);
                }
            }
            return num;

            /**
            * Swaps comma for dot and vica versa.
            * @param {string} val The value to swap.
            */
            function swap(val) {
                return val === '.' ?
                    ',' :
                    '.';
            }
        }

        /** Performs custom processing on the number */
        function formatCustom() {
            var tokens, data, seps, res;

            // Get the separators for localization.
            seps = separators(locale);

            // Tokenize the format string
            tokens = tokenize();

            // Generate the data used to process from the tokens
            data = generateFormatData(tokens);

            // Process the format data to generate the output.
            res = processData(data);

            return res;

            /**
            * Processes the given format data with the supplied number.
            * @param {object} data The format data as generated by
            *   generateFormatData.
            */
            function processData(data) {
                var int, intNum, frac, fracNum, dpos, neg;

                // Apply adjustments
                neg = num < 0;
                num = Math.abs(num);

                if (num === 0) {
                    num = num * data.zero.multiplier / data.zero.divisor;
                } else if (neg) {
                    num = num * data.negative.multiplier /
                        data.negative.divisor;
                } else {
                    num = num * data.positive.multiplier /
                        data.positive.divisor;
                }

                fracNum = Math.abs(num) - Math.floor(Math.abs(num));
                intNum = num - fracNum;
                int = String(intNum);

                if (num === 0) {
                    int = processIntPart(data.zero);
                    frac = processFracPart(data.zero);
                } else if (neg) {
                    int = processIntPart(data.negative);
                    frac = processFracPart(data.negative);
                } else {
                    int = processIntPart(data.positive);
                    frac = processFracPart(data.positive);
                }

                if (frac === false) {
                    // This means we have rounded to zero, and need to change
                    //  format
                    return processData(data);
                } else if (frac) {
                    return int + seps.decimal + frac;
                } else {
                    return int;
                }

                /**
                * Processes the integral part of the data.
                * @param {object} fmt The format object.
                */
                function processIntPart(fmt) {
                    var i, cnt;

                    // First try to normalize and balance the format
                    //  and number
                    cnt = normalizePlaceholders();

                    // If we need to group, add the group separators into
                    //  the format as literals.
                    if (fmt.group) {
                        addGroupLiterals(cnt);
                    }

                    // If we have a negative number, add it at the start of the
                    //  integral part as a literal.
                    if (neg && cnt) {
                        fmt.integral.unshift({
                            type: 'literal',
                            value: '-'
                        });
                    }

                    // Go through and replace the placeholders.
                    dpos = 0;
                    for (i = 0; i < fmt.integral.length; i++) {
                        if (fmt.integral[i].type === 'placeholder') {
                            fmt.integral[i].type = 'literal';
                            fmt.integral[i].value = int[dpos];
                            dpos++;
                        /* istanbul ignore if */
                        } else if (fmt.integral[i].type !== 'literal') {
                            // If this happens it is a dev error.
                            throw new Error('Should not have tokens of type "' +
                                fmt.integral[i].type + '"' + ' at this point!');
                        }
                    }
                    return fmt.integral.map(value).join('');

                    /**
                    * Adds comma litrals to the format parts.
                    * @param {number} phcnt The total number of placeholders.
                    */
                    function addGroupLiterals(phcnt) {
                        var pos = 0, i;
                        for (i = fmt.integral.length - 1; i >= 0; i--) {
                            if (fmt.integral[i].type === 'placeholder') {
                                pos++;
                                if (pos < phcnt && pos > 0 && pos % 3 === 0) {
                                    fmt.integral.splice(i, 0, {
                                        type: 'literal',
                                        value: seps.separator
                                    });
                                }
                            }
                        }
                    }

                    /**
                    * Replaces "#" appearing after "0" with "0", and ensures the
                    *   placeholder count matches the int digit count.
                    */
                    function normalizePlaceholders() {
                        var i, integ, has0, cnt, first;
                        cnt = 0;
                        for (i = 0; i < fmt.integral.length; i++) {
                            integ = fmt.integral[i];
                            if (integ.type === 'placeholder') {
                                cnt++;
                                if (first === undefined) {
                                    first = i;
                                }
                                if (integ.value === '0') {
                                    has0 = true;
                                } else if (integ.value === '#' && has0) {
                                    integ.value = '0';
                                }
                            }
                        }
                        if (first === undefined) {
                            first = 0;
                        }

                        // Add additional place holders with the first
                        //  until we have the same number of placeholders
                        //  as digits
                        while (cnt > 0 && cnt < int.length) {
                            fmt.integral.splice(first, 0, {
                                type: 'placeholder',
                                value: '#'
                            });
                            cnt++;
                        }

                        // We assume we have a first which points to a
                        //  placeholder (since cnt MUST be bigger than 0)
                        while (int.length < cnt) {
                            if (fmt.integral[first].value === '#') {
                                fmt.integral.splice(first, 1);
                                first = findFirstPlaceholder();
                                cnt--;
                            } else {
                                int = '0' + int;
                            }
                        }

                        return cnt;

                        /** Find the first placeholder */
                        function findFirstPlaceholder() {
                            var i;
                            for (i = 0; i < fmt.integral.length; i++) {
                                if (fmt.integral[i].type === 'placeholder') {
                                    return i;
                                }
                            }
                            return -1;
                        }
                    }
                }

                /**
                * Processes the fraction part
                * @param {object} fmt The format object.
                */
                function processFracPart(fmt) {
                    var mult, was0, frac, pholders, idx, flag;
                    if (!fmt.fraction.length) {
                        return '';
                    }
                    pholders = fmt.fraction.filter(isPlaceholder);
                    mult = Math.pow(10, pholders.length);
                    was0 = fracNum === 0;
                    fracNum = fracNum * mult;
                    fracNum = Math.round(fracNum);
                    if (!was0 && fracNum === 0 && intNum === 0) {
                        return false;
                    }
                    frac = String(fracNum);

                    // Ensure everything is in order.
                    normalizePlaceholders();

                    // Since we made the fraction an integer, we may have lost
                    //  significant 0s... put them back.
                    frac = zeroPad(pholders.length, frac);

                    // Remove any zeros from the end of frac, as well as #
                    //  placeholders that are not required (will not result in
                    //  any value being printed).
                    frac = frac.split('');
                    flag = true;
                    while (frac.length) {
                        if (flag && frac[frac.length - 1] === '0' &&
                            pholders[pholders.length - 1].value === '#') {
                            idx = fmt.fraction.indexOf(
                                pholders[pholders.length - 1]
                            );
                            fmt.fraction.splice(idx, 1);
                        } else {
                            flag = false;
                            pholders[pholders.length - 1].type = 'literal';
                            pholders[pholders.length - 1].value =
                                frac[frac.length - 1];
                        }
                        frac.pop();
                        pholders.pop();
                    }
                    return fmt.fraction.map(value).join('');

                    /** Ensures that all placeholders before the last 0 are 0 */
                    function normalizePlaceholders() {
                        var i, found;
                        for (i = fmt.fraction.length - 1; i >= 0; i--) {
                            if (fmt.fraction[i].type === 'placeholder') {
                                if (found) {
                                    fmt.fraction[i].value = '0';
                                } else if (fmt.fraction[i].value === '0') {
                                    found = true;
                                }
                            }
                        }
                    }
                }

                /**
                * Returns the value part of the supplied token.
                * @param {object} token The token to retrieve the value from.
                * @returns The token value.
                */
                function value(token) {
                    return token.value;
                }

                /**
                * Returns true if this is a placeholder.
                * @param {object} token The token to check.
                */
                function isPlaceholder(token) {
                    return token.type === 'placeholder';
                }
            }

            /**
            * Generates the format data from the supplied tokens.
            * @param {array} tokens The tokens to be used to generate the format
            *   data.
            */
            function generateFormatData(tokens) {
                var i, sec, res, skip, pattern, curr;
                curr = 'positive';
                res = {
                    positive: createSection()
                };
                sec = 0;
                pattern = res[curr].integral;
                for (i = 0; i < tokens.length; i++) {
                    if (skip) {
                        skip = false;
                        continue;
                    }
                    switch (tokens[i].type) {
                        case 'section':
                            sec++;
                            if (sec > 2) {
                                // Stop processing.
                                break;
                            }
                            if (tokens[i + 1] &&
                                tokens[i + 1].type === 'section') {
                                // We leave the section out if it is empty.
                                continue;
                            } else {
                                curr = CUSTOM_FORMAT_SECTIONS[sec];
                                res[curr] = createSection();
                                pattern = res[curr].integral;
                            }
                            break;
                        case 'skip':
                            skip = true;
                            // Add next as literal...
                            if (tokens[i + 1]) {
                                pattern.push({
                                    type: 'literal',
                                    value: tokens[i + 1].value
                                });
                            }
                            break;
                        case 'literal':
                            pattern.push(tokens[i]);
                            break;
                        case 'placeholder':
                            pattern.push(tokens[i]);
                            break;
                        case 'decimal':
                            pattern = res[curr].fraction;
                            break;
                        case 'divisor':
                            if (res[curr].divisor === 0) {
                                res[curr].divisor =
                                    Math.pow(10, tokens[i].value.length);
                            }
                            break;
                        case 'group':
                            res[curr].group = true;
                            break;
                        case 'adjust':
                            /* istanbul ignore else */
                            if (tokens[i].value === '%') {
                                if (res[curr].multiplier === 0) {
                                    res[curr].multiplier = 100;
                                }
                            } else if (tokens[i].value === '‰') {
                                if (res[curr].multiplier === 0) {
                                    res[curr].multiplier = 1000;
                                }
                            } else {
                                throw new Error('Unrecognized adjustment ' +
                                    'value "' + tokens[i].type + '"');
                            }
                            pattern.push({
                                type: 'literal',
                                value: tokens[i].value
                            });
                            break;
                    }
                }

                if (!res.negative) {
                    res.negative = res.positive;
                }
                if (!res.zero) {
                    res.zero = res.positive;
                }

                postProcess('positive');
                postProcess('negative');
                postProcess('zero');
                return res;

                /**
                * Flattens literals, and ensures valid divisor and multiplier
                *   values.
                * @param {string} curr The current section being processed.
                */
                function postProcess(curr) {
                    var i;
                    if (res[curr].divisor === 0) {
                        res[curr].divisor = 1;
                    }
                    if (res[curr].multiplier === 0) {
                        res[curr].multiplier = 1;
                    }
                    for (i = 1; i < res[curr].integral.length; i++) {
                        if (res[curr].integral[i].type === 'literal' &&
                            res[curr].integral[i - 1].type === 'literal') {
                            // Combine the 2 literals
                            res[curr].integral[i - 1].value +=
                                res[curr].integral[i].value;
                            res[curr].integral.splice(i, 1);
                            i--;
                        }
                    }
                    for (i = 1; i < res[curr].fraction.length; i++) {
                        if (res[curr].fraction[i].type === 'literal' &&
                            res[curr].fraction[i - 1].type === 'literal') {
                            // Combine the 2 literals
                            res[curr].fraction[i - 1].value +=
                                res[curr].fraction[i].value;
                            res[curr].fraction.splice(i, 1);
                            i--;
                        }
                    }
                }

                /** Creates a new section */
                function createSection() {
                    return {
                        group: false,
                        divisor: 0,
                        multiplier: 0,
                        integral: [],
                        fraction: []
                    };
                }
            }

            /**
            * Tokenizes the custom format string to make it easier to work with.
            */
            function tokenize() {
                var i, res, char, divisor, divisorStop, lit, litStop, prev,
                    token;

                res = [];
                divisor = '';
                lit = '';
                for (i = 0; i < fmt.length; i++) {
                    token = undefined;
                    divisorStop = true;
                    litStop = true;
                    char = fmt.charAt(i);
                    switch (char) {
                        case '\\':
                            token = {
                                type: 'skip',
                                value: '\\'
                            };
                            break;
                        case '0':
                            token = {
                                type: 'placeholder',
                                value: '0'
                            };
                            break;
                        case '#':
                            token = {
                                type: 'placeholder',
                                value: '#'
                            };
                            break;
                        case '.':
                            token = {
                                type: 'decimal',
                                value: '.'
                            };
                            break;
                        case ',':
                            divisor += ',';
                            divisorStop = false;
                            break;
                        case '%':
                            token = {
                                type: 'adjust',
                                value: '%'
                            };
                            break;
                        case '‰':
                            token = {
                                type: 'adjust',
                                value: '‰'
                            };
                            break;
                        case ';':
                            token = {
                                type: 'section'
                            };
                            break;
                        default:
                            lit += char;
                            litStop = false;
                            break;
                    }

                    if (divisorStop && divisor) {
                        endDivisor(token);
                    }
                    if (lit && litStop) {
                        endLit();
                    }
                    if (token) {
                        res.push(token);
                    }
                    prev = char;
                }

                if (divisor) {
                    endDivisor();
                }

                if (lit) {
                    endLit();
                }

                return res;

                /**
                * Ends the divisor capture which may result in a divisor,
                *   or a group
                * @param {object} token The token to check.
                */
                function endDivisor(token) {
                    if (!token || token.type === 'decimal') {
                        res.push({
                            type: 'divisor',
                            value: divisor
                        });
                    } else {
                        res.push({
                            type: 'group',
                            value: ','
                        });
                    }
                    divisor = '';
                }

                /** Ends a literal capture */
                function endLit() {
                    res.push({
                        type: 'literal',
                        value: lit
                    });
                    lit = '';
                }
            }
        }

        /**
        * Performs locale senstive number conversions
        * @param {number} num The number to format.
        * @param {object} options The options to pass to the formatter.
        */
        function numFormat(num, options) {
            return new Intl.NumberFormat(locale, options).format(num);
        }

        /**
        * Zero pads the supplied value until it is the specified length.
        * @param {number} len The desired final length of the string.
        * @param {string} val The value to attempt to pad.
        * @returns The padded value.
        */
        function zeroPad(len, val) {
            var pfx = '';
            if (val[0] === '-') {
                pfx = '-';
                val = val.substr(1);
            }
            while (val.length < len) {
                val = '0' + val;
            }
            return pfx + val;
        }

        /**
        * Returns the decimal and grouping info for the locale.
        * @param {string} locale Optional locale to check. If not supplied,
        *   the default locale is used.
        */
        function separators(locale) {
            var str, cidx, didx, dec, grp;
            str = 1111111.111;
            str = str.toLocaleString(locale);
            cidx = str.indexOf(',');
            didx = str.indexOf('.');
            if (didx < cidx) {
                dec = ',';
                grp = '.';
            } else {
                dec = '.';
                grp = ',';
            }
            return {
                decimal: dec,
                separator: grp
            };
        }
    }
}(module, global.console, global.Intl));
