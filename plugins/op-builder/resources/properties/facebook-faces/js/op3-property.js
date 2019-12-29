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
    OP3.Elements._extension.prop.FacebookFaces = OP3.defineClass({

        Name: "OP3.Property.FacebookFaces",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "facebookFaces",

            _defaults: {
                label: function() {
                    return OP3._("Friends Faces");
                },
                selector: " .fb-like",
                tag: "select",
                // attr: {
                //     "data-property-type": "select2-simple",
                // },
                options: [
                    { "true": "Yes" },
                    { "false": "No" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-show-faces");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-show-faces", value);
            },

        },

    });

})(jQuery, window, document);
