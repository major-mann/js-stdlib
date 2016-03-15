/**
* Defines the copy function which can be used to create a shallow copy of an
*   object.
* @param {object} module The module to export the copy function onto.
*/
(function copyModule(module) {
    'use strict';
    // Constants
    var SRC_FUNCTION_DYNAMIC =
            'var res = function {0}({1}) {{' +
                'if (this instanceof {0}) {{' +
                    'return create(ex, arguments);' +
                '}} else {{' +
                    'return ex.apply(this, arguments);' +
                '}}' +
            '}};' +
            'res.toString = ex.toString;' +
            'return res;',
        PROPERTY_NAME_ORIGINAL_FUNCTION = '§§§``~~!@#$%%^&*()-=/"")()*&^%$#@#%',
        CHARS = 'abcdefghijklmnopqrstuvwxyz',
    // Dependencies
        typeOf = require('./typeof.js'),
        format = require('./format.js'),
        ocopy;

    // Expose the function
    module.exports = copy;
    module.exports.dynamic = true;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Creates a copy of the given value.
    * @param val The value to copy.
    * @returns The copied value.
    */
    function copy(val) {
        var vt = typeOf(val),
            opts,
            prop,
            res;
        switch (vt) {
            case 'regexp':
                opts = '';
                if (val.ignoreCase) {
                    opts += 'i';
                }
                if (val.global) {
                    opts += 'g';
                }
                if (val.multiline) {
                    opts += 'm';
                }
                return new RegExp(val.source, opts);
            case 'date':
                return new Date(val.getTime());
            case 'object':
                res = {};
                for (prop in val) {
                    if (val.hasOwnProperty(prop)) {
                        res[prop] = val[prop];
                    }
                }
                return res;
            case 'array':
                return val.slice();
            case 'function':
                return copyFunc(val);
            case 'null':
            case 'nan':
            case 'string':
            case 'boolean':
            case 'undefined':
            case 'number':
                // Value types can just be returned :)
                return val;
            default:
                throw new Error(
                    format('Unrecognized typeOf return value "{0}"', vt)
                );
        }

        /**
        * Wraps the supplied function (unwrapping it if it is itself a wrap) so
        *   that it may have it's properties manipulated.
        * @param {function} func The function to wrap.
        * @returns {function} The new function.
        */
        function copyFunc(func) {
            var prop, res;

            var dynamic = module.exports.dynamic;
            if (dynamic) {
                res = dynamicWrap(func);
            } else {
                res = staticWrap;
            }

            // Copy any properties.
            for (prop in func) {
                /* istanbul ignore else */
                if (func.hasOwnProperty(prop)) {
                    res[prop] = func[prop];
                }
            }

            return res;

            /** Creates a static wrap of the function */
            function staticWrap() {
                // jshint validthis:true
                if (this instanceof staticWrap) {
                    return create(func, Array.prototype.slice.call(arguments));
                } else {
                    return func.apply(this, arguments);
                }
            }
        }

        /**
        * Creates a wrap for the supplied function which will copy the name
        *   and argument list into the new function using the Function
        *   constructor.
        * @param {function} func The function to wrap. If the function is itself
        *   a wrap, the original function will be wrapped rather than the
        *   wrapping function.
        * @returns {function} The wrapping function.
        */
        function dynamicWrap(func) {
            var ftxt, wrap, name, argText, factory;

            // Get the function details
            name = func.name || 'x';
            argText = generateArgs(func.size);
            ftxt = format(SRC_FUNCTION_DYNAMIC, name, argText);

            // We can unwrap here without issue since the consumer copies the
            //  properties across.
            if (typeof func[PROPERTY_NAME_ORIGINAL_FUNCTION] === 'function') {
                func = func[PROPERTY_NAME_ORIGINAL_FUNCTION];
            }

            // Create the factory function that will actually create our
            //  wrapped function.
            factory = new Function(['ex', 'create'], ftxt);// jshint ignore:line

            // Create the wrap
            wrap = factory(Function.apply.bind(func), create);

            // Create hidden property
            Object.defineProperty(wrap, PROPERTY_NAME_ORIGINAL_FUNCTION, {
                enumerable: false,
                value: func
            });

            return wrap;

            /**
            * Generates a comma separated string of unique values.
            * @param {number} len The number of values to generate.
            * @returns {string} A string of names separated by comma.
            */
            function generateArgs(len) {
                var res = [],
                    argName,
                    cnt = 0;

                while (cnt < len) {
                    argName = toBase(cnt, CHARS.length)
                        .map(asChar)
                        .join('');
                    res.push(argName);
                    cnt++;
                }
                return res.join(',');

                /**
                * Returns the character at the specified index
                * @param {number} idx The character index to retrieve.
                * @returns {string} The character at the specified index.
                */
                function asChar(idx) {
                    return CHARS[idx];
                }
            }

            /**
            * Converts the integer base, passing the individual digit values
            *   inside an array.
            * @param {number} num The number to convert.
            * @param {number} base The base to convert to.
            * @returns {array} An array of values for the digits.
            */
            function toBase(num, base) {
                var res, unit;
                res = [];
                while (num) {
                    unit = num % base;
                    res.push(unit);
                    num -= unit;
                    num = num / base;
                }
                num = res.reverse();
                return num;
            }
        }

        /**
        * Creates a new instance of the supplied function type
        * @param {function} func The constructor function.
        * @param {array} args The arguments to pass to the constructor function.
        */
        function create(func, args) {
            var res, res2;
            res = Object.create(func.prototype);
            res2 = func.apply(res, args);
            if (res2 && typeof res2 === 'object') {
                res = res2;
            }
            return res;
        }
    }

    /** Used to bind the copy function to Object.prototype */
    function boundCopy() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        return copy(val);
    }

    /** Binds the copy function to Object.prototype */
    function register() {
        if (Object.prototype.copy !== boundCopy) {
            ocopy = Object.prototype.copy;
            Object.prototype.copy = boundCopy;
        }
    }

    /** Unbinds the copy function from the object prototype */
    function deregister() {
        if (Object.prototype.copy === boundCopy) {
            Object.prototype.copy = ocopy;
            ocopy = undefined;
        }
    }
}(module));
