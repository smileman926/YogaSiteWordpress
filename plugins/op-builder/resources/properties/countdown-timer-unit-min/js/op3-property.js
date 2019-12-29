/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CountdownTimerUnitMin = OP3.defineClass({

        Name: "OP3.Property.CountdownTimerUnitMin",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "countdownTimerUnitMin",

            _defaults: {
                label: function() {
                    return OP3._("Minute Unit");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-unit-min") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-op3-unit-min", value);
            },

        },

    });

})(jQuery, window, document);
