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
    OP3.Elements._extension.prop.Order = OP3.defineClass({

        Name: "OP3.Property.Order",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "order",

            _defaults: {
                label: function() {
                    return OP3._("Order");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "0",
                    "data-max-": "100",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
                units: [
                    ""
                ],
                defaultUnit: "",
            },

        },

    });

})(jQuery, window, document);
