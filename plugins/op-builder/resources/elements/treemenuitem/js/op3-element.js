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
    OP3.Elements._extension.type.TreeMenuItem = OP3.defineClass({

        Name: "OP3.Element.TreeMenuItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "treemenuitem",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.MenuItemId ],
                    [ OP3.Elements._extension.prop.Label, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-text" } ],
                    [ OP3.Elements._extension.prop.Href, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.Target, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],

                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplay", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "iconVisible", label: OP3._("Menu Icon Visible"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon", label: OP3._("Icon Size") } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "iconSpacing", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon", label: OP3._("Icon Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-20", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0" } } ],
                    [ OP3.Elements._extension.prop.Display, { id: "dropdownIconDisplay", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "dropdownIconVisible", label: OP3._("Dropdown Icon Visible"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon" } ],
                    [ OP3.Elements._extension.prop.DropdownIcon, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "dropdownIconFontSize", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon", label: OP3._("Icon Size") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "dropdownIconSpacing", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon", label: OP3._("Icon Horizontal Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-20", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0" } } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "dropdownIconSpacingTop", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon", label: OP3._("Icon Vertical Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-20", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0" } } ],

                    [ OP3.Elements._extension.prop.Display, { id: "triangleDisplay", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "triangleVisible", label: OP3._("Triangle Visible"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "triangleSize", label: OP3._("Triangle Size"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.Top, { id: "triangleTop", label: OP3._("Triangle Position"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.Left, { id: "triangleLeft", label: OP3._("Triangle Position"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "256", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "triangleMarginRight", label: OP3._("Triangle Offset"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-16", "data-max-px": "16", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "triangleMarginBottom", label: OP3._("Triangle Offset"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-16", "data-max-px": "16", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],

                    [ OP3.Elements._extension.prop.FontFamily, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.LineHeight, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],

                    [ OP3.Elements._extension.prop.Color, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon" } ],
                    // [ OP3.Elements._extension.prop.BackgroundColor ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > .op3-treemenuitem-content > [data-op3-background="base"]::before, > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > .op3-treemenuitem-content > [data-op3-background="base"]::before, > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],
                    [ OP3.Elements._extension.prop.BorderActive, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ' > .op3-treemenuitem-content > .op3-treemenuitem-link, > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ' > .op3-treemenuitem-content > .op3-treemenuitem-link, > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ' > .op3-treemenuitem-content > .op3-treemenuitem-link, > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ' > .op3-treemenuitem-content > .op3-treemenuitem-link, > .op3-treemenuitem-content > [data-op3-background="base"]' } ],
                    [ OP3.Elements._extension.prop.MinHeight, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Horizontal Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "400", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ] } ],
                    [ OP3.Elements._extension.prop.MarginTop, { label: OP3._("Vertical Spacing"), id: "verticalSpacingMarginTop", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children] > .op3-element", computedFallback: "0px" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "verticalSpacingAdjust", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]::before", computedFallback: "0px" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "linkPaddingLeft", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "linkPaddingRight", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "256", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Text Alignment"), selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link", options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" }, { "space-between": "Space Between" }, { "space-around": "Space Around" } ] } ],
                    [ OP3.Elements._extension.prop.FlexGrow, { label: OP3._("Stretch Items") } ],

                    // submenu align
                    [ OP3.Elements._extension.prop.TreemenuAlign, { id: "submenuAlign", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.Left, { id: "submenuAlignLeft", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content", attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "200", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0" }, keywords: [ "auto" ], units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.Right, { id: "submenuAlignRight", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.Top, { id: "submenuAlignTop", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.Bottom, { id: "submenuAlignBottom", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.Transform, { id: "submenuAlignTransform", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // [ OP3.Elements._extension.prop.BackgroundColor, { id: "childBackgroundColor", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxModel, { id: "childWrapBoxModel", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { label: OP3._("Vertical Position"), id: "childWrapMarginTop", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "childWrapMarginBottom", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "childWrapMarginLeft", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "childWrapMarginRight", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "childWrapPaddingTop", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "childWrapPaddingBottom", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "childWrapPaddingLeft", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "childWrapPaddingRight", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],

                    // [ OP3.Elements._extension.prop.BackgroundColor, { id: "childWrapBackgroundColor", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], > .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "childWrapBackgroundImageChildWrapType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "childWrapBackgroundImageChildWrap", selector: '.op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::before, .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::after, .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "childWrapBackgroundBackgroundColorChildWrap", selector: ' .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::before, .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]::after, .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "childWrapBackgroundImageChildWrapAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "childWrapBackgroundImageChildWrapPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "childWrapBackgroundImageChildWrapStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "childWrapBackgroundImageChildWrapStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "childWrapBackgroundImageChildWrapStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "childWrapBackgroundImageChildWrapStopPosition" } ],

                    [ OP3.Elements._extension.prop.BorderActive, { id: "childWrapBorderActive", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "childWrapBorderTopWidth", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "childWrapBorderTopStyle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "childWrapBorderTopColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "childWrapBorderBottomWidth", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "childWrapBorderBottomStyle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "childWrapBorderBottomColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "childWrapBorderLeftWidth", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "childWrapBorderLeftStyle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "childWrapBorderLeftColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "childWrapBorderRightWidth", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "childWrapBorderRightStyle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "childWrapBorderRightColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "childWrapBorderAllWidth", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "childWrapBorderAllStyle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "childWrapBorderAllColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], .op3-treemenuitem-content > .op3-treemenuitem-children-content > .op3-triangle .op3-triangle-wrapper::after" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "childWrapBorderTopLeftRadius", selector: ' .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "childWrapBorderTopRightRadius", selector: ' .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "childWrapBorderBottomLeftRadius", selector: ' .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "childWrapBorderBottomRightRadius", selector: ' .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children], > .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-background="childwrap"]' } ],

                    [ OP3.Elements._extension.prop.BoxShadow, { id: "childWrapBoxShadow", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "childWrapBoxShadowAngle", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "childWrapBoxShadowDistance", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "childWrapBoxShadowBlur", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "childWrapBoxShadowSpread", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "childWrapBoxShadowColor", selector: " .op3-treemenuitem-content > .op3-treemenuitem-children-content > [data-op3-children]" } ],

                    //[ OP3.Elements._extension.prop.BoxModel ],
                    //[ OP3.Elements._extension.prop.MarginTop, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.MarginBottom, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.MarginLeft, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.MarginRight, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.PaddingTop, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.PaddingBottom, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.PaddingLeft, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    //[ OP3.Elements._extension.prop.PaddingRight, { selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "500", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%" ] } ],
                    [ OP3.Elements._extension.prop.WidthAuto ],

                    // Hover
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ', > .op3-treemenuitem-content > .op3-treemenuitem-link, > .op3-treemenuitem-content > [data-op3-background="base"]::before, > .op3-treemenuitem-content > [data-op3-background="base"]::after'} ],
                    // [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorHover", selector: ":hover" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ':hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ':hover > .op3-treemenuitem-content > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    // [ OP3.Elements._extension.prop.Color, { id: "colorExpand", selector: " > .op3-treemenuitem-content.jquery-simple-nav-tree-expand > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-icon" } ],
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveHover", selector: " > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link", label: OP3._("Border Hover Colour") } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { id: "borderAllWidthHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { id: "borderAllStyleHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { id: "borderAllColorHover", selector: ":hover > .op3-treemenuitem-content > .op3-treemenuitem-link" } ],
                    [ OP3.Elements._extension.prop.BorderHoverStyle ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                ];
            }

        }

    });

    // OP3.bind("elementchange::treemenuitem::paddingRight", function(e, o) {
    //     if (o.id !== "linkPaddingRight")
    //         return;

    //     OP3.$(o.node).setOption("linkPaddingLeft", o.value.after, o.media);
    // });

    // OP3.bind("elementchange::treemenuitem::marginTop", function(e, o) {
    //     if (o.id !== "verticalSpacingMarginTop")
    //         return;

    //     OP3.$(o.node).setOption("verticalSpacingAdjust", "-" + o.value.after, o.media);
    // });

    // // Set data-op3-parent-options-property-value attribute
    // // (so we can hide some options with css).
    // OP3.bind("elementoptionssync::treemenuitem::width", function(e, o) {
    //     var value = o.value === "auto" ? "1" : "0";

    //     $(o.parent).attr("data-op3-parent-options-property-value-width-auto", value);
    // });

    // // Set data-op3-parent-options-property-value attribute
    // // (so we can hide "Child Elements Gutter" option for
    // // some layouts with CSS).
    // OP3.bind("elementoptionsformattach::treemenuitem", function(e, o) {
    //     var key = "stackColumnsTablet";
    //     var value = OP3.$(o.node).parent().getOption(key, "all");
    //     $(o.parent).attr("data-op3-parent-options-property-value-" + key, value);

    //     key = "stackColumnsMobile";
    //     value = OP3.$(o.node).parent().getOption(key, "all");
    //     $(o.parent).attr("data-op3-parent-options-property-value-" + key, value);
    // });
})(jQuery, window, document);
