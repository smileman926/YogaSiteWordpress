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
    OP3.Elements._extension.prop.BorderBottomRightRadius = OP3.defineClass({

        Name: "OP3.Property.BorderBottomRightRadius",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderBottomRightRadius",

            _defaults: {
                label: function() {
                    return OP3._("Border Bottom Right Radius");
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
