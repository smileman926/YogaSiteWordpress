/**
 * OptimizePress3 property type:
 * extension which create circular rotation slider
 * to manipulate angle properties
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="rotate"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector)
            .on("jqueryanglepickerdragstart", _dragstart)
            .on("jqueryanglepickerdragend", _dragend)
            .each(function() {
                $(this).anglepicker({
                    roundStep: (($(this).attr("data-round-step") || 45) * 1) || 45,
                    startOffset: (($(this).attr("data-start-offset") || 0) * 1) || 0,
                    prefix: $(this).attr("data-prefix") || "",
                    suffix: $(this).attr("data-suffix") || "",
                });
            });
    }

    /**
     * Widget dragstart event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _dragstart = function(e) {
        OP3.LiveEditor.$ui.body
            .addClass("op3-live-editor-user-select-off")
            .addClass("op3-live-editor-pointer-events-off");
    }

    /**
     * Widget dragend event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _dragend = function(e) {
        OP3.LiveEditor.$ui.body
            .removeClass("op3-live-editor-pointer-events-off")
            .removeClass("op3-live-editor-user-select-off");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
