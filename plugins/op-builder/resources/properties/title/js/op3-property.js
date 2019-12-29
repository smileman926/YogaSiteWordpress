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
    OP3.Elements._extension.prop.Title = OP3.defineClass({

        Name: "OP3.Property.Title",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "title",

            _defaults: {
                label: function() {
                    return OP3._("Title");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr(this.name(), value);
            },

        },

    });

})(jQuery, window, document);
