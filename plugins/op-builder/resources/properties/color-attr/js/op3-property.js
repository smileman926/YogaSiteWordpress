/**
 * OptimizePress3 colorAttr property.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ColorAttr = OP3.defineClass({

        Name: "OP3.Property.ColorAttr",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "colorAttr",

            _defaults: {
                label: function() {
                    return OP3._("Fill");
                },
                selector: " svg",
                attr: {
                    "data-property-type": "color",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("color") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("color", value || "");
            },

        },

    });

})(jQuery, window, document);
