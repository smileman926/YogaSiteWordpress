/**
 * OptimizePress3 BackgroundRepeat property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundRepeat = OP3.defineClass({

        Name: "OP3.Property.BackgroundRepeat",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundRepeat",

            _defaults: {
                label: function() {
                    return OP3._("Background Repeat");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    {"no-repeat": "No Repeat"},
                    {"repeat": "Repeat"},
                    {"repeat-x": "Repeat X"},
                    {"repeat-y": "Repeat Y"},
                ]
            },

        },

    });

})(jQuery, window, document);
