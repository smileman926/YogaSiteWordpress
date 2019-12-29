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
    OP3.Elements._extension.prop.PaddingBottom = OP3.defineClass({

        Name: "OP3.Property.PaddingBottom",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "paddingBottom",

            _defaults: {
                label: function() {
                    return OP3._("Space Below Element");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "250",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                    "%",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
