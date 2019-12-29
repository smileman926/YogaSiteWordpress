/**
 * OptimizePress3 element type:
 * op3 element manipulation for each
 * element type.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    // configuration
    OP3.bind("loadlang", function() {
        window.OP3.DocumentOptions._config = {
            id: "style",
            label: OP3._("Style"),
            icon: "op3-icon-paint-37-2",
            group: [
                /*{
                    id: "color-scheme",
                    label: OP3._("Colour Scheme"),
                    reset: true,
                    prependHTML: '<div class="op3-options-group-notes">Customize the colours in your colour scheme for the page. Remember any locations where you have used colours from your color scheme will be updated when you change these colour selections.</div>',
                    property: [ "--op3-color-scheme-1", "--op3-color-scheme-2", "--op3-color-scheme-3", "--op3-color-scheme-4", "--op3-color-scheme-5" ],
                },*/
                {
                    id: "background",
                    label: OP3._("Page Background"),
                    reset: true,
                    property: [ "backgroundColor", "backgroundImage", "backgroundImageUrl", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                },
                {
                    id: "headline-typography",
                    label: OP3._("Headline Typography"),
                    reset: true,
                    property: [ "headlineFontFamily", "headlineFontWeight", "headlineColor" ],
                },
                {
                    id: "typography",
                    label: OP3._("Body Typography"),
                    reset: true,
                    property: [ "bodyFontFamily", "bodyFontWeight", "textFontSize", "bodyColor" ],
                },
                {
                    id: "scripts",
                    label: OP3._("Page Scripts"),
                    reset: true,
                    property: [ "headerScript", "bodyScript", "footerScript" ],
                },
                {
                    id: "css",
                    label: OP3._("Custom CSS"),
                    reset: true,
                    property: [ "customCss" ],
                },
                {
                    id: "funnels",
                    label: OP3._("OptimizeFunnels"),
                    reset: true,
                    property: [ "funnelPageTemplate" ],
                },
                {
                    id: "export",
                    label: OP3._("Export Template"),
                    reset: false,
                    property: [ "export" ],
                },
            ],
        }
    });

})(jQuery, window, document);
