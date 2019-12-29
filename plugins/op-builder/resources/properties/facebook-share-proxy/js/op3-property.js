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
    OP3.Elements._extension.prop.FacebookShareProxy = OP3.defineClass({

        Name: "OP3.Property.FacebookShareProxy",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookShareProxy",

            _defaults: {
                label: function() {
                    return OP3._("Share Button");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-share") === "true" ? "1" : "0";
            },

            setter: function(value, media) {
                // Intentionaly string since true/false needs to be in data-attribute
                var value = (value === "1") ? "true" : "false";

                this.element.setOption('facebookShare', value);
            },

        },

    });

})(jQuery, window, document);
