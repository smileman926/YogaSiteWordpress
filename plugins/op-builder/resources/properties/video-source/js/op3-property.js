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
    OP3.Elements._extension.prop.VideoSource = OP3.defineClass({

        Name: "OP3.Property.VideoSource",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoSource",

            _defaults: {
                label: function() {
                    return OP3._("Video Source");
                },
                tag: "select",
                selector: " [data-op3-video-source]",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    // { "none": "Select Source" },
                    { "youtube": "YouTube" },
                    { "vimeo": "Vimeo" },
                    { "wistia": "Wistia" },
                    { "embed": "Custom Embed Code" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                // embed is used by default due to backward compatibility
                return $(this.target()).attr("data-op3-video-source") || "embed";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-source", value || "embed");
            },

        },

    });

})(jQuery, window, document);
