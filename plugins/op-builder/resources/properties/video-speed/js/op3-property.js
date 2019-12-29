/**
 * OptimizePress3 videoSpeed property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoSpeed = OP3.defineClass({

        Name: "OP3.Property.VideoSpeed",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoSpeed",

            _defaults: {
                label: function() {
                    return OP3._("Show Speed");
                },
                selector: " [data-op3-video-speed]",
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
                return $(this.target()).attr("data-op3-video-speed") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-speed", value || "0");
            },

        },

    });

})(jQuery, window, document);
