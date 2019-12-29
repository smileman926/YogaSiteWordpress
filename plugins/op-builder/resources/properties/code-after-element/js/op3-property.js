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
    OP3.Elements._extension.prop.CodeAfterElement = OP3.defineClass({

        Name: "OP3.Property.CodeAfterElement",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "codeAfterElement",

            _defaults: {
                label: function() {
                    return OP3._("Code After Element");
                },
                tag: "textarea"
            },

            _forceComputed: true,

            /**
             *
             * @return {String}
             */
            computed: function() {
                return OP3.Query.htmlEntitiesDecode($(this.target()).attr("data-op3-code-after"));
            },

            /**
             * @param  {String} value
             * @param  {String} media
             * @return {Void}
             */
            setter: function(value, media) {
                return $(this.target()).attr("data-op3-code-after", OP3.Query.htmlEntitiesEncode(value));
            },

        },

    });

})(jQuery, window, document);
