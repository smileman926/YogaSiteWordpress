/**
 * OptimizePress3 element type:
 * op3 element type horizontal line manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/height/js/op3-property.js
 *     - properties/opacity/js/op3-property.js
 *     - properties/text/js/op3-property-align.js
 *     - properties/transform-flip/js/op3-property.js
 *     - properties/transform-rotate/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.HorizontalLine = OP3.defineClass({

        Name: "OP3.Element.HorizontalLine",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "horizontalline",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.BorderTopStyle, {
                        label: OP3._("Line Style"),
                        selector: " hr",
                        attr: {
                            "data-property-type": "select2",
                        },
                        options: [
                            {"solid": "Solid"},
                            {"dashed": "Dashed"},
                            {"dotted": "Dotted"},
                        ],
                    }],

                    [ OP3.Elements._extension.prop.BorderTopWidth, {
                        label: OP3._("Line Height"),
                        selector: " hr",
                        // set because we don't want to trigger
                        // custom border box custom border
                        id: "horizontalLineHeight",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "1",
                            "data-max-px": "28",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: [ "px", ],
                        defaultUnit: "px",
                        hidden: false,
                    }],

                    [ OP3.Elements._extension.prop.MaxWidth, { label: OP3._("Line Width") } ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Line Align") } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "horizontalLineColor", selector: " hr", label: OP3._("Line Colour") } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

})(jQuery, window, document);
