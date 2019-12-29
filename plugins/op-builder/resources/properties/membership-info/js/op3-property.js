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
    OP3.Elements._extension.prop.MembershipInfo = OP3.defineClass({

        Name: "OP3.Property.MembershipInfo",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "membershipInfo",

            _defaults: {
                label: function() {
                    return OP3._("Membership Info");
                },
                selector: " [data-op3-membership-info]",
                attr: {
                    "data-property-type": "membership",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-membership-info") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-membership-info", value);
            },

        },

    });

})(jQuery, window, document);
