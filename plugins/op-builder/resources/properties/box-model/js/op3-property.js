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
    OP3.Elements._extension.prop.BoxModel = OP3.defineClass({

        Name: "OP3.Property.BoxModel",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "boxModel",

            _defaults: {
                label: function() {
                    return OP3._("Box Model");
                },
                attr: {
                    type: "checkbox",
                    checked: "checked",
                    "data-property-type": "boxModel",
                },
                serialize: false,
            },

        },

    });

})(jQuery, window, document);
