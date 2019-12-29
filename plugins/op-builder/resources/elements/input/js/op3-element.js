/**
 * OptimizePress3 element type:
 * op3 element type input manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 *     - properties/value/js/op3-property.js
 *     - properties/placeholder/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Input = OP3.defineClass({

        Name: "OP3.Element.Input",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "input",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.TypeAttr, { selector: " input" } ],
                    [ OP3.Elements._extension.prop.Name, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Label, { selector: " .op3-element-input-label", serialize: false } ],
                    [ OP3.Elements._extension.prop.Placeholder, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Display ],
                    [ OP3.Elements._extension.prop.Visible ],
                    [ OP3.Elements._extension.prop.VisibleLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Required, { selector: " input", serialize: false  } ],
                    [ OP3.Elements._extension.prop.RequiredFull, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.RequiredLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Value, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.UrlMapping, { selector: " input",} ],
                    [ OP3.Elements._extension.prop.InputValidationMessage, { selector: " input",} ],

                    // Style Tab - Label
                    [ OP3.Elements._extension.prop.Display, { id: "labelDisplay", selector: " .op3-element-input-label" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "labelVisible"} ],
                    [ OP3.Elements._extension.prop.MarginBottom, { label: OP3._("Label Spacing"), id: "labelSpacing", selector: " .op3-element-input-label" , attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" }} ],

                    // Style Tab - Icon
                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplay", selector: " .op3-element-input-edit-icon, .op3-divider" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "iconVisible" } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-element-input-edit-icon", } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: " .op3-element-input-edit-icon", label: OP3._("Size"), attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "200", "data-step-percent": "1", "data-precision-percent": "0", }, units: [ "%" ], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "iconFlexDirection", selector: " .op3-element-input-edit", label: OP3._("Icon Position"), options: [ { "row-reverse": "Left" }, { "row": "Right" } ], attr: { "data-property-type": "select-buttons" } } ],
                    [ OP3.Elements._extension.prop.Width, { id: "iconSpacing", selector: " .op3-divider", label: OP3._("Icon Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "150", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px" } ],

                    // Style Tab - Label Font
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-element-input-label > *" } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Size"), selector: " .op3-element-input-label > *", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-element-input-label > *" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-element-input-label > *" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-element-input-label > *", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Spacing"), selector: " .op3-element-input-label > *" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-element-input-label > *" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-element-input-label > *" } ],

                    // Style Tab - Field Font
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fieldFontFamily", selector: " .op3-element-input-edit-text" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fieldFontSize", label: OP3._("Size"), selector: " .op3-element-input-edit-text", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fieldFontWeight", selector: " .op3-element-input-edit-text" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fieldFontStyle", selector: " .op3-element-input-edit-text" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "fieldLineHeight", selector: " .op3-element-input-edit-text", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "fieldLetterSpacing", label: OP3._("Spacing"), selector: " .op3-element-input-edit-text" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "fieldTextTransform", selector: " .op3-element-input-edit-text" } ],

                    // Style Tab - Color
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-element-input-label" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "placeholderColor", selector: " .op3-element-input-edit-text::placeholder" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " .op3-element-input-edit-icon" } ],

                    // Style Tab - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth ],
                    [ OP3.Elements._extension.prop.BorderAllStyle ],
                    [ OP3.Elements._extension.prop.BorderAllColor ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-element-input-edit [data-op3-border]" } ],

                    // Style Tab - Field Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " .op3-element-input-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Element Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.Width ],

                    // Advanced Tab - Input Positioning
                    [ OP3.Elements._extension.prop.BoxModel, { id: "inputBoxModel", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputMarginTop", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputMarginBottom", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputMarginLeft", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputMarginRight", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputPaddingTop", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputPaddingBottom", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputPaddingLeft", selector: " .op3-element-input-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputPaddingRight", selector: " .op3-element-input-edit" } ],

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    // @todo? - we already have display, should we add another hidden element???

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                ];
            },

            desc: function() {
                return ""
                    || this.getOption("label", "all")
                    || OP3.Elements._extension.type.Default.prototype.desc.call(this);
            },

        },

    });

})(jQuery, window, document);
