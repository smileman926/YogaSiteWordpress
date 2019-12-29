/**
 * OptimizePress3 z-index property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ZIndex = OP3.defineClass({

        Name: "OP3.Property.ZIndex",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "zIndex",

            _defaults: {
                label: function() {
                    return OP3._("Z-Index");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "0",
                    "data-max-": "100",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
                replace: [
                    { auto: "0" },
                ],
                units: [
                    "",
                ],
                defaultUnit: "",
            },

        },

    });

})(jQuery, window, document);
