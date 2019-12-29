/**
 * OptimizePress3 ratingSvgOffset property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgOffset = OP3.defineClass({

        Name: "OP3.Property.RatingSvgOffset",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgOffset",

            _defaults: {
                label: function() {
                    return OP3._("Offset");
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
                return this.proxy().getOption("offset");
            },

            setter: function(value, media) {
                this.proxy().setOption("offset", value);
            },

        },

    });

})(jQuery, window, document);
