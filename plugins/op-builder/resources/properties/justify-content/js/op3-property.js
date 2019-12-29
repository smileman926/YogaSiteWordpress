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
    OP3.Elements._extension.prop.JustifyContent = OP3.defineClass({

        Name: "OP3.Property.JustifyContent",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "justifyContent",

            _defaults: {
                label: function() {
                    return OP3._("Justify Content");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "normal": "None" },
                    // { "stretch": "Stretch" },
                    { "flex-start": "Start" },
                    { "center": "Center" },
                    { "flex-end": "End" },
                ],
            },

        },

    });

})(jQuery, window, document);
