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
    OP3.Elements._extension.prop.BorderBottomLeftRadius = OP3.defineClass({

        Name: "OP3.Property.BorderBottomLeftRadius",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderBottomLeftRadius",

            _defaults: {
                label: function() {
                    return OP3._("Border Bottom Left Radius");
                },
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
                hidden: true,
            },

        },

    });

})(jQuery, window, document);
