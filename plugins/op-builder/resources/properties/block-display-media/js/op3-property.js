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
    OP3.Elements._extension.prop.BlockDisplayMedia = OP3.defineClass({

        Name: "OP3.Property.BlockDisplayMedia",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "blockDisplayMedia",

            _defaults: {
                label: function() {
                    return OP3._("Display Media");
                },
                selector: " > [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "none": "None" },
                    { "image": "Image" },
                    { "icon": "Icon" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-block-display-media") || "none";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-block-display-media", value || "none");
            },

        },

    });

})(jQuery, window, document);
