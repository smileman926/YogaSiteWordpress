/**
 * OptimizePress3 srcSoundCloudAutoplay property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.SrcSoundCloudAutoplay = OP3.defineClass({

        Name: "OP3.Property.SrcSoundCloudAutoplay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "srcSoundCloudAutoplay",

            _defaults: {
                selector: " iframe",
                label: function() {
                    return OP3._("Autoplay");
                },
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
                return $(this.target()).attr("data-op3-soundcloud-autoplay");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-soundcloud-autoplay", value);
            },

        },

    });

})(jQuery, window, document);
