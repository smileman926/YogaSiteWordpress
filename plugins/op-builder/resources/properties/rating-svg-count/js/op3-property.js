/**
 * OptimizePress3 ratingSvgCount property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgCount = OP3.defineClass({

        Name: "OP3.Property.RatingSvgCount",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgCount",

            _defaults: {
                label: function() {
                    return OP3._("Count");
                },
                selector: " svg",
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "1",
                    "data-max-": "10",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // usualy proxy is a op3 property, but
                // this time we use js library
                this._proxy = RatingSVG.fromNode(this.target()[0]);

                return this.proxy();
            },

            computed: function() {
                return this.proxy().getOption("count");
            },

            setter: function(value, media) {
                this.proxy().setOption("count", value);
            },

        },

    });

})(jQuery, window, document);
