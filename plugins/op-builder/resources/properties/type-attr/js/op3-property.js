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
    OP3.Elements._extension.prop.TypeAttr = OP3.defineClass({

        Name: "OP3.Property.TypeAttr",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "typeAttr",

            _defaults: {
                label: function() {
                    return OP3._("Type");
                },
                tag: "select",
                attr: {
                    "data-property-type-attr": "select2-simple",
                },
                selector: " input",
                options: [
                    { "color": "Colour" },
                    { "email": "E-Mail" },
                    { "number": "Number" },
                    { "password": "Password" },
                    { "text": "Text" },
                ],
                replace: [
                    { "button": "text" },
                    { "checkbox": "text" },
                    { "date": "text" },
                    { "datetime-local": "text" },
                    { "file": "text" },
                    { "hidden": "text" },
                    { "image": "text" },
                    { "month": "text" },
                    { "radio": "text" },
                    { "range": "text" },
                    { "reset": "text" },
                    { "search": "text" },
                    { "submit": "text" },
                    { "tel": "text" },
                    { "text": "text" },
                    { "time": "text" },
                    { "url": "text" },
                    { "week": "text" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("type") || "text";
            },

            setter: function(value, media) {
                $(this.target()).attr("type", value || "text");
            },

        },

    });

})(jQuery, window, document);
