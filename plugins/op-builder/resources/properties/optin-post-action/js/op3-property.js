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
    OP3.Elements._extension.prop.OptinPostAction = OP3.defineClass({

        Name: "OP3.Property.OptinPostAction",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinPostAction",

            _defaults: {
                label: function() {
                    return OP3._("Optin Post Action");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "(None)" },
                    { "notification": "Notification" },
                    { "redirect": "Redirect to URL" },
                    { "popoverlay": "Show Popup Overlay" }
                ],
                selector: ' [name="optin-post-action"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                $(this.target()).val(value || "");
            },

        },

    });

    // Add funnel option if needed
    OP3.bind("loadelementfunnels", function(e, o) {
        if (o && o.pluginActive && o.funnelId) {
            OP3.Elements._extension.prop.OptinPostAction.prototype._defaults.options.push({
                "nextFunnelStep": "Go to Next Funnel Step"
            });
            OP3.Elements._extension.prop.OptinPostAction.prototype._defaults.options.push({
                "goToFunnelStep": "Go to Specific Funnel Step"
            });
            // OP3.Elements._extension.prop.OptinPostAction.prototype._defaults.options.push({
            //     "prevFunnelStep": "Go to Previous Funnel Step"
            // });
       }
    });

})(jQuery, window, document);
