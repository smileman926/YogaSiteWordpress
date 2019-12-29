/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FaqItemIconPosition = OP3.defineClass({

        Name: "OP3.Property.FaqItemIconPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "faqItemIconPosition",

            _defaults: {
                label: function() {
                    return OP3._("Icon Position");
                },
                selector: " .op3-faqitem-header",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "left": "Left" },
                    { "right": "Right" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            _predefinedValues: {
                left: {
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                    iconPaddingRight: "15px",
                },
                right: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    iconPaddingRight: "0px",
                },
            },
        },
    });

    // trigger virtual property change
    OP3.bind("elementchange::faqitem::flexDirection elementchange::faqitem::justifyContent elementchange::contenttoggleitem::flexDirection elementchange::contenttoggleitem::justifyContent", function(e, o) {
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("faqItemIconPosition");

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
