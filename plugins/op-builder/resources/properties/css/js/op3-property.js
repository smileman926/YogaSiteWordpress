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
    OP3.Elements._extension.prop.Css = OP3.defineClass({

        Name: "OP3.Property.Css",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "css",

            _defaults: {
                label: function() {
                    return OP3._("CSS");
                },
                tag: "textarea",
            },

            _forceComputed: true,

            /**
             * Remove all tags from string, and include
             * any CSS inside <style></style> tags.
             *
             * @param {String} str
             * @return string
             */
            _parseStyle: function(str) {
                var div = $("<div />").html(str).get(0);
                var child = Array.prototype.slice.call(div.childNodes);

                return child
                    .filter(function (node) {
                        return node.nodeType === Node.TEXT_NODE || node.tagName === "STYLE";
                    })
                    .map(function (node) {
                        return node.textContent.trim();
                    })
                    .join("\n")
                    .trim();
            },

            computed: function() {
                return $(this.target()).html();
            },

            setter: function(value, media) {
                return $(this.target()).html(this._parseStyle(value));
            },

        },

    });

})(jQuery, window, document);
