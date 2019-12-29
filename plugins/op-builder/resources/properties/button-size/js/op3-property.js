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
    OP3.Elements._extension.prop.ButtonSize = OP3.defineClass({

        Name: "OP3.Property.ButtonSize",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "buttonSize",

            _defaults: {
                label: function() {
                    return OP3._("Button Size");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "xs": "XS" },
                    { "s": "S" },
                    { "m": "M" },
                    { "l": "L" },
                    { "xl": "XL" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            _predefinedValues: {
                xs: {
                    fontSize: "12px",
                    paddingLeft: "11px",
                    paddingRight: "11px",
                    height: "22px",
                },
                s: {
                    fontSize: "16px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    height: "46px",
                },
                m: {
                    fontSize: "19px",
                    paddingLeft: "22px",
                    paddingRight: "22px",
                    height: "70px",
                },
                l: {
                    fontSize: "24px",
                    paddingLeft: "27px",
                    paddingRight: "27px",
                    height: "80px",
                },
                xl: {
                    fontSize: "32px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    height: "100px",
                },
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementchange::button::fontSize elementchange::button::paddingLeft elementchange::button::paddingRight elementchange::button::height", function(e, o) {
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("buttonSize");

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
