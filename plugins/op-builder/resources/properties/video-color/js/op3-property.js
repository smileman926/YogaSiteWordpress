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
    OP3.Elements._extension.prop.VideoColor = OP3.defineClass({

        Name: "OP3.Property.VideoColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoColor",

            _defaults: {
                label: function() {
                    return OP3._("Color");
                },
                selector: " [data-op3-video-color]",
                attr: {
                    "data-property-type": "color",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-color") || "#00adef";
            },

            setter: function(value, media) {
                // Set attribute
                var $target = $(this.target());
                var color = new Color(value).toString("hex");
                $target.attr("data-op3-video-color", color || "none");
            },

        },

    });

})(jQuery, window, document);
