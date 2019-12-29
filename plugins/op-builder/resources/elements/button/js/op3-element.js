/**
 * OptimizePress3 element type:
 * op3 element type button manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/background-color/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/display/js/op3-property.js
 *     - properties/href/js/op3-property.js
 *     - properties/text-align/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Button = OP3.defineClass({

        Name: "OP3.Element.Button",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "button",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.Color, { selector: " > a", label: OP3._("Text Colour") } ],
                    [ OP3.Elements._extension.prop.ButtonSize ],
                    [ OP3.Elements._extension.prop.MaxWidth, { label: OP3._("Button Width"), defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.Height, {
                        selector: " > a",
                        label: OP3._("Button Height"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "20",
                            "data-max-px": "200",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                            "data-avoid-text-max": "1",
                        },
                    }],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Button Align") } ],
                    [ OP3.Elements._extension.prop.Action, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.Href, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.Target, { selector: " > a", label: OP3._("Link Target") } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " > a", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.PopOverlayTrigger, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.SelectFunnelStep, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.CreateVideoPopoverlay ],

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

                    // Style Tab - Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        label: OP3._("Size"),
                        selector: " > a .op3-text-container",
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
                        selector: " > a .op3-text-container",
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
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Spacing"), selector: " > a > .op3-text-container"} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " > a > .op3-text-container > .op3-icon, > a > .op3-text-container" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " > a > .op3-text-container" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " > a > .op3-text-container" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " > a > .op3-text-container" } ],
                    [ OP3.Elements._extension.prop.AlignItems, { selector: " > a", label: OP3._("Text Align"), id: "buttonAlignText" } ],

                    // Subtext Typography
                    [ OP3.Elements._extension.prop.Display, { id: "subtextDisplay", selector: " .op3-subtext", hidden: true } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "subtextVisible", selector: " .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightSubtext", selector: " > a > .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStyleSubtext", selector: " > a > .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformSubtext", selector: " > a > .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationSubtext", selector: " > a > .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        label: OP3._("Font Size"),
                        id: "fontSizeSubtext",
                        selector: " > a > .op3-subtext",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "150",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                            "data-avoid-text-max": "1"
                        },
                    }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Letter Spacing"), id: "letterSpacingSubtext", selector: " > a > .op3-subtext" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, {
                        id: "offsetXSubtext",
                        selector: " > a > .op3-subtext",
                        label: OP3._("Horizontal Position"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "-50",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],
                    [ OP3.Elements._extension.prop.MarginTop, {
                        id: "offsetYSubtext",
                        selector: " > a > .op3-subtext",
                        label: OP3._("Vertical Position"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "-50",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],

                    // Style Tab - Icon
                    [ OP3.Elements._extension.prop.Display, { selector: " > a > .op3-text-container > .op3-icon,  > a > .op3-text-container > .op3-divider", hidden: true } ],
                    [ OP3.Elements._extension.prop.Visible, { selector: " > a > .op3-text-container > .op3-icon,  > a > .op3-text-container > .op3-divider" } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " > a > .op3-text-container > .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " > a > .op3-text-container > .op3-icon", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        id: "iconSize",
                        selector: " > a > .op3-text-container > .op3-icon",
                        label: OP3._("Icon Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "%, px",
                            "data-min-px": "8",
                            "data-min-percent": "50",
                            "data-max-px": "200",
                            "data-max-percent": "400",
                            "data-step-px": "1",
                            "data-step-percent": "1",
                            "data-precision-px": "1",
                            "data-precision-percent": "1",
                        },
                        units: ["%", "px"],
                        defaultUnit: "%",
                    }],

                    [ OP3.Elements._extension.prop.FlexDirection, { id: "iconDirection", selector: " > a > .op3-text-container", label: OP3._("Icon Position"), options: [ { "row": "Left" }, { "row-reverse": "Right" } ], attr: { "data-property-type": "select-buttons" } } ],
                    [ OP3.Elements._extension.prop.Width, {
                        id: "iconSpacing",
                        selector: " > a > .op3-text-container > .op3-divider",
                        label: OP3._("Icon Spacing"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "150",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: [ "px" ],
                        defaultUnit: "px",
                    }],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderPresets, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderRadiusPresets ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Inset shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowInset", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowInsetPresets, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowInsetAngle", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowInsetDistance", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowInsetBlur", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowInsetSpread", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowInsetColor", selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowInsetInset", selector: " > a [data-op3-border]" } ],

                    // Text Shadow
                    [ OP3.Elements._extension.prop.TextShadow ],
                    [ OP3.Elements._extension.prop.TextShadowAngle ],
                    [ OP3.Elements._extension.prop.TextShadowDistance ],
                    [ OP3.Elements._extension.prop.TextShadowBlurRadius ],
                    [ OP3.Elements._extension.prop.TextShadowColor ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " > a" } ],

                    // Used for syncing with optin form field gap properties...
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "horizontalSpacingLeft", selector: " > a" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "horizontalSpacingRight", selector: " > a" } ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Html2 ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: " > a, > a > .op3-text-container > .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "filterHover", selector: " > a:hover" } ],
                    [ OP3.Elements._extension.prop.FilterBrightness, { id: "filterBrightnessHover" } ],

                    [ OP3.Elements._extension.prop.Color, { selector: " > a:hover", label: OP3._("Text Colour"), id: "colorHover" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: " > a:hover > .op3-text-container > .op3-icon", label: OP3._("Icon Colour") } ],

                    // Hover tab - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover tab - Border
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > a:hover", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > a:hover", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > a:hover", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > a:hover", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > a:hover", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > a:hover", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > a:hover", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > a:hover", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > a:hover", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > a:hover", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > a:hover", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > a:hover", id: "borderRightColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " > a:hover", id: "borderAllWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " > a:hover", id: "borderAllStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " > a:hover", id: "borderAllColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > a:hover", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > a:hover", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > a:hover", id: "borderBottomLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > a:hover", id: "borderBottomRightRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: " > a:hover"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],
                ];
            },

            desc: function() {
                return OP3._("Button");
            },

        },

    });

    // when font-size changes, we want to change
    // the button height as well to ensure
    // that text doesn't become too tall
    // for the actual button size
    OP3.bind("elementchange::button::fontSize", function(e, o) {
        if (o.id !== "fontSize")
            return;

        var element = OP3.$(o.node);
        if (!element.parent().length)
            // can not get computed value (height)
            // on non-attached elements
            return;

        var height = parseInt(element.getOption("height", true), 10);
        var diff = parseInt(o.value.after, 10) - parseInt(o.value.before, 10);

        element.setOption("height", (height + diff) + "px", o.media);
    });

})(jQuery, window, document);
