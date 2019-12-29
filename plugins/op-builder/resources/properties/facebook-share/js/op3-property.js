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
    OP3.Elements._extension.prop.FacebookShare = OP3.defineClass({

        Name: "OP3.Property.FacebookShare",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookShare",

            _defaults: {
                label: function() {
                    return OP3._("Share Button");
                },
                selector: " .fb-like",
                tag: "select",
                // attr: {
                //     "data-property-type": "select2-simple",
                // },
                options: [
                    { "true": "Yes" },
                    { "false": "No" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-share");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-share", value);
            },

        },

    });

})(jQuery, window, document);
