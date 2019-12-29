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
    OP3.Elements._extension.prop.MatchScreenWidth = OP3.defineClass({

        Name: "OP3.Property.MatchScreenWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "matchScreenWidth",

            _defaults: {
                label: function() {
                    return OP3._("Match Screen Width");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return this.element.getOption("width", true) === "100%" ? "1" : "0";
            },

            getter: function(media) {
                return this.element.getOption("width", media) === "100%" ? "1" : "0";
            },

            setter: function(value, media) {
                this.element.setOption("width", value == "1" ? "100%" : null, media);
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementchange::*::width", function(e, o) {
        if (o.id !== "width")
            return;

        // @todo - calculate before value?
        var element = OP3.$(o.node).element();
        var valueBefore = o.value.before === "100%" ? "1" : "0";
        var valueAfter = o.value.after === "100%" ? "1" : "0";
        if (valueBefore == valueAfter)
            return;

        var property = element.findProperty("matchScreenWidth");
        if (!property)
            return;

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: property._id,
            name: property._name,
            selector: property._selector,
            serialize: property._serialize,
            forceComputed: property._forceComputed,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: valueBefore,
                after: valueAfter,
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
    });

})(jQuery, window, document);
