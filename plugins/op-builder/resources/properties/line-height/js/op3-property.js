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
    OP3.Elements._extension.prop.LineHeight = OP3.defineClass({

        Name: "OP3.Property.LineHeight",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "lineHeight",

            _defaults: {
                label: function() {
                    return OP3._("Line Height");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "em",
                    "data-min-em": "0.5",
                    "data-max-em": "5",
                    "data-step-em": "0.001",
                    "data-precision-em": "0.001",
                },
                replace: [
                    { normal: "1.2em" },
                ],
                units: [
                    "em",
                ],
                defaultUnit: "em",
            },

            /**
             * Convert value from one unit to another. This overrides _convert
             * from default op3-property, because text-related things look
             * for font-size value from parent element instead of width,
             * which is used in default _convert
             *
             * @param  {String} unitTo
             * @param  {String} unitFrom
             * @param  {Number} value    (optional)
             * @return {Number}
             */
            _convert: function(unitTo, unitFrom, value) {
                if (unitFrom === "px" && unitTo === "%")
                    return parseFloat(value) / parseFloat($(this.target()).css("font-size")) * 100;
                else if (unitFrom === "%" && unitTo === "px")
                    return (parseFloat(value) / 100) * parseFloat($(this.target()).css("font-size"));
                else if (unitFrom === "em" && unitTo === "px")
                    return parseFloat(value) * parseFloat($(this.target()).css("font-size"));
                else if (unitFrom === "px" && unitTo === "em")
                    return parseFloat(value) / parseFloat($(this.target()).css("font-size"));

                return OP3.Elements._extension.prop.Default.prototype._convert.call(this, unitTo, unitFrom, value);
            },

        },

    });

})(jQuery, window, document);
