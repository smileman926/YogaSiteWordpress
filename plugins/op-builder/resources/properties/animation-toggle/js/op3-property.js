/**
 * OptimizePress3 Animation Toggle property.
 *
 * Used with Progress Bar.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.AnimationToggle = OP3.defineClass({

        Name: "OP3.Property.AnimationToggle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "animationToggle",

            _defaults: {
                label: function() {
                    return OP3._("Animate");
                },
                selector: " > [data-op3-animation-toggle]",
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
                return $(this.target()).attr("data-op3-animation-toggle") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-animation-toggle", value || "0");
            },

        },

    });

})(jQuery, window, document);
