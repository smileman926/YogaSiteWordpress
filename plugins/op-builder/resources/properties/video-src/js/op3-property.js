/**
 * OptimizePress3 videoSrc property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoSrc = OP3.defineClass({

        Name: "OP3.Property.VideoSrc",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoSrc",

            _defaults: {
                label: function() {
                    return OP3._("Video Src");
                },
                selector: " [data-op3-src]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-src") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-src", value || "");
            },

        },

    });

})(jQuery, window, document);
