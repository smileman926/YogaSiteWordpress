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

        // Layouts 9 & 10 have been removed as per OP3-1105,
        // but to make the code backward-compatible,
        // layout 9 uses CSS from layout 7 and
        // layout 10  uses CSS from layout 8
        // { "9": "Layout #9" },
        // { "10": "Layout #10" },
    ];

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Testimonial = OP3.defineClass({

        Name: "OP3.Element.Testimonial",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "testimonial",

            _props: function() {
                return [
                    // Children display
                    [ OP3.Elements._extension.prop.BlockDisplayTitle, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    //[ OP3.Elements._extension.prop.BlockDisplayText, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayAvatar, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayAuthor, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayCompany, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayLogo, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Presets
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
                    [ OP3.Elements._extension.prop.FlexBasis, { label: OP3._("Min Column Width"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"]', attr: { "data-property-type": "range", "data-units": "px,%", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%"], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FlexBasisSteps, { selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"]', } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Column Gutter") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content' } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
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
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightColorHover"  } ],
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
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle" } ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset" } ],

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
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="text"]' } ],
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
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="text"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - avatar
                    [ OP3.Elements._extension.prop.Width, { id: "avatarWidth", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "avatarBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-spec="avatar"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="avatar"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "avatarBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="avatar"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="avatar"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "avatarBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "avatarBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "avatarBorderTopColor", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "avatarBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "avatarBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "avatarBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "avatarBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "avatarBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "avatarBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "avatarBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "avatarBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "avatarBorderRightColor", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "avatarBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "avatarBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "avatarBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "avatarBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "avatarBoxShadow", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "avatarMarginTop", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "avatarMarginBottom", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "avatarMarginLeft", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "avatarMarginRight", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "avatarPaddingTop", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "avatarPaddingBottom", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "avatarPaddingLeft", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "avatarPaddingRight", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "avatarMaxWidth", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "avatarDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="avatar"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "avatarTransitionDuration", selector: ' .op3-element[data-op3-element-spec="avatar"] .op3-image-overlay-container, .op3-element[data-op3-element-spec="avatar"] [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "avatarBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-spec="avatar"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "avatarBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-spec="avatar"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "avatarBorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "avatarBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "avatarBorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "avatarBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "avatarBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "avatarBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "avatarBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "avatarBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "avatarBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "avatarBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "avatarBorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "avatarBorderRightColorHover" , selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "avatarBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "avatarBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "avatarBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "avatarBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "avatarBoxShadowHover", selector: ' .op3-element[data-op3-element-spec="avatar"]:hover .op3-image-overlay-container' } ],

                    // Link Properties - author
                    [ OP3.Elements._extension.prop.FontFamily, { id: "authorFontFamily", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "authorColor", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "authorFontSize", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "authorLineHeight", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "authorLetterSpacing", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "authorFontWeight", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "authorFontStyle", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "authorTextTransform", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "authorTextDecoration", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "authorTextAlign", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "authorTextShadow", selector: ' .op3-element[data-op3-element-spec="author"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "authorBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "authorMarginTop", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "authorMarginBottom", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "authorMarginLeft", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "authorMarginRight", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "authorPaddingTop", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "authorPaddingBottom", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "authorPaddingLeft", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "authorPaddingRight", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "authorMaxWidth", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "authorBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "authorBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "authorBorderTopColor", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "authorBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "authorBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "authorBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "authorBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "authorBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "authorBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "authorBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "authorBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "authorBorderRightColor", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "authorBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "authorBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "authorBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "authorBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "authorDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="author"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "authorTransitionDuration", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "authorColorHover", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "authorFontWeightHover", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "authorFontStyleHover", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "authorTextTransformHover", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "authorTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="author"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - company
                    [ OP3.Elements._extension.prop.FontFamily, { id: "companyFontFamily", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "companyColor", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "companyFontSize", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "companyLineHeight", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "companyLetterSpacing", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "companyFontWeight", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "companyFontStyle", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "companyTextTransform", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "companyTextDecoration", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "companyTextAlign", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "companyTextShadow", selector: ' .op3-element[data-op3-element-spec="company"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "companyBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "companyMarginTop", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "companyMarginBottom", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "companyMarginLeft", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "companyMarginRight", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "companyPaddingTop", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "companyPaddingBottom", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "companyPaddingLeft", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "companyPaddingRight", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "companyMaxWidth", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "companyBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "companyBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "companyBorderTopColor", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "companyBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "companyBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "companyBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "companyBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "companyBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "companyBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "companyBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "companyBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "companyBorderRightColor", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "companyBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "companyBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "companyBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "companyBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "companyDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="company"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "companyTransitionDuration", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "companyColorHover", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "companyFontWeightHover", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "companyFontStyleHover", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "companyTextTransformHover", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "companyTextDecorationHover", selector: ' .op3-element[data-op3-element-spec="company"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - logo
                    [ OP3.Elements._extension.prop.Width, { id: "logoWidth", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "logoBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-spec="logo"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="logo"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "logoBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-spec="logo"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-spec="logo"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "logoBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "logoBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "logoBorderTopColor", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "logoBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "logoBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "logoBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "logoBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "logoBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "logoBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "logoBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "logoBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "logoBorderRightColor", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "logoBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "logoBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "logoBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "logoBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "logoBoxShadow", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "logoMarginTop", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "logoMarginBottom", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "logoMarginLeft", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "logoMarginRight", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "logoPaddingTop", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "logoPaddingBottom", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "logoPaddingLeft", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "logoPaddingRight", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "logoMaxWidth", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "logoDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="logo"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "logoTransitionDuration", selector: ' .op3-element[data-op3-element-spec="logo"] .op3-image-overlay-container, .op3-element[data-op3-element-spec="logo"] [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "logoBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-spec="logo"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "logoBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-spec="logo"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "logoBorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "logoBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "logoBorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "logoBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "logoBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "logoBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "logoBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "logoBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "logoBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "logoBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "logoBorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "logoBorderRightColorHover" , selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "logoBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "logoBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "logoBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "logoBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "logoBoxShadowHover", selector: ' .op3-element[data-op3-element-spec="logo"]:hover .op3-image-overlay-container' } ],

                    // Link Properties - testimonialItem
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "testimonialItemBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "testimonialItemBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "testimonialItemBackgroundImage", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "testimonialItembackgroundImageDisplay", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "testimonialItemOpacity", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "testimonialItemBackgroundPosition", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "testimonialItemBackgroundAttachment", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "testimonialItemBackgroundRepeat", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "testimonialItemBackgroundSize", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "testimonialItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "testimonialItemBackgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "testimonialItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "testimonialItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "testimonialItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "testimonialItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "testimonialItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "testimonialItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "testimonialItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "testimonialItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "testimonialItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "testimonialItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "testimonialItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "testimonialItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "testimonialItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "testimonialItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "testimonialItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "testimonialItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "testimonialItemBoxShadow", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "testimonialItemMarginTop", selector: ' .op3-element[data-op3-element-type="testimonialitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "testimonialItemMarginBottom", selector: ' .op3-element[data-op3-element-type="testimonialitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "testimonialItemMarginLeft", selector: ' .op3-element[data-op3-element-type="testimonialitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "testimonialItemMarginRight", selector: ' .op3-element[data-op3-element-type="testimonialitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "testimonialItemPaddingTop", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "testimonialItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "testimonialItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "testimonialItemPaddingRight", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { id: "testimonialItemMinHeight", selector: ' .op3-element[data-op3-element-type="testimonialitem"]' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "testimonialItemJustifyContent", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.ColumnGap, { id: "testimonialItemColumnGap", selector: ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "testimonialItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="testimonialitem"], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "testimonialItemBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "testimonialItemBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "testimonialItemBackgroundPositionHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "testimonialItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "testimonialItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "testimonialItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "testimonialItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "testimonialItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "testimonialItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "testimonialItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "testimonialItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "testimonialItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "testimonialItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "testimonialItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "testimonialItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "testimonialItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "testimonialItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "testimonialItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "testimonialItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "testimonialItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "testimonialItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "testimonialItemBoxShadowHover", selector: ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                ];
            },

        },

    });

    // if we change number of columns (flexBasisSteps)
    // and number of items is lower than number of columns
    // we auto create new items to match the number of columns
    OP3.bind("elementchange::testimonial::flexBasisSteps", function (e, o) {
        var realValues = {
                "100%"   : 1,
                "50%"    : 2,
                "33.33%" : 3,
                "25%"    : 4
            },
            element = OP3.$(o.node),
            nrItems = element.find("testimonialitem").length,
            curValue = element.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue) {
            var nr = realValue - nrItems;
            if (nr > 0) {
                var last = element.find("testimonialitem:last-child");
                for (var i = 0; i < nr; i++) {
                    OP3.$("<_testimonialitem_template />")
                        .insertAfter(last);
                }
            }
        }
    });

    // If new item is deleted from the Number Block Element
    // and number of items < 4
    // adjust flexBasisSteps property to
    // number of number block items
    OP3.bind("elementdetach::testimonialitem elementremove::testimonialitem", function(e, o) {
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
            nrItems = parentElement.find("testimonialitem").length,
            curValue = parentElement.getOption("flexBasisSteps"),
            realValue = realValues[curValue];

        if (nrItems < realValue && nrItems <= 4) {
            parentElement.setOption("flexBasisSteps", values[nrItems - 1]);
        }
    });

    OP3.bind("elementdrop::testimonial", function(e, o) {
        OP3.ElementLayouts.show(e, o, function(e, $source, $template) {
            // insert columns
            var count = $(e.currentTarget).attr("data-layout")*1;
            while (count && count > $source.children().length) {
                OP3.$("<_testimonialitem_template />")
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

    OP3.bind("elementunfocus::testimonial", function(e, o) {
        OP3.ElementLayouts.destroy(e, o);
    })

})(jQuery, window, document);
