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
    OP3.Elements._extension.prop.Target = OP3.defineClass({

        Name: "OP3.Property.Target",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "target",

            _defaults: {
                label: function() {
                    return OP3._("Target");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "_self": "Opens in the same frame" },
                    { "_blank": "Opens in a new window or tab" },
                ],
                replace: [
                    { "_parent": "_self" },
                    { "_top": "_self" },
                ],
            },

            _forceComputed: true,

            reset: function() {
                // preserve
            },

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                $(this.target()).attr(this.name(), value || "");
            },

        },

    });

})(jQuery, window, document);
