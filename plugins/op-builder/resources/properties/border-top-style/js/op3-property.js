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
    OP3.Elements._extension.prop.BorderTopStyle = OP3.defineClass({

        Name: "OP3.Property.BorderTopStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderTopStyle",

            _defaults: {
                label: function() {
                    return OP3._("Border Top Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    {"none": "None"},
                    {"solid": "Solid"},
                    {"dashed": "Dashed"},
                    {"dotted": "Dotted"},
                ],
            },

        },

    });

})(jQuery, window, document);
