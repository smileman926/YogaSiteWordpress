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
    OP3.Elements._extension.prop.NumberBlockSequence = OP3.defineClass({

        Name: "OP3.Property.NumberBlockSequence",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "numberblockSequence",

            _defaults: {
                label: function() {
                    return OP3._("Number Sequence");
                },
                tag: "select",
                selector: " > [data-op3-children]",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "all": "All Numbers" },
                    { "odd": "Odd Numbers" },
                    { "even": "Even Numbers" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-numberblock-sequence") || "all";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-numberblock-sequence", value || "all");
            },

        },

    });

})(jQuery, window, document);
