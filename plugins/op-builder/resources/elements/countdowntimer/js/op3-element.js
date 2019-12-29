/**
 * OptimizePress3 element type:
 * Countdown Timer
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.CountdownTimer = OP3.defineClass({

        Name: "OP3.Element.CountdownTimer",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "countdowntimer",

            _props: function() {
                return [
                    // General
                    [ OP3.Elements._extension.prop.DateTime, { label: OP3._("Due date (Timezone UTC +00:00)") } ],
                    [ OP3.Elements._extension.prop.CountdownFinishAction, { selector: " .op3-countdown-timer" } ],
                    [ OP3.Elements._extension.prop.RedirectUrl, { selector: " .op3-countdown-timer" } ],
                    [ OP3.Elements._extension.prop.Text, { selector: " .op3-countdown-timer", label: OP3._("Text To Show On Finish") } ],
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-countdown-timer"} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.FlexDirectionVertical, { selector: " .op3-countdown-timer", label: OP3._("Units And Digits Position") } ],
                    [ OP3.Elements._extension.prop.CountdownTimerUnitDay, { selector: " .op3-countdown-timer" } ],
                    [ OP3.Elements._extension.prop.CountdownTimerUnitHour, { selector: " .op3-countdown-timer" } ],
                    [ OP3.Elements._extension.prop.CountdownTimerUnitMin, { selector: " .op3-countdown-timer" } ],
                    [ OP3.Elements._extension.prop.CountdownTimerUnitSec, { selector: " .op3-countdown-timer" } ],

                    // Wrapper
                    [ OP3.Elements._extension.prop.FontSize, { id: "digitsFontSize", selector: " .wrapper", label: OP3._("Digits Font Size"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px",], }],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "wrapperBackgroundColor", selector: " .wrapper", label: OP3._("Box Background Colour") } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "digitsColor", label: OP3._("Digits Colour"), selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "wrapperTopLeftRadius", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "wrapperTopRightRadius", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "wrapperBottomLeftRadius", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "wrapperBottomRightRadius", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "wrapperAlignItems", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "wrapperMarginLeft", selector: " .wrapper" }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "wrapperMarginRight", selector: " .wrapper", label: OP3._("Spacing Between"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "150", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ] }],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "wrapperPaddingTop", selector: " .wrapper" }],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "wrapperPaddingBottom", selector: " .wrapper" }],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "wrapperPaddingRight", selector: " .wrapper" }],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "wrapperPaddingLeft", selector: " .wrapper" }],
                    [ OP3.Elements._extension.prop.Width, { id:"wrapperWidth", selector: " .wrapper",  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "wrapperBorderLeftWidth", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "wrapperBorderLeftStyle", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "wrapperBorderLeftColor", selector: " .wrapper" } ],

                    [ OP3.Elements._extension.prop.Content, { id: "wrapperAfterContent", selector: " .wrapper::after" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "wrapperAfterDisplay", selector: " .wrapper::after" } ],

                    // Digits
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "digitsBackgroundColor", selector: " .digits", label: OP3._("Digits Background Colour") } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "digitsBackgroundImage", selector: " .digits", label: OP3._("Digits Background Image") } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "digitsBoxShadow", selector: " .digits", label: OP3._("Digits Box Shadow") } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "digitsTextShadow", selector: " .digits", label: OP3._("Digits Text Shadow") } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "digitsTopLeftRadius", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "digitsTopRightRadius", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "digitsBottomLeftRadius", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "digitsBottomRightRadius", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "digitsBorderTopWidth", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "digitsBorderTopStyle", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "digitsBorderTopColor", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "digitsBorderBottomWidth", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "digitsBorderBottomStyle", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "digitsBorderBottomColor", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "digitsBorderLeftWidth", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "digitsBorderLeftStyle", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "digitsBorderLeftColor", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "digitsBorderRightWidth", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "digitsBorderRightStyle", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "digitsBorderRightColor", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.MinWidth, { id: "digitsMinWidth", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "digitsLineHeight", selector: " .digits" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "digitsPaddingTop", selector: " .digits" }],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "digitsPaddingBottom", selector: " .digits" }],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "digitsPaddingRight", selector: " .digits" }],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "digitsPaddingLeft", selector: " .digits" }],

                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "digitsAfterBorderTopWidth", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "digitsAfterBorderTopStyle", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "digitsAfterBorderTopColor", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "digitsAfterBorderBottomWidth", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "digitsAfterBorderBottomStyle", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "digitsAfterBorderBottomColor", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "digitsAfterDisplay", selector: " .digits::after" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "digitsAfterBackgroundColor", selector: " .digits::after" } ],

                    // Units
                    [ OP3.Elements._extension.prop.Color, { id: "unitsColor", selector: " .units", label: OP3._("Units Colour") } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "unitsFontSize", selector: " .units", label: OP3._("Units Font Size"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0",}, units: [ "px",],}],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "unitsTextAlign", selector: " .units" }],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "unitsTextTransform", selector: " .units" }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "unitsMarginRight", selector: " .units" }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "unitsMarginLeft", selector: " .units" }],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "unitsPaddingBottom", selector: " .units" }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "unitsLineHeighttom", selector: " .units" }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "unitsLetterSpacing", selector: " .units" }],

                    [ OP3.Elements._extension.prop.Content, { id: "unitsAfterContent", selector: " .units::after" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "unitsAfterDisplay", selector: " .units::after" } ],

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
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

})(jQuery, window, document);
