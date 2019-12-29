/**
 * OptimizePress3 document:
 * op3 document element manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-designer.js
 *     - elements/default/op3-element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Document constructor
     *
     * @param {Class}
     */
    var OP3_Document = OP3.defineClass({

        Name: "OP3.Document",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            //this._node = OP3.Designer.$ui.parent.get(0);
            this._node = OP3.Designer.$ui.html.get(0);
            this._options = this._options || this._props;

            this._init(arg);
        },

        Prototype: {

            _type: "document",

            _props: function() {
                return [
                    // color scheme
                    [ OP3.Elements._extension.prop.VarColorScheme1 ],
                    [ OP3.Elements._extension.prop.VarColorScheme2 ],
                    [ OP3.Elements._extension.prop.VarColorScheme3 ],
                    [ OP3.Elements._extension.prop.VarColorScheme4 ],
                    [ OP3.Elements._extension.prop.VarColorScheme5 ],

                    // background
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: " body", group: "page-background" } ],

                    // Default Typography
                    [ OP3.Elements._extension.prop.FontFamilyDefaultHead ],
                    [ OP3.Elements._extension.prop.FontWeightDefaultHead ],
                    [ OP3.Elements._extension.prop.FontStyleDefaultHead ],
                    [ OP3.Elements._extension.prop.FontFamilyDefaultBody ],
                    [ OP3.Elements._extension.prop.FontWeightDefaultBody ],
                    [ OP3.Elements._extension.prop.FontStyleDefaultBody ],

                    // Headlines Typography
                    [ OP3.Elements._extension.prop.FontFamily, { id: "headlineFontFamily", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6', group: "page-headline-typography" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "headlineFontWeight", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6', group: "page-headline-typography" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "headlineColor", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6', group: "page-headline-typography" } ],

                    // Body Typography
                    [ OP3.Elements._extension.prop.FontFamily, { id: "bodyFontFamily", selector: ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .op3-countdown-timer', group: "page-body-typography" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "bodyFontWeight", selector: ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"]', group: "page-body-typography" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        id: "textFontSize",
                        selector: ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .wrapper',
                        group: "page-body-typography",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "72",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                            "data-avoid-text-max": "1"
                        },
                    } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bodyColor", selector: ' #op3-designer-element', group: "page-body-typography" } ],

                    // Scripts
                    [ OP3.Elements._extension.prop.HeaderScript, { selector: " .op3-header-js", attr: {wrap: "off"} } ],
                    [ OP3.Elements._extension.prop.BodyScript, { selector: " .op3-body-js", attr: {wrap: "off"} } ],
                    [ OP3.Elements._extension.prop.FooterScript, { selector: " .op3-footer-js", attr: {wrap: "off"} } ],

                    // Custom CSS
                    [ OP3.Elements._extension.prop.Css, { id: "customCss", selector: " #op3-custom-css", group: "custom-css", label: "Enter CSS rules without style tags", attr: {wrap: "off"} } ],

                    // Export template
                    [ OP3.Elements._extension.prop.Export ],

                    // Mark page as funnel page template
                    [ OP3.Elements._extension.prop.FunnelPageTemplate, { selector: " #op3-designer-element" } ],
                    //[ OP3.Elements._extension.prop.FunnelPageTemplate, { id: "funnelPageTemplate", selector: " #op3-funnel-page-template", group: "funnel-page-template", label: "Funnel Page Template" } ],
                ];
            },

            _select: function(node) {
                // pass
            },

            _create: function(style) {
                // pass
            },

            _wrap: function() {
                // pass
            },

            _uuid: function() {
                return null
            },

            _ancestorsMap: function(skipCurrent) {
                return [];
            },

            _pasteObject: function() {
                if (!OP3.LocalStorage)
                    return null;

                var source = OP3.LocalStorage.get("clipboard");
                if (!source)
                    return null;

                return {
                    source: JSON.stringify(source),
                    destination: this.node(),
                    method: "appendTo",
                }
            },

            uuid: function() {
                return null;
            },

            gid: function() {
                return null;
            },

            type: function() {
                return this._type;
            },

            spec: function() {
                return null;
            },

            title: function() {
                return "Document";
            },

            style: function(value) {
                return null;
            },

            desc: function() {
                return this.title();
            },

            selector: function() {
                return "html";
            },

            appendTo: function(node) {
                // pass
            },

            insertBefore: function(node) {
                // pass
            },

            insertAfter: function(node) {
                // pass
            },

            wrap: function(node) {
                // pass
            },

            remove: function() {
                // pass
            },

            detach: function() {
                // pass
            },

            focus: function(node) {
                // pass
            },

            unfocus: function() {
                // pass
            },

            config: function(style) {
                return {};
            },

            markup: function(style) {
                return null;
            },

            parent: function() {
                return null;
            },

            parents: function() {
                return [];
            },

        },
    });

    // autoinit
    OP3.bind("loadajaxinit", function() {
        $("<h1 />")
            .text("Dummy headline")
            .css("display", "none")
            .appendTo(OP3.Designer.$ui.parent);

        $("<p />")
            .text("Dummy paragraph")
            .css("display", "none")
            .appendTo(OP3.Designer.$ui.parent);

        OP3.Document = new OP3_Document();
        window.parent.OP3.Document = OP3.Document;
    });

    // initialize element append counter
    OP3.bind("load::designer", function(e, o) {
        OP3.Designer.$ui.html
            .data("op3-element-append-count", 1);
    });

})(jQuery, window, document);
