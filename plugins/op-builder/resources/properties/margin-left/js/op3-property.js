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
    OP3.Elements._extension.prop.MarginLeft = OP3.defineClass({

        Name: "OP3.Property.MarginLeft",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "marginLeft",

            _defaults: {
                label: function() {
                    return OP3._("Margin Left");
                },
                keywords: [
                    "auto",
                ],
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
