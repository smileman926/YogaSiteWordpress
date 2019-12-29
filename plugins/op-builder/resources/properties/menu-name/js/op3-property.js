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
    OP3.Elements._extension.prop.MenuName = OP3.defineClass({

        Name: "OP3.Property.MenuName",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "menuName",

            _defaults: {
                label: function() {
                    return OP3._("Menu Name");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "": "None" },
                ],
                selector: " > [data-op3-menu-name]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-menu-name") || "";
            },

            setter: function(value, media) {
                // not a css property, ignore media
                $(this.target()).attr("data-op3-menu-name", value || "");
            },

        },

    });

    // load menus from api (redefine options argument)
    OP3.bind("loadelementmenus", function(e, o) {
        var data = OP3.Menus.data();
        if (!data.length) {
            OP3.Elements._extension.prop.MenuName.prototype._defaults.options = [
                { "": "None" },
            ];

            return;
        }

        OP3.Elements._extension.prop.MenuName.prototype._defaults.options = data.map(function(item) {
            var key = item.term_id + "";
            var val = item.name;

            var map = {};
            map[key] = val;

            return map;
        });
    });

})(jQuery, window, document);
