/**
 * Wordpress OptimizePress3 plugin:
 * wrapper around live editor.
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Wrapper object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Object initialization
         *
         * @return {void}
         */
        _init: function () {

        },
    }

    // Globalize
    window.OP3.CreateNewPage = that;

    // Auto init
    $(function() {
        OP3.CreateNewPage._init();
    });

})(jQuery, window, document);
