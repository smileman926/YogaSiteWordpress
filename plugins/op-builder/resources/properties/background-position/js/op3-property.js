/**
 * OptimizePress3 BackgroundPosition property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundPosition = OP3.defineClass({

        Name: "OP3.Property.BackgroundPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundPosition",

            _defaults: {
                label: function() {
                    return OP3._("Background Position");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    //{"none": "None"},
                    {"left top": "Left Top"},
                    {"left center": "Left Center"},
                    {"left bottom": "Left Bottom"},
                    {"center top": "Center Top"},
                    {"center center": "Center Center"},
                    {"center bottom": "Center Bottom"},
                    {"right top": "Right Top"},
                    {"right center": "Right Center"},
                    {"right bottom": "Right Bottom"},
                ],
                replace: [
                    {"0% 0%": "left top"},
                    {"0% 50%": "left center"},
                    {"0% 100%": "left bottom"},
                    {"50% 0%": "center top"},
                    {"50% 50%": "center center"},
                    {"50% 100%": "center bottom"},
                    {"100% 0%": "right top"},
                    {"100% 50%": "right center"},
                    {"100% 100%": "right bottom"},
                ],
            },

        },

    });

})(jQuery, window, document);
