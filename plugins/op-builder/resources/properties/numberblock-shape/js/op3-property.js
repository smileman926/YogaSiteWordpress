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
    OP3.Elements._extension.prop.NumberBlockShape = OP3.defineClass({

        Name: "OP3.Property.NumberBlockShape",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "numberblockShape",

            _defaults: {
                label: function() {
                    return OP3._("Frame Shape");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "square": "Square" },
                    { "curved": "Curved" },
                    { "circle": "Circle" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-numberblock-shape") || "square";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-numberblock-shape", value || "square");
            },

        },

    });

})(jQuery, window, document);
