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
    OP3.Elements._extension.prop.Animation = OP3.defineClass({

        Name: "OP3.Property.Animation",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "animation",

            _defaults: {
                label: function() {
                    return OP3._("Animation");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "0": "None" },
                    { "1": "Scale back/front" },
                    { "2": "Slide fade right" },
                    { "3": "Slide fade down" },
                    { "4": "Newspaper" },
                    { "5": "Fly in from front" },
                    { "6": "Fly in from right" },
                    { "7": "Drop down" },
                    { "8": "Flip horizontaly" },
                    { "9": "Flip verticaly" },
                    // { "10": "Hang in" },
                    { "11": "Super scaled" },
                    { "12": "Fade" },
                    { "13": "3D slit" },
                    { "14": "3D Rotate from bottom" },
                    { "15": "3D Rotate in from left" },
                    { "16": "Blur" },
                    { "17": "Slide in from bottom" },
                    { "18": "Slip in from left" },
                    { "19": "Slip in from the top" },
                    { "20": "Rubber wobble" },
                    { "21": "Swing" },
                    { "22": "Bounce" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-" + this.name()) || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-" + this.name(), value || "0");
            },

        },

    });

})(jQuery, window, document);
