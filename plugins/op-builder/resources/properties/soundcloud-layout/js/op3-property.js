/**
 * OptimizePress3 soundCloudLayout property
 *
 * Used for manipulating height property
 * and &visual=true src parameter
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.SoundCloudLayout = OP3.defineClass({

        Name: "OP3.Property.SoundCloudLayout",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "soundCloudLayout",

            _defaults: {
                label: function() {
                    return OP3._("Layout");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "larger": "Larger" },
                    { "smaller": "Smaller" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                var visual = this.element.getOption("srcSoundCloudVisual", true);
                var height = this.element.getOption("height", true);

                if (visual === "1" && height === "300px")
                    return "larger";

                if (visual === "0" && height === "166px")
                    return "smaller";
            },

            setter: function(value, media) {
                if (value === "larger") {
                    this.element.setOption("srcSoundCloudVisual", "1", "all");
                    this.element.setOption("height", "300px", "all");
                } else if (value === "smaller") {
                    this.element.setOption("srcSoundCloudVisual", "0", "all");
                    this.element.setOption("height", "166px", "all");
                }
            },

        },

    });

})(jQuery, window, document);
