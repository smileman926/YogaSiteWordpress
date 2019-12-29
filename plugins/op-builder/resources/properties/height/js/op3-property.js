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
    OP3.Elements._extension.prop.Height = OP3.defineClass({

        Name: "OP3.Property.Height",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "height",

            _defaults: {
                label: function() {
                    return OP3._("Height");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px, vh, em, rem",
                    "data-min-px": "0",
                    "data-min-vh": "0",
                    "data-min-em": "0",
                    "data-min-rem": "0",
                    "data-max-px": "2000",
                    "data-max-vh": "2000",
                    "data-max-em": "2000",
                    "data-max-rem": "2000",
                    "data-step-px": "1",
                    "data-step-vh": "1",
                    "data-step-em": "1",
                    "data-step-rem": "1",
                    "data-precision-px": "0",
                    "data-precision-vh": "0",
                    "data-precision-em": "0",
                    "data-precision-rem": "0",
                },
                units: [
                    "px",
                    "vh",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
