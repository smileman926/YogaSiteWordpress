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
    OP3.Elements._extension.prop.VideoUrlWistia = OP3.defineClass({

        Name: "OP3.Property.VideoUrlWistia",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoUrlWistia",

            _defaults: {
                label: function() {
                    return OP3._("URL");
                },
                attr: {
                    "type": "url",
                },
                selector: " [data-op3-video-url-wistia]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-url-wistia") || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    return;
                }

                $(this.target()).attr("data-op3-video-url-wistia", value || "");
            },

        },

    });

})(jQuery, window, document);
