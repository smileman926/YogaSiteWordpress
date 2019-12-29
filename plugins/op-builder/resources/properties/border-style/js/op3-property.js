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
    OP3.Elements._extension.prop.BorderStyle = OP3.defineClass({

        Name: "OP3.Property.BorderStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderStyle",

            _defaults: {
                label: function() {
                    return OP3._("Border Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "solid": "Solid" },
                    { "dashed": "Dashed" },
                    { "dotted": "Dotted" },
                ],
            },

            /**
             * Get computed css property
             *
             * Override default computed function because
             * firefox browser has a problem to return
             * value of shorthand css rule like
             * border-style.
             *
             * @return {String}
             */
            computed: function() {
                // Because user can't manipulate with
                // specific border-style (eg. border-top-style)
                // it doesn't matter which border-style we will return.
                return $(this.target()).css("border-top-style");
            },

        },

    });

})(jQuery, window, document);
