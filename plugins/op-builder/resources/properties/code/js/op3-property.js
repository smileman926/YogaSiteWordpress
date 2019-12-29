/**
 * OptimizePress3 code property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Code = OP3.defineClass({

        Name: "OP3.Property.Code",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "code",

            _defaults: {
                label: function() {
                    return OP3._("Code");
                },
                tag: "textarea",
                selector: " [data-op3-code]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).html() || "";
            },

            setter: function(value, media) {
                var html = $.parseHTML(value);
                var $iframe = $(html)
                    .filter("iframe")
                    .first();

                // for vimeo add transparent=0 parameter in url
                // https://github.com/vimeo/player.js/issues/340
                var src = $iframe.attr("src");
                if (src && src.match(/vimeo/) && !src.match(/transparent/)) {
                    var symbol = src.indexOf("?") > -1 ? "&" : "?";
                    $iframe.attr("src", src + symbol + "transparent=0");
                }

                // not an css property, ignore media
                $(this.target()).html($iframe);
            },

        },

    });

})(jQuery, window, document);
