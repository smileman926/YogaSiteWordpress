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
    OP3.Elements._extension.prop.BorderHoverStyle = OP3.defineClass({

        Name: "OP3.Property.BorderHoverStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderHoverStyle",

            _defaults: {
                label: function() {
                    return OP3._("Border Hover Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "0px": OP3._("None") },
                    { "1px": OP3._("1px Bottom") },
                    { "2px": OP3._("2px Bottom") },
                    { "3px": OP3._("3px Bottom") },
                    { "4px": OP3._("4px Bottom") },
                    { "5px": OP3._("5px Bottom") },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            _predefinedValues: {
                "0px": {
                    borderBottomWidthHover: "0px",
                },
                "1px": {
                    borderBottomWidthHover: "1px",
                    borderBottomStyleHover: "solid",
                },
                "2px": {
                    borderBottomWidthHover: "2px",
                    borderBottomStyleHover: "solid",
                },
                "3px": {
                    borderBottomWidthHover: "3px",
                    borderBottomStyleHover: "solid",
                },
                "4px": {
                    borderBottomWidthHover: "4px",
                    borderBottomStyleHover: "solid",
                },
                "5px": {
                    borderBottomWidthHover: "5px",
                    borderBottomStyleHover: "solid",
                },
            },

        },

    });

})(jQuery, window, document);
