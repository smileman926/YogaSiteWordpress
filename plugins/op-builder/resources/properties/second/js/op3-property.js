/**
 * OptimizePress3 second property.
 *
 * Used for setting number of seconds
 * in evergreencountdowntimer.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Second = OP3.defineClass({

        Name: "OP3.Property.Second",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "second",

            _defaults: {
                label: function() {
                    return OP3._("Seconds");
                },
                attr: {
                    type: "number",
                    min: "0",
                    max: "59",
                },
                dataAttribute: 'data-op3-sec',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this._defaults.dataAttribute) || "0";
            },

            setter: function(value, media) {
                if (parseInt(value) > parseInt(this._defaults.attr.max))
                    value = this._defaults.attr.max;
                else if (parseInt(value) < parseInt(this._defaults.attr.min))
                    value = this._defaults.attr.min;

                $(this.target()).attr(this._defaults.dataAttribute, value);
            },

        },

    });

})(jQuery, window, document);
