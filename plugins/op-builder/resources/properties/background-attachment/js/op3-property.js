/**
 * OptimizePress3 BackgroundAttachment property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundAttachment = OP3.defineClass({

        Name: "OP3.Property.BackgroundAttachment",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundAttachment",

            _defaults: {
                label: function() {
                    return OP3._("Background Attachment");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    {"fixed": "Fixed"},
                    {"scroll": "Scroll"},
                ]
            },

        },

    });

})(jQuery, window, document);
