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
    OP3.Elements._extension.prop.CountdownTimerUnitSec = OP3.defineClass({

        Name: "OP3.Property.CountdownTimerUnitSec",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "countdownTimerUnitSec",

            _defaults: {
                label: function() {
                    return OP3._("Second Unit");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-unit-sec") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-op3-unit-sec", value);
            },

        },

    });

})(jQuery, window, document);
