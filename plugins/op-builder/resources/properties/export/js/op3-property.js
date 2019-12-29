/**
 * OptimizePress3 Export property.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-export.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Export = OP3.defineClass({

        Name: "OP3.Property.Export",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "export",

            _defaults: {
                label: function() {
                    if (this.element.type() === "document")
                        return OP3._("Export Template");
                    else
                        return OP3._("Export Section");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return "0";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                // pass
            },

        },

    });

})(jQuery, window, document);
