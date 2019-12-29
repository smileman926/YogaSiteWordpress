/**
 * OptimizePress3 AspectRatio property.
 *
 * Property used to control video element
 * aspect ratio (16:9 or 4:3).
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
    OP3.Elements._extension.prop.AspectRatio = OP3.defineClass({

        Name: "OP3.Property.AspectRatio",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "aspectRatio",

            _defaults: {
                label: function() {
                    return OP3._("Aspect Ratio");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "16:9": "16:9" },
                    { "16:10": "16:10" },
                    { "21:9": "21:9" },
                    { "4:3": "4:3" },
                ]
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-aspect-ratio") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-aspect-ratio", value);
            },

        },

    });

})(jQuery, window, document);
