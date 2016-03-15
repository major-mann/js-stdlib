/**
* References all functionality in the package and attaches it to the exports
* @param {object} exports The object to export the public API onto.
*/
(function indexModule(exports) {
    /* globals window */
    'use strict';
    exports.clone = require('./clone.js');
    exports.copy = require('./copy.js');
    exports.Promise = require('./epromise.js');
    exports.extend = require('./extend.js');
    exports.typeOf = require('./typeof.js');
    exports.format = require('./format.js');
    exports.regex = require('./regex.js');
    exports.EventEmitter = require('../lib/events.js');

    exports.register = register;
    exports.safeRegister = safeRegister;
    exports.deregister = deregister;

    // If we are in a browser, attach to window
    if (typeof window === 'object') {
        window.stdlib = {
            clone: exports.clone,
            copy: exports.copy,
            Promise: exports.Promise,
            extend: exports.extend,
            typeOf: exports.typeOf,
            format: exports.format,
            regex: exports.regex,
            EventEmitter: exports.EventEmitter,
            register: exports.register,
            safeRegister: exports.safeRegister,
            deregister: exports.deregister
        };
    }

    /**
    * Calles register on exposed modules which support it, and are considered
    *   safe prototype changes (ie. string)
    */
    function safeRegister() {
        exports.format.register();
        exports.regex.register();
    }

    /** Calles register on all exposed modules which support it. */
    function register() {
        safeRegister();
        exports.clone.register();
        exports.copy.register();
        exports.extend.register();
        exports.typeOf.register();
    }

    /** Calls deregister on all exposed modules which support it. */
    function deregister() {
        exports.format.deregister();
        exports.regex.deregister();
    }
}(module.exports));
