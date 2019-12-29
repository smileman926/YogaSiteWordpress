/**
 * OptimizePress3 stroke property.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Stroke = OP3.defineClass({

        Name: "OP3.Property.Stroke",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stroke",

            _defaults: {
                label: function() {
                    return OP3._("Stroke");
                },
                selector: " svg",
                attr: {
                    "data-property-type": "color",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("stroke") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("stroke", value || "");
            },

        },

    });

})(jQuery, window, document);
