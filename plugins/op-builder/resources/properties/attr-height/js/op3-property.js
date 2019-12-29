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
    OP3.Elements._extension.prop.AttrHeight = OP3.defineClass({

        Name: "OP3.Property.AttrHeight",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "attrHeight",

            _defaults: {
                label: function() {
                    return OP3._("Attribute Height");
                },
                hidden: true,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("height") || $(this.target()).height();
            },

            setter: function(value, media) {
                if (value)
                    $(this.target()).attr("height", value);
                else
                    $(this.target()).removeAttr("height");
            },

        },

    });

})(jQuery, window, document);
