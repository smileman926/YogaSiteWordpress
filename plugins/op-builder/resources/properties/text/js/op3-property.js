/**
 * OptimizePress3 text property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Text = OP3.defineClass({

        Name: "OP3.Property.Text",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "text",

            _defaults: {
                label: function() {
                    return OP3._("Text");
                },
                tag: "textarea",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-text") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-op3-text", value);
            },

        },

    });

})(jQuery, window, document);
