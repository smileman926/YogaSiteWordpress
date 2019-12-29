/**
 * OptimizePress3 element type:
 * FAQ with op3 elements in content.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.ContentToggle = OP3.defineClass({

        Name: "OP3.Element.ContentToggle",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "contenttoggle",

            _props: function() {
                return [

                    [ OP3.Elements._extension.prop.CloseOtherTabs ],

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

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link properties - contenttoggleitem
                    [ OP3.Elements._extension.prop.Color, { id: "contentToggleItemColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h1, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h2, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h3, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h4, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h5, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header h6, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "contentToggleItemIconColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header .op3-icon.op3-contenttoggleitem-open-icon, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header .op3-icon.op3-contenttoggleitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "contentToggleItemBoxShadow", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "contentToggleItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "contentToggleItemBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "contentToggleItemBackgroundImageContent", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-content [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "contentToggleItemBackgroundColorContent", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-content [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "contentToggleItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "contentToggleItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "contentToggleItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "contentToggleItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "contentToggleItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "contentToggleItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "contentToggleItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "contentToggleItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "contentToggleItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "contentToggleItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "contentToggleItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "contentToggleItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    // [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "contentToggleItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    // [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "contentToggleItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    // [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "contentToggleItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    // [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "contentToggleItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "contentToggleItemMarginTop", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "contentToggleItemMarginBottom", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "contentToggleItemMarginLeft", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "contentToggleItemMarginRight", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "contentToggleItemPaddingTop", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "contentToggleItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "contentToggleItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "contentToggleItemPaddingRight", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "contentToggleItemFontSizeIcon", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-open-icon, .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "contentToggleItemFontSize", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "contentToggleItemFontFamily", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "contentToggleItemFontWeight", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "contentToggleItemFlexDirection", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "contentToggleItemJustifyContent", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "contentToggleItemIconPaddingRight", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "contentToggleItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-content, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h3, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "contentToggleItemColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h1, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h2, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h3, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h4, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h5, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header h6, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "contentToggleItemIconColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header .op3-icon.op3-contenttoggleitem-open-icon, .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header .op3-icon.op3-contenttoggleitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "contentToggleItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "contentToggleItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "contentToggleItemBackgroundImageContentHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "contentToggleItemBackgroundColorContentHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover .op3-contenttoggleitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "contentToggleItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "contentToggleItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "contentToggleItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "contentToggleItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "contentToggleItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "contentToggleItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "contentToggleItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "contentToggleItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "contentToggleItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "contentToggleItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "contentToggleItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "contentToggleItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    // [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "contentToggleItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    // [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "contentToggleItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    // [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "contentToggleItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],
                    // [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "contentToggleItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="contenttoggleitem"]:hover' } ],

                ];

            },

        },

    });

    // Init accordians when live editor is loaded
    // or contenttoggle element is appended
    OP3.bind("load elementappendfirst", function(e, o) {
        $(o ? o.node : document)
            .find('.op3-contenttoggle-wrapper ')
                .each(function() {
                    var $this = $(this);
                    var $element = $this.closest('.op3-element[data-op3-element-type="contenttoggle"]');
                    var closeOthers = $(this).attr("data-op3-close-other-tabs") || 0;

                    $element.accordion({
                        questionClass: '.op3-contenttoggleitem-header',
                        answerClass: '.op3-contenttoggleitem-content',
                        itemClass: '.op3-element[data-op3-element-type="contenttoggleitem"]',
                        closeOthers: parseInt(closeOthers),
                    });
                });
    });

    // When closeOtherTabs property is changed
    // update closeOther jquery-accordian lib flag
    OP3.bind("elementchange::contenttoggle::closeOtherTabs", function(e, o) {
        var lib = $(o.node).data("jquery-accordion");
        var value = parseInt(o.value.after);

        if (lib)
            lib.options("closeOthers", value);
    });

})(jQuery, window, document);
