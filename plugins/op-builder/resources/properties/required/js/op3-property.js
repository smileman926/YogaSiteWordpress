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
    OP3.Elements._extension.prop.Required = OP3.defineClass({

        Name: "OP3.Property.Required",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "required",

            _defaults: {
                label: function() {
                    return OP3._("Required");
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
                return $(this.target()).is("[required]") ? "1" : "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).attr("required", "required");
                else
                    $(this.target()).removeAttr("required");
            },

        },

    });

})(jQuery, window, document);
