/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Html = OP3.defineClass({

        Name: "OP3.Property.Html",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "html",

            _defaults: {
                label: function() {
                    return OP3._("HTML");
                },
                tag: "textarea",
                attr: {
                    readonly: "readonly",
                },
                selector: " [data-op3-contenteditable]",
                hidden: true,
            },

            _forceComputed: true,

            reset: function() {
                // preserve
            },

            computed: function() {
                return $(this.target()).html();
            },

            setter: function(value, media) {
                $(this.target()).html(value || "");
            },

        },

    });

    // trigger change on contenteditable dom node
    $("body")
        .on("focus", "[data-op3-contenteditable][contenteditable]", function(e) {
            if ($(this).hasClass("op3-html2"))
                return;

            var value = $(this).html();
            $(this).data("op3-elements-extension-type-text-html", value);
        })
        .on("blur keyup paste input", "[data-op3-contenteditable][contenteditable]", function(e) {
            if ($(this).hasClass("op3-html2"))
                return;

            var _old = $(this).data("op3-elements-extension-type-text-html");
            var _new = $(this).html();

            if (_old !== _new) {
                $(this).data("op3-elements-extension-type-text-html", _new);

                var element = OP3.$.closest(this).element();
                var property = element.findProperty("html");
                var emit = {
                    node: element.node(),
                    uuid: element.uuid(),
                    type: element.type(),
                    media: "all",
                    id: property.id(),
                    name: property.name(),
                    selector: property._selector,
                    serialize: property._serialize,
                    forceComputed: property._forceComputed,
                    important: false,
                    historyPending: OP3.Designer.isHistoryPending(),
                    value: {
                        before: _old,
                        after: _new,
                    },
                }

                OP3.transmit("elementchanging", emit);
                OP3.transmit("elementchanging::" + emit.type, emit);
                OP3.transmit("elementchanging::*::" + emit.name, emit);
                OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
                OP3.transmit("elementchange", emit);
                OP3.transmit("elementchange::" + emit.type, emit);
                OP3.transmit("elementchange::*::" + emit.name, emit);
                OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
            }
        });

    // save value on elementchange event
    OP3.bind("elementchange::*::html", function(e,o) {
        $(this).data("op3-elements-extension-type-text-html", o.value.after);
    });

})(jQuery, window, document);
