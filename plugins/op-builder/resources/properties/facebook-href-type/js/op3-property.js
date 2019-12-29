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
    OP3.Elements._extension.prop.FacebookHrefType = OP3.defineClass({

        Name: "OP3.Property.FacebookHrefType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookHrefType",

            _defaults: {
                label: function() {
                    return OP3._("URL to Like");
                },
                selector: " .fb-like",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "current": "Current Page" },
                    { "url": "Custom URL" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-href-type") || "current";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-href-type", value || "current");
            },

        },

    });

})(jQuery, window, document);
