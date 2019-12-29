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
    OP3.Elements._extension.prop.FontSize = OP3.defineClass({

        Name: "OP3.Property.FontSize",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontSize",

            _defaults: {
                label: function() {
                    return OP3._("Font Size");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": 8,
                    "data-max-px": 72,
                    "data-step-px": 1,
                    "data-precision-px": 0,
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

            /**
             * Convert value from one unit to another.
             * This overrides _convert from default
             * op3-property, because text-related things
             * look for font-size value from parent
             * element and not from the element itself,
             * which is used in default _convert
             *
             * @param  {String} unitTo
             * @param  {String} unitFrom
             * @param  {Number} value    (optional)
             * @return {Number}
             */
            _convert: function (unitTo, unitFrom, value) {
                var $element = $(this.target());
                var $parent = $element.parent();

                if (typeof value === "undefined")
                    value = this.getter(true);

                if (unitFrom === "px" && unitTo === "em")
                    return parseFloat(value) / parseFloat($parent.css("font-size"));
                else if (unitFrom === "em" && unitTo === "px")
                    return parseFloat(value) * parseFloat($parent.css("font-size"));

                return OP3.Elements._extension.prop.Default.prototype._convert.call(this, unitTo, unitFrom, value);
            },

        },

    });

})(jQuery, window, document);
