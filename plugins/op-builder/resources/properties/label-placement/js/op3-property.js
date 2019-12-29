/**
 * OptimizePress3 element.
 * Used with Progress Bar element.
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
    OP3.Elements._extension.prop.LabelPlacement = OP3.defineClass({

        Name: "OP3.Property.LabelPlacement",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "labelPlacement",

            _defaults: {
                label: function() {
                    return OP3._("Label Placement");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "hide": "Hide Label"},
                    { "inside": "Inside Bar" },
                    { "above": "Above Bar" },
                    { "below": "Below Bar" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-label-placement") || "inside";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-label-placement", value || "inside");
            },

        },

    });

})(jQuery, window, document);
