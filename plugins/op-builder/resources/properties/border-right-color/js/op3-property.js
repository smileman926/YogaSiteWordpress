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
    OP3.Elements._extension.prop.BorderRightColor = OP3.defineClass({

        Name: "OP3.Property.BorderRightColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderRightColor",

            _defaults: {
                label: function() {
                    return OP3._("Border Right Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                },
            },

        },

    });

})(jQuery, window, document);
