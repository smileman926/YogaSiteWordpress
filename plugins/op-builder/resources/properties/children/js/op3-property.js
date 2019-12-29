/**
 * OptimizePress3 property.
 *
 * Virtual property (no getter, no setter, no data
 * sent to api) that show element children list
 * in options sidebar.
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
    OP3.Elements._extension.prop.Children = OP3.defineClass({

        Name: "OP3.Property.Children",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "children",

            _defaults: {
                label: function() {
                    return OP3._("Children");
                },
                attr: {
                    "data-property-type": "children",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                var result = "";
                OP3.$(this.element).children().each(function() {
                    result += OP3.$(this).type() + "#" + OP3.$(this).uuid() + ",";
                });

                return result.replace(/,$/, "");
            },

            setter: function(value, media) {
                // pass
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementappend elementremove elementdetach", function(e, o) {
        var element;
        if (e.type === "op3elementappend")
            element = OP3.$(o.node).parent();
        else
            element = OP3.$(o.parent);
        if (!element.length)
            return;

        var property = element.element().findProperty("children");
        if (!property)
            return;

        var value = property.computed();
        var emit = {
            node: element.node(),
            uuid: element.uuid(),
            type: element.type(),
            media: OP3.LiveEditor.deviceMedia(),
            id: property._id,
            name: property._name,
            selector: property._selector,
            serialize: property._serialize,
            forceComputed: property._forceComputed,
            important: false,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: null,
                after: value,
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
