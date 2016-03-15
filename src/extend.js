/**
* Defines the extend function which can be used to extend one object with
*   another's properties.
* @param {object} module The module to export the extend function onto.
*/
(function extendModule(module) {
    'use strict';

    // Dependencies
    var typeOf = require('./typeof.js'),
        format = require('./format.js'),
        copy = require('./copy.js'),
        oextend;

    // Expose the extend function
    module.exports = extend;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Extends dest with src, then srcN (for all extendable arguments)
    *   Note: Any sub objects which are extendable, but do not match the source
    *       type, will be re-created and have their properties transferred
    *       across to the new instance of the correct type before transferring
    *       properties from the source object. This change of type does not
    *       happen at the root level. ie. dest will always be the object
    *       or function supplied, and will only have properties copied across.
    * @param {object} dest The destination object to copy to.
    * @param {object} src The object to copy from.
    * @param {object} srcN The next object to copy from.
    * @returns {object} dest
    */
    function extend(dest, src, srcN) {
        var dt = typeOf(dest),
            st = typeOf(src),
            args;

        // We only continue if some properties can be copied.
        if (isExtendable(dt) && isExtendable(st)) {
            // Copy from source to dest
            Object.keys(src).forEach(process);

            // If we have more arguments to process, process them.
            if (srcN) {
                args = Array.prototype.slice.call(arguments, 2);
                args.unshift(dest);
                /* jshint validthis:true */
                extend.apply(this, args);
            }
        }

        return dest;

        /**
        * Processes the given key name.
        * @param name The name of the key to process.
        */
        function process(name) {
            var dt = typeOf(dest[name]),
                st = typeOf(src[name]),
                val;

            if (isExtendable(dt) && isExtendable(st)) {
                if (dt === st) {
                    dest[name] = extend(dest[name], src[name]);
                } else {
                    // Create new value for prop on dest of source type
                    val = changeType(st, dest[name], src[name]);
                    // Copy properties from source
                    val = extend(val, src[name]);
                    dest[name] = val;
                }
            } else {
                dest[name] = src[name];
            }
        }

        /**
        * Creates a new object, array or function and copies the properties
        *   across from val onto the new type.
        * @param {string} to The type to change to. MUST be object, array or
        *   function
        * @param val The value to copy the properties from.
        * @param {function} func The function to copy in the case we are
        *   changing type to a function.
        */
        function changeType(to, val, func) {
            var res, prop;
            // Create new value for prop on dest of source type
            switch (to) {
                case 'object':
                    res = {};
                    break;
                case 'array':
                    res = [];
                    break;
                case 'function':
                    res = copy(func);
                    break;
                default:
                    throw new Error(
                        format('Unrecognized extendable type "{0}"', st)
                    );
            }
            // Copy properties from dest onto new object
            for (prop in val) {
                /* istanbul ignore else */
                if (val.hasOwnProperty(prop)) {
                    res[prop] = val[prop];
                }
            }
            return res;
        }

        /**
        * Checks whether the given type is extendable.
        * @param {string} type The value type to check.
        */
        function isExtendable(type) {
            return type === 'object' || type === 'function' || type === 'array';
        }
    }

    /** Used to bind the extend function to Object.prototype */
    function boundExtend() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        args.unshift(val);
        return extend.apply(null, args);
    }

    /** Binds the extend function to Object.prototype */
    function register() {
        if (Object.prototype.extend !== boundExtend) {
            oextend = Object.prototype.extend;
            Object.prototype.extend = boundExtend;
        }
    }

    /** Unbinds the extend function from the object prototype */
    function deregister() {
        if (Object.prototype.extend === boundExtend) {
            Object.prototype.extend = oextend;
            oextend = undefined;
        }
    }
}(module));
