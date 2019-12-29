/**
 * OptimizePress3 element property.
 *
 * This is not an actual property. It is a proxy
 * property that sets margins on rows and
 * columns...
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
    OP3.Elements._extension.prop.Gutter = OP3.defineClass({

        Name: "OP3.Property.Gutter",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gutter",

            _defaults: {
                label: function() {
                    return OP3._("Gutter");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px, em, rem",
                    "data-min-px": "0",
                    "data-min-em": "0",
                    "data-min-rem": "0",
                    "data-max-px": "400",
                    "data-max-em": "30",
                    "data-max-rem": "30",
                    "data-step-px": "1",
                    "data-step-em": "0.001",
                    "data-step-rem": "0.001",
                    "data-precision-px": "0",
                    "data-precision-em": "3",
                    "data-precision-rem": "3",
                },
                units: [
                    "px",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // this time we're using proxy for element,
                // not property: closest parent of row type
                this._proxy = OP3.$(this.element).closestHorizontal().element();

                return this.proxy();
            },

            computed: function() {
                // make sure we use row element:
                // we're using same property for row and
                // columns, and we want to apply it only
                // to row
                var element = this.proxy();

                // result is margin times two
                var result = element.getOption("gutterLeft", true);
                result = this._parseValueUnit(result);
                result = (parseFloat(result[0]) * 2) + result[1];

                // computed
                return result;
            },

            getter: function(media) {
                // @todo -> media is not optional!!!
                if (!media)
                    return this.computed();

                // make sure we use row element:
                // we're using same property for row and
                // columns, and we want to apply it only
                // to row
                var element = this.proxy();
                var result = "";

                // fallback
                try {
                    result = element.getOption("gutterLeft", true);
                    result = this._parseValueUnit(result);
                    result = (parseFloat(result[0]) * 2) + result[1];
                }
                catch(e) {
                    return result;
                }

                // getter
                return result;
            },

            setter: function(value, media) {
                // make sure we use row element:
                // we're using same property for row and
                // columns, and we want to apply it only
                // to row
                var element = this.proxy();

                // margin value (actual value is diveded by 2
                // because we're setting margin-left and
                // margin-right on columns in the row)
                value = this._parseValueUnit(value);
                value = (parseFloat(value[0]) / 2) + value[1];

                // setter - proxy options
                element.setOption("gutterLeft", value, media);
                element.setOption("gutterRight", value, media);
                element.setOption("gutterAdjustRight", "-" + value, media);
                element.setOption("gutterAdjustLeft", "-" + value, media);
            },

        },

    });

})(jQuery, window, document);
