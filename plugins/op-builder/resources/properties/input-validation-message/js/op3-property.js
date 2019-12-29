/**
 * OptimizePress3 InputValudationMessage property.
 *
 * Property used to manage custom validation
 * message on form submit.
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
    OP3.Elements._extension.prop.InputValidationMessage = OP3.defineClass({

        Name: "OP3.Property.InputValidationMessage",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "inputValidationMessage",

            _defaults: {
                label: function() {
                    return OP3._("Custom Validation Message");
                },
                selector: " input",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-validation-message") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-op-validation-message", value);
            },

        },

    });

})(jQuery, window, document);
