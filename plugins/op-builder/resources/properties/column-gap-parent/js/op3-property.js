/**
 * OptimizePress3 property,
 * intended to be used on an element
 * whose parent has columnGap property.
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
    OP3.Elements._extension.prop.ColumnGapParent = OP3.defineClass({

        Name: "OP3.Property.ColumnGapParent",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "columnGapParent",

            _defaults: {
                label: function() {
                    return OP3._("Column Gap");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "50",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                replace: [
                    { "normal": "0px" },
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // parent of columnGapParent type
                this._proxy = OP3.$(this.element).parent().element();

                return this.proxy();
            },

            computed: function() {
                var element = this.proxy();
                var result = element.getOption("columnGap", true);

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
                var result = element.getOption("columnGap", true);

                // getter
                return result;
            },

            // Need to ensure that linkProperties value is taken into account
            setter: function(value, media) {
                var parentElement = this.proxy();
                var currentElement = OP3.$(this.element);
                var key = "linkProperties";
                var media = "all";

                // 1. read from the parent element linked property current value
                var linkValueCurrent = currentElement.getOption(key, true);
                var linkValueParent = parentElement.getOption(key, true);
                var isLinkValueDifferent = linkValueCurrent !== linkValueParent;

                // 2. set linked value to the parent if different
                if (isLinkValueDifferent)
                    parentElement.setOption(key, linkValueCurrent, media);

                // if this is not wrapped in settimeout,
                // setOption columnGap is executed before setOption value
                // finishes and it rasults in changing the gap on the elements where it shouldn't
                setTimeout(function() {

                    // 3. set columnGap value
                    parentElement.setOption("columnGap", value, media);

                    // 4. return linked value to the initial state on the parent
                    if (isLinkValueDifferent)
                        parentElement.setOption(key, linkValueParent, media);
                });

            },

        },

    });

})(jQuery, window, document);
