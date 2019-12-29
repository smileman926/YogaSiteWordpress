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
    OP3.Elements._extension.prop.BackgroundStripesPresets = OP3.defineClass({

        Name: "OP3.Property.BackgroundStripesPresets",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundStripesPresets",

            _defaults: {
                label: function() {
                    return OP3._("Background Stripes Presets");
                },
                attr: {
                    "data-property-type": "backgroundStripesPresets",
                },
                serialize: false,
                hidden: true,
            },

        },

    });

})(jQuery, window, document);
