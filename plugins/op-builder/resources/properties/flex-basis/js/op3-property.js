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
    OP3.Elements._extension.prop.FlexBasis = OP3.defineClass({

        Name: "OP3.Property.FlexBasis",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexBasis",

            _defaults: {
                label: function() {
                    return OP3._("Flex Basis");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-max-px": "2000",
                    "data-max-percent": "100",
                    "data-step-px": "1",
                    "data-step-percent": "1",
                    "data-precision-px": "0",
                    "data-precision-percent": "0",
                },
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

            _convert: function(unit_to, unit_from, value) {
                var $parent = $(this.target()).parent();

                if (typeof value === "undefined")
                    value = this.getter(true);

                if (unit_from === "%" && unit_to === "px")
                    return parseFloat(value) / 100 * $parent.width();
                else if (unit_from === "px" && unit_to === "%")
                    return parseFloat(value) / parseFloat($parent.width()) * 100;

                return OP3.Elements._extension.prop.Default.prototype._convert.call(this, unit_to, unit_from, value);
            },

        },

    });

})(jQuery, window, document);
