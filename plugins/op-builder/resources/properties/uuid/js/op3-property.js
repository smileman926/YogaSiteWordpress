/**
 * OptimizePress3 uuid property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Uuid = OP3.defineClass({

        Name: "OP3.Property.Uuid",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "uuid",

            _defaults: {
                label: function() {
                    return OP3._("Uuid");
                },
                attr: {
                    readonly: "readonly",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function(media) {
                return $(this.target()).attr("data-op3-uuid") || "";
            },

            setter: function(value, media) {
                // pass
            },

        },

    });

})(jQuery, window, document);
