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
    OP3.Elements._extension.prop.OptinWebhookUrl = OP3.defineClass({

        Name: "OP3.Property.OptinWebhookUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinWebhookUrl",

            _defaults: {
                label: function() {
                    return OP3._("Using Webhook");
                },
                selector: ' [name="optin-webhook-url"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    return;
                }

                // not an css property, ignore media
                $(this.target()).val(value || "");
            },

        },

    });

})(jQuery, window, document);
