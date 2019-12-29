/**
 * OptimizePress3 ratingSvgStrokeColor property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgStrokeColor = OP3.defineClass({

        Name: "OP3.Property.RatingSvgStrokeColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgStrokeColor",

            _defaults: {
                label: function() {
                    return OP3._("Stroke Color");
                },
                selector: " svg",
                attr: {
                    "data-property-type": "color",
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
                return this.proxy().getOption("strokeColor");
            },

            setter: function(value, media) {
                this.proxy().setOption("strokeColor", value);
            },

        },

    });

    // @todo - options!!!

})(jQuery, window, document);
