/**
 * OptimizePress3 element type:
 * append uuids on load.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Load event handler
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handler = function(e, o) {
        OP3.Elements._uuids = OP3.$("*").listUuids();
    }

    // bind events
    OP3.bind("load", _handler);

})(jQuery, window, document);
