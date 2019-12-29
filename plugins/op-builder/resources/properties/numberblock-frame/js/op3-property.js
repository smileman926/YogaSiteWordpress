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
    OP3.Elements._extension.prop.NumberBlockFrame = OP3.defineClass({

        Name: "OP3.Property.NumberBlockFrame",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "numberblockFrame",

            _defaults: {
                label: function() {
                    return OP3._("Number Frame");
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
                return $(this.target()).attr("data-op3-numberblock-frame") || "none";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-numberblock-frame", value || "none");
            },

        },

    });

})(jQuery, window, document);
