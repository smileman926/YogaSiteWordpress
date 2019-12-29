/**
 * OptimizePress3 element type:
 * property execute type
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="execute"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            var $this = $(this);
            var $parent = $this.closest(".op3-element-options-property");
            var $label = $parent.find(".op3-element-options-label-group label");
            var $input = $parent.find(".op3-element-options-property-input");

            $("<button />")
                .attr("type", "button")
                .addClass("op3-property-type-execute")
                .text($input.attr("data-op3-button-text") || $label.text())
                .on("click", _click)
                .insertAfter(this);

            // bind, hide and refresh
            $this
                .on("change", _change)
                .css("display", "none");
            _change.call(this);
        });
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var $input = $(this);
        var $button = $input.nextAll(".op3-property-type-execute:first")
        var value = $input.val();
        var checked = value && value !== "0";

        $button
            .removeClass("selected")
            .addClass(checked ? "selected" : "_temp")
            .removeClass("_temp");
    }

    /**
     * Widget button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        var $button = $(this);
        var $input = $button.prevAll(_selector + ":first")
        var value = "1";

        if ($input.val() === value)
            return;

        $input
            .val(value)
            .trigger("change");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
