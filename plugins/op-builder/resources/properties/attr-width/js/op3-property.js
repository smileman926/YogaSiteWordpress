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
    OP3.Elements._extension.prop.AttrWidth = OP3.defineClass({

        Name: "OP3.Property.AttrWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "attrWidth",

            _defaults: {
                label: function() {
                    return OP3._("Attribute Width");
                },
                hidden: true,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("width") || $(this.target()).width();
            },

            setter: function(value, media) {
                if (value)
                    $(this.target()).attr("width", value);
                else
                    $(this.target()).removeAttr("width");
            },

        },

    });

})(jQuery, window, document);
