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
    OP3.Elements._extension.prop.VideoUrlYoutube = OP3.defineClass({

        Name: "OP3.Property.VideoUrlYoutube",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoUrlYoutube",

            _defaults: {
                label: function() {
                    return OP3._("URL");
                },
                attr: {
                    "type": "url",
                },
                selector: " [data-op3-video-url-youtube]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-url-youtube") || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    return;
                }

                $(this.target()).attr("data-op3-video-url-youtube", value || "");
            },

        },

    });

})(jQuery, window, document);
