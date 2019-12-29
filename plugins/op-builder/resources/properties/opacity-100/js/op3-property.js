/**
 * OptimizePress3 Opacity100 property.
 *
 * Css opacity property have range 0.00 to 1.00
 * With this proxy property we mimic rage 0 to 100
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
    OP3.Elements._extension.prop.Opacity100 = OP3.defineClass({

        Name: "OP3.Property.Opacity100",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "opacity100",

            _defaults: {
                label: function() {
                    return OP3._("Opacity");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "0",
                    "data-max-": "100",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
                units: [
                    "",
                ],
                defaultUnit: "",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // '100' at end)
                this._proxy = this.element.findProperty(this.id().replace(/100$/, ""));

                return this.proxy();
            },

            computed: function() {
                var value = this.proxy().computed();
                value = Math.round(value * 100);
                value += "";

                return value;
            },

            getter: function(media) {
                var value = this.proxy().getter(media);
                if (value === null)
                    return value;

                value = Math.round(value * 100);
                value += "";

                return value;
            },

            setter: function(value, media) {
                if (value !== null) {
                    value = parseFloat(value) / 100;
                    if (isNaN(value))
                        return;

                    value = Math.max(value, 0);
                    value = Math.min(value, 1);
                    value += "";
                }

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                this.proxy().element.setOption(this.proxy().id(), value, media);
            },

        },

    });

})(jQuery, window, document);
