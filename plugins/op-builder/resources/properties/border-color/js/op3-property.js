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
    OP3.Elements._extension.prop.BorderColor = OP3.defineClass({

        Name: "OP3.Property.BorderColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderColor",

            _defaults: {
                label: function() {
                    return OP3._("Border Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                },
            },

            /**
             * Get computed css property
             *
             * Override default computed function because
             * firefox browser has a problem to return
             * value of shorthand css rule like
             * border-color.
             *
             * @return {String}
             */
            computed: function() {
                var computed = $(this.target())
                    .css([
                        "borderTopColor",
                        "borderRightColor",
                        "borderBottomColor",
                        "borderLeftColor"
                    ]);

                var result = computed.borderTopColor + " " +
                             computed.borderRightColor + " " +
                             computed.borderBottomColor + " " +
                             computed.borderLeftColor;

                if (computed.borderTopColor === computed.borderRightColor &&
                    computed.borderRightColor === computed.borderBottomColor &&
                    computed.borderBottomColor === computed.borderLeftColor)
                    result = computed.borderTopColor;

                return result;
            },

        },

    });

})(jQuery, window, document);
