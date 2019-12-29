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
    OP3.Elements._extension.prop.MembershipPageDescription = OP3.defineClass({

        Name: "OP3.Property.MembershipPageDescription",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "membershipPageDescription",

            _defaults: {
                label: function() {
                    return OP3._("Membership Page Title");
                },
                selector: " .op3-description",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).text() || "";
            },

            setter: function(value, media) {
                $(this.target()).text(value || "");
            },

        },

    });

})(jQuery, window, document);
