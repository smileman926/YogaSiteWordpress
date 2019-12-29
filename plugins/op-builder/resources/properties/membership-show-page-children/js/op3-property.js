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
    OP3.Elements._extension.prop.MembershipShowPageChildren = OP3.defineClass({

        Name: "OP3.Property.MembershipShowPageChildren",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "membershipShowPageChildren",

            _defaults: {
                label: function() {
                    return OP3._("Show Page Children");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "Off" },
                    { "1": "On" },
                ],
                selector: ' [data-op3-show-page-children]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-show-page-children") || "";
            },

            setter: function(value, media) {
                // not an css property, ignore media
                $(this.target()).attr("data-op3-show-page-children", value || "") ;
            },

        },

    });

})(jQuery, window, document);
