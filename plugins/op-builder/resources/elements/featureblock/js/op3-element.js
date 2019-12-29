/**
 * OptimizePress3 element type:
 * op3 element type row manipulation.
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
        { "0": "Layout #0" },
        { "1": "Layout #1" },
        { "2": "Layout #2" },
        { "3": "Layout #3" },
        { "4": "Layout #4" },
        { "5": "Layout #5" },
        { "6": "Layout #6" },
        { "7": "Layout #7" },
        { "8": "Layout #8" },
        { "9": "Layout #9" },
        { "10": "Layout #10" },
        { "11": "Layout #11" },
    ];

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.FeatureBlock = OP3.defineClass({

        Name: "OP3.Element.FeatureBlock",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "featureblock",

            _props: function() {
                return [
                    // Children display
                    [ OP3.Elements._extension.prop.BlockDisplayMedia, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    //[ OP3.Elements._extension.prop.BlockDisplayTitle, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplaySubtitle, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayText, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayButton, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Block layout
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],

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
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],
                    [ OP3.Elements._extension.prop.WrapColumns, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.FlexBasis, { label: OP3._("Min Column Width"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="featureblockitem"]', attr: { "data-property-type": "range", "data-units": "px,%", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%"], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FlexBasisSteps, { selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="featureblockitem"]', } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Column Gutter") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="featureblockitem"] > .op3-column-content' } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

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
                    [ OP3.Elements._extension.prop.Width, {
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, %",
                            "data-min-px": "0",
                            "data-min-percent": "0",
                            "data-max-px": "2000",
                            "data-max-percent": "100",
                            "data-step-px": "1",
                            "data-step-percent": "1",
                            "data-precision-px": "0",
                            "data-precision-percent": "0",
                        },
                        units: [
                            "px",
                            "%",
                        ],
                    }],
                    [ OP3.Elements._extension.prop.MatchScreenWidth ],
                    [ OP3.Elements._extension.prop.MaxWidth, { hidden: true } ],
                    [ OP3.Elements._extension.prop.MinHeight, {
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
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]"} ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX"} ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],

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
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "titleBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "titleMarginTop", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "titleMarginBottom", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "titleMarginLeft", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "titleMarginRight", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "titlePaddingTop", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "titlePaddingBottom", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "titlePaddingLeft", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "titlePaddingRight", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "titleMaxWidth", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "titleBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "titleBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "titleBorderTopColor", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "titleBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "titleBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "titleBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "titleBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "titleBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "titleBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "titleBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "titleBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "titleBorderRightColor", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "titleBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "titleBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "titleBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "titleBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "titleDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="title"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "titleTransitionDuration", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColorHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeightHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyleHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransformHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="title"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - subtitle
                    [ OP3.Elements._extension.prop.FontFamily, { id: "subtitleFontFamily", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "subtitleColor", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "subtitleFontSize", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "subtitleLineHeight", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "subtitleLetterSpacing", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "subtitleFontWeight", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "subtitleFontStyle", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "subtitleTextTransform", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "subtitleTextDecoration", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "subtitleTextAlign", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "subtitleTextShadow", selector: ' .op3-element[data-op3-element-spec="subtitle"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "subtitleBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "subtitleMarginTop", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "subtitleMarginBottom", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "subtitleMarginLeft", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "subtitleMarginRight", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "subtitlePaddingTop", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "subtitlePaddingBottom", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "subtitlePaddingLeft", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "subtitlePaddingRight", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "subtitleMaxWidth", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "subtitleBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "subtitleBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "subtitleBorderTopColor", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "subtitleBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "subtitleBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "subtitleBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "subtitleBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "subtitleBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "subtitleBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "subtitleBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "subtitleBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "subtitleBorderRightColor", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "subtitleBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "subtitleBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "subtitleBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "subtitleBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="subtitle"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "subtitleDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="subtitle"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "subtitleTransitionDuration", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "subtitleColorHover", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "subtitleFontWeightHover", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "subtitleFontStyleHover", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "subtitleTextTransformHover", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "subtitleTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="subtitle"]:hover [data-op3-contenteditable] > *' } ],

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

                    // Link Properties - icon
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "iconLineHeight", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Padding, { id: "iconPadding", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "iconBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "iconBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "iconBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "iconBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColor", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColor", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "iconMarginTop", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "iconMarginBottom", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "iconMarginLeft", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "iconMarginRight", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "iconPaddingTop", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "iconPaddingBottom", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "iconPaddingLeft", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "iconPaddingRight", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="icon"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "iconTransitionDuration", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container, .op3-element[data-op3-element-spec="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon', label: OP3._("Icon Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColorHover", selector: ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColorHover", selector: ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "iconOp3Icon", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconFrame, { id: "iconIconFrame", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconShape, { id: "iconIconShape", selector: ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', serialize: false } ],

                    // Link Properties - image
                    [ OP3.Elements._extension.prop.Width, { id: "imageWidth", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-spec="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColor", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColor", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadow", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "imageMarginTop", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "imageMarginBottom", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "imageMarginLeft", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "imageMarginRight", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "imagePaddingTop", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "imagePaddingBottom", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "imagePaddingLeft", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "imagePaddingRight", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "imageMaxWidth", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "imageDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="image"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "imageTransitionDuration", selector: ' .op3-element[data-op3-element-spec="image"] .op3-image-overlay-container, .op3-element[data-op3-element-spec="image"] [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-spec="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-spec="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColorHover" , selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadowHover", selector: ' .op3-element[data-op3-element-spec="image"]:hover .op3-image-overlay-container' } ],

                    // Link Properties - button
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColor", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "buttonMaxWidth", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "buttonHeight", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-spec="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "buttonFontFamily", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSize", selector: ' .op3-element[data-op3-element-spec="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "buttonLineHeight", selector: ' .op3-element[data-op3-element-spec="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacing", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeight", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyle", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransform", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecoration", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "buttonButtonAlignText", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonSubtextDisplay", selector: ' .op3-element[data-op3-element-spec="button"] .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeightSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyleSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransformSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecorationSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSizeSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacingSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonOffsetXSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonOffsetYSubtext", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplay", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "buttonOp3Icon", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColor", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonIconSize", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "buttonIconDirection", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "buttonIconSpacing", selector: ' .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColor", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColor", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadow", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowInset", selector: ' .op3-element[data-op3-element-spec="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "buttonTextShadow", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonMarginTop", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "buttonMarginBottom", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonMarginLeft", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonMarginRight", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "buttonPaddingTop", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "buttonPaddingBottom", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "buttonPaddingLeft", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "buttonPaddingRight", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonHorizontalSpacingLeft", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonHorizontalSpacingRight", selector: ' .op3-element[data-op3-element-spec="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="button"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "buttonTransitionDuration", selector: ' .op3-element[data-op3-element-spec="button"] > a, .op3-element[data-op3-element-spec="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "buttonFilterHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColorHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColorHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover > .op3-text-container > i' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-spec="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-spec="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColorHover" , selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowHover", selector: ' .op3-element[data-op3-element-spec="button"] > a:hover' } ],

                    // Link Properties - featureBlockItem
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "featureBlockItemBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "featureBlockItemBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "featureBlockItemBackgroundImage", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "featureBlockItemBackgroundImageDisplay", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "featureBlockItemOpacity", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "featureBlockItemBackgroundPosition", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "featureBlockItemBackgroundAttachment", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "featureBlockItemBackgroundRepeat", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "featureBlockItemBackgroundSize", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "featureBlockItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "featureBlockItemBackgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "featureBlockItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "featureBlockItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "featureBlockItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "featureBlockItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "featureBlockItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "featureBlockItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "featureBlockItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "featureBlockItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "featureBlockItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "featureBlockItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "featureBlockItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "featureBlockItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "featureBlockItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "featureBlockItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "featureBlockItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "featureBlockItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "featureBlockItemBoxShadow", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "featureBlockItemMarginTop", selector: ' .op3-element[data-op3-element-type="featureblockitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "featureBlockItemMarginBottom", selector: ' .op3-element[data-op3-element-type="featureblockitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "featureBlockItemMarginLeft", selector: ' .op3-element[data-op3-element-type="featureblockitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "featureBlockItemMarginRight", selector: ' .op3-element[data-op3-element-type="featureblockitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "featureBlockItemPaddingTop", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "featureBlockItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "featureBlockItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "featureBlockItemPaddingRight", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { id: "featureBlockItemMinHeight", selector: ' .op3-element[data-op3-element-type="featureblockitem"]' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "featureBlockItemJustifyContent", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.ColumnGap, { id: "featureBlockItemColumnGap", selector: ' .op3-element[data-op3-element-type="featureblockitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "featureBlockItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="featureblockitem"], .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="featureblockitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "featureBlockItemBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "featureBlockItemBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "featureBlockItemBackgroundPositionHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "featureBlockItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "featureBlockItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "featureBlockItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "featureBlockItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "featureBlockItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "featureBlockItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "featureBlockItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "featureBlockItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "featureBlockItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "featureBlockItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "featureBlockItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "featureBlockItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "featureBlockItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "featureBlockItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "featureBlockItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "featureBlockItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "featureBlockItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "featureBlockItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "featureBlockItemBoxShadowHover", selector: ' .op3-element[data-op3-element-type="featureblockitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                ];
            },

        },

    });

    // if we change number of columns (flexBasisSteps)
    // and number of items is lower than number of columns
    // we auto create new items to match the number of columns
    OP3.bind("elementchange::featureblock::flexBasisSteps", function (e, o) {
        var realValues = {
                "100%"   : 1,
                "50%"    : 2,
                "33.33%" : 3,
                "25%"    : 4
            },
            element = OP3.$(o.node),
            nrItems = element.find("featureblockitem").length,
            curValue = element.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue) {
            var nr = realValue - nrItems;
            if (nr > 0) {
                var last = element.find("featureblockitem:last-child");
                for (var i = 0; i < nr; i++) {
                    OP3.$("<_featureblockitem_template />")
                        .insertAfter(last);
                }
            }
        }
    });

    // If new item is deleted from the Number Block Element
    // and number of items < 4
    // adjust flexBasisSteps property to
    // number of number block items
    OP3.bind("elementdetach::featureblockitem elementremove::featureblockitem", function(e, o) {
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
            nrItems = parentElement.find("featureblockitem").length,
            curValue = parentElement.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue && nrItems <= 4) {
            parentElement.setOption("flexBasisSteps", values[nrItems - 1]);
        }
    });

    OP3.bind("elementdrop::featureblock", function(e, o) {
        OP3.ElementLayouts.show(e, o, function(e, $source, $template) {
            // insert columns
            var count = $(e.currentTarget).attr("data-layout")*1;
            while (count && count > $source.children().length) {
                OP3.$("<_featureblockitem_template />")
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

    OP3.bind("elementunfocus::featureblock", function(e, o) {
        OP3.ElementLayouts.destroy(e, o);
    });

    // sync children attr properties
    OP3.bind("elementappendfirst::featureblockitem", function(e, o) {
        var parent = OP3.$(o.parent);
        if (parent.type() !== "featureblock")
            return;

        var element = OP3.$(o.node);
        var sync = {
            'icon[spec="icon"]': {
                iconIconShape: "iconShape",
                iconIconFrame: "iconFrame",
            },
            'button[spec="button"]': {
                buttonOp3Icon: "op3Icon",
            },
        }

        for (var selector in sync) {
            var media = "all";
            var child = selector ? element.find(selector) : element;
            var link = child.getOption("linkProperties", "all");
            child.setOption("linkProperties", "0", "all");

            for (var proxy in sync[selector]) {
                var value = parent.getOption(proxy, media);
                child.setOption(sync[selector][proxy], value, "all");
            }

            child.setOption("linkProperties", link, "all");
        }
    });

})(jQuery, window, document);
