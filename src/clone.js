/**
* Defines the clone function which can be used to create a deep copy of an
*   object.
* @param module The module to export the function onto.
*/
(function cloneModule(module) {
    'use strict';

    // Dependencies
    var typeOf = require('./typeof.js'),
        copy = require('./copy.js'),
        format = require('./format.js'),
        oclone;

    // Expose the function
    module.exports = clone;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Clones the given value.
    * @param val The value to clone.
    */
    function clone(val) {
        var trace = {
            objects: [],
            values: []
        };
        return doClone(trace, val);

        /**
        * Clones the given value.
        * @param trace An internal property used to prevent circular objects
        *   from causing issues.
        * @param val The value to clone.
        */
        function doClone(trace, val) {
            var vt, prop, res, idx;

            // Prevent recursive processing.
            idx = trace.objects.indexOf(val);
            if (idx > -1) {
                return trace.values[idx];
            }

            vt = typeOf(val);
            switch (vt) {
                case 'object':
                    res = {};
                    traceAdd(val, res);
                    for (prop in val) {
                        if (val.hasOwnProperty(prop)) {
                            res[prop] = doClone(trace, val[prop]);
                        }
                    }
                    return res;
                case 'function':
                    res = copy(val);
                    traceAdd(val, res);
                    for (prop in val) {
                        /* istanbul ignore else */
                        if (val.hasOwnProperty(prop)) {
                            res[prop] = doClone(trace, val[prop]);
                        }
                    }
                    return res;
                case 'array':
                    res = val.map(clone.bind(null, trace));
                    return res;
                // Shallow
                case 'regexp':
                case 'date':
                    return copy(val);
                case 'string':
                case 'number':
                case 'boolean':
                case 'nan':
                case 'null':
                case 'undefined':
                    return val;
                default:
                    throw new Error(
                        format('Unrecognized typeOf return value "{0}"', vt)
                    );
            }

            /**
            * Adds to the trace
            * @param obj The value we are cloning.
            * @param val The resulting value which the properties
            *   will be cloned onto.
            */
            function traceAdd(obj, val) {
                trace.objects.push(obj);
                trace.values.push(val);
            }
        }
    }

    /** Used to bind the clone function to Object.prototype */
    function boundClone() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        return clone(val);
    }

    /** Binds the clone function to Object.prototype */
    function register() {
        if (Object.prototype.clone !== boundClone) {
            oclone = Object.prototype.clone;
            Object.prototype.clone = boundClone;
        }
    }

    /** Unbinds the clone function from the object prototype */
    function deregister() {
        if (Object.prototype.clone === boundClone) {
            Object.prototype.clone = oclone;
            oclone = undefined;
        }
    }
}(module));
