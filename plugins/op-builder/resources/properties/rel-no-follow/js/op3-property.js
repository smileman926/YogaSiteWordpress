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
    OP3.Elements._extension.prop.RelNoFollow = OP3.defineClass({

        Name: "OP3.Property.RelNoFollow",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "relNoFollow",

            _defaults: {
                label: function() {
                    return OP3._("No Follow");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).is('[rel="no-follow"]') ? "1" : "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).attr("rel", "no-follow");
                else
                    $(this.target()).removeAttr("rel");
            },

        },

    });

})(jQuery, window, document);
