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
    OP3.Elements._extension.prop.WidthAuto = OP3.defineClass({

        Name: "OP3.Property.WidthAuto",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "widthAuto",

            _defaults: {
                label: function() {
                    return OP3._("Set Width to Auto");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            computed: function() {
                return "0";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                this.element.setOption("width", "auto", media);
            },

        },

    });

})(jQuery, window, document);
