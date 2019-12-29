/**
 * OptimizePress3 alt property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Alt = OP3.defineClass({

        Name: "OP3.Property.Alt",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "alt",

            _defaults: {
                label: function() {
                    return OP3._("Alt Text");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                value = (value || "")
                    .replace(/</, "")
                    .replace(/>/, "");

                $(this.target()).attr(this.name(), value);
            },

        },

    });

})(jQuery, window, document);
