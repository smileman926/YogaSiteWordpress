/**
 * OptimizePress3 element type:
 * op3 element type numberBlockItem manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - flex-grid-cell-sizer.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/align-self/js/op3-property.js
 *     - properties/background-color/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/text-align/js/op3-property.js
 *     - properties/width/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.NumberBlockItem = OP3.defineClass({

        Name: "OP3.Element.NumberBlockItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "numberblockitem",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-numberblock-number" } ],

                    // Number background
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundNumberImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundNumberImageBase", selector: ' > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::before, > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundNumberColorBase", selector: ' > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::before, > .op3-column-content > [data-op3-element-container] > .op3-numberblock-number > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundNumberImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundNumberImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundNumberImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundNumberImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundNumberImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundNumberImageBaseStopPosition" } ],

                    // Style tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],
                    // Style tab - Background - Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    // Style tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth ],
                    [ OP3.Elements._extension.prop.BorderAllStyle ],
                    [ OP3.Elements._extension.prop.BorderAllColor ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Positioning
                    // BoxModel is visible only on mobile and tablet
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Column Gutter") } ],
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " > .op3-column-content" } ],

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    [ OP3.Elements._extension.prop.WrapColumns, { serialize: false } ],
                    [ OP3.Elements._extension.prop.FlexBasisColumn, { label: OP3._("Min Column Width"), attr: { "data-property-type": "range", "data-units": "px,%", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: ["px", "%"], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { serialize: false } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { serialize: false } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { serialize: false } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { serialize: false } ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > .op3-background-parent > [data-op3-element-container], > .op3-background-parent > [data-op3-element-container] > [data-op3-border], > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]" } ],

                    // Hover Tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],
                    // Hover Tab - Background - Media - Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: 'backgroundImageHover', selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { id: "backgroundImageHoverUrl" } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "opacityHover", selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacityHover100" } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "backgroundPositionHover", selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "backgroundAttachmentHover", selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "backgroundRepeatHover", selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "backgroundSizeHover", selector: ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    // Hover Tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover tab - Border
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderRightColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderAllWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderAllStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: ":hover > .op3-column-content > [data-op3-element-container],:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderAllColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomRightRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],
                ];
            },

        },

    });

})(jQuery, window, document);
