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
    OP3.Elements._extension.prop.VarColorScheme3 = OP3.defineClass({

        Name: "OP3.Property.VarColorScheme3",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "--op3-color-scheme-3",

            _defaults: {
                label: function() {
                    return OP3._("Colour #3");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color-simple",
                },
            },

            getter: function(media) {
                return OP3.Elements._extension.prop.Default.prototype.getter.call(this, "all");
            },

            setter: function(value, media) {
                OP3.Elements._extension.prop.Default.prototype.setter.call(this, value, "all");
            },

        },

    });

})(jQuery, window, document);
