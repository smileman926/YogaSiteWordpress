/**
 * OptimizePress3 element type:
 * op3 element type numberBlock manipulation.
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
     * Block layouts used for desktop/tablet/mobile
     */
    var _blockLayout = [
        { "0": "Layout #1" },
        { "1": "Layout #2" },
        { "2": "Layout #3" },
        { "3": "Layout #3" },
    ];

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.NumberBlock = OP3.defineClass({

        Name: "OP3.Element.NumberBlock",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "numberblock",

            _props: function() {
                return [
                    // Children display
                    [ OP3.Elements._extension.prop.BlockDisplayText, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayTitle, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Block Settings
                    [ OP3.Elements._extension.prop.NumberBlockFrame, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.NumberBlockShape, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.Padding, { label: OP3._("Number Padding"), selector: " .op3-numberblock-number", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0" } } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .op3-numberblock-number" } ],
                    [ OP3.Elements._extension.prop.Size, { label: OP3._("Number Size") }],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthNumber", selector: " .op3-numberblock-number [data-op3-background]", label: OP3._("Outline Width"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "10", "data-step-px": "1", "data-precision-px": "0" }, units: ["px"], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthNumber", selector: " .op3-numberblock-number [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthNumber" ,selector: " .op3-numberblock-number [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthNumber", selector: " .op3-numberblock-number [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthNumber", selector: " .op3-numberblock-number [data-op3-background]" } ],

                    // Number spacing
                    [ OP3.Elements._extension.prop.MarginLeft, { label: OP3._("Number Margin Left"), id: "marginLeftNumber", selector: " .op3-numberblock-number", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginRight, { label: OP3._("Number Margin Right"), id: "marginRightNumber", selector: " .op3-numberblock-number", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { label: OP3._("Space Below Number"), id: "marginBottomNumber", selector: " .op3-numberblock-number", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // Presets
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout, } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout, } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout, } ],
                    [ OP3.Elements._extension.prop.NumberBlockSequence, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Style tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],
                    // Style tab - Background - Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    // Style tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth ],
                    [ OP3.Elements._extension.prop.BorderAllStyle ],
                    [ OP3.Elements._extension.prop.BorderAllColor ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],
                    [ OP3.Elements._extension.prop.WrapColumns, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.FlexBasis, { label: OP3._("Min Column Width"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="numberblockitem"]', attr: { "data-property-type": "range", "data-units": "px,%", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%"], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FlexBasisSteps, { selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="numberblockitem"]', } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Column Gutter") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="numberblockitem"] > .op3-column-content', } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="numberblockitem"] > .op3-column-content', } ],
                    // [ OP3.Elements._extension.prop.MarginBottom, { id: "marginBottomItem", label: OP3._("Number Block Item Bottom Margin"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="numberblockitem"]', } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' > [data-op3-element-container] > [data-op3-children]', } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' > [data-op3-element-container] > [data-op3-children]', } ],

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
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%",], } ],
                    [ OP3.Elements._extension.prop.MatchScreenWidth ],
                    [ OP3.Elements._extension.prop.MaxWidth, { hidden: true } ],
                    [ OP3.Elements._extension.prop.MinHeight, { attr: { "data-property-type": "range", "data-units": "px, vh", "data-min-px": "0", "data-min-vh": "0", "data-max-px": "2000", "data-max-vh": "100", "data-step-px": "1", "data-step-vh": "1", "data-precision-px": "0", "data-precision-vh": "0", }, units: ["px", "vh",], defaultUnit: "px", } ],
                    [ OP3.Elements._extension.prop.MatchScreenHeight ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Align Content") } ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]" } ],

                    // Hover Tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],
                    // Hover Tab - Background - Media - Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: 'backgroundImageHover', selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { id: "backgroundImageHoverUrl" } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "opacityHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacityHover100" }],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "backgroundPositionHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "backgroundAttachmentHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "backgroundRepeatHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "backgroundSizeHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    // Hover Tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover Tab - Border
                    [ OP3.Elements._extension.prop.BorderActive, { id:"borderActiveHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "borderAllStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "borderAllColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomRightRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],

                    // Link Properties - title
                    [ OP3.Elements._extension.prop.FontFamily, { id: "titleFontFamily", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColor", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "titleFontSize", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "titleLineHeight", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "titleLetterSpacing", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeight", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyle", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransform", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecoration", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "titleTextAlign", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "titleTextShadow", selector: ' .op3-element[data-op3-element-spec="title"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "titleBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "titleMarginTop", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "titleMarginBottom", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "titleMarginLeft", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "titleMarginRight", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "titlePaddingTop", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "titlePaddingBottom", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "titlePaddingLeft", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "titlePaddingRight", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "titleMaxWidth", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "titleDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "titleTransitionDuration", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColorHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeightHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyleHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransformHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - text
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textFontFamily", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textFontSize", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textLineHeight", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textLetterSpacing", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeight", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyle", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransform", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecoration", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "textTextAlign", selector: ' .op3-element[data-op3-element-spec="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "textBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textMarginTop", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textMarginBottom", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textMarginLeft", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textMarginRight", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textPaddingTop", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textPaddingBottom", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textPaddingLeft", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textPaddingRight", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "textMaxWidth", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "textBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "textBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "textBorderTopColor", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "textBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "textBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "textBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "textBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "textBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "textBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "textBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "textBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "textBorderRightColor", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "textBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "textBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "textBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "textBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - Number Block Item
                    [ OP3.Elements._extension.prop.Color, { id: "numberBlockItemColor", selector: ' .op3-element[data-op3-element-type="numberblockitem"] .op3-numberblock-number' } ],
                    // [ OP3.Elements._extension.prop.BackgroundImageType, { id: "numberBlockItemBackgroundNumberImageBaseType",  selector: ' .op3-element[data-op3-element-type="numberblockitem"] ' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundNumberImageBase", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "numberBlockItemBackgroundNumberColorBase", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "numberBlockItemBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundImage", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "numberBlockItembackgroundImageDisplay", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "numberBlockItemOpacity", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "numberBlockItemBackgroundPosition", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "numberBlockItemBackgroundAttachment", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "numberBlockItemBackgroundRepeat", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "numberBlockItemBackgroundSize", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "numberBlockItemBackgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "numberBlockItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "numberBlockItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "numberBlockItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "numberBlockItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "numberBlockItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "numberBlockItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "numberBlockItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "numberBlockItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "numberBlockItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "numberBlockItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "numberBlockItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "numberBlockItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "numberBlockItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "numberBlockItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "numberBlockItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "numberBlockItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "numberBlockItemBoxShadow", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "numberBlockItemMarginTop", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "numberBlockItemMarginBottom", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "numberBlockItemMarginLeft", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "numberBlockItemMarginRight", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "numberBlockItemPaddingTop", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "numberBlockItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "numberBlockItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "numberBlockItemPaddingRight", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "numberBlockItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="numberblockitem"], .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "numberBlockItemBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "numberBlockItemBackgroundPositionHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "numberBlockItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "numberBlockItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "numberBlockItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "numberBlockItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "numberBlockItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "numberBlockItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "numberBlockItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "numberBlockItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "numberBlockItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "numberBlockItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "numberBlockItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "numberBlockItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "numberBlockItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "numberBlockItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "numberBlockItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "numberBlockItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "numberBlockItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "numberBlockItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "numberBlockItemBoxShadowHover", selector: ' .op3-element[data-op3-element-type="numberblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                ];
            },

        },

    });

    // Refresh margin values based on the layout,
    // since we're forcing margin to 0 for
    // different layouts
    OP3.bind("elementchange::numberblock::blockLayoutDesktop elementchange::numberblock::blockLayoutTablet elementchange::numberblock::blockLayoutMobile", function (e, o) {
        if (OP3.Designer.activeElement().node() === o.node)
            OP3.transmit("elementoptionssyncrequest", { property: [ "marginLeftNumber", "marginRightNumber", "marginBottomNumber" ] } );
    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    OP3.bind("elementoptionssync::numberblock::blockLayoutDesktop elementoptionssync::numberblock::blockLayoutTablet elementoptionssync::numberblock::blockLayoutMobile", function(e, o) {
        $(o.parent).attr("data-op3-parent-options-property-value-" + o.id.toLowerCase(), o.value);
    });

    // Refresh margin values based on the layout,
    // since we're forcing margin to 0 for
    // different layouts
    OP3.bind("elementchange::numberblock::numberblockFrame", function (e, o) {
        var element = OP3.$(o.node);

        // Refresh outline width, since it's forced to 0 on 'filled' and 'none'
        if (OP3.Designer.activeElement().node() === o.node)
            OP3.transmit("elementoptionssyncrequest", { property: [ "borderAllWidthNumber" ] } );

        // Reset background image type for child elements (because there's no
        // case where we want to keep linear-gradient on change).
        // We reset 'backgroundImageType' property instead of 'background' because it works
        // smartly and copies a color from linear-gradient to background-color
        // !!! UPDATE: Commented out because it no longer works
        // !!! after link properties were implemented
        // element.children("numberblockitem").each(function() {
        //     OP3.$(this).setOption('backgroundNumberImageBaseType', 'none', o.media);
        // });

        // To filled
        if (o.value.before !== "filled" && o.value.after === "filled") {
            var color = element.getOption('numberBlockItemColor', true);
            element.setOption('numberBlockItemColor', "#fff", o.media);
            element.setOption('numberBlockItemBackgroundNumberColorBase', color, o.media);
        }

        // To outline / none
        if (o.value.before === "filled" && o.value.after !== "filled") {
            var color = element.getOption('numberBlockItemBackgroundNumberColorBase', true);
            element.setOption('numberBlockItemColor', color, o.media);
            element.setOption('numberBlockItemBackgroundNumberColorBase', null, o.media);
        }
    });

    // if we change number of columns (flexBasisSteps)
    // and number of items is lower than number of columns
    // we auto create new items to match the number of columns
    OP3.bind("elementchange::numberblock::flexBasisSteps", function (e, o) {
        var realValues = {
                "100%"   : 1,
                "50%"    : 2,
                "33.33%" : 3,
                "25%"    : 4
            },
            element = OP3.$(o.node),
            nrItems = element.find("numberblockitem").length,
            curValue = element.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue) {
            var nr = realValue - nrItems;
            if (nr > 0) {
                var last = element.find("numberblockitem:last-child");
                for (var i = 0; i < nr; i++) {
                    OP3.$("<_numberblockitem_template />")
                        .insertAfter(last);
                }
            }
        }
    });

    // If new item is deleted from the Number Block Element
    // and number of items < 4
    // adjust flexBasisSteps property to
    // number of number block items
    OP3.bind("elementdetach::numberblockitem elementremove::numberblockitem", function(e, o) {
        var parentElement = OP3.$(o.parent);

        // if the last item is removed, the whole element is detached
        // so we are bailing out
        if (! parentElement.jq().parent().length)
            return;

        var realValues = {
                "100%"   : 1,
                "50%"    : 2,
                "33.33%" : 3,
                "25%"    : 4
            },
            values = ["100%", "50%", "33.33%", "25%"],
            nrItems = parentElement.find("numberblockitem").length,
            curValue = parentElement.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue && nrItems <= 4) {
            parentElement.setOption("flexBasisSteps", values[nrItems - 1]);
        }
    });

    OP3.bind("elementdrop::numberblock", function(e, o) {
        OP3.ElementLayouts.show(e, o, function(e, $source, $template) {
            // insert columns
            var count = $(e.currentTarget).attr("data-layout")*1;
            while (count && count > $source.children().length) {
                OP3.$("<_numberblockitem_template />")
                    .appendTo($source);
            }

            // remove columns
            while (count && count < $source.children().length) {
                $source
                    .children()
                    .last()
                        .detach();
            }

            // show design picker?
            var config = $source.config();
            if (!config.showStylePickerOnDrop && config && (config.style || (config.presets && config.presets.length))) {
                OP3.LiveEditor.sidebarTabOpen("design", true);
                OP3.LiveEditor.sidebarShow();
            }

            // Set item width to the element to allow adding
            // new items without changing the layout
            var values = { 1: '100%', 2: '50%', 3: '33.33%', 4: '25%' };
            var activeElement = OP3.Designer.activeElement();
            activeElement.setOption("flexBasis", values[count]);

            if ($source.element().node() === activeElement.node())
                OP3.transmit("elementoptionssyncrequest", { property: [ "flexBasisSteps" ] });
        });
    });

    OP3.bind("elementunfocus::numberblock", function(e, o) {
        OP3.ElementLayouts.destroy(e, o);
    })

})(jQuery, window, document);
