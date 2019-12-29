/**
 * OptimizePress3 element type:
 * op3 element type text-editor manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Text = OP3.defineClass({

        Name: "OP3.Element.Text",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "text",

            _props: function() {
                return [
                    // Style tab - Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: " [data-op3-contenteditable] > *" } ],

                    [ OP3.Elements._extension.prop.FontSize, {
                        label: OP3._("Size"),
                        selector: " [data-op3-contenteditable] > *",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "72",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                            "data-avoid-text-max": "1"
                        },
                    }],
                    [ OP3.Elements._extension.prop.LineHeight, {
                        selector: " [data-op3-contenteditable] > *",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "em",
                            "data-min-em": "0.5",
                            "data-max-em": "5",
                            "data-step-em": "0.001",
                            "data-precision-em": "0.001",
                            "data-avoid-text-max": "1"
                        },
                    }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Spacing"), selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " [data-op3-contenteditable] > *" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { selector: " [data-op3-contenteditable] > *" } ],

                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: " .op3-text-wrapper", label: OP3._("Background Color") } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Advanced Tab - Borders
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-text-wrapper" } ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ":hover [data-op3-contenteditable] > *" } ],

                    // Hover Tab - Typography
                    [ OP3.Elements._extension.prop.Color, { selector: ":hover [data-op3-contenteditable] > *", id: "colorHover" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: ":hover [data-op3-contenteditable] > *", id: "fontWeightHover" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: ":hover [data-op3-contenteditable] > *", id: "fontStyleHover" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: ":hover [data-op3-contenteditable] > *", id: "textTransformHover" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: ":hover [data-op3-contenteditable] > *", id: "textDecorationHover" } ],
                ];
            },

        },

    });

})(jQuery, window, document);
