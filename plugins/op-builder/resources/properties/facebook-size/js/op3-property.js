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
    OP3.Elements._extension.prop.FacebookSize = OP3.defineClass({

        Name: "OP3.Property.FacebookSize",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookSize",

            _defaults: {
                label: function() {
                    return OP3._("Button Size");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "small": "Small" },
                    { "large": "Large" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-size") || "small";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-size", value || "small");
            },

        },

    });

})(jQuery, window, document);
