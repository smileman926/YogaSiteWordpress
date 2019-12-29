/**
 * OptimizePress3 src property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Src = OP3.defineClass({

        Name: "OP3.Property.Src",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "src",

            _defaults: {
                label: function() {
                    return OP3._("Source");
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
