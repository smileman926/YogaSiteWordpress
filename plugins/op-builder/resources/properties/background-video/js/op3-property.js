/**
 * OptimizePress3 BackgroundVideo property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundVideo = OP3.defineClass({

        Name: "OP3.Property.BackgroundVideo",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundVideo",

            _defaults: {
                label: function() {
                    return OP3._("Background Video");
                },
            },

            prerender: function(media) {
                return OP3.Elements._extension.prop.Wip.prototype.prerender.apply(this, arguments);
            },

            computed: function() {
                return "";
            },

            getter: function(media) {
                return null;
            },

            setter: function(value, media) {
                return;
            },

        },

    });

})(jQuery, window, document);
