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
    OP3.Elements._extension.prop.VarColorScheme2 = OP3.defineClass({

        Name: "OP3.Property.VarColorScheme2",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "--op3-color-scheme-2",

            _defaults: {
                label: function() {
                    return OP3._("Colour #2");
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
