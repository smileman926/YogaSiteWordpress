/**
 * OptimizePress3 element type:
 * op3 element type input checkbox manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 *     - properties/checked/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Checkbox = OP3.defineClass({

        Name: "OP3.Element.Checkbox",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "checkbox",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.TypeAttr, { selector: " input" } ],
                    [ OP3.Elements._extension.prop.Name, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Label, { selector: " .op3-element-checkbox-label", serialize: false } ],
                    [ OP3.Elements._extension.prop.Checked, { selector: " input", serialize: false, } ],
                    [ OP3.Elements._extension.prop.CheckedFull, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Display ],
                    [ OP3.Elements._extension.prop.Visible ],
                    [ OP3.Elements._extension.prop.VisibleLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Required, { selector: " input", serialize: false  } ],
                    [ OP3.Elements._extension.prop.RequiredFull, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.RequiredLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Value, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.UrlMapping, { selector: " input",} ],
                    [ OP3.Elements._extension.prop.InputValidationMessage, { selector: " input",} ],

                    // Style Tab - Label
                    [ OP3.Elements._extension.prop.MarginLeft, { label: "Label Spacing", id: "labelSpacing", selector: " .op3-element-checkbox-label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" }} ],

                    // Style Tab - Font
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-element-checkbox-label > *" } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Size"), selector: " .op3-element-checkbox-label > *", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-element-checkbox-label > *" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-element-checkbox-label > *" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-element-checkbox-label > *", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { label: OP3._("Spacing"), selector: " .op3-element-checkbox-label > *" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-element-checkbox-label > *" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-element-checkbox-label > *" } ],

                    // Style Tab - Color
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-element-checkbox-label" } ],

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    // @todo? - we already have display, should we add another hidden element???

                    // Advanced Tab
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                ];
            },

            desc: function() {
                return ""
                    || this.getOption("label", "all")
                    || OP3.Elements._extension.type.Default.prototype.desc.call(this);
            },

        },

    });

})(jQuery, window, document);
