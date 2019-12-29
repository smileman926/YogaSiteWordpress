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
    OP3.Elements._extension.prop.Width = OP3.defineClass({

        Name: "OP3.Property.Width",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "width",

            _defaults: {
                label: function() {
                    return OP3._("Width");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px, %",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-min-em": "0",
                    "data-min-rem": "0",
                    "data-max-px": "2000",
                    "data-max-percent": "100",
                    "data-max-em": "130",
                    "data-max-rem": "130",
                    "data-step-px": "1",
                    "data-step-percent": "1",
                    "data-step-em": "0.001",
                    "data-step-rem": "0.001",
                    "data-precision-px": "0",
                    "data-precision-percent": "0",
                    "data-precision-em": "3",
                    "data-precision-rem": "3",

                },
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
            },

            /**
             * Convert width value from % unit to px. This overrides _convert
             * from default op3-property, because width / max-width
             * doesn't return a value directly from CSS, unless
             * we caluclate it with JS (.width())
             *
             * @param  {String} unitTo
             * @param  {String} unitFrom
             * @param  {Number} value    (optional)
             * @return {Number}
             */
            _convert: function(unitTo, unitFrom, value) {
                var $parent = $(this.target()).parent();

                if (typeof value === "undefined")
                    value = this.getter(true);

                if (unitFrom === "%" && unitTo === "px")
                    return parseFloat(value) / 100 * $parent.width();
                else if (unitFrom === "px" && unitTo === "%")
                    return parseFloat(value) / parseFloat($parent.width()) * 100;

                return OP3.Elements._extension.prop.Default.prototype._convert.call(this, unitTo, unitFrom, value);
            },

        },

    });

})(jQuery, window, document);
