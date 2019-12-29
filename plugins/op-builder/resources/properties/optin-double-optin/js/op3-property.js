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
    OP3.Elements._extension.prop.OptinDoubleOptin = OP3.defineClass({

        Name: "OP3.Property.OptinDoubleOptin",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinDoubleOptin",

            _defaults: {
                label: function() {
                    return OP3._("Double Optin");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "Off" },
                    { "1": "On" },
                ],
                selector: ' [name="optin-double-optin"]',
            },

            _forceComputed: true,

            computed: function() {
                var value = $(this.target()).val();
                if (!isNaN(value*1))
                    value *= 1;

                return value ? "1" : "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).val(value);
                else
                    $(this.target()).val("0");
            },

        },

    });

})(jQuery, window, document);
