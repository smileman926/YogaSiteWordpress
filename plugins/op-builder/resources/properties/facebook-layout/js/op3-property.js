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
    OP3.Elements._extension.prop.FacebookLayout = OP3.defineClass({

        Name: "OP3.Property.FacebookLayout",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookLayout",

            _defaults: {
                label: function() {
                    return OP3._("Layout");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "standard": "Standard" },
                    { "box_count": "Box Count" },
                    { "button_count": "Button Count" },
                    { "button": "Button" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-layout") || "standard";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-layout", value || "standard");
            },

        },

    });

})(jQuery, window, document);
