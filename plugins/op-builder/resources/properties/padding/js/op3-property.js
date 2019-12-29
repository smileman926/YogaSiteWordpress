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
    OP3.Elements._extension.prop.Padding = OP3.defineClass({

        Name: "OP3.Property.Padding",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "padding",

            _defaults: {
                label: function() {
                    return OP3._("Padding");
                },
                units: [
                    "px",
                    "%",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
            },

            /**
             * Get computed css property
             *
             * Override default computed function because
             * firefox browser has a problem to return
             * value of shorthand css rule like
             * padding.
             *
             * @return {String}
             */
            computed: function() {
                var computed = $(this.selector())
                    .css([
                        "paddingTop",
                        "paddingRight",
                        "paddingBottom",
                        "paddingLeft"
                    ]);

                var result = computed.paddingTop + " " +
                             computed.paddingRight + " " +
                             computed.paddingBottom + " " +
                             computed.paddingLeft;

                if (computed.paddingTop === computed.paddingRight &&
                    computed.paddingRight === computed.paddingBottom &&
                    computed.paddingBottom === computed.paddingLeft)
                    result = computed.paddingTop;

                return result;
            },

        },

    });

})(jQuery, window, document);
