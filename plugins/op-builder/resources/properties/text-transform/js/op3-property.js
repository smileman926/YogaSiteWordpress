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
    OP3.Elements._extension.prop.TextTransform = OP3.defineClass({

        Name: "OP3.Property.TextTransform",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textTransform",

            _defaults: {
                label: function() {
                    return OP3._("Text Transform");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "capitalize": "Capitalize" },
                    { "uppercase": "Uppercase" },
                    { "lowercase": "Lowercase" },
                ],
                replace: [
                    { "full-width": "none" },
                ],
            },

        },

    });

})(jQuery, window, document);
