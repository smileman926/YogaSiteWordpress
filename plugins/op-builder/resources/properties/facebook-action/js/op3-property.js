/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FacebookAction = OP3.defineClass({

        Name: "OP3.Property.FacebookAction",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookAction",

            _defaults: {
                label: function() {
                    return OP3._("Action Type");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "like": "Like" },
                    { "recommend": "Recommend" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-action") || "like";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-action", value || "like");
            },

        },

    });

})(jQuery, window, document);
