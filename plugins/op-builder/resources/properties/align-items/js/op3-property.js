/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.AlignItems = OP3.defineClass({

        Name: "OP3.Property.AlignItems",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "alignItems",

            _defaults: {
                label: function() {
                    return OP3._("Align Items");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "stretch": "Stretch" },
                    { "flex-start": "Left" },
                    { "center": "Center" },
                    { "flex-end": "Right" },
                ],
            },

        },

    });

})(jQuery, window, document);
