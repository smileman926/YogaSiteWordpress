/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RedirectUrl = OP3.defineClass({

        Name: "OP3.Property.RedirectUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "redirectUrl",

            _defaults: {
                label: function() {
                    return OP3._("Redirect Url");
                },
                attr: {
                    "type": "url",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-redirect-url") || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    return;
                }

                $(this.target()).attr("data-op3-redirect-url", value || "");
            },

        },

    });

})(jQuery, window, document);
