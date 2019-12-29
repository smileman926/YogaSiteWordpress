/**
 * OptimizePress3 element type:
 * op3 element add new child.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="children"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            $("<button />")
                .attr("type", "button")
                .addClass("op3-property-type-children-add-new")
                .text("Add New Item")
                .on("click", _click)
                .insertAfter(this);
        });
    }

    /**
     * Widget button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        var element = OP3.Designer.activeElement();
        var type = element.type();
        var handler = _clickHandler[type];

        if (typeof handler === "function")
            return handler.apply(this, arguments);
    }

    var _clickHandler = {
        bulletblock: function(e) {
            var element = OP3.Designer.activeElement();

            OP3.$(element)
                .find("bulletlist:last-child")
                .clone()
                .setOption("html", '<loremipsum method="paragraph" min="3" max="4" />')
                .appendTo(element);
        }
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
