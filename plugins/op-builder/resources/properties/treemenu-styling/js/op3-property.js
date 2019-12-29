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
    OP3.Elements._extension.prop.TreeMenuStyling = OP3.defineClass({

        Name: "OP3.Property.TreeMenuStyling",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "treeMenuStyling",

            _defaults: {
                label: function() {
                    return OP3._("Hamburger Menu Styling");
                },
                selector: " .op3-hamburger",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "left": "Fly in from left" },
                    { "right": "Fly in from right" },
                    { "fullscreen": "Full Screen" },
                    { "dropdown": "Dropdown" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-treemenu-styling") || "left";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-treemenu-styling", value || "left");
            },

        },

    });

})(jQuery, window, document);
