/**
 * OptimizePress3 LinkProperties property.
 *
 * see: ./resources/assets/js/op3-link-properties.js
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
; (function ($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.LinkProperties = OP3.defineClass({

        Name: "OP3.Property.LinkProperties",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "linkProperties",

            _defaults: {
                label: function() {
                    return OP3._("Link Properties");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-toggle-button",
                },
                options: [
                    { "0": "Current Status: Unlocked" },
                    { "1": "Current Status: Locked" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            prerender: function(media) {
                var result = OP3.Elements._extension.prop.Default.prototype.prerender.apply(this, arguments);
                $(result)
                    .find("label")
                        .html("When the status is <em>Locked</em>, all similar locked elements will be changed, and when the status is <em>Unlocked</em>, only the focused element will be changed.")

                return result;
            },

            computed: function() {
                var $target = $(this.target()),
                    attr = "data-link-properties",
                    value = $target.attr(attr),
                    defaultValue = "1";
                if (typeof value === "undefined")
                    value = defaultValue;

                if (!value || value === "0")
                    return "0";
                else
                    return "1";
            },

            setter: function(value, media) {
                var $target = $(this.target()),
                    attr = "data-link-properties";

                value = (!value || value === "0") ? "0" : "1";

                $target.attr(attr, value);
            },

        },

    });

})(jQuery, window, document);
