/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FacebookColorscheme = OP3.defineClass({

        Name: "OP3.Property.FacebookColorscheme",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookColorscheme",

            _defaults: {
                label: function() {
                    return OP3._("Color Scheme");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "light": "Light" },
                    { "dark": "Dark" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-colorscheme") || "light";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-colorscheme", value || "light");
            },

        },

    });

})(jQuery, window, document);
