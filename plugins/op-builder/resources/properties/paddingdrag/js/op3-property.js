/**
 * OptimizePress3 PaddingDrag property.
 *
 * This is a proxy property for paddingTop / paddingBottom and
 * it's manipulated by op3-live-editor-paddingdrag.js.
 * It changes an element padding on mouse drag.
 *
 * By default, this property should be tied to padding property
 * (either paddingTop or paddingBottom) by using the same id
 * prefix for padding. For example, 'padding' is default
 * id prefix and is tied to 'paddingTop', and
 * 'paddingBottom' properties.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-live-editor-paddingdrag.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.PaddingDrag = OP3.defineClass({

        Name: "OP3.Property.PaddingDrag",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "paddingDrag",

            _defaults: {
                label: function() {
                    return OP3._("Padding Drag");
                },
                attr: {
                    "data-property-type": "paddingDrag"
                },
                options: {
                    idPrefix: "padding",
                    positions: ["top", "bottom"],
                    html: '<div data-jquery-paddingdrag=""></div>',
                },
                selector: "",
                hidden: true,
                serialize: false,
            },

            proxy: function() {
                // empty
            },

            computed: function() {
                // empty
            },

            getter: function(media) {
                // empty
            },

            setter: function(value, media) {
                // empty
            },

        },

    });

})(jQuery, window, document);
