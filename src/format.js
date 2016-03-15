/**
* Offers some basic string formatting.
* @param {object} module The module to export the function onto.
*/
(function formatModule(module) {
    'use strict';
    // Constants
    var REGEX_PLACEHOLDER = new RegExp('{\\s*(\\d+)\\s*(?:,\\s*' +
        '(-?\\d+))?(?:\\s*:\\s*(.*?))?\\s*}', 'g'),
        REGEX_DOUBLES = /(?:({){|(})})/g,
        REGEX_JSON = /^json(\d*)$/i,
    // Dependencies
        typeOf = require('./typeof.js'),
        formatters = {},
        oformat;

    // Expose the format function
    module.exports = format;

    // Attach the ancillary functions
    module.exports.locale = localeFormat;
    module.exports.register = register;
    module.exports.deregister = deregister;
    module.exports.formattersAdd = formattersAdd;
    module.exports.formattersRemove = formattersRemove;
    module.exports.formattersList = formattersList;

    // Add the built in formatters
    formattersAdd('number', require('./format.number.js'));
    formattersAdd('date', require('./format.date.js'));

    /**
    * Formats a string with positional arguments. See localeFormat for details.
    */
    function format() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(undefined);
        return localeFormat.apply(null, args);
    }

    /**
    * Formats a string with positional arguments. The positional arguments come
    *   after the string argument.
    * @param {object} locale Optional object containing a single property
    *   "locale" to pass to the system locale functions in order to localize
    *   the formatted values.
    * @param {string} str The string to format.
    */
    function localeFormat(locale, str) {
        var args = Array.prototype.slice.call(arguments, 2);
        str = str.replace(REGEX_PLACEHOLDER, processPlaceholder);

        // Replace any escaped placdeholders
        str = str.replace(REGEX_DOUBLES, '$1$2');

        return str;

        /**
        * Processes the placeholder that was found in the string
        * @param {string} match The total match found
        * @param {number} idx The placeholder idx
        * @param {number} aln The alignment value.
        * @param {string} fmt The format string.
        * @param {number} offset The position in the string the match
        *   occured at.
        * @returns The replacement string.
        */
        function processPlaceholder(match, idx, aln, fmt, offset) {
            var val, odd = false, pos = offset - 1;
            while (str[pos] === '{') {
                odd = !odd;
                pos--;
            }
            if (odd) {
                return match;
            }
            idx = parseInt(idx, 10);
            aln = parseInt(aln, 10);
            val = args[idx];
            if (val === undefined) {
                val = '';
            }
            val = formatValue(val, fmt, locale);
            if (!isNaN(aln)) {
                val = align(aln, val);
            }
            return val;
        }
    }

    /**
    * Used as the function to bind to string.prototype the pass off to the
    *  format function.
    */
    function boundFormat() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this); // jshint ignore:line
        return format.apply(null, args);
    }

    /**
    * Attaches the format function to String.prototype so it can be more easily
    *   utilised.
    */
    function register() {
        if (String.prototype.format !== boundFormat) {
            oformat = String.prototype.format;
            String.prototype.format = boundFormat;
        }
    }

    /**
    * Removes the format property from String.prototype and restores the value
    *   defined when the format function was attached by the register function.
    */
    function deregister() {
        if (String.prototype.format === boundFormat) {
            String.prototype.format = oformat;
            oformat = undefined;
        }
    }

    /**
    * Adds a formatter to the formatters collection.
    * @param {string} type The type the formatter is designed to handle.
    * @param {function} handler The function used to handle the formatting.
    */
    function formattersAdd(type, handler) {
        if (typeof handler === 'function') {
            formatters[type] = handler;
        } else {
            throw new Error('supplied handler MUST be a function');
        }
    }

    /**
    * Removes a formatter from the formatters collection.
    * @param {string} type The type the formatter is assigned to.
    * @returns {function} The removed formatter.
    */
    function formattersRemove(type) {
        var res = formatters[type];
        delete formatters[type];
        return res;
    }

    /** Returns an array of objects containing name and formatter properties */
    function formattersList() {
        return Object.keys(formatters)
            .map(fmtObj);

        /**
        * Returns an object containing a name and formatter pair.
        * @param {string} name The name of the formatter.
        * @returns {object} An object containing the formatter name and handler
        *   function.
        */
        function fmtObj(name) {
            return {
                name: name,
                formatter: formatters[name]
            };
        }
    }

    /**
    * Pads a string by the number of characters specified in the direction
    *   defined by whether the specified number if negative (left aligned)
    *   or positive (right aligned)
    * @param {number} len The minimum length of the string.
    * @param {string} text The text to align
    */
    function align(len, text) {
        var direc = len < 0 ?
            true :
            false;
        len = Math.abs(len);
        if (text.length < len) {
            len = len - text.length + 1;
            text = [text];
            while (text.length < len) {
                if (direc) {
                    text.unshift(' ');
                } else {
                    text.push(' ');
                }
            }
            text = text.join('');
        }
        return text;
    }

    /**
    * Formats the given value with the supplied format string.
    * @param value The value to format.
    * @param fmt The format value.
    * @param locale The locale to use when printing the value
    * @returns The formatted value
    */
    function formatValue(value, fmt, locale) {
        var fmtr, vt = typeOf(value);

        // Handle special js types (and empty)
        switch (fmt) {
            case '%i':
            case '%d':
                value = parseInt(value, 10);
                return String(value);
            case '%f':
                value = parseFloat(value);
                return String(value);
            case '%o':
            case '%O':
                return formatJson(value, 4);
            case '%s':
            case '':
                return String(value);
            default:
                break;
        }

        // Json applies to all types (As do the above)
        if (REGEX_JSON.test(fmt)) {
            return formatJson(value, fmt);
        }

        // Check for custom formatters to handle the type
        for (fmtr in formatters) {
            if (formatters.hasOwnProperty(fmtr)) {
                if (fmtr === vt) {
                    return formatters[fmtr](value, fmt, locale);
                }
            }
        }

        // Default to string
        return String(value);
    }

    /**
    * Converts avalue into its json format
    * @param value The object to format.
    * @param {number} tsize The tab size to pass to JSON.stringify
    */
    function formatJson(value, tsize) {
        var match;
        if (typeof tsize === 'string') {
            match = REGEX_JSON.exec(tsize);
            if (match && match[1]) {
                tsize = parseInt(match[1], 10);
            } else {
                throw new Error('Invalid format string received "' +
                    tsize + '"');
            }
        }

        if (typeof tsize === 'string' || isNaN(tsize)) {
            tsize = undefined;
        }
        return JSON.stringify(value, undefined, tsize);
    }
}(module, global.console));
