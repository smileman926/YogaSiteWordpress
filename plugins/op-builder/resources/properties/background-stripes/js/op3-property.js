/**
 * OptimizePress3 element.
 * Used with Progress Bar element.
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
    OP3.Elements._extension.prop.BackgroundStripes = OP3.defineClass({

        Name: "OP3.Property.BackgroundStripes",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundStripes",

            _defaults: {
                label: function() {
                    return OP3._("Progress Bar Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "Solid Colour" },
                    { "forward": "Stripes" },
                    { "backward": "Backward Stripes" },
                    { "wide-forward": "Wide Stripes" },
                    { "wide-backward": "Wide Backward Stripes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-stripes") || "forward";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-stripes", value || "forward");
            },

        },

    });

})(jQuery, window, document);
