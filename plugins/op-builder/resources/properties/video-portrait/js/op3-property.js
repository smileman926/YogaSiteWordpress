/**
 * OptimizePress3 videoPortrait property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoPortrait = OP3.defineClass({

        Name: "OP3.Property.VideoPortrait",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoPortrait",

            _defaults: {
                label: function() {
                    return OP3._("Show Logo");
                },
                selector: " [data-op3-video-portrait]",
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
                return $(this.target()).attr("data-op3-video-portrait") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-portrait", value || "0");
            },

        },

    });

})(jQuery, window, document);
