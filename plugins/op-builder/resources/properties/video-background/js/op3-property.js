/**
 * OptimizePress3 videoBackground property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoBackground = OP3.defineClass({

        Name: "OP3.Property.VideoBackground",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoBackground",

            _defaults: {
                label: function() {
                    return OP3._("Autoplay, Loop & Mute");
                },
                selector: " [data-op3-video-background]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-background") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-background", value || "0");
            },

        },

    });

})(jQuery, window, document);
