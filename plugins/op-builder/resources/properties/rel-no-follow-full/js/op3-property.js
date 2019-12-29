/**
 * OptimizePress3 element.
 *
 * Acts similar as OP3.Elements._extension.prop.Required:
 * getter returns full attribute name with value
 *
 * The point of this property is that we can use
 * element markup with or without attribute.
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
    OP3.Elements._extension.prop.RelNoFollowFull = OP3.defineClass({

        Name: "OP3.Property.RelNoFollowFull",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "relNoFollowFull",

            _defaults: {
                label: function() {
                    return OP3._("No Follow Full");
                },
                hidden: true,
            },

            _forceComputed: true,

            reset: function() {
                // preserve
            },

            computed: function (media) {
                var result = this.element.getOption("relNoFollow", media);
                if (result === "1")
                    return 'rel="no-follow"';

                return "";
            },

            setter: function (value, media) {
                // proxy property, no setter
                return null;
            },

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::relNoFollow", function(e, o) {
        var element = OP3.$(o.node).element() || OP3.Document;
        var prop = element.findProperty(o.id + "Full");
        if (!prop)
            return;

        var valueBefore = o.value.before ? 'rel="no-follow"' : "";
        var valueAfter = o.value.after ? 'rel="no-follow"' : "";

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: prop.id(),
            name: prop.name(),
            selector: prop._selector,
            serialize: prop._serialize,
            forceComputed: prop._forceComputed,
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
