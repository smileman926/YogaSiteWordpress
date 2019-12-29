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
    OP3.Elements._extension.prop.Name = OP3.defineClass({

        Name: "OP3.Property.Name",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "name",

            _defaults: {
                label: function() {
                    return OP3._("Name");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                // apply rules
                // https://www.w3.org/TR/html401/types.html#type-name
                value = ((value || "") + "")
                    .replace(/^[^A-Za-z]+/, "")
                    .replace(/[^A-Za-z0-9_\-:\.]+/g, "");

                // not an css property, ignore media
                $(this.target()).attr(this.name(), value || "");
            },

        },

    });

})(jQuery, window, document);
