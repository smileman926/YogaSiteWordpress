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
    OP3.Elements._extension.prop.TreemenuAlign = OP3.defineClass({

        Name: "OP3.Property.TreemenuAlign",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "treemenuAlign",

            _defaults: {
                label: function() {
                    return OP3._("Submenu Alignment");
                },
                selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    // { "none": "None" },
                    { "left": "Left" },
                    { "center": "Center" },
                    { "right": "Right" },
                    // { "top": "Top" },
                    // { "middle": "Middle" },
                    // { "bottom": "Bottom" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            _predefinedValues: {
                left: {
                    submenuAlignLeft: "0px",
                    submenuAlignRight: "auto",
                },
                center: {
                    submenuAlignLeft: "0px",
                    submenuAlignRight: "0px",
                    childWrapMarginLeft: "auto",
                    childWrapMarginRight: "auto",
                },
                right: {
                    submenuAlignLeft: "auto",
                    submenuAlignRight: "0px",
               },
                top: {
                    submenuAlignTop: "0px",
                    submenuAlignBottom: "auto",
                },
                middle: {
                    submenuAlignTop: "50%",
                    submenuAlignBottom: "auto",
                },
                bottom: {
                    submenuAlignTop: "auto",
                    submenuAlignBottom: "0px",
                },
            },
        },
    });

    // trigger virtual property change
    OP3.bind("elementchange::treemenuitem::left elementchange::treemenuitem::right elementchange::treemenuitem::submenuAlignLeft elementchange::treemenuitem::submenuAlignRight", function(e, o) {
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("treemenuAlign");

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
