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
    OP3.Elements._extension.prop.MarginAlign = OP3.defineClass({

        Name: "OP3.Property.MarginAlign",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "marginAlign",

            _defaults: {
                label: function() {
                    return OP3._("Alignment");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "left": "Left" },
                    { "center": "Center" },
                    { "right": "Right" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            _predefinedValues: {
                left: {
                    marginLeft: "0px",
                    marginRight: "auto",
                },
                center: {
                    marginLeft: "auto",
                    marginRight: "auto",
                },
                right: {
                    marginLeft: "auto",
                    marginRight: "0px",
                },
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementchange::*::marginLeft elementchange::*::marginRight", function(e, o) {
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("marginAlign");

        // proxy property does not exist for current element
        if (!prop)
            return;

        // get value before/after
        // (no need to actualy calculate value before since
        // this property is not serializable, pass null)
        var valueBefore = null;
        var valueAfter = prop.getter(o.media);

        // event data
        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: prop._id,
            name: prop._name,
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

        // emit
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
