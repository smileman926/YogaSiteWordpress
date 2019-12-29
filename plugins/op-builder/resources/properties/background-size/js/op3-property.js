/**
 * OptimizePress3 BackgroundSize property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundSize = OP3.defineClass({

        Name: "OP3.Property.BackgroundSize",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundSize",

            _defaults: {
                label: function() {
                    return OP3._("Background Size");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    {"auto": "Auto"},
                    {"contain": "Contain"},
                    {"cover": "Cover"},
                    {"none": "None"},
                ],
                replace: [
                    {"auto auto": "auto"},
                ],
            },

        },

    });

})(jQuery, window, document);
