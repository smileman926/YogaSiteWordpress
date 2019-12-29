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
    OP3.Elements._extension.prop.OptinFormId = OP3.defineClass({

        Name: "OP3.Property.OptinFormId",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinFormId",

            _defaults: {
                label: function() {
                    return OP3._("Using Form Id");
                },
                selector: ' [name="optin-form-id"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                // not an css property, ignore media
                $(this.target()).val(value || "");
            },

        },

    });

})(jQuery, window, document);
