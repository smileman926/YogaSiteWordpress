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
    OP3.Elements._extension.prop.Display = OP3.defineClass({

        Name: "OP3.Property.Display",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "display",

            _defaults: {
                label: function() {
                    return OP3._("Display");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "inline": "Inline" },
                    { "inline-block": "Inline-Block" },
                    { "block": "Block" },
                    { "flex": "Flex" },
                    { "inline-flex": "Inline-Flex" },
                    { "table": "Table" },
                    { "none": "None" },
                ],
            },

        },

    });

})(jQuery, window, document);
