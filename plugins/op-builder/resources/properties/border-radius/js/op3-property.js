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
    OP3.Elements._extension.prop.BorderRadius = OP3.defineClass({

        Name: "OP3.Property.BorderRadius",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderRadius",

            _defaults: {
                label: function() {
                    return OP3._("Border Radius");
                },
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
            },

            _convert: function(unitTo, unitFrom, value) {
                if (unitFrom === "px" && unitTo === "%")
                    return parseFloat(value) / parseFloat($(this.target()).css("width")) * 100;
                else if (unitFrom === "%" && unitTo === "px")
                    return (parseFloat(value) / 100) * parseFloat($(this.target()).css("width"));
            },

        },

    });

})(jQuery, window, document);
