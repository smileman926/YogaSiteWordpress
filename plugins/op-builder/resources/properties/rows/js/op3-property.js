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
    OP3.Elements._extension.prop.Rows = OP3.defineClass({

        Name: "OP3.Property.Rows",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "rows",

            _defaults: {
                label: function() {
                    return OP3._("Rows");
                },
                attr: {
                    type: "number",
                    min: "1",
                    max: "24",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this.name()) || "";
            },

            setter: function(value, media) {
                $(this.target()).attr(this.name(), value || "");
            },

        },

    });

})(jQuery, window, document);
