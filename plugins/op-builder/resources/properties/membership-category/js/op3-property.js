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
    OP3.Elements._extension.prop.MembershipCategory = OP3.defineClass({

        Name: "OP3.Property.MembershipCategory",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "membershipCategory",

            _defaults: {
                label: function() {
                    return OP3._("Show Content From Category");
                },
                selector: ' [data-op3-membership-category]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-membership-category") || "";
            },

            setter: function(value, media) {
                // not an css property, ignore media
                $(this.target()).attr("data-op3-membership-category", value || "") ;
            },

        },

    });

})(jQuery, window, document);
