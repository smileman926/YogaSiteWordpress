/**
 * OptimizePress3 element type:
 * op3 element type membershipcontetlist manipulation.
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
     * Block layouts used for desktop/tablet/mobile
     */
    var _blockLayout = [
        { "0": "Layout #0" },
        { "1": "Layout #1" },
        { "4": "Layout #4" },
        { "5": "Layout #5" },
    ];

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.MembershipContentList = OP3.defineClass({

        Name: "OP3.Element.MembershipContentList",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "membershipcontentlist",

            _props: function() {
                return [
                    [OP3.Elements._extension.prop.MembershipShowPageChildren],
                    [OP3.Elements._extension.prop.MembershipInfo],
                    [OP3.Elements._extension.prop.MembershipSort],
                    [OP3.Elements._extension.prop.MembershipProduct],
                    [OP3.Elements._extension.prop.MembershipCategory],
                    // Children display
                    [ OP3.Elements._extension.prop.BlockDisplayLogo, { label: OP3._("Display Image"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayText, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

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
                    [ OP3.Elements._extension.prop.FlexBasis, { label: OP3._("Min Column Width"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="membershipcontentlistitem"]', attr: { "data-property-type": "range", "data-units": "px,%", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%"], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FlexBasisSteps, { selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="membershipcontentlistitem"]', } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Column Gutter") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],

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
                    [ OP3.Elements._extension.prop.FontFamily, { id: "titleFontFamily", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColor", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "titleFontSize", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "titleLineHeight", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "titleLetterSpacing", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeight", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyle", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransform", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecoration", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "titleTextAlign", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "titleTextShadow", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "titleBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="headline"]  .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "titleMarginTop", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "titleMarginBottom", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "titleMarginLeft", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "titleMarginRight", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "titlePaddingTop", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "titlePaddingBottom", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "titlePaddingLeft", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "titlePaddingRight", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "titleMaxWidth", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "titleBorderTopWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "titleBorderTopStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "titleBorderTopColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "titleBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "titleBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "titleBorderBottomColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "titleBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "titleBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "titleBorderLeftColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "titleBorderRightWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "titleBorderRightStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "titleBorderRightColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "titleBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "titleBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "titleBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "titleBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "titleDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "titleTransitionDuration", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColorHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeightHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyleHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransformHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecorationHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - text
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textFontFamily", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textFontSize", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textLineHeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textLetterSpacing", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyle", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransform", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecoration", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "textTextAlign", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "textBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="text"]  .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textMarginTop", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textMarginBottom", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textMarginLeft", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textMarginRight", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textPaddingTop", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textPaddingBottom", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textPaddingLeft", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textPaddingRight", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "textMaxWidth", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "textBorderTopWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "textBorderTopStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "textBorderTopColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "textBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "textBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "textBorderBottomColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "textBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "textBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "textBorderLeftColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "textBorderRightWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "textBorderRightStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "textBorderRightColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "textBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "textBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "textBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "textBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],

                    // Link Properties - image
                    [ OP3.Elements._extension.prop.Width, { id: "imageWidth", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadow", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "imageMarginTop", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "imageMarginBottom", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "imageMarginLeft", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "imageMarginRight", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "imagePaddingTop", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "imagePaddingBottom", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "imagePaddingLeft", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "imagePaddingRight", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "imageMaxWidth", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "imageDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "imageTransitionDuration", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container, .op3-element[data-op3-element-type="image"] [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadowHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],

                    // Link Properties - membershipContentListItem
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "membershipContentListItemBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "membershipContentListItemBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "membershipContentListItemBackgroundImage", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "membershipContentListItemBackgroundImageDisplay", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "membershipContentListItemOpacity", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "membershipContentListItemBackgroundPosition", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "membershipContentListItemBackgroundAttachment", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "membershipContentListItemBackgroundRepeat", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "membershipContentListItemBackgroundSize", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "membershipContentListItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "membershipContentListItemBackgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "membershipContentListItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "membershipContentListItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "membershipContentListItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "membershipContentListItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "membershipContentListItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "membershipContentListItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "membershipContentListItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "membershipContentListItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "membershipContentListItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "membershipContentListItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "membershipContentListItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "membershipContentListItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "membershipContentListItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "membershipContentListItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "membershipContentListItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "membershipContentListItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "membershipContentListItemBoxShadow", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "membershipContentListItemMarginTop", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "membershipContentListItemMarginBottom", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "membershipContentListItemMarginLeft", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "membershipContentListItemMarginRight", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "membershipContentListItemPaddingTop", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "membershipContentListItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "membershipContentListItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "membershipContentListItemPaddingRight", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { id: "membershipContentListItemMinHeight", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "membershipContentListItemJustifyContent", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content' } ],
                    [ OP3.Elements._extension.prop.ColumnGap, { id: "membershipContentListItemColumnGap", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "membershipContentListItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="membershipcontentlistitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "membershipContentListItemBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "membershipContentListItemBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "membershipContentListItemBackgroundPositionHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "membershipContentListItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "membershipContentListItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "membershipContentListItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "membershipContentListItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "membershipContentListItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "membershipContentListItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "membershipContentListItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "membershipContentListItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "membershipContentListItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "membershipContentListItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "membershipContentListItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "membershipContentListItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "membershipContentListItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "membershipContentListItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "membershipContentListItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "membershipContentListItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "membershipContentListItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "membershipContentListItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "membershipContentListItemBoxShadowHover", selector: ' .op3-element[data-op3-element-type="membershipcontentlistitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' } ],
                ];
            },
        },

    });

    // wrapped with function so we bind
    // events after OP3.Map does
    $(function() {
        OP3.bind("elementdrop::membershipcontentlist", function (e, o) {
            if (typeof o.source !== "string")
                return;

            var element = OP3.$(o.target);
            var render = OP3.MembershipPages.renderTree();

            element.children().each(function() {
                OP3.$(this).detach();
            });

            render.forEach(function(node) {
                OP3.$(node).appendTo(element);
            });

            // if nothing to render, open a wizard
            if (!render.length) {
                setTimeout(OP3.Membership.openWizard);
            }
        });
    });

})(jQuery, window, document);
