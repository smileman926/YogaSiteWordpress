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
    OP3.Elements._extension.prop.Opacity = OP3.defineClass({

        Name: "OP3.Property.Opacity",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "opacity",

            _defaults: {
                label: function() {
                    return OP3._("Opacity");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "0",
                    "data-max-": "1",
                    "data-step-": "0.01",
                    "data-precision-": "2",
                },
                units: [
                    ""
                ],
                defaultUnit: "",
            },

        },

    });

})(jQuery, window, document);
