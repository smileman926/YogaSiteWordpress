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
    OP3.Elements._extension.prop.FacebookHref = OP3.defineClass({

        Name: "OP3.Property.FacebookHref",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookHref",

            _defaults: {
                label: function() {
                    return OP3._("Page URL");
                },
                selector: " .fb-like",
                attr: {
                    placeholder: "https://",
                    "data-property-type": "href",
                    "type": "url",
                }

            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-href") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-href", value || "");
            },

        },

    });

})(jQuery, window, document);
