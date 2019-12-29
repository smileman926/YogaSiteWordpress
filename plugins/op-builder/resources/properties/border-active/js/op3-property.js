/**
 * OptimizePress3 BorderActive property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BorderActive = OP3.defineClass({

        Name: "OP3.Property.BorderActive",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderActive",

            _defaults: {
                label: function() {
                    return OP3._("Border Active");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "top": "Top" },
                    { "bottom": "Bottom" },
                    { "left": "Left" },
                    { "right": "Right" },
                    { "all": "All" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-active-border") || "all";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-active-border", value || "all");
            },

        },

    });

})(jQuery, window, document);
