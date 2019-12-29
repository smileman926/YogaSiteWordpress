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
    OP3.Elements._extension.prop.FacebookNumposts = OP3.defineClass({

        Name: "OP3.Property.FacebookNumposts",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookNumposts",

            _defaults: {
                label: function() {
                    return OP3._("Comment Count");
                },
                selector: " .fb-comments",
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "5",
                    "data-max-": "100",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
                units: [
                    "",
                ],
                defaultUnit: "",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-numposts") || "20";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-numposts", value || "20");
            },

        },

    });

})(jQuery, window, document);
