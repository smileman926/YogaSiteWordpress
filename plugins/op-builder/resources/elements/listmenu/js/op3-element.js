/**
 * OptimizePress3 element type:
 * op3 element type listmenu manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.ListMenu = OP3.defineClass({

        Name: "OP3.Element.ListMenu",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "listmenu",

            _props: function() {
                return [
                    // listMenu
                    [ OP3.Elements._extension.prop.MenuName ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "titleSpacing", label: OP3._("Title Spacing"), selector: " .op3-list-menu-title", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "linkSpacing", label: OP3._("Link Spacing"), selector: " li", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "submenuIndent", label: OP3._("Submenu Indent"), selector: " ul ul", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // title
                    [ OP3.Elements._extension.prop.FontFamily, { id: "titleFontFamily", label: OP3._("Title Font Family"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeight", label: OP3._("Title Font Weight"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "titleFontSize", label: OP3._("Title Size"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "titleLineHeight", label: OP3._("Title Line Height"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "titleLetterSpacing", label: OP3._("Title Spacing"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyle", label: OP3._("Title Font Style"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransform", label: OP3._("Title Text Transform"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecoration", label: OP3._("Title Text Decoration"), selector: " .op3-list-menu-title" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColor", label: OP3._("Title Colour"), selector: " .op3-list-menu-title" } ],

                    // navigation
                    [ OP3.Elements._extension.prop.FontFamily, { id: "linkFontFamily", label: OP3._("Link Font Family"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "linkFontWeight", label: OP3._("Link Font Weight"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "linkFontSize", label: OP3._("Link Size"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "linkLineHeight", label: OP3._("Link Line Height"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "linkLetterSpacing", label: OP3._("Link Spacing"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "linkFontStyle", label: OP3._("Link Font Style"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "linkTextTransform", label: OP3._("Link Text Transform"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "linkTextDecoration", label: OP3._("Link Text Decoration"), selector: " a" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "linkColor", label: OP3._("Link Colour"), selector: " a" } ],

                    // hover
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "linkColorHover", label: OP3._("Link Colour"), selector: " a:hover" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "linkFontWeightHover", label: OP3._("Link Font Weight"), selector: " a:hover" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "linkFontStyleHover", label: OP3._("Link Font Style"), selector: " a:hover" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "linkTextDecorationHover", label: OP3._("Link Text Decoration"), selector: " a:hover" } ],

                    // Advanced Tab - Position
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

                    // Advanced Tab - Responsive
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

    // set default menuName (first one) on invalid one
    OP3.bind("elementappend", function(e, o) {
        var defaultValue = OP3.Menus.defaultValue();
        var row = OP3.$(o.node).filter("listmenu");
        var child = OP3.$(o.node).find("listmenu");

        row.add(child).each(function() {
            var element = OP3.$(this);
            var value = element.getOption("menuName", "all");

            if (!OP3.Menus.isValidMenu(value))
                element.setOption("menuName", defaultValue, "all");
        });
    });

    // reload
    OP3.bind("elementchange::listmenu::menuName", function(e, o) {
        var element = OP3.$(o.node);
        var target = element.jq().find("nav[data-op3-element-data]");
        var render = OP3.Menus.renderList(o.value.after*1);

        $(target).html(render.innerHTML);
    });

})(jQuery, window, document);
