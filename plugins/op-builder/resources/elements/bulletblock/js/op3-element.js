/**
 * OptimizePress3 element type:
 * op3 element type bulletblock manipulation.
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
    OP3.Elements._extension.type.BulletBlock = OP3.defineClass({

        Name: "OP3.Element.BulletBlock",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "bulletblock",

            _props: function() {
                return [
                    // Style tab - Children
                    [ OP3.Elements._extension.prop.Children ],

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
                    [ OP3.Elements._extension.prop.PaddingDrag ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

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

                    // // Hover Tab - General
                    // [ OP3.Elements._extension.prop.TransitionDuration, { selector: " .op3-element" } ],

                    // // Hover Tab - Typography
                    // [ OP3.Elements._extension.prop.Color, { selector: ":hover", id: "colorHover" } ],
                    // [ OP3.Elements._extension.prop.FontWeight, { selector: ":hover [data-op3-contenteditable]", id: "fontWeightHover" } ],
                    // [ OP3.Elements._extension.prop.FontStyle, { selector: ":hover [data-op3-contenteditable]", id: "fontStyleHover" } ],
                    // [ OP3.Elements._extension.prop.TextTransform, { selector: ":hover [data-op3-contenteditable]", id: "textTransformHover" } ],
                    // [ OP3.Elements._extension.prop.TextDecoration, { selector: ":hover [data-op3-contenteditable]", id: "textDecorationHover" } ],

                    // // Hover Tab - Icon
                    // [ OP3.Elements._extension.prop.Color, { selector: ":hover .op3-icon", id: "iconColorHover", label: OP3._("Colour") } ],

                    // Link Properties
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "bulletlistBackgroundColor", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "bulletlistFontFamily", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistColor", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "bulletlistFontSize", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "bulletlistLineHeight", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "bulletlistLetterSpacing", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "bulletlistFontWeight", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "bulletlistFontStyle", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "bulletlistTextTransform", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "bulletlistTextDecoration", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistIconColor", selector: ' .op3-element .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "bulletlistIconFontSize", selector: ' .op3-element .op3-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "bulletlistIconSpacing", selector: ' .op3-element .op3-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "bulletlistIconVerticalPosition", selector: ' .op3-element .op3-icon' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "bulletlistBottomSpacing", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "bulletlistTransitionDuration", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistColorHover", selector: ' .op3-element:hover', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistIconColorHover", selector: ' .op3-element:hover .op3-icon', } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "bulletlistPaddingTop", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "bulletlistPaddingBottom", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "bulletlistPaddingLeft", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "bulletlistPaddingRight", selector: " .op3-element", } ],

                    // Link Properties - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "bulletlistBorderTopWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "bulletlistBorderTopStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "bulletlistBorderTopColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "bulletlistBorderBottomWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "bulletlistBorderBottomStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "bulletlistBorderBottomColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "bulletlistBorderLeftWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "bulletlistBorderLeftStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "bulletlistBorderLeftColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "bulletlistBorderRightWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "bulletlistBorderRightStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "bulletlistBorderRightColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "bulletlistBorderTopLeftRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "bulletlistBorderTopRightRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "bulletlistBorderBottomLeftRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "bulletlistBorderBottomRightRadius", selector: ' .op3-element' } ],
                ];
            },
        },

    });

})(jQuery, window, document);
