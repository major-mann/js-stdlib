/**
* Helper functions for working with regex/
* @param {object} exports The object to export the public API onto.
*/
(function regexpModule(exports) {
    'use strict';
    var oencode, odecode;

    // Expose the public API
    exports.encode = rexpEncode;
    exports.decode = rexpDecode;
    exports.register = register;
    exports.deregister = deregister;

    /**
    * Encodes a string so it can appear literally inside of a regular expression
    * @param {string} str The string to escase.
    */
    function rexpEncode(str) {
        return str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    /**
    * Decodes a string previously encoded by rexpEncode.
    * @param {string} str The string to unescase.
    */
    function rexpDecode(str) {
        return str.replace(/\\([-\\^$*+?.()|[\]{}])/g, '$1');
    }

    /**
    * Adds the escaping functions from the regexp constructor, and saves
    *   references to the originals for restoration on deregister.
    */
    function register() {
        if (RegExp.encode !== rexpEncode) {
            oencode = RegExp.encode;
            odecode = RegExp.decode;
            RegExp.encode = rexpEncode;
            RegExp.decode = rexpDecode;
        }
    }

    /**
    * Removes the escaping functions from the regexp constructor, and restores
    *   the originals.
    */
    function deregister() {
        if (RegExp.encode === rexpEncode) {
            RegExp.encode = oencode;
            RegExp.decode = odecode;
            oencode = undefined;
            odecode = undefined;
        }
    }
}(module.exports));
