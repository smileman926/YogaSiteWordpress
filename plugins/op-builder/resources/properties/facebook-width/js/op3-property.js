/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FacebookWidth = OP3.defineClass({

        Name: "OP3.Property.FacebookWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookWidth",

            _defaults: {
                label: function() {
                    return OP3._("Width");
                },
                selector: " .fb-like",
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "225",
                    "data-max-px": "500",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-width");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-width", value);
            },

        },

    });

})(jQuery, window, document);
