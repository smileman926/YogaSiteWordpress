/**
 * OptimizePress3 property content.
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
    OP3.Elements._extension.prop.Content = OP3.defineClass({

        Name: "OP3.Property.Content",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "content",

            _defaults: {
                label: function() {
                    return OP3._("Content");
                },
            },

        },

    });

})(jQuery, window, document);
