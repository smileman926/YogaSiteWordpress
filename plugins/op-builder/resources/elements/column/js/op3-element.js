/**
 * OptimizePress3 element type:
 * op3 element type column manipulation.
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
    OP3.Elements._extension.type.Column = OP3.defineClass({

        Name: "OP3.Element.Column",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "column",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Column Width"), defaultUnit: "%", hidden: true } ],
                    // [ OP3.Elements._extension.prop.AlignSelf, { label: OP3._("Column Align") } ],
                    [ OP3.Elements._extension.prop.TextAlign ],

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
                    // Style tab - Background - Video
                    [ OP3.Elements._extension.prop.BackgroundVideo, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="video"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundVideoDisplay", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="video"]' } ],
                    // Style tab - Background - Map
                    [ OP3.Elements._extension.prop.BackgroundMap, { selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="map"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundMapDisplay", selector: ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="map"]' } ],
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
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " > .op3-column-content" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " > .op3-column-content" } ],
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

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    [ OP3.Elements._extension.prop.WrapColumns, { serialize: false, selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.FlexBasisColumn, { label: OP3._("Min Column Width") } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { serialize: false, selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsTabletReverse, { serialize: false, selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { serialize: false, selector: ' > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobileReverse, { serialize: false, selector: ' > [data-op3-element-container] > [data-op3-children]' } ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration ],

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
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacityHover100" }],
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
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "borderAllStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "borderAllColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]", id: "borderBottomRightRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]"} ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX"} ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],
                ];
            },

            _pasteObject: function() {
                if (!OP3.LocalStorage)
                    return null;

                // let "paste column in column" acts like
                // "insert column after column"
                var source = OP3.LocalStorage.get("clipboard");
                if (source && source.type === "column")
                    return {
                        source: JSON.stringify(source),
                        destination: this.node(),
                        method: "insertAfter",
                    }

                // default behaviour
                return OP3.Elements._extension.type.Default.prototype._pasteObject.apply(this, arguments);
            },

        },

    });

    // init flex-grid-cell-sizer
    if (typeof $.fn.flexGridCellSizer === "function") {

        /**
         * Init flexGridCellSizer jQuery library
         * and reset each column style attribute
         * width (should be saved in stylesheet
         * by backend)
         */
        $(document)
            .ready(function() {
                $(OP3.$("row").babysitter())
                    .flexGridCellSizer()
                    .children(".jquery-flex-grid-cell-sizer-cell")
                        .width("");
            });

        /**
         * Handle cell size change on flexGridCellSizer
         * jQuery library: save each column width to
         * stylesheet and reset style attribute width
         */
        $("body")
            .on("jqueryflexgridcellsizerbeforedragstart", '.op3-element[data-op3-element-type="row"] > [data-op3-element-container] > [data-op3-children]', function(e) {
                $(this)
                    .children(".jquery-flex-grid-cell-sizer-cell")
                    .each(function() {
                        var element = OP3.$(this);
                        var value = null;
                        var mediaList = Object.values(OP3.LiveEditor._devices)
                        mediaList = mediaList.slice(0, mediaList.indexOf(OP3.LiveEditor.deviceMedia()) + 1);

                        while (value === null) {
                            var media = mediaList.pop();
                            value = element.getOption("width", media);

                            if (!mediaList.length)
                                break;
                        }

                        // the current width value is coded into style tag
                        // which can not be retreived by flexGridCellSizer
                        // library. let's temporarily add width to style
                        // attribute and make sure that flexGridCellSizer
                        // uses percentages
                        $(this).css("width", value);
                    });
            })
            .on("jqueryflexgridcellsizerdragstop", '.op3-element[data-op3-element-type="row"] > [data-op3-element-container] > [data-op3-children]', function(e) {
                $(this)
                    .children(".jquery-flex-grid-cell-sizer-cell")
                        .width("");
            })
            .on("jqueryflexgridcellsizerchange", '.op3-element[data-op3-element-type="row"] > [data-op3-element-container] > [data-op3-children]', function(e, o) {
                for (var i = 0; i < o.column.length; i++) {
                    var element = OP3.$(o.column[i].element);
                    var value = o.column[i].size.after;
                    var media = OP3.LiveEditor.deviceMedia();

                    // apply new sizes to op3 system
                    element.setOption("width", value, media);
                }
            });

        /**
         * Set dragging class on LiveEditor's html
         */
        $("body")
            .on("jqueryflexgridcellsizerdragstart", function(e, o) {
                OP3.LiveEditor.$ui.html
                    .addClass("jquery-flex-grid-cell-sizer-dragging");
            })
            .on("jqueryflexgridcellsizerdragstop", function(e, o) {
                OP3.LiveEditor.$ui.html
                    .removeClass("jquery-flex-grid-cell-sizer-dragging");
            });

        /**
         * Refresh flexGridCellSizer grid on
         * deviche change
         */
        OP3.bind("devicechange", function(e, o) {
            $(".jquery-flex-grid-cell-sizer")
                .flexGridCellSizer("refresh")
                .children(".jquery-flex-grid-cell-sizer-cell")
                    .width("");
        });

        /**
         * Refresh flexGridCellSizer grid on
         * some properties change
         */
        OP3.bind("elementchange::row::wrapColumns elementchange::row::stackColumnsTablet elementchange::row::stackColumnsTabletReverse elementchange::row::stackColumnsMobile elementchange::row::stackColumnsMobileReverse", function(e, o) {
            $(OP3.$(o.node).babysitter())
                .flexGridCellSizer("refresh")
                .children(".jquery-flex-grid-cell-sizer-cell")
                    .width("");
        });

        /**
         * Refresh flexGridCellSizer grid on
         * section/row layout change
         */
        OP3.bind("elementlayout::section elementlayout::row", function(e, o) {
            var row = OP3.$(o.node).filter("row");
            var child = OP3.$(o.node).find("row");
            var flex = row.add(child).babysitter();

            $(flex)
                .flexGridCellSizer("refresh")
                .children(".jquery-flex-grid-cell-sizer-cell")
                    .width("");
        });

        /**
         * Element type row appended:
         * init flexGridCellSizer jQuery library
         * on flex parent, save each column width
         * to stylesheet and reset style attribute
         * width
         */
        OP3.bind("elementappend", function(e, o) {
            var row = OP3.$(o.node).filter("row");
            var child = OP3.$(o.node).find("row");
            var flex = row.add(child).babysitter();
            var media = OP3.LiveEditor.deviceMedia();

            // initialize lib
            $(flex)
                .flexGridCellSizer()
                .each(function() {
                    // resetting width for single column (can
                    // happen on single column dragandrop)
                    var $cell = $(this).children(".jquery-flex-grid-cell-sizer-cell").width("");
                    if ($cell.length === 1)
                        OP3.$($cell).setOption("width", null, media);
                });
        });

        /**
         * Column has null value for op3's width by
         * default (it is written to css as 100%). We
         * need to convert null to real value width
         * so the math below will be accurate...
         */
        OP3.bind("elementdetach::column elementremove::column", function(e, o) {
            if (o.historyPending)
                return;

            var element = OP3.$(o.node);
            var width = element.getOption("width", "all");
            if (width)
                return;

            var parent = OP3.$(o.parent);
            var columns = parent.children("column");
            var percision = 4;
            var pow = Math.pow(10, percision);

            width = Math.round(100 * pow / (columns.length + 1)) / pow + "%";
            element.setOption("width", width, "all");
        });

        /**
         * Element type column appended/detach:
         * stretch columns and reload
         * flexGridCellSizer library
         */
        OP3.bind("elementappend::column elementdetach::column elementremove::column", function(e, o) {
            if (o.historyPending)
                return;

            var method = e.type.match(/^op3elementappend/) ? "append" : "detach",
                node = o.node,
                element = OP3.$(node),
                row = method === "detach" ? OP3.$(o.parent) : element.parent(),
                columns = row.children("column").add(node),
                media = Object.values(OP3.LiveEditor._devices),
                countAfter = columns.length,
                countBefore = countAfter + (method === "detach" ? 1 : -1),
                property = "width",
                percision = 4,
                unit = "%";

            // fix column index (detached column is
            // at the end of the array, put it on
            // the right index)
            if (method === "detach") {
                columns = columns.toArray();
                columns.splice(o.index, 0, columns.pop());
                columns = OP3.$(columns);
            }

            // get op3 grid state (before current column
            // append/detach) where column widths are
            // multiplied by 10pow4 so we avoid ieee
            // 754 problem
            var oldState = media.map(function(item, index) {
                return columns.toArray()
                    .filter(function(item) {
                        if (method === "append")
                            return item !== node;

                        return true;
                    })
                    .map(function(item) {
                        var value = OP3.$(item).getOption(property, media[index]);
                        if (value !== null)
                            value = Math.round(parseFloat(value) * Math.pow(10, percision));

                        return value;
                    });
            });

            // convert null values to real values for
            // first (desktop) media
            if (oldState && oldState[0] && !oldState[0].join(""))
                oldState[0] = oldState[0].map(function(item) {
                    var value = 100 / oldState[0].length;
                    value = Math.round(parseFloat(value) * Math.pow(10, percision));

                    return value;
                });

            // flag null values
            var nullState = oldState.map(function(item) {
                return item.map(function(value) {
                    return value === null;
                })
            });

            // there shouldn't be null values next to real
            // values 'cuz it will break our math
            oldState.forEach(function(list, index) {
                if (!list.join(""))
                    return;

                for (var i = 0; i < list.length; i++) {
                    if (list[i] !== null)
                        continue;

                    for (var j = index - 1; j >= 0; j--) {
                        list[i] = oldState[j][i];

                        if (list[i] !== null)
                            break;
                    }
                }
            });

            // new state - append/detach current column
            // to old state
            var newState = $.extend(true, [], oldState);
            newState.forEach(function(list, index) {
                if (method === "append") {
                    var value = element.getOption(property, media[index]);
                    if (value !== null) {
                        value = Math.round(parseFloat(value) * Math.pow(10, percision));
                    }
                    else if (!index) {
                        // value not set on any device, use avg value
                        // note: logically we need to use count after
                        // to calculate avrage value, but then the
                        // 'stretch (increase/decrease)' messes our
                        // layout. while using count before we have
                        // not-so-accurate-avg value, but the 'stretch'
                        // will fix this...
                        value = Math.round((100 * Math.pow(10, percision)) / countBefore);
                    }

                    // inherit value (if not null-array)
                    if (value === null && list.join("")) {
                        for (var i = index; i >= 0; i--) {
                            value = newState[i][o.index];

                            if (value !== null)
                                break;
                        }
                    }

                    list.splice(o.index, 0, value);
                }
                else
                    list.splice(o.index, 1);
            });

            // fix null values - append/detach current column
            nullState.forEach(function(list, index) {
                if (method === "append") {
                    var value = newState[index][o.index] === null;
                    list.splice(o.index, 0, value);
                }
                else
                    list.splice(o.index, 1);
            });

            // stretch (increase/decrease) each column width
            // so it fits 100%
            newState.forEach(function(list, index) {
                //var sumBefore = 100 * Math.pow(10, percision);
                var sumBefore = oldState[index].reduce(function(a, b) {
                    return (a || 0) + (b || 0);
                }, 0);
                if (!sumBefore)
                    return;

                var sumFixed = 0;
                var sumAfter = list.reduce(function(a, b) {
                    return (a || 0) + (b || 0);
                }, 0);

                for (var i = 0; i < list.length; i++) {
                    list[i] = Math.round(list[i] * (sumBefore / sumAfter));
                    sumFixed += list[i];
                }

                // we're using Math.round so there is a
                // possibility to have some small offset,
                // fix it by adjusting last column
                list[list.length - 1] += sumBefore - sumFixed;
            });

            // @todo - nullState

            // set column widths to op3 system
            columns = row.children("column");
            newState.forEach(function(list, mediaIndex) {
                list.forEach(function(item, columnIndex) {
                    if (item === null)
                        return;

                    var value = item / Math.pow(10, percision) + unit;
                    columns.eq(columnIndex).setOption(property, value, media[mediaIndex]);
                });
            });

            // ...finally, reload flexGridCellSizer library
            $(row.babysitter())
                .flexGridCellSizer("destroy")
                .flexGridCellSizer()
                .children(".jquery-flex-grid-cell-sizer-cell")
                    .width("");
        });

        /**
         * History undo/redo:
         * reload flexGridCellSizer library
         * if column width applied
         */
        OP3.bind("historyundo historyredo", function(e, o) {
            var row = [];
            o.data.forEach(function(item) {
                if (item.type !== "elementchange" || item.event.type !== "column" || item.event.name !== "width")
                    return;

                var node = OP3.$(item.event.node).closest("row").node();
                if (node && row.indexOf(node) === -1)
                    row.push(node);
            });

            // reload flexGridCellSizer library
            $(OP3.$(row).babysitter())
                .flexGridCellSizer("destroy")
                .flexGridCellSizer()
                .children(".jquery-flex-grid-cell-sizer-cell")
                    .width("");
        });

        /**
         * Element type column drop:
         * preserving width.
         */
        OP3.bind("elementdrop::column", function(e, o) {
            var $source = $(o.source);
            var $dest = $(o.destination);
            if (!$source.parent())
                return;

            var sameParent = false
                || ($source.parent().get(0) === $dest.parent().get(0) && (o.method === "insertBefore" || o.method === "insertAfter"))
                || ($source.parent().get(0) === $dest.get(0) && o.method === "appendTo");

            if (sameParent)
                $source.css("width", $source.width() + "px");
        });
    }

})(jQuery, window, document);
