/**
 * OptimizePress3 videoByline property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoByline = OP3.defineClass({

        Name: "OP3.Property.VideoByline",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoByline",

            _defaults: {
                label: function() {
                    return OP3._("Show Byline");
                },
                selector: " [data-op3-video-byline]",
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
                return $(this.target()).attr("data-op3-video-byline") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-byline", value || "0");
            },

        },

    });

})(jQuery, window, document);
