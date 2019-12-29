/**
 * OptimizePress3 element type:
 * op3 element type section manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/column-align/js/op3-property.js
 *     - properties/background-color/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/text-align/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.PopOverlay = OP3.defineClass({

        Name: "OP3.Element.PopOverlay",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "popoverlay",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Text, { selector: " .op3-popoverlay-content", tag: "input", label: OP3._("Name"), attr: { maxlength: "32" }, } ],
                    [ OP3.Elements._extension.prop.MarginTop, {
                        id: "marginTopWrapper",
                        selector: " .op3-popoverlay-wrapper",
                        label: OP3._("Popup Top Margin"),
                        defaultUnit: "px",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, em",
                            "data-min-px": "20",
                            "data-min-em": "1.3",
                            "data-max-px": "200",
                            "data-max-em": "10",
                            "data-step-px": "1",
                            "data-step-em": "0.001",
                            "data-percision-px": "0",
                            "data-percision-em": "3",
                        },
                        units: [
                            "px",
                            "em",
                        ],
                    }],
                    [ OP3.Elements._extension.prop.BackgroundColor, { label: OP3._("Page Overlay Colour"), selector: " .op3-popoverlay-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { label: OP3._("Popup Background Colour"), selector: " .op3-popoverlay-content", id: "popoverlayContentBackground" } ],

                    // Style Tab - Delay & Animation
                    [ OP3.Elements._extension.prop.Animation, { label: OP3._("Animation"), selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.TimerCheck, { label: OP3._("Use Delay Timer"), selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.Timer, { label: OP3._("Delay Timer"), selector: " .op3-popoverlay-content" } ],

                    // Style Tab - Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: " .op3-popoverlay-content" } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-popoverlay-content" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " .op3-popoverlay-content" } ],
                    [ OP3.Elements._extension.prop.Width, { selector: " .op3-popoverlay-wrapper" } ],
                    // [ OP3.Elements._extension.prop.MaxWidth, { hidden: true } ],
                    [ OP3.Elements._extension.prop.MinHeight, {
                        selector: " .op3-popoverlay-content",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, vh",
                            "data-min-px": "0",
                            "data-min-vh": "0",
                            "data-max-px": "2000",
                            "data-max-vh": "100",
                            "data-step-px": "1",
                            "data-step-vh": "1",
                            "data-precision-px": "0",
                            "data-precision-vh": "0",
                        },
                        units: [
                            "px",
                            "vh",
                        ],
                        defaultUnit: "px",
                    }],
                    // [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Align Content") } ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.Delete, { label: OP3._("Delete Pop Overlay") } ],
                ];
            },

        },

    });

})(jQuery, window, document);
