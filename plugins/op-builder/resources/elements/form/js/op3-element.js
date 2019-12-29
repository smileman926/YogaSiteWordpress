/**
 * OptimizePress3 element type:
 * op3 element type form manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     .
 *     .
 *     .
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Form = OP3.defineClass({

        Name: "OP3.Element.Form",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "form",

            _props: function() {
                return [
                    // Style Tab - Optin From Integration
                    [ OP3.Elements._extension.prop.OptinIntegration ],
                    [ OP3.Elements._extension.prop.AdminEmail ],
                    [ OP3.Elements._extension.prop.OptinTag ],
                    [ OP3.Elements._extension.prop.OptinGoal ],
                    [ OP3.Elements._extension.prop.OptinList ],
                    [ OP3.Elements._extension.prop.OptinWebhookUrl ],
                    [ OP3.Elements._extension.prop.OptinFormId ],
                    [ OP3.Elements._extension.prop.OptinDoubleOptin ],
                    [ OP3.Elements._extension.prop.OptinPostAction ],
                    [ OP3.Elements._extension.prop.OptinPostActionNotificationText ],
                    [ OP3.Elements._extension.prop.OptinPostActionRedirectURL ],
                    [ OP3.Elements._extension.prop.OptinPostActionRedirectAutofill ],
                    [ OP3.Elements._extension.prop.OptinPostActionPopOverlayTrigger ],
                    [ OP3.Elements._extension.prop.OptinPostActionFunnelStep ],

                    // Advanced Tab - Form Consent Features
                    [ OP3.Elements._extension.prop.OptinGdprActivate ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent1Visible ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent1Label ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagConfirmed ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagDeclined ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagNotShown ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent2Visible ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent2Label ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagConfirmed ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagDeclined ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagNotShown ],
                    [ OP3.Elements._extension.prop.OptinGdprFieldNote ],

                    // Style Tab - Form Fields
                    [ OP3.Elements._extension.prop.Children ],

                    // Style Tab - Form Styling
                    [ OP3.Elements._extension.prop.OptinFieldLayout ],

                    [ OP3.Elements._extension.prop.Margin, {
                        label: OP3._("Field Gap"),
                        id: "spacing",
                        selector: ' [data-op3-children] > .op3-element, [data-op3-children] > .op3-element label, [data-op3-children] > .op3-element[data-op3-element-type="button"] > a',
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "50",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],

                    // Style Tab - Form Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Style Tab - Form Borders & Corners
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderStyle ],
                    [ OP3.Elements._extension.prop.BorderColor ],
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

                    // Style Tab - From Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Form Positioning
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
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Optin Form Width") } ],
                    [ OP3.Elements._extension.prop.AlignItems, { label: OP3._("Field Alignment"), selector: ' [data-op3-children]' } ],

                    // Field sizing
                    [ OP3.Elements._extension.prop.Width, { id: "fieldWidth", selector: ' [data-op3-element-type="input"]', defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FieldWidthDefault ],
                    [ OP3.Elements._extension.prop.FieldWidthDefault, {
                        id: "fieldWidthDefaultInline",
                        options: [
                            { "null": "Custom", disabled: true },
                            { "50%": "50% (2 Columns)" },
                            { "33.33%": "33% (3 Columns)" },
                            { "25%": "25% (4 Columns)" },
                        ]
                    }],

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

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]"} ],

                    // Link Element - Input
                    [ OP3.Elements._extension.prop.Display, { id: "inputLabelDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputLabelSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "inputIconDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon, .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputIconFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "inputIconFlexDirection", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputIconSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "inputTextDecoration", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > *' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFieldFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFieldFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFieldFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFieldFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputFieldLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputFieldTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputPlaceholderColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text::placeholder' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputIconColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "inputBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "inputBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "inputBorderTopWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "inputBorderTopStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "inputBorderTopColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "inputBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "inputBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "inputBorderBottomColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "inputBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "inputBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "inputBorderLeftColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "inputBorderRightWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "inputBorderRightStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "inputBorderRightColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "inputBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "inputBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "inputBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "inputBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "inputBoxShadow", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputWidth", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputInputMarginTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputInputMarginBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputInputMarginLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputInputMarginRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputInputPaddingTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputInputPaddingRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],

                    // Link Element - Checkbox
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "checkboxLabelSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "checkboxFontFamily", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxFontSize", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "checkboxFontWeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "checkboxFontStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "checkboxLineHeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "checkboxLetterSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "checkboxTextTransform", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "checkboxTextDecoration", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],

                    // Link Element - Button
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColor", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "buttonMaxWidth", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "buttonHeight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "buttonFontFamily", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSize", selector: ' .op3-element[data-op3-element-type="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "buttonLineHeight", selector: ' .op3-element[data-op3-element-type="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacing", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeight", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyle", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransform", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecoration", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "buttonButtonAlignText", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonSubtextDisplay", selector: ' .op3-element[data-op3-element-type="button"] .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeightSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyleSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransformSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecorationSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSizeSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacingSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonOffsetXSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonOffsetYSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplay", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "buttonOp3Icon", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColor", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonIconSize", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "buttonIconDirection", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "buttonIconSpacing", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadow", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowInset", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "buttonTextShadow", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonMarginTop", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "buttonMarginBottom", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonMarginLeft", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonMarginRight", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "buttonPaddingTop", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "buttonPaddingBottom", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "buttonPaddingLeft", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "buttonPaddingRight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonHorizontalSpacingLeft", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonHorizontalSpacingRight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "buttonTransitionDuration", selector: ' .op3-element[data-op3-element-type="button"] > a, .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "buttonFilterHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover > .op3-text-container > i' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                ];
            },

        },

    });

    /**
     * Resizes the fields and button based on
     * the number of form inputs and with
     * regard to form layout
     *
     * @param {Object} form
     * @return {Void}
     */
    var resizeFields = function(form) {
        var button = form.find("button").element();
        var layout = form.getOption("optinFieldLayout");

        // Get all visible fields, to adjust the value properly
        var $fields = $(form.node())
            .find("form [data-op3-children]")
            .children(":visible")
                .not('.op3-element[data-op3-element-type="button"]')
                .not('.op3-element[data-op3-element-spec="dummy"]')
                .not('.op3-element[data-op3-element-spec="gdpr1"]')
                .not('.op3-element[data-op3-element-spec="gdpr2"]');

        // include button
        var count = $fields.length + 1;

        // stacked width is always 100%
        var fieldWidth = "100%";
        if (layout === "inline") {
            // inline default field width is always 50%
            fieldWidth = "50%";
            if (count === 3)
                fieldWidth = "33%";

            if (count === 4)
                fieldWidth = "25%";
        }

        button.setOption("maxWidth", fieldWidth);

        // when switching to inline mode
        // make sure button has the same height as inputs
        button.setOption("height", $fields.find(".op3-element-input-edit").css("height"));
        form.setOption("fieldWidth", fieldWidth);
    };

    // !!! Quick Fix !!!
    // If width is changed on a child element, setting fieldWidth
    // on form will have no effect, that's why we reset the
    // child width values when switching  optin layout
    // or changing field width
    OP3.bind("elementchange::form::optinFieldLayout elementchange::form::width", function(e, o) {
        if (o.id !== "fieldWidth" && o.id !== "optinFieldLayout")
            return;

        OP3.$(o.node).element().children().forEach(function(node, index) {
            var element = OP3.$(node).element();

            // Set the button maxWidth to match input field width
            if (element.type() === "button" && o.id === "fieldWidth")
                element.setOption("maxWidth", o.value.after);

            // Reset all input fields
            if (element.type() !== "button")
                element.setOption("width", null);
        });
    });

    // Tweak child button node on style change
    // We reset all properties except for the
    // ones that need to be persistent to
    // ensure button looks good and is
    // aligned well on all styles
    OP3.bind("elementstyle::form", function (e, o) {
        var element = OP3.$(o.node).element();
        if (element.getOption("optinFieldLayout", "all") === "inline") {
            var button = OP3.$(o.node).find("button").element();
            var email = OP3.$.closest('input[type="email"]', o.node);

            button.setOption("height", email.getOption("height", true), "all");
        }
    });

    OP3.bind("elementchange::form::optinFieldLayout", function(e, o) {
        var value = o.value.after;
        var form = OP3.$(o.node);
        var button = form
            .find("button")
            .element();
        var $fields = $(o.node)
            .find("form [data-op3-children]")
            .children('.op3-element[data-op3-element-type="input"]:visible:first');
        var height = $fields.find(".op3-element-input-edit").css("height");

        // Adjust fields width based
        // on the field layout
        resizeFields(form);

        button.setOption("height", height);
    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    OP3.bind("elementoptionssync::form::optinFieldLayout", function(e, o) {
        $(o.parent).attr("data-op3-parent-options-property-value-optinFieldLayout", o.value);
    });

    // Set form elements readonly in LiveEditor
    OP3.bind("ready elementappend integrationformreset", function(e, o) {
        var element = OP3.$(null);
        if (o && o.node)
            element = OP3.$(o.node);
        else
            element = OP3.$("form");
        if (element.type() !== "form")
            element = element.find("form");

        element
            .find("input,textarea")
                .jq()
                .find("input,textarea")
                    .attr("readonly", "readonly")
                    .attr("autocomplete", "off");
    });

    OP3.bind("elementappendfirst::form", function(e, o) {
        if (OP3.Funnels.nextPageId) {
            OP3.$(o.node).setOption("optinPostAction", "nextFunnelStep", "all")
        }
    });

})(jQuery, window, document);
