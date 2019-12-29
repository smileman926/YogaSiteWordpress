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
    OP3.Elements._extension.prop.Timer = OP3.defineClass({

        Name: "OP3.Property.Timer",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "timer",

            _defaults: {
                label: function() {
                    return OP3._("Timer");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "min, sec",
                    "data-min-min": "0",
                    "data-min-sec": "0",
                    "data-max-min": "60",
                    "data-max-sec": "60",
                    "data-step-min": "1",
                    "data-step-sec": "1",
                    "data-precision-min": "0",
                    "data-precision-sec": "0",
                },
                units: [
                    "sec",
                    "min"
                ],
                defaultUnit: "sec",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-timer") || "0sec";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-timer", value || "0sec");
            },

        },

    });

})(jQuery, window, document);
