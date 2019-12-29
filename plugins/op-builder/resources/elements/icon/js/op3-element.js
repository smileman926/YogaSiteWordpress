/**
 * OptimizePress3 element type:
 * op3 element type icon manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Icon = OP3.defineClass({

        Name: "OP3.Element.Icon",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "icon",

            _props: function() {
                return [
                    // Style tab - Icon
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon, .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        selector: " .op3-icon",
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
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-icon", label: OP3._("Line Height") } ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Icon Align") } ],

                    // Icon - Link
                    [ OP3.Elements._extension.prop.Href, { selector: " .op3-link", serialize: false } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " .op3-link", } ],
                    [ OP3.Elements._extension.prop.Target, { selector: " .op3-link", label: OP3._("Link Target") } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " .op3-link", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " .op3-link" } ],

                    // Icon Background
                    [ OP3.Elements._extension.prop.IconFrame, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.IconShape, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.Padding, {
                        label: OP3._("Icon Padding"),
                        selector: " .op3-icon-container",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                    }],

                    [ OP3.Elements._extension.prop.BorderAllWidth, {
                        selector: " .op3-icon-container",
                        label: OP3._("Border Width"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "50",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                        defaultUnit: "px",
                    }],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-icon-container" } ],

                    // Style Tab - Icon Colours
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-icon-container", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BorderColor, { selector: " .op3-icon-container" } ],

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
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: " .op3-icon, .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ":hover .op3-icon", label: OP3._("Icon Color"), id: "colorHover" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: ":hover .op3-icon-container", id: "backgroundColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderColor, { selector: ":hover .op3-icon-container", id: "borderColorHover" } ],

                    // Media spacing for feature block, testimonial, and similar (proxy)
                    [ OP3.Elements._extension.prop.ColumnGapParent, { label: OP3._("Media Spacing") } ],
                ];
            },

        },

    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    // Addition: refresh some properties because icons with
    // frames have different css
    OP3.bind("elementoptionssync::icon::iconFrame", function(e, o) {
        $(o.parent).attr("data-op3-parent-options-property-value-iconFrame", o.value);

        var props = [
            "padding",
            "backgroundColor",
            "borderColor",
        ];
        OP3.transmit("elementoptionssyncrequest", { property: props });
    });

})(jQuery, window, document);
