/**
 * OptimizePress3 element type:
 * buttons from select manipulation
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="select-toggle-button"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).selectToggleButton();
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
