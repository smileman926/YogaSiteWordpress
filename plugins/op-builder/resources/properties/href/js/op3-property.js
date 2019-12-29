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
    OP3.Elements._extension.prop.Href = OP3.defineClass({

        Name: "OP3.Property.Href",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "href",

            _defaults: {
                label: function() {
                    return OP3._("Link");
                },
                attr: {
                    placeholder: "https://",
                    "data-property-type": "href",
                    "type": "url",
                    "required": "required",
                }
            },

            _forceComputed: true,

            reset: function() {
                // preserve
            },

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                if (value)
                    $(this.target()).attr(this.name(), value);
                else
                    $(this.target()).removeAttr(this.name());
            },

        },

    });

})(jQuery, window, document);
