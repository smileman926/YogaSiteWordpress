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
    OP3.Elements._extension.prop.BorderTopColor = OP3.defineClass({

        Name: "OP3.Property.BorderTopColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderTopColor",

            _defaults: {
                label: function() {
                    return OP3._("Border Top Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                },
            },

        },

    });

})(jQuery, window, document);
