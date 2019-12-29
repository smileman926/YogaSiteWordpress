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
    var _selector = '[data-property-type="select-buttons-listed"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent)
            .find(_selector)
                .selectButtons()
                .each(function() {
                    $(this).data("jquery-select-buttons").$ui.widget.addClass("jquery-select-buttons-listed-widget");
                });
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
