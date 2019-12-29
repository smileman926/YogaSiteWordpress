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
    OP3.Elements._extension.prop.OptinIntegration = OP3.defineClass({

        Name: "OP3.Property.OptinIntegration",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinIntegration",

            _defaults: {
                label: function() {
                    return OP3._("Integrate form with");
                },
                selector: ' [name="optin-integration"]',
                attr: {
                    "data-property-type": "integration",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                $(this.target()).val(value || "");
            },

        },

    });

})(jQuery, window, document);
