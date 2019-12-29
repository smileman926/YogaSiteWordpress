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
    OP3.Elements._extension.prop.DateTime = OP3.defineClass({

        Name: "OP3.Property.DateTime",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dateTime",

            _defaults: {
                label: function() {
                    return OP3._("Due Date");
                },
                selector: " > div",
                attr: {
                    type: "text",
                    "data-property-type": "datetime",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-date-time") || "";
            },

            setter: function(value, media) {
                try {
                    value = JSON.stringify(new Date(value)).replace(/^"|"$/g, "");
                }
                catch(e) {
                    return;
                }

                // not an css property, ignore media
                $(this.target()).attr("data-op3-date-time", value || "");
            },

        },

    });

})(jQuery, window, document);
