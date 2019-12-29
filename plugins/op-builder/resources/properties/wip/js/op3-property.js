/**
 * OptimizePress3 Wip property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Wip = OP3.defineClass({

        Name: "OP3.Property.Wip",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "wip",

            _defaults: {
                label: function() {
                    return OP3._("Work In Progress");
                },
                serialize: false,
            },

            prerender: function(media) {
                var result = OP3.Elements._extension.prop.Default.prototype.prerender.apply(this, arguments);

                $(result)
                    .find(".op3-element-options-label-group,.op3-element-options-property-input")
                        .css("display", "none");

                $("<small />")
                    .text("Work in progress...")
                    .css({
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        color: "#8e8e8e",
                    })
                    .appendTo(result);

                return result;
            },

            computed: function() {
                return "";
            },

            getter: function(media) {
                return null;
            },

            setter: function(value, media) {
                return;
            },

        },

    });

})(jQuery, window, document);
