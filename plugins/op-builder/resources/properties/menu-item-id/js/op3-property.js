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
    OP3.Elements._extension.prop.MenuItemId = OP3.defineClass({

        Name: "OP3.Property.MenuItemId",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "menuItemId",

            _defaults: {
                label: function() {
                    return OP3._("Menu Item ID");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "": "None" },
                ],
                selector: " > [data-op3-menu-item-id]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-menu-item-id") || "";
            },

            setter: function(value, media) {
                // not a css property, ignore media
                $(this.target()).attr("data-op3-menu-item-id", value || "");
            },

        },

    });

})(jQuery, window, document);
