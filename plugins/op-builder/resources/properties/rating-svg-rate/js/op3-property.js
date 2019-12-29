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
    OP3.Elements._extension.prop.RatingSvgRate = OP3.defineClass({

        Name: "OP3.Property.RatingSvgRate",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgRate",

            _defaults: {
                label: function() {
                    return OP3._("Rate");
                },
                selector: " svg",
                attr: function() {
                    return {
                        "data-property-type": "range",
                        "data-units": "",
                        "data-min-": "0",
                        "data-max-": OP3.$(this.element).getOption("ratingSvgCount", "all"),
                        "data-step-": "0.5",
                        "data-precision-": "1",
                    }
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
                return this.proxy().getOption("rate");
            },

            setter: function(value, media) {
                this.proxy().setOption("rate", value);
            },

        },

    });

    // set max value of ratingSvgRate property
    // when ratingSvgCount is changed
    OP3.bind("elementoptionssync::rating::ratingSvgCount", function(e, o) {
        OP3.transmit("elementoptionsrefreshrequest", { property: [ "ratingSvgRate" ] });
    });

})(jQuery, window, document);
