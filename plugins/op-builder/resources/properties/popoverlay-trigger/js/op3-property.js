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
    OP3.Elements._extension.prop.PopOverlayTrigger = OP3.defineClass({

        Name: "OP3.Property.PopOverlayTrigger",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "popOverlayTrigger",

            _defaults: {
                label: function() {
                    return OP3._("Pop Overlay Trigger");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "none": "None" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                // TODO: Remove "data-op3" part after a few versions (OP3-1228)
                var uuid = $(this.target()).attr("data-op-popoverlay-trigger") || $(this.target()).attr("data-op3-popoverlay-trigger");
                var popoverlays = OP3.LiveEditor._get_popoverlays();
                var popoverlayExists = popoverlays.some(function(item) {
                    return item.uuid == uuid;
                });

                // In case this property was set to some popoverlay and saved
                // but popoverlay is then deleted, it's forced to none
                if (!popoverlayExists)
                    return "none";

                return uuid;
            },

            setter: function(value, media) {
                // not a css property, ignore media
                $(this.target()).attr("data-op-popoverlay-trigger", value || "");
            },

        },

    });

    var defaultOptions = $.merge([], OP3.Elements._extension.prop.PopOverlayTrigger.prototype._defaults.options);

    // Dynamic options
    OP3.Elements._extension.prop.PopOverlayTrigger.prototype._defaults.options = function(media) {
        // Get all popoverlays and append it as option to this property
        var popoverlays = OP3.LiveEditor._get_popoverlays();

        var popoverlay = $(this.element._node).closest('[data-op3-element-type="popoverlay"]');
        if (popoverlay.length) {
            var uuid = popoverlay.attr("data-op3-uuid");
            popoverlays = popoverlays.filter(function(item) {
                return item.uuid !== uuid;
            });
        }

        var options = defaultOptions.concat(popoverlays.map(function(item) {
            var map = {};
            map[item.uuid] = item.name;

            return map;
        }));

        return options;
    }

    // Rerender property on property sync
    // Could be that user added/deleted popoverlay
    OP3.bind("elementoptionssync::*::popOverlayTrigger", function(e, o) {
        OP3.transmit("elementoptionsrefreshrequest", { property: [ "popOverlayTrigger" ] });
    });

})(jQuery, window, document);
