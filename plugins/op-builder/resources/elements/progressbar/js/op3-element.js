/**
 * OptimizePress3 element type:
 * op3 element type progress bar manipulation.
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
    OP3.Elements._extension.type.ProgressBar = OP3.defineClass({

        Name: "OP3.Element.ProgressBar",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "progressbar",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Width"), defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.Width, { id: "progressWidth", selector: " .op3-progressbar-progress", label: OP3._("Progress Bar Percentage"), defaultUnit: "%", units: ["%"], attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "100", "data-step-percent": "1", "data-precision-percent": "0" } } ],
                    [ OP3.Elements._extension.prop.Width, { id: "labelWidth", selector: " .op3-progressbar-label", label: OP3._("Progress Bar Label Percentage"), defaultUnit: "%", units: ["%"], attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "100", "data-step-percent": "1", "data-precision-percent": "0" } } ],
                    [ OP3.Elements._extension.prop.AnimationToggle, { label: OP3._("Animate Progress Bar") } ],

                    [ OP3.Elements._extension.prop.WidthSteps, { id: "progressWidthSteps", label: OP3._("Progress"), } ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Align") } ],
                    [ OP3.Elements._extension.prop.Height, { selector: " .op3-progressbar-progress", label: OP3._("Progress Bar Height"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "1", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.LabelPlacement, { selector: " > .op3-progressbar-content" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "labelSpacingTop", label: OP3._("Label Spacing Top"), selector: " .op3-progressbar-label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "labelSpacingBottom", label: OP3._("Label Spacing Bottom"), selector: " .op3-progressbar-label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // Label padding left/right
                    // [ OP3.Elements._extension.prop.PaddingLeft, { id: "labelSpacingLeft", label: OP3._("Label Spacing Left"), selector: " .op3-progressbar-label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "200", "data-step-px": "1", "data-precision-px": "0", } } ],
                    // [ OP3.Elements._extension.prop.PaddingRight, { id: "labelSpacingRight", label: OP3._("Label Spacing Right"), selector: " .op3-progressbar-label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "200", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-progressbar-label" } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Size"), selector: " .op3-text", defaultUnit: "px", } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-text", } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Spacing"), selector: " .op3-text"} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-text > i, .op3-text", } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-text > i, .op3-text", } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-text" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-text", } ],
                    [ OP3.Elements._extension.prop.TextAlign, { selector: " .op3-text" } ],

                    // Text Shadow
                    [ OP3.Elements._extension.prop.TextShadow ],
                    [ OP3.Elements._extension.prop.TextShadowAngle ],
                    [ OP3.Elements._extension.prop.TextShadowDistance ],
                    [ OP3.Elements._extension.prop.TextShadowBlurRadius ],
                    [ OP3.Elements._extension.prop.TextShadowColor ],

                    // Label Color
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-progressbar-label", label: OP3._("Text Colour") } ],

                    // Progress color
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' [data-op3-background="base"]::before, [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { selector: ' [data-op3-background="base"]', id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' [data-op3-background="base"]::before, [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle", selector: ' [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition", selector: ' [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor", selector: ' [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition", selector: ' [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor", selector: ' [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition", selector: ' [data-op3-background="base"]' } ],

                    // Bar color
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { selector: ' [data-op3-background="overlay"]', id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", selector: ' [data-op3-background="overlay"]' } ],

                    // Bar Stripes
                    [ OP3.Elements._extension.prop.BackgroundStripes, { selector: " > .op3-progressbar-content" } ],
                    [ OP3.Elements._extension.prop.BackgroundStripesPresets, { selector: ' [data-op3-background="overlay"]' } ],
                    [ OP3.Elements._extension.prop.AnimationToggle2, { label: OP3._("Animate Stripes") } ],

                    // Bar Border
                    [ OP3.Elements._extension.prop.BorderActive, { label: OP3._("Bar Border") } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: ' [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: ' [data-op3-background="overlay-border"]' } ],

                    // Progress Border
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveBase", label: OP3._("Progress Border") } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "borderAllStyleBase", selector: ' [data-op3-background="base-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "borderAllColorBase", selector: ' [data-op3-background="base-border"]' } ],

                    // Border Radius
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ' .op3-progressbar-container, [data-op3-background="base"], [data-op3-background="overlay"], [data-op3-background="overlay-stripes"], [data-op3-background="base-border"], [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ' .op3-progressbar-container, [data-op3-background="base"], [data-op3-background="overlay"], [data-op3-background="overlay-stripes"], [data-op3-background="base-border"], [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ' .op3-progressbar-container, [data-op3-background="base"], [data-op3-background="overlay"], [data-op3-background="overlay-stripes"], [data-op3-background="base-border"], [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ' .op3-progressbar-container, [data-op3-background="base"], [data-op3-background="overlay"], [data-op3-background="overlay-stripes"], [data-op3-background="base-border"], [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRadius, { selector: ' .op3-progressbar-container, [data-op3-background="base"], [data-op3-background="overlay"], [data-op3-background="overlay-stripes"], [data-op3-background="base-border"], [data-op3-background="overlay-border"]' } ],
                    [ OP3.Elements._extension.prop.BorderRadiusPresets ],

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

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    // Force default linear-gradient angle to 90deg as per OP3-817
    OP3.bind("elementchange::progressbar::backgroundImageType", function(e, o) {
        var suffix = o.id.replace(/backgroundImage(.+)Type/, '$1');
        if (suffix === o.id) return;

        var element = OP3.$(o.node).element();
        if (o.value.after === "linear-gradient") {
            element.setOption("backgroundImage" + suffix + "Angle", "90deg", o.media);
        }
    });

    // Sync label spacing with label placement changes
    // (because default value is set in css)
    OP3.bind("elementchange::progressbar::labelPlacement", function(e, o) {
        if (OP3.Designer.activeElement().node() === o.node)
            OP3.transmit("elementoptionssyncrequest", { property: [ "labelSpacingTop", "labelSpacingBottom" ] });
    });

    // Sync label width with progressbar width. This can't be set in the
    // property selector itself because we force '100% !important'
    // width on some designs for the label, based
    // on the label position property
    OP3.bind("elementchange::progressbar::width", function(e, o) {
        if (o.id !== "progressWidth")
            return false;

        var element = OP3.$(o.node).element();
        element.setOption("labelWidth", o.value.after, o.media);
    });

    // When style is changed, force-remove then
    // re-add the animation progress, so the
    // user can see animation preview
    OP3.bind("elementstyle::progressbar", function (e, o) {
        var element = OP3.$(o.node).element();

        // Only if progress animation is enabled
        if (element.getOption("animationToggle") !== "1")
            return false;

        var $node = $(o.node).find('.op3-progressbar-content');
        $node.attr('data-op3-animation-toggle', "0");
        setTimeout(function() {
            $node.attr('data-op3-animation-toggle', "1");
        });
    });

})(jQuery, window, document);
