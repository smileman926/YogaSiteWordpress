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
    OP3.Elements._extension.prop.FontWeightDefaultHead = OP3.defineClass({

        Name: "OP3.Property.FontWeightDefaultHead",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontWeightDefaultHead",

            _forceComputed: true,

            computed: function() {
                var result = $(document).data("op3-font-weight-default-head");
                if (!result) {
                    var $element = $("<h2 />")
                        .appendTo("body");
                    result = $element
                        .css("font-weight");

                    $element.detach();

                    $(document).data("op3-font-weight-default-head", result);
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

        OP3.Map._data.null.options.all.fontWeightDefaultHead = false
            || OP3.Map._data.null.options.all.fontWeightDefaultHead
            || OP3.Document.getOption("fontWeightDefaultHead", "all");
    });

})(jQuery, window, document);
