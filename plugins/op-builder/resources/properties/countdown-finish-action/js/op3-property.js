/**
 * OptimizePress3 countdownFinishAction property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CountdownFinishAction = OP3.defineClass({

        Name: "OP3.Property.CountdownFinishAction",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "countdownFinishAction",

            _defaults: {
                label: function() {
                    return OP3._("Finish Action");
                },
                tag: "select",
                options: [
                    { "text": "Show Text" },
                    { "redirect": "Redirect To Url" },
                    { "hide": "Hide Timer" },
                    // { "hide-element" : "Hide Element" },
                    // { "show-element" : "Show Element" },
                ],
                attr: {
                    "data-property-type": "select2-simple",
                }
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-finish-action") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-finish-action", value || "");
            },

        },

    });

})(jQuery, window, document);
