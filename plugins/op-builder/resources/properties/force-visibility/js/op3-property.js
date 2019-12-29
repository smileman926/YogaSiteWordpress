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
    OP3.Elements._extension.prop.ForceVisibility = OP3.defineClass({

        Name: "OP3.Property.ForceVisibility",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "forceVisibility",

            _defaults: {
                label: function() {
                    return OP3._("Show All Hidden Elements");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                serialize: false,
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                // global property, using parent instead
                // of target
                return OP3.Designer.$ui.parent.is("[data-op3-force-visibility]") ? "1" : "0";
            },

            setter: function(value, media) {
                // global property, using parent instead
                // of target
                if (value === "1")
                    OP3.Designer.$ui.parent.attr("data-op3-force-visibility", "");
                else
                    OP3.Designer.$ui.parent.removeAttr("data-op3-force-visibility");
            },

        },

    });

})(jQuery, window, document);
