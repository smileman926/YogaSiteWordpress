/**
 * OptimizePress3 restartDay property.
 *
 * Days that need to pass before
 * evergreen countdown timer
 * restarts.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RestartDay = OP3.defineClass({

        Name: "OP3.Property.RestartDay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "restartDay",

            _defaults: {
                label: function() {
                    return OP3._("Restart Days");
                },
                attr: {
                    type: "number",
                    min: "0",
                    max: "365",
                },
                dataAttribute: 'data-op3-restart-day',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this._defaults.dataAttribute) || "";
            },

            setter: function(value, media) {
                $(this.target()).attr(this._defaults.dataAttribute, value);
            },

        },

    });

})(jQuery, window, document);
