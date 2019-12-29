/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FacebookOrderby = OP3.defineClass({

        Name: "OP3.Property.FacebookOrderby",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookOrderby",

            _defaults: {
                label: function() {
                    return OP3._("Comment Ordering");
                },
                selector: " .fb-comments",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "social": "Standard" },
                    { "reverse_time": "Reverse Time" },
                    { "time": "Time" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-order-by") || "social";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-order-by", value || "social");
            },

        },

    });

})(jQuery, window, document);
