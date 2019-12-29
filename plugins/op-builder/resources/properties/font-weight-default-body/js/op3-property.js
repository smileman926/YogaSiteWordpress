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
    OP3.Elements._extension.prop.FontWeightDefaultBody = OP3.defineClass({

        Name: "OP3.Property.FontWeightDefaultBody",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontWeightDefaultBody",

            _forceComputed: true,

            computed: function() {
                var result = $(document).data("op3-font-weight-default-body");
                if (!result) {
                    var $element = $("<span />")
                        .appendTo("body");
                    result = $element
                        .css("font-weight");

                    $element.detach();

                    $(document).data("op3-font-weight-default-body", result);
                }

                return result;
            },

            setter: function() {
                // pass
            },

        },

    });

    // backwards compatibility: update OP3.Map
    OP3.bind("mapready", function(e, o) {
        if (!OP3.Map._data.null.options.all)
            OP3.Map._data.null.options.all = {};

        OP3.Map._data.null.options.all.fontWeightDefaultBody = false
            || OP3.Map._data.null.options.all.fontWeightDefaultBody
            || OP3.Document.getOption("fontWeightDefaultBody", "all");
    });

})(jQuery, window, document);
