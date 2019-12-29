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
    OP3.Elements._extension.prop.MembershipSort = OP3.defineClass({

        Name: "OP3.Property.MembershipSort",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "membershipSort",

            _defaults: {
                label: function() {
                    return OP3._("Sort");
                },
                selector: ' [data-op3-membership-sort]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-membership-sort") || "title:asc";
            },

            setter: function(value, media) {
                // not an css property, ignore media
                $(this.target()).attr("data-op3-membership-sort", value || "title:asc");
            },

        },

    });

})(jQuery, window, document);
