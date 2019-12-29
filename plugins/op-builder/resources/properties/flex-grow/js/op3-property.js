/**
 * OptimizePress3 flex-grow property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FlexGrow = OP3.defineClass({

        Name: "OP3.Property.FlexGrow",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexGrow",

            _defaults: {
                label: function() {
                    return OP3._("Flex Grow");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

        },

    });

})(jQuery, window, document);
