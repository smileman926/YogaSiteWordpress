/**
 * OptimizePress3 RestartTimer property.
 *
 * Can be set to column and row, but
 * we manipulate it only on the row.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RestartTimer = OP3.defineClass({

        Name: "OP3.Property.RestartTimer",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "restartTimer",

            _defaults: {
                label: function() {
                    return OP3._("Restart Timer After");
                },
                selector: "",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-restart-timer") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-restart-timer", value || "0");
            },

        },

    });

})(jQuery, window, document);
