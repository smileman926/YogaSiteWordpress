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
    OP3.Elements._extension.prop.ColumnGap = OP3.defineClass({

        Name: "OP3.Property.ColumnGap",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "columnGap",

            _defaults: {
                label: function() {
                    return OP3._("Column Gap");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "50",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                replace: [
                    { "normal": "0px" },
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
