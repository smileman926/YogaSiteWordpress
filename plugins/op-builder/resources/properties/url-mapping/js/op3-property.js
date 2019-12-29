/**
 * OptimizePress3 UrlMapping property.
 *
 * Property used in form element to change
 * default paramter name for
 * redirect url on submit.
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
    OP3.Elements._extension.prop.UrlMapping = OP3.defineClass({

        Name: "OP3.Property.UrlMapping",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "urlMapping",

            _defaults: {
                label: function() {
                    return OP3._("URL Mapping");
                },
                selector: " input",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-url-mapping") || "";
            },

            setter: function(value, media) {
                value = value.replace(/"/g, "'");

                $(this.target()).attr("data-op-url-mapping", value);
            },

        },

    });

})(jQuery, window, document);
