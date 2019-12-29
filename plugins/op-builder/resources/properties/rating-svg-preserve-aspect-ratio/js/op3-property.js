/**
 * OptimizePress3 ratingSvgPreserveAspectRatio property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgPreserveAspectRatio = OP3.defineClass({

        Name: "OP3.Property.RatingSvgPreserveAspectRatio",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgPreserveAspectRatio",

            _defaults: {
                label: function() {
                    return OP3._("Align");
                },
                selector: " svg",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    {"xMinYMax meet": "Left"},
                    {"xMidYMid meet": "Center"},
                    {"xMaxYMin meet": "Right"},
                ]
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
                return this.proxy().getOption("preserveAspectRatio");
            },

            setter: function(value, media) {
                this.proxy().setOption("preserveAspectRatio", value);
            },

        },

    });

})(jQuery, window, document);
