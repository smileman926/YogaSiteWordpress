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
    OP3.Elements._extension.prop.SelectFunnelStep = OP3.defineClass({

        Name: "OP3.Property.SelectFunnelStep",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "selectFunnelStep",

            _defaults: {
                label: function() {
                    return OP3._("Select Funnel Step");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "None" }
                ],
            },

            _forceComputed: true,

            reset: function() {
                // preserve
            },

            computed: function() {
                return $(this.target()).attr("data-op-select-funnel-step") || $(this.target()).attr("data-select-funnel-step");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-select-funnel-step", value);
            },

        },

    });

    // Add funnel options if needed
    OP3.bind("loadelementfunnels", function(e, o) {
        if (o && o.pluginActive && o.funnelId && o.pages) {
            o.pages.forEach(function(page, index) {
                OP3.Elements._extension.prop.SelectFunnelStep.prototype._defaults.options.push({
                    [index + 1]: page.title
                });
            });

            // But also add other options
            OP3.Elements._extension.prop.SelectFunnelStep.prototype._defaults.funnels = o;
        }
    });

})(jQuery, window, document);
