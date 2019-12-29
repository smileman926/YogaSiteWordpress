/**
 * OptimizePress3 element type:
 * op3 element type boolean manipulation.
 *
 * Replacing select tag with 0/1 options
 * with switch toggle
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="boolean"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            var $label = $("<label />")
                .attr("class", "toggle-switch")
                .insertAfter(this);
            $("<input />")
                .attr("type", "checkbox")
                .prop("checked", $(this).val()*1)
                .prop("disabled", $(this).is(":disabled"))
                .on("change", _changeCheckbox)
                .appendTo($label);
            var $wrap = $("<div />")
                .attr("class", "toggle-switch-wrapper")
                .appendTo($label);
            var $content = $("<div />")
                .attr("class", "toggle-switch-content")
                .appendTo($wrap);
            var $handle = $("<span />")
                .attr("class", "toggle-switch-handle")
                .appendTo($content);
            $(this).find("option[value]").each(function() {
                $content.attr("data-toggle-switch-value-" + $(this).val(), $(this).text());
            });

            $(this)
                .css("display", "none")
                .on("change", _changeInput);

            $(this)
                .closest(".op3-element-options-property")
                .addClass("op3-element-options-property--boolean");
        });
    }

    var _changeInput = function(e) {
        $(this).next().find("input").prop("checked", $(this).val()*1);
    }

    var _changeCheckbox = function(e) {
        $(this).parent().prev()
            .val($(this).prop("checked") ? "1" : "0")
            .trigger("change");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
