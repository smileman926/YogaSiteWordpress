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
    OP3.Elements._extension.prop.Id = OP3.defineClass({

        Name: "OP3.Property.Id",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "id",

            _defaults: {
                label: function() {
                    return OP3._("ID");
                },
                attr: {
                    readonly: "readonly",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function(media) {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                // pass
            },

        },

    });

})(jQuery, window, document);
