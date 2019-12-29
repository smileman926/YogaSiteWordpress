/**
 * OptimizePress3 WrapColumns property.
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
    OP3.Elements._extension.prop.BlockDisplayAuthor = OP3.defineClass({

        Name: "OP3.Property.BlockDisplayAuthor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "blockDisplayAuthor",

            _defaults: {
                label: function() {
                    return OP3._("Display Author");
                },
                selector: " > [data-op3-children]",
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
                return $(this.target()).attr("data-op3-block-display-author") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-block-display-author", value || "0");
            },

        },

    });

})(jQuery, window, document);
