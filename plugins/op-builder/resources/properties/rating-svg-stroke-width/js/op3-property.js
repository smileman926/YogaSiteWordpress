/**
 * OptimizePress3 ratingSvgStrokeWidth property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgStrokeWidth = OP3.defineClass({

        Name: "OP3.Property.RatingSvgStrokeWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgStrokeWidth",

            _defaults: {
                label: function() {
                    return OP3._("Stroke Width");
                },
                tag: "select",
                selector: " svg",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "0": "None" },
                    { "1": "Thin" },
                    { "2": "Normal" },
                    { "3": "Thick" },
                ],
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
                return this.proxy().getOption("strokeWidth");
            },

            setter: function(value, media) {
                this.proxy().setOption("strokeWidth", value);
            },

        },

    });

    // @todo - options!!!

})(jQuery, window, document);
