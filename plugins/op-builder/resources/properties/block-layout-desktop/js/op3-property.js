/**
 * OptimizePress3 BlockLayout property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BlockLayoutDesktop = OP3.defineClass({

        Name: "OP3.Property.BlockLayoutDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "blockLayoutDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Block Layout");
                },
                selector: " > [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons-listed",
                },
                options: [
                    { "-1": "None" },
                    { "0": "Layout #0" },
                    { "1": "Layout #1" },
                    { "2": "Layout #2" },
                    { "3": "Layout #3" },
                    { "4": "Layout #4" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-block-layout-desktop") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-block-layout-desktop", this._validOptions(media).indexOf(value) === -1 ? "0" : value);
            },

        },

    });

})(jQuery, window, document);
