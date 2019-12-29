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
    OP3.Elements._extension.prop.Color = OP3.defineClass({

        Name: "OP3.Property.Color",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "color",

            _defaults: {
                label: function() {
                    return OP3._("Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                },
            },

        },

    });

})(jQuery, window, document);
