/**
 * OptimizePress3 element type:
 * equalize columns
 */
;(function($, window, document) {

    "use strict";

     /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '.op3-element-options-property-input[data-op3-element-options-property-name="gutter"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            //var state = _state(this);

            $("<button />")
                //.addClass(state ? "selected" : "_temp")
                //.removeClass("_temp")
                .attr("type", "button")
                .text("Equalize Columns")
                .on("click", _click)
                .insertAfter(this);
        });
    }

    /**
     * Are columns equalized
     *
     * @param  {Object} node
     * @return {Void}
     */
    var _state = function(node) {
        // not checking state because this can not
        // be accurate: for example three equalized
        // columns have widths
        // 33.3333% + 33.3333% + 33.3334%
        return false;

        var element = OP3.$(node);
        if (!element.length)
            return false;

        var row = OP3.$(element).closestHorizontal().element();
        var col = row.children();
        var result = null;

        for (var i = 0; i < col.length; i++) {
            var value = col.eq(i).getOption("width", "all");
            if (result === null)
                result = value;

            if (result !== value)
                return false;
        }

        return !!result;
    }

    /**
     * Widget button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        // can be executed on row and column elements,
        // so first find closest row
        var row = OP3.$(OP3.Designer.activeElement()).closestHorizontal();
        var wrap = row.element().babysitter();
        var win = wrap.ownerDocument.defaultView
        var lib = win.jQuery(wrap).data("jquery-flex-grid-cell-sizer");

        // execute normalize using flex-grid-sizer library
        if (lib)
            lib.normalize();
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
