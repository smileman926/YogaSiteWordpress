/**
 * OptimizePress3 element type:
 * op3 element type faqitem
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.FaqItem = OP3.defineClass({

        Name: "OP3.Element.FaqItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "faqitem",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Html, { selector: ' .op3-faqitem-header [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { label: OP3._("Header Font Family"), selector: " .op3-faqitem-header [data-op3-contenteditable] > *",  } ],
                    [ OP3.Elements._extension.prop.FontWeight, { label: OP3._("Header Font Weight"), selector: " .op3-faqitem-header [data-op3-contenteditable] > *",  } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        selector: " .op3-faqitem-header [data-op3-contenteditable] > *",
                        label: OP3._("Header Font Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "72",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-faqitem-header h1, .op3-faqitem-header h2, .op3-faqitem-header h3, .op3-faqitem-header h4, .op3-faqitem-header h5, .op3-faqitem-header h6, .op3-faqitem-header .op3-icon" } ],

                    // Faqitem header background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' .op3-faqitem-header [data-op3-background="overlay"]::before, .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' .op3-faqitem-header [data-op3-background="overlay"]::before, .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // // Faqitem content background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageContent", selector: ' .op3-faqitem-content [data-op3-background="overlay"]::before, .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageContentType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorContent", selector: ' .op3-faqitem-content [data-op3-background="overlay"]::before, .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageContentAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageContentPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageContentStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageContentStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageContentStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageContentStopPosition" } ],

                    [ OP3.Elements._extension.prop.Op3Icon, { label: OP3._("Open Icon"), selector: " .op3-faqitem-open-icon" } ],
                    [ OP3.Elements._extension.prop.Op3Icon2, { label: OP3._("Close Icon"), selector: " .op3-faqitem-close-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        id: "fontSizeIcon",
                        selector: " .op3-faqitem-open-icon, .op3-faqitem-close-icon",
                        label: OP3._("Icon Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "200",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " .op3-faqitem-header .op3-icon.op3-faqitem-open-icon, .op3-faqitem-header .op3-icon.op3-faqitem-close-icon" } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { selector: " .op3-faqitem-header" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { selector: " .op3-faqitem-header" } ],
                    [ OP3.Elements._extension.prop.FaqItemIconPosition ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "iconPaddingRight", selector: ' .op3-faqitem-header .op3-icon' } ],

                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth ],
                    [ OP3.Elements._extension.prop.BorderTopStyle ],
                    [ OP3.Elements._extension.prop.BorderTopColor ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle ],
                    [ OP3.Elements._extension.prop.BorderBottomColor ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle ],
                    [ OP3.Elements._extension.prop.BorderLeftColor ],
                    [ OP3.Elements._extension.prop.BorderRightWidth ],
                    [ OP3.Elements._extension.prop.BorderRightStyle ],
                    [ OP3.Elements._extension.prop.BorderRightColor ],
                    [ OP3.Elements._extension.prop.BorderAllWidth ],
                    [ OP3.Elements._extension.prop.BorderAllStyle ],
                    [ OP3.Elements._extension.prop.BorderAllColor ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius ],

                    [ OP3.Elements._extension.prop.BoxShadow ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom, {
                        label: OP3._("Faq Item Spacing"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "-10",
                            "data-max-px": "150",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                        defaultUnit: "px"
                    } ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: ' .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: ' .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: ' .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: ' .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: ' .op3-faqitem-header' } ],
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


                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ":hover,:hover .op3-faqitem-header,:hover .op3-faqitem-content,:hover .op3-faqitem-header h3,:hover .op3-faqitem-header .op3-icon" } ],

                    // Hover Tab - Header Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ':hover .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ':hover .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover Tab - Content Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageContentHover", selector: ':hover .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageContentHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorContentHover", selector: ':hover .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageContentHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageContentHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageContentHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageContentHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageContentHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageContentHoverStopPosition" } ],

                    // Hover Tab - Border
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ':hover' } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "borderAllStyleHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "borderAllColorHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusHover", selector: ":hover" } ],

                    // Hover Tab - Typography
                    [ OP3.Elements._extension.prop.Color, { id: "colorHover", selector: ":hover .op3-faqitem-header h1,:hover .op3-faqitem-header h2,:hover .op3-faqitem-header h3,:hover .op3-faqitem-header h4,:hover .op3-faqitem-header h5,:hover .op3-faqitem-header h6,:hover .op3-faqitem-header .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ":hover .op3-faqitem-header .op3-icon.op3-faqitem-open-icon,:hover .op3-faqitem-header .op3-icon.op3-faqitem-close-icon" } ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                ];
            },

        },

    });

    // When new faqitem is added via + icon in toolbar
    // make sure that new faqitem is closed
    OP3.bind("elementappendfirst::faqitem", function(e, o) {
        var element = $(o.node);
        element
            .closest('[data-op3-element-type="faq"]')
            .accordion("close", element);
    });

})(jQuery, window, document);
