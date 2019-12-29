/**
 * OptimizePress3 socialicons element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.SocialIcons = OP3.defineClass({

        Name: "OP3.Element.SocialIcons",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "socialicons",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Icons Spacing") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' [data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' [data-op3-element-type="icon"]' } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' [data-op3-children]' } ],

                    // Advanced tab - Positioning
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

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link Properties - icon
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "iconLineHeight", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Padding, { id: "iconPadding", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "iconBorderTopWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "iconBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "iconBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "iconBorderRightWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "iconMarginTop", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "iconMarginBottom", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "iconMarginLeft", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "iconMarginRight", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "iconPaddingTop", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "iconPaddingBottom", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "iconPaddingLeft", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "iconPaddingRight", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "iconTransitionDuration", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container, .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon', label: OP3._("Icon Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "iconOp3Icon", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container .op3-icon', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconFrame, { id: "iconIconFrame", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconShape, { id: "iconIconShape", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container', serialize: false } ],
                ];
            },

        },

    });

    // reset icon properties when appending
    // it to socialicons element
    OP3.bind("elementappend::icon", function(e, o) {
        var parent = OP3.$(o.parent);
        if (parent.type() !== "socialicons")
            return;

        // reset margins so we do not mess the gutter
        var element = OP3.$(o.node);
        OP3.LiveEditor.forEachDevice(function(device, media) {
            element
                .setOption("marginTop", null, media)
                .setOption("marginRight", null, media)
                .setOption("marginBottom", null, media)
                .setOption("marginLeft", null, media);
        });

        // validate icon
        var currentIcon = element.getOption("op3Icon", "all");
        var validIcons = OP3.Icons.data("op3-social").map(function(item) {
            return Object.keys(item)[0];
        });

        // set default one
        if (validIcons.indexOf(currentIcon) === -1) {
            var defaultIcon = "op3-icon-logo-facebook";
            element.setOption("op3Icon", defaultIcon, "all");
        }
    });

    // sync children attr properties
    OP3.bind("elementappendfirst::icon", function(e, o) {
        var parent = OP3.$(o.parent);
        if (parent.type() !== "socialicons")
            return;

        // sync attr properties
        var element = OP3.$(o.node);
        var sync = {
            '': {
                iconIconShape: "iconShape",
                iconIconFrame: "iconFrame",
            },
        }

        for (var selector in sync) {
            var media = "all";
            var child = selector ? element.find(selector) : element;
            var link = child.getOption("linkProperties", "all");
            child.setOption("linkProperties", "0", "all");

            for (var proxy in sync[selector]) {
                var value = parent.getOption(proxy, media);
                child.setOption(sync[selector][proxy], value, "all");
            }

            child.setOption("linkProperties", link, "all");
        }
    });

})(jQuery, window, document);
