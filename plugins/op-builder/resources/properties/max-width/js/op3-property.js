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
    OP3.Elements._extension.prop.MaxWidth = OP3.defineClass({

        Name: "OP3.Property.MaxWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "maxWidth",

            _defaults: {
                label: function() {
                    return OP3._("Max Width");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px, %",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-max-px": "2000",
                    "data-max-percent": "100",
                    "data-step-px": "1",
                    "data-step-percent": "1",
                    "data-precision-px": "0",
                    "data-precision-percent": "0",
                },
                units: ["px", "%"],
                defaultUnit: "%",
                replace: [
                    { none: "100%" },
                ],
            },

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
