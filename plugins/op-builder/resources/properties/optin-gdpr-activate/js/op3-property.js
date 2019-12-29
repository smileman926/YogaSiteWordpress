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
    OP3.Elements._extension.prop.OptinGdprActivate = OP3.defineClass({

        Name: "OP3.Property.OptinGdprActivate",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinGdprActivate",

            _defaults: {
                label: function() {
                    return OP3._("Activate GDPR features");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "off": "Off" },
                    { "eu": "Show to EU visitors only" },
                    { "all": "Show to all visitors" },
                ],
                selector: ' [name="optin-gdpr-activate"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "off";
            },

            setter: function(value, media) {
                $(this.target()).val(value || "off");
            },

        },

    });

})(jQuery, window, document);
