/**
 * OptimizePress3 flexDirection property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FlexDirection = OP3.defineClass({

        Name: "OP3.Property.FlexDirection",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexDirection",

            _defaults: {
                label: function() {
                    return OP3._("Flex Direction");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "row": "Row" },
                    { "column": "Column" },
                    { "row-reverse": "Row Reverse" },
                    { "column-reverse": "Column Reverse" },
                ],
            },

        },

    });

})(jQuery, window, document);
