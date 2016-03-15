/**
* Defines the typeOf function which is an enhancement of the typeof operator.
* @param {object} module The module to export the public API to.
*/
(function typeOfModule(module) {
    'use strict';
    var handlers = [],
        otypeof;

    // Expose the function
    module.exports = typeOf;
    module.exports.handlersAdd = handlersAdd;
    module.exports.handlersRemove = handlersRemove;
    module.exports.handlersList = handlersList;
    module.exports.handlersClear = handlersClear;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * A slightly enhanced typeOf.
    * @param val The value to determine the type of.
    * @returns {string} A string containing one of the following values
    *   depending on the supplied value.
    *       * 'regexp' - The value is a RegExp
    *       * 'date' - The value is a Date
    *       * 'null' - The value is null
    *       * 'array' - The value is an array
    *       * 'object' - The value is an object that is not one of the previous
    *           values.
    *       * 'nan' - The value is a number that is NaN.
    *       * 'number' - The value is a number that is not NaN (If that makes
    *           any sense).
    *       * 'undefined' - The value is undefined
    *       * 'function' - The value is a function
    *       * 'boolean' - The value is true or false
    *       * 'string' - The value is a string.
    */
    function typeOf(val) {
        var i, hres, vt;
        // Let custom handlers process first
        for (i = 0; i < handlers.length; i++) {
            hres = handlers[i](val);
            if (typeof hres === 'string') {
                return hres;
            }
        }
        vt = typeof val;
        switch (vt) {
            case 'object':
                if (Array.isArray(val)) {
                    return 'array';
                } else if (val instanceof RegExp) {
                    return 'regexp';
                } else if (val instanceof Date) {
                    return 'date';
                } else if (val) {
                    return vt;
                } else {
                    return 'null';
                }
                /* istanbul ignore next */
                break;
            case 'number':
                if (isNaN(val)) {
                    return 'nan';
                } else {
                    return vt;
                }
                /* istanbul ignore next */
                break;
            case 'undefined':
            case 'function':
            case 'boolean':
            case 'string':
                return vt;
            /* istanbul ignore next */
            default:
                throw new Error(
                    'Unrecognized typeof return value "' + vt + '"!', vt
                );
        }
    }

    /**
    * Adds a custom typeOf handler.
    * @param {function} handler The handler function to add.
    */
    function handlersAdd(handler) {
        if (typeof handler === 'function') {
            handlers.push(handler);
        }
    }

    /**
    * Removes a handler from the collection and returns it
    * @param {function} handler The handler function to remove.
    */
    function handlersRemove(handler) {
        var idx;
        idx = handlers.indexOf(handler);
        if (idx > -1) {
            return handlers.splice(idx, 1)[0];
        }
    }

    /** Returns an array of handlers */
    function handlersList() {
        return handlers.slice();
    }

    /** Removes all custom handlers */
    function handlersClear() {
        handlers.length = 0;
    }

    /** Used to bind typeOf to Object.prototype */
    function boundTypeOf() {
        var val = this.valueOf(); // jshint ignore:line
        return typeOf(val);
    }

    /** Adds typeof to Object.prototype */
    function register() {
        if (Object.prototype.typeOf !== boundTypeOf) {
            otypeof = Object.prototype.typeOf;
            Object.prototype.typeOf = boundTypeOf;
        }
    }

    /** Removes typeof from object.prototype */
    function deregister() {
        if (Object.prototype.typeOf === boundTypeOf) {
            Object.prototype.typeOf = otypeof;
            otypeof = undefined;
        }
    }
}(module));
