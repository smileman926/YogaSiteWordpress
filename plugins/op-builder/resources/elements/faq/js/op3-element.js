/**
 * OptimizePress3 element type:
 * Frequently asked questions.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Faq = OP3.defineClass({

        Name: "OP3.Element.Faq",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "faq",

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
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link properties - faqitem
                    [ OP3.Elements._extension.prop.Color, { id: "faqItemColor", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h1, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h2, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h3, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h4, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h5, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header h6, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "faqItemIconColor", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header .op3-icon.op3-faqitem-open-icon, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header .op3-icon.op3-faqitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "faqItemBoxShadow", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "faqItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "faqItemBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "faqItemBackgroundImageContent", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-content [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "faqItemBackgroundColorContent", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-content [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "faqItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "faqItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "faqItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "faqItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "faqItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "faqItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "faqItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "faqItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "faqItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "faqItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "faqItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "faqItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "faqItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "faqItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "faqItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "faqItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "faqItemMarginTop", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "faqItemMarginBottom", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "faqItemMarginLeft", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "faqItemMarginRight", selector: ' .op3-element[data-op3-element-type="faqitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "faqItemPaddingTop", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "faqItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "faqItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "faqItemPaddingRight", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "faqItemFontSizeIcon", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-open-icon, .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "faqItemFontSize", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "faqItemFontFamily", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "faqItemFontWeight", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "faqItemFlexDirection", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "faqItemJustifyContent", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "faqItemIconPaddingRight", selector: ' .op3-element[data-op3-element-type="faqitem"] .op3-faqitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "faqItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-content, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h3, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "faqItemColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h1, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h2, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h3, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h4, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h5, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header h6, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "faqItemIconColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header .op3-icon.op3-faqitem-open-icon, .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header .op3-icon.op3-faqitem-close-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "faqItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "faqItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-header [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "faqItemBackgroundImageContentHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "faqItemBackgroundColorContentHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover .op3-faqitem-content [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "faqItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "faqItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "faqItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "faqItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "faqItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "faqItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "faqItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "faqItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "faqItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "faqItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "faqItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "faqItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "faqItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "faqItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "faqItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "faqItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="faqitem"]:hover' } ],

                    // Link Properties - text
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textFontFamily", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textFontSize", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textLineHeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textLetterSpacing", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyle", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransform", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecoration", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "textTextAlign", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "textBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textMarginTop", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textMarginBottom", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textMarginLeft", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textMarginRight", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textPaddingTop", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textPaddingBottom", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textPaddingLeft", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textPaddingRight", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "textMaxWidth", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "textBorderTopWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "textBorderTopStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "textBorderTopColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "textBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "textBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "textBorderBottomColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "textBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "textBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "textBorderLeftColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "textBorderRightWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "textBorderRightStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "textBorderRightColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "textBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "textBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "textBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "textBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > *' } ],
                ];

            },

        },

    });

    // Init accordians when live editor is loaded
    // or faq element is appended
    OP3.bind("load elementappendfirst", function(e, o) {
        $(o ? o.node : document)
            .find('.op3-faq-wrapper ')
                .each(function() {
                    var $this = $(this);
                    var $element = $this.closest('.op3-element[data-op3-element-type="faq"]');
                    var closeOthers = $(this).attr("data-op3-close-other-tabs") || 0;

                    $element.accordion({
                        questionClass: '.op3-faqitem-header',
                        answerClass: '.op3-faqitem-content',
                        itemClass: '.op3-element[data-op3-element-type="faqitem"]',
                        closeOthers: parseInt(closeOthers),
                    });
                });
    });

    // When closeOtherTabs property is changed
    // update closeOther jquery-accordian lib flag
    OP3.bind("elementchange::faq::closeOtherTabs", function(e, o) {
        var lib = $(o.node).data("jquery-accordion");
        var value = parseInt(o.value.after);

        if (lib)
            lib.options("closeOthers", value);
    });

})(jQuery, window, document);
