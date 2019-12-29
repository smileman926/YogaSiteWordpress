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
    OP3.Elements._extension.prop.Action = OP3.defineClass({

        Name: "OP3.Property.Action",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "action",

            _defaults: {
                label: function() {
                    return OP3._("Action");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                funnels: {},
                options: [
                    // { "wp": "Link to WP Page" },
                    { "link": "Link URL" },
                    // { "section": "Jump to Section" },
                    { "popoverlay": "Show Popup Overlay" },
                    { "video": "Show Video Overlay" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                // TODO: Remove "data-op3" part after a few versions (OP3-1228)
                return $(this.target()).attr("data-op-" + this.name()) || $(this.target()).attr("data-op3-" + this.name()) || "link";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-" + this.name(), value || "link");
            },

        },

    });

    // Add funnel option if needed
    OP3.bind("loadelementfunnels", function(e, o) {
        if (o && o.pluginActive && o.funnelId) {
            // Add the select option
            if (o.nextPageId) {
                OP3.Elements._extension.prop.Action.prototype._defaults.options.push({
                    "nextFunnelStep": "Go to Next Funnel Step"
                });
            }

            if (o.prevPageId) {
                OP3.Elements._extension.prop.Action.prototype._defaults.options.push({
                    "prevFunnelStep": "Go to Previous Funnel Step"
                });
            }

            if (o.pages) {
                OP3.Elements._extension.prop.Action.prototype._defaults.options.push({
                    "goToFunnelStep": "Go to Specific Funnel Step"
                });
            }

            // But also add other options
            OP3.Elements._extension.prop.Action.prototype._defaults.funnels = o;
        }
    });

})(jQuery, window, document);
