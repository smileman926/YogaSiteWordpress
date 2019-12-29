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
    OP3.Elements._extension.prop.Options = OP3.defineClass({

        Name: "OP3.Property.Options",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "options",

            _defaults: {
                label: function() {
                    return OP3._("Options");
                },
                tag: "textarea",
                selector: " [data-op3-options-list]",
                hidden: true,
            },

            _forceComputed: true,

            computed: function() {
                var $el = $(this.target());
                $el.find("option,input")
                    .removeAttr("selected")
                    .filter(function() {
                        return $(this).prop("selected");
                    })
                    .attr("selected", "selected");

                // not an css property, ignore media
                return $el.html();
            },

            setter: function(value, media) {
                // @todo - parse select/options

                // not an css property, ignore media
                $(this.target()).html(value || "");
            },

        },

    });

})(jQuery, window, document);
