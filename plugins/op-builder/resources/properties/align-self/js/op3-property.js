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
    OP3.Elements._extension.prop.AlignSelf = OP3.defineClass({

        Name: "OP3.Property.AlignSelf",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "alignSelf",

            _defaults: {
                label: function() {
                    return OP3._("Align Self");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "stretch": "Stretch" },
                    { "flex-start": "Top" },
                    { "center": "Middle" },
                    { "flex-end": "Bottom" },
                ],
                replace: [
                    { "baseline": "flex-end" },
                ],
            },

        },

    });

})(jQuery, window, document);
