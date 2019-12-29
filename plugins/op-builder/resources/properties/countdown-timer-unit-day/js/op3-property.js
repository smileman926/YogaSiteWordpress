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
    OP3.Elements._extension.prop.CountdownTimerUnitDay = OP3.defineClass({

        Name: "OP3.Property.CountdownTimerUnitDay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "countdownTimerUnitDay",

            _defaults: {
                label: function() {
                    return OP3._("Days Unit");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-unit-day") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-op3-unit-day", value);
            },

        },

    });

})(jQuery, window, document);
