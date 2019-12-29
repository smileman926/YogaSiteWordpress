/**
 * OptimizePress3 checked property.
 *
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
    OP3.Elements._extension.prop.Checked = OP3.defineClass({

        Name: "OP3.Property.Checked",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "checked",

            _defaults: {
                label: function() {
                    return OP3._("Checked");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).is(":checked") ? "1" : "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).attr("checked", "checked");
                else
                    $(this.target()).removeAttr("checked");
            },

        },

    });

})(jQuery, window, document);
