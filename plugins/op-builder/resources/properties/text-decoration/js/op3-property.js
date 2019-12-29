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
    OP3.Elements._extension.prop.TextDecoration = OP3.defineClass({

        Name: "OP3.Property.TextDecoration",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textDecoration",

            _defaults: {
                label: function() {
                    return OP3._("Text Decoration");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "overline": "Overline" },
                    { "line-through": "Line Through" },
                    { "underline": "Underline" },
                ],
            },

            _fix: function(value) {
                // chrome: "none solid rgb(33, 37, 41)"
                if (value)
                    value = value.split(" ").shift();

                return value;
            },

        },

    });

})(jQuery, window, document);
