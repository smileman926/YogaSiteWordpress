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
    OP3.Elements._extension.prop.IconFrame = OP3.defineClass({

        Name: "OP3.Property.IconFrame",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "iconFrame",

            _defaults: {
                label: function() {
                    return OP3._("Frame");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "None" },
                    { "outline": "Outline" },
                    { "filled": "Filled" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-iconframe") || "none";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-iconframe", value || "none");
            },

        },

    });

})(jQuery, window, document);
