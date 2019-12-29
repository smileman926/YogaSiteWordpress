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
    OP3.Elements._extension.prop.MatchScreenHeight = OP3.defineClass({

        Name: "OP3.Property.MatchScreenHeight",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "matchScreenHeight",

            _defaults: {
                label: function() {
                    return OP3._("Match Screen Height");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return this.element.getOption("minHeight", true) === "100vh" ? "1" : "0";
            },

            getter: function(media) {
                return this.element.getOption("minHeight", media) === "100vh" ? "1" : "0";
            },

            setter: function(value, media) {
                this.element.setOption("minHeight", value == "1" ? "100vh" : null, media);
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementchange::*::minHeight", function(e, o) {
        if (o.id !== "minHeight")
            return;

        var element = OP3.$(o.node).element();
        var valueBefore = o.value.before === "100vh" ? "1" : "0";
        var valueAfter = o.value.after === "100vh" ? "1" : "0";
        if (valueBefore == valueAfter)
            return;

        var property = element.findProperty("matchScreenHeight");
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
