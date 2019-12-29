/**
 * OptimizePress3 closeOtherTabs property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CloseOtherTabs = OP3.defineClass({

        Name: "OP3.Property.CloseOtherTabs",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "closeOtherTabs",

            _defaults: {
                label: function() {
                    return OP3._("Close Other Tabs");
                },
                selector: " [data-op3-close-other-tabs]",
                dataAttr: "data-op3-close-other-tabs",
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
                return $(this.target()).attr(this._defaults.dataAttr) || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr(this._defaults.dataAttr, value || "0");
            },

        },

    });

})(jQuery, window, document);
