/**
 * OptimizePress3 OptinFieldLayout property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.OptinFieldLayout = OP3.defineClass({

        Name: "OP3.Property.OptinFieldLayout",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinFieldLayout",

            _defaults: {
                label: function() {
                    return OP3._("Field Layout");
                },
                selector: " [data-op3-optin-field-layout]",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "stacked": "Stacked" },
                    { "inline": "Inline" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-optin-field-layout") || "stacked";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-optin-field-layout", this._validOptions(media).indexOf(value) === -1 ? "stacked" : value);
            },

        },

    });

})(jQuery, window, document);
