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
    OP3.Elements._extension.prop.TransitionDuration = OP3.defineClass({

        Name: "OP3.Property.TransitionDuration",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "transitionDuration",

            _defaults: {
                label: function() {
                    return OP3._("Transition Duration");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "s, ms",
                    "data-min-s": "0",
                    "data-min-ms": "0",
                    "data-max-s": "10",
                    "data-max-ms": "10000",
                    "data-step-s": "0.1",
                    "data-step-ms": "100",
                    "data-precision-s": "1",
                    "data-precision-ms": "0",
                },
                units: [
                    "s",
                    "ms",
                ],
                defaultUnit: "s",
            },

            /**
             * Convert value from min to sec and vice-versa
             *
             * @param  {String} unitTo
             * @param  {String} unitFrom
             * @param  {Number} value    (optional)
             * @return {Number}
             */
            _convert: function(unitTo, unitFrom, value) {
                var convertedValue = 0;

                if (unitFrom === "" && unitTo === "s")
                    convertedValue = 0;
                else if (unitFrom === "" && unitTo === "ms")
                    convertedValue = 0;
                else if (unitFrom === "s" && unitTo === "ms")
                    convertedValue = parseFloat(value) * 1000;
                else if (unitFrom === "ms" && unitTo === "s")
                    convertedValue = parseFloat(value) / 1000;

                return convertedValue;
            },

        },

    });

})(jQuery, window, document);
