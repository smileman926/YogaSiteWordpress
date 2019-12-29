/**
 * OptimizePress3 element type:
 * op3 element type row manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/column-align/js/op3-property.js
 *     - properties/background-color/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/text-align/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TreeMenu = OP3.defineClass({

        Name: "OP3.Element.TreeMenu",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "treemenu",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.MenuName ],
                    //[ OP3.Elements._extension.prop.PaddingTop, { id: "treeitemPaddingTop", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    //[ OP3.Elements._extension.prop.PaddingBottom, { id: "treeitemPaddingBottom", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    //[ OP3.Elements._extension.prop.PaddingLeft, { id: "treeitemPaddingLeft", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    //[ OP3.Elements._extension.prop.PaddingRight, { id: "treeitemPaddingRight", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],

                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Items Align"), selector: " .op3-treemenu-content > [data-op3-children]", options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" }, { "space-between": "Space Between" }, { "space-evenly": "Space Evenly" } ] } ],

                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Menu Item Spacing") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", selector: " .op3-treemenu-content > [data-op3-children] > .op3-element" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", selector: " .op3-treemenu-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", selector: " .op3-treemenu-content > [data-op3-children]" } ],

                    [ OP3.Elements._extension.prop.FontFamily ],
                    [ OP3.Elements._extension.prop.FontWeight ],
                    [ OP3.Elements._extension.prop.FontSize ],
                    [ OP3.Elements._extension.prop.LineHeight ],
                    [ OP3.Elements._extension.prop.LetterSpacing ],
                    [ OP3.Elements._extension.prop.FontStyle ],
                    [ OP3.Elements._extension.prop.TextTransform ],
                    [ OP3.Elements._extension.prop.TextDecoration ],

                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' .op3-treemenu-content > [data-op3-background="base"]::before, .op3-treemenu-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' .op3-treemenu-content > [data-op3-background="base"]::before, .op3-treemenu-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                    [ OP3.Elements._extension.prop.Color ],
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { label: OP3._("Switch to Hamburger on Tablet"), selector: " .op3-treemenu-content" } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { label: OP3._("Switch to Hamburger on Mobile"), selector: " .op3-treemenu-content" } ],
                    [ OP3.Elements._extension.prop.StackColumnsDesktop, { label: OP3._("Switch to Hamburger on Desktop"), selector: " .op3-treemenu-content" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "hamburgerIconDisplay", selector: " .op3-hamburger .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "hamburgerIconVisible", selector: " .op3-hamburger .op3-icon", label: OP3._("Display Hamburger Icon") } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "hamburgerIcon", label: OP3._("Hamburger Icon"), selector: " .op3-hamburger .op3-icon" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "hamburgerJustifyContent", label: OP3._("Hamburger Alignment"), selector: " .op3-hamburger" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "hamburgerFontSize", label: OP3._("Hamburger Size"), selector: " .op3-hamburger" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "hamburgerColor", label: OP3._("Hamburger Colour"), selector: " .op3-hamburger" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "hamburgerBackgroundColor", label: OP3._("Hamburger Menu Background Colour"), selector: " .op3-treemenu-content > [data-op3-children], .op3-treemenu-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "hamburgerTextDisplay", selector: " .op3-hamburger .op3-text" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "hamburgerTextVisible", selector: " .op3-hamburger .op3-text", label: OP3._("Display Hamburger Text") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "hamburgerMarginLeft", selector: " .op3-hamburger .op3-text", label: OP3._("Hamburger Text Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "hamburgerMarginRight", selector: " .op3-hamburger .op3-text", label: OP3._("Hamburger Text Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.Label, { id: "hamburgerTextLabel", label: OP3._("Hamburger Text Label"), selector: " .op3-hamburger .op3-text", } ],
                    [ OP3.Elements._extension.prop.Order, { id: "hamburgerIconOrder", selector: " .op3-hamburger .op3-icon", label: OP3._("Hamburger Text Position"), tag: "select", attr: { "data-property-type": "select-buttons" }, options: [ {"1": "Left"}, {"0": "Right"} ] } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "hamburgerIconClose", label: OP3._("Hamburger Close Icon"), selector: " .op3-hamburger-close .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "hamburgerIconCloseColor", label: OP3._("Hamburger Close Icon Colour"), selector: " .op3-hamburger-close" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "hamburgerIconCloseFontSize", label: OP3._("Hamburger Close Icon Size"), selector: " .op3-hamburger-close" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "hamburgerIconCloseVerticalOffset", label: OP3._("Hamburger Close Icon Vertical Offset"), selector: " .op3-hamburger-close", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-50", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" } } ],
                    [ OP3.Elements._extension.prop.Width, { id: "hamburgerSidebarWidth", label: OP3._("Hamburger Menu Width"), selector: " .op3-treemenu-content > [data-op3-children]", attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "200", "data-min-percent": "20", "data-max-px": "767", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.TreeMenuStyling ],
                    [ OP3.Elements._extension.prop.Animation, { label: OP3._("Submenu Animation"), selector: " .op3-treemenu-content" } ],

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
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],
                    [ OP3.Elements._extension.prop.MatchScreenWidth ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],

                    // hamburger dropdown style triangle
                    [ OP3.Elements._extension.prop.Display, { id: "hamburgerTriangleDisplay", selector: " > .op3-treemenu-content > .op3-triangle" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "hamburgerTriangleVisible", label: OP3._("Display Hamburger Menu Triangle"), selector: " > .op3-treemenu-content > .op3-triangle" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "hamburgerTriangleSize", label: OP3._("Triangle Size"), selector: " > .op3-treemenu-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.Top, { id: "hamburgerTriangleTop", label: OP3._("Triangle Vertical Position"), selector: " > .op3-treemenu-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    // [ OP3.Elements._extension.prop.Left, { id: "hamburgerTriangleLeft", label: OP3._("Triangle Horizontal Position"), selector: " > .op3-treemenu-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "256", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%" ] } ],
                    // [ OP3.Elements._extension.prop.MarginRight, { id: "hamburgerTriangleMarginRight", label: OP3._("Triangle Offset"), selector: " > .op3-treemenu-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-16", "data-max-px": "16", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    // [ OP3.Elements._extension.prop.MarginBottom, { id: "hamburgerTriangleMarginBottom", label: OP3._("Triangle Offset"), selector: " > .op3-treemenu-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-16", "data-max-px": "16", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],

                    // Submenu Wrapper
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemChildWrapMarginTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "treeMenuItemChildWrapMarginBottom", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "treeMenuItemChildWrapMarginLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "treeMenuItemChildWrapMarginRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "treeMenuItemChildWrapPaddingTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "treeMenuItemChildWrapPaddingBottom", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "treeMenuItemChildWrapPaddingLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "treeMenuItemChildWrapPaddingRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemChildWrapBackgroundColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "treeMenuItemChildWrapBorderTopWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "treeMenuItemChildWrapBorderTopStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "treeMenuItemChildWrapBorderTopColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "treeMenuItemChildWrapBorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "treeMenuItemChildWrapBorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "treeMenuItemChildWrapBorderBottomColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "treeMenuItemChildWrapBorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "treeMenuItemChildWrapBorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "treeMenuItemChildWrapBorderLeftColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "treeMenuItemChildWrapBorderRightWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "treeMenuItemChildWrapBorderRightStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "treeMenuItemChildWrapBorderRightColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "treeMenuItemChildWrapBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "treeMenuItemChildWrapBorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "treeMenuItemChildWrapBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "treeMenuItemChildWrapBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "treeMenuItemChildWrapBoxShadow", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "treeMenuItemChildWrapBackgroundImageChildWrap", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::after, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemChildWrapBackgroundBackgroundColorChildWrap", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::after, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],

                    // Link properties - tree menu item lvl 1
                    [ OP3.Elements._extension.prop.FlexGrow, { id: "treeMenuItemLvl1FlexGrow", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "treeMenuItemLvl1Width", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl1IconDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl1IconFontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "treeMenuItemLvl1IconSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl1DropdownIconDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl1DropdownIconFontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "treeMenuItemLvl1DropdownIconSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl1DropdownIconSpacingTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl1TriangleDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "treeMenuItemLvl1TriangleSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.Top, { id: "treeMenuItemLvl1TriangleTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle', } ],
                    [ OP3.Elements._extension.prop.Left, { id: "treeMenuItemLvl1TriangleLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle', units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "treeMenuItemLvl1TriangleMarginRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "treeMenuItemLvl1TriangleMarginBottom", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "treeMenuItemLvl1FontFamily", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "treeMenuItemLvl1FontWeight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl1FontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "treeMenuItemLvl1LetterSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "treeMenuItemLvl1FontStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "treeMenuItemLvl1TextTransform", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "treeMenuItemLvl1TextDecoration", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl1Color", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl1IconColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "treeMenuItemLvl1BorderTopWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "treeMenuItemLvl1BorderTopStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "treeMenuItemLvl1BorderTopColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "treeMenuItemLvl1BorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "treeMenuItemLvl1BorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "treeMenuItemLvl1BorderBottomColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "treeMenuItemLvl1BorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "treeMenuItemLvl1BorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "treeMenuItemLvl1BorderLeftColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "treeMenuItemLvl1BorderRightWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "treeMenuItemLvl1BorderRightStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "treeMenuItemLvl1BorderRightColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "treeMenuItemLvl1BorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "treeMenuItemLvl1BorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "treeMenuItemLvl1BorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "treeMenuItemLvl1BorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "treeMenuItemLvl1BackgroundImageBase", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemLvl1BackgroundColorBase", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { id: "treeMenuItemLvl1MinHeight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Left, { id: "treeMenuItemLvl1SubmenuAlignLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content', units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.Right, { id: "treeMenuItemLvl1SubmenuAlignRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.Top, { id: "treeMenuItemLvl1SubmenuAlignTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.Bottom, { id: "treeMenuItemLvl1SubmenuAlignBottom", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    // [ OP3.Elements._extension.prop.Transform, { id: "treeMenuItemLvl1SubmenuAlignTransform", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl1VerticalSpacingMarginTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children] > .op3-element' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl1VerticalSpacingAdjust", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]::before' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "treeMenuItemLvl1LinkPaddingLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "treeMenuItemLvl1LinkPaddingRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "treeMenuItemLvl1LinkJustifyContent", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link', options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" }, { "space-between": "Space Between" }, { "space-around": "Space Around" } ] } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl1DisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "treeMenuItemLvl1TransitionDuration", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"], .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl1"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "treeMenuItemLvl1BackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemLvl1BackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl1ColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl1IconColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "treeMenuItemLvl1BorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "treeMenuItemLvl1BorderTopStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "treeMenuItemLvl1BorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "treeMenuItemLvl1BorderBottomWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "treeMenuItemLvl1BorderBottomStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "treeMenuItemLvl1BorderBottomColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "treeMenuItemLvl1BorderLeftWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "treeMenuItemLvl1BorderLeftStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "treeMenuItemLvl1BorderLeftColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "treeMenuItemLvl1BorderRightWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "treeMenuItemLvl1BorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "treeMenuItemLvl1BorderRightColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl1"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],

                    // Link properties - tree menu item lvl 2
                    [ OP3.Elements._extension.prop.Width, { id: "treeMenuItemLvl2Width", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl2IconDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl2IconFontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "treeMenuItemLvl2IconSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl2DropdownIconDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl2DropdownIconFontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "treeMenuItemLvl2DropdownIconSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl2DropdownIconSpacingTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl2TriangleDisplay", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "treeMenuItemLvl2TriangleSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.Top, { id: "treeMenuItemLvl2TriangleTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.Left, { id: "treeMenuItemLvl2TriangleLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle', units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "treeMenuItemLvl2TriangleMarginRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "treeMenuItemLvl2TriangleMarginBottom", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "treeMenuItemLvl2FontFamily", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "treeMenuItemLvl2FontWeight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "treeMenuItemLvl2FontSize", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "treeMenuItemLvl2LetterSpacing", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "treeMenuItemLvl2FontStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "treeMenuItemLvl2TextTransform", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "treeMenuItemLvl2TextDecoration", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl2Color", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl2IconColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "treeMenuItemLvl2BorderTopWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "treeMenuItemLvl2BorderTopStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "treeMenuItemLvl2BorderTopColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "treeMenuItemLvl2BorderBottomWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "treeMenuItemLvl2BorderBottomStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "treeMenuItemLvl2BorderBottomColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "treeMenuItemLvl2BorderLeftWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "treeMenuItemLvl2BorderLeftStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "treeMenuItemLvl2BorderLeftColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "treeMenuItemLvl2BorderRightWidth", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "treeMenuItemLvl2BorderRightStyle", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "treeMenuItemLvl2BorderRightColor", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "treeMenuItemLvl2BorderTopLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "treeMenuItemLvl2BorderTopRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "treeMenuItemLvl2BorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "treeMenuItemLvl2BorderBottomRightRadius", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "treeMenuItemLvl2BackgroundImageBase", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemLvl2BackgroundColorBase", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { id: "treeMenuItemLvl2MinHeight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl2VerticalSpacingMarginTop", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children] > .op3-element' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "treeMenuItemLvl2VerticalSpacingAdjust", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]::before' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "treeMenuItemLvl2LinkPaddingLeft", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "treeMenuItemLvl2LinkPaddingRight", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "treeMenuItemLvl2LinkJustifyContent", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link', options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" }, { "space-between": "Space Between" }, { "space-around": "Space Around" } ] } ],
                    [ OP3.Elements._extension.prop.Display, { id: "treeMenuItemLvl2DisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "treeMenuItemLvl2TransitionDuration", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"], .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > .op3-treemenuitem-link, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::before, .op3-element[data-op3-element-spec="treemenuitemlvl2"] > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "treeMenuItemLvl2BackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "treeMenuItemLvl2BackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl2ColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "treeMenuItemLvl2IconColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "treeMenuItemLvl2BorderTopWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "treeMenuItemLvl2BorderTopStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "treeMenuItemLvl2BorderTopColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "treeMenuItemLvl2BorderBottomWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "treeMenuItemLvl2BorderBottomStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "treeMenuItemLvl2BorderBottomColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "treeMenuItemLvl2BorderLeftWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "treeMenuItemLvl2BorderLeftStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "treeMenuItemLvl2BorderLeftColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "treeMenuItemLvl2BorderRightWidthHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "treeMenuItemLvl2BorderRightStyleHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "treeMenuItemLvl2BorderRightColorHover", selector: ' .op3-element[data-op3-element-spec="treemenuitemlvl2"]:hover > .op3-treemenuitem-content > .op3-treemenuitem-link' } ],
                ];
            }

        }

    });

    // wrapped with function so we bind
    // events after OP3.Map does
    $(function() {

        // set default menuName (first one) on invalid one
        OP3.bind("elementappend", function(e, o) {
            var defaultValue = OP3.Menus.defaultValue();
            var row = OP3.$(o.node).filter("treemenu");
            var child = OP3.$(o.node).find("treemenu");

            row.add(child).each(function() {
                var element = OP3.$(this);
                var value = element.getOption("menuName", "all");

                if (!OP3.Menus.isValidMenu(value))
                    element.setOption("menuName", defaultValue, "all");
            });
        });

        // reload
        OP3.bind("elementchange::treemenu::menuName", function(e, o) {
            var element = OP3.$(o.node);
            var render = OP3.Menus.renderTree(o.value.after*1);

            // @todo - dummy fields???
            element.children().each(function() {
                OP3.$(this).detach();
            });

            render.forEach(function(node) {
                OP3.$(node).appendTo(element);
            });

            OP3.transmit("treemenurender", {
                node: o.node,
            })
        });

        // Reset margin opopsite to icon to 0 to prevent weird positioning
        OP3.bind("elementchange::treemenu::order", function(e, o) {
            if (o.id !== "hamburgerIconOrder")
                return;

            var value = "10px";
            var marginRight = "0px";
            var marginLeft = value;
            if (o.value.after === "1") {
                marginRight = value;
                marginLeft = "0px";
            }

            OP3.$(o.node).setOption("hamburgerMarginLeft", marginLeft, o.media);
            OP3.$(o.node).setOption("hamburgerMarginRight", marginRight, o.media);
        });

        // // To prevent weird icon/text alignment:
        // - when icon or text is set to off, set both icon spacing margins to 0
        // - when icon or text is set to on, set appropriate icon spacing based on the Hamburger Text Position
        OP3.bind("elementchange::treemenu::visible", function(e, o) {
            if (o.id !== "hamburgerIconVisible" && o.id !== "hamburgerTextVisible")
                return;

            var element = OP3.$(o.node);
            var value = "10px";
            var marginLeft = "0px";
            var marginRight = "0px";

            if (o.value.after === "1") {
                if (element.getOption("hamburgerIconOrder", true) == "0")
                    marginLeft = value;
                else
                    marginRight = value;
            }

            element.setOption("hamburgerMarginLeft", marginLeft, o.media);
            element.setOption("hamburgerMarginRight", marginRight, o.media);
        });

        // Remove child wrap and item borders when switching to hamburger (OP3-1209)
        // Reset item alignment when turning hamburger on/off per device
        OP3.bind("elementchange::treemenu::stackColumnsDesktop elementchange::treemenu::stackColumnsTablet elementchange::treemenu::stackColumnsMobile", function(e, o) {
            var device = e.type.replace("op3elementchange::treemenu::stackColumns", "").toLowerCase();
            var media = OP3.LiveEditor.deviceMedia(device);
            var menuitem = OP3.$(OP3.$(o.node).children().get(0)).element();
            var menu = OP3.$(o.node).element();
            var value = o.value.after === "1" ? "0px" : "1px";

            // Remove item borders for hamburger style and add them otherwise
            menuitem.setOption("borderAllWidth", value, media);
            menu.setOption("treeMenuItemChildWrapBorderAllWidth", value, media);

            // Set menu styling for the enabled device,
            // or reset item alignment for the disabled device
            if (o.value.after === "1") {
                var styling = menu.getOption("treeMenuStyling", true);
                menu.setOption("treeMenuStyling", null, media);
                menu.setOption("treeMenuStyling", styling, media);
            } else {
                menu.setOption("treeMenuItemLvl1LinkJustifyContent", null, media);
                menu.setOption("treeMenuItemLvl2LinkJustifyContent", null, media);
            }
        });

        // Adjust element settings when switching to different menu styling
        OP3.bind("elementchange::treemenu::treeMenuStyling", function(e, o) {
            if (o.id !== "treeMenuStyling")
                return;

            var element = OP3.$(o.node);
            var devices = [];
            if (element.getOption("stackColumnsDesktop", true) === "1") devices.push("desktop");
            if (element.getOption("stackColumnsTablet", true) === "1") devices.push("tablet");
            if (element.getOption("stackColumnsMobile", true) === "1") devices.push("mobile");

            var width = "300px";
            var justifyContent = "flex-start";
            var triangle = "0";
            var icon = "op3-icon-menu-34-2";
            var marginRight = "10px";

            switch(o.value.after) {
                // case "left":
                    // default values...
                    // break;

                case "right":
                    width = "300px";
                    justifyContent = "flex-start";
                    icon = "op3-icon-menu-34-2";
                    marginRight = "10px";
                    break;

                case "fullscreen":
                    width = "100%";
                    justifyContent = "center";
                    icon = "op3-icon-menu-34-2";
                    marginRight = "10px";
                    break;

                case "dropdown":
                    width = null;
                    justifyContent = "space-between";
                    icon = "op3-icon-small-down";
                    marginRight = "5px";
                    break;
            }

            // Set styles for all enabled devices
            devices.forEach(function(device) {
                var media = OP3.LiveEditor.deviceMedia(device);
                element.setOption("hamburgerSidebarWidth", width, media);
                element.setOption("treeMenuItemLvl1LinkJustifyContent", justifyContent, media);
                element.setOption("treeMenuItemLvl2LinkJustifyContent", justifyContent, media);
                element.setOption("hamburgerTriangleVisible", triangle, media);

                // Only tweak icon if changing from/to dropdown style
                if (o.value.before === "dropdown" || o.value.after === "dropdown") {
                    element.setOption("hamburgerIcon", icon, media);
                    element.setOption("hamburgerMarginRight", marginRight, media);
                }
            });
        });

        // Set data-op3-parent-options-property-value attribute (so
        // we can hide "Items Alignment" option in some cases)
        OP3.bind("elementoptionsformattach::treemenu", function(e, o) {
            var keys = [ "flexGrow" ];
            var treemenuitems = OP3.$(o.node).children();

            if (treemenuitems.length == 0)
                return;

            var treemenuitem = OP3.$(treemenuitems[0]);
            keys.forEach(function(key) {
                // force getOption due to link properties
                var value = treemenuitem.getOption(key, true);
                $(o.parent).attr("data-op3-child-options-property-value-" + key, value);
            });
        });
    });

})(jQuery, window, document);
