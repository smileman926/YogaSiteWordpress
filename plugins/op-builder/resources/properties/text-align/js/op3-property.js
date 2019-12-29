/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.TextAlign = OP3.defineClass({

        Name: "OP3.Property.TextAlign",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textAlign",

            _defaults: {
                label: function() {
                    return OP3._("Text Align");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "inherit": "None" },
                    { "left": "Left" },
                    { "center": "Center" },
                    { "right": "Right" },
                    { "justify": "Justify" },
                ],
                replace: [
                    { "justify-all": "justify" },
                    { "match-parent": "left" },
                ],
            },

        },

    });

})(jQuery, window, document);
