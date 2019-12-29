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
    OP3.Elements._extension.prop.LetterSpacing = OP3.defineClass({

        Name: "OP3.Property.LetterSpacing",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "letterSpacing",

            _defaults: {
                label: function() {
                    return OP3._("Letter Spacing");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "-5",
                    "data-max-px": "25",
                    "data-step-px": "0.5",
                    "data-precision-px": "1",
                },
                replace: [
                    { normal: "0px" },
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
