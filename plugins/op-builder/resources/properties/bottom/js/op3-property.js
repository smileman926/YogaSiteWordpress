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
    OP3.Elements._extension.prop.Bottom = OP3.defineClass({

        Name: "OP3.Property.Bottom",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "bottom",

            _defaults: {
                label: function() {
                    return OP3._("Bottom");
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
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                    "vh",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
            },

            computed: function() {
                var result = OP3.Elements._extension.prop.Default.prototype.computed.apply(this, arguments);
                if (result === "auto")
                    // can not calculate style on invisible
                    // elements, fallback is 0px
                    result = "0px"

                return result;
            },

        },

    });

})(jQuery, window, document);
