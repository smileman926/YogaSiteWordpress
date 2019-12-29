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
    OP3.Elements._extension.prop.AdminEmail = OP3.defineClass({

        Name: "OP3.Property.AdminEmail",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "adminEmail",

            _defaults: {
                label: function() {
                    return OP3._("Email");
                },
                selector: ' [name="admin-email"]',
                attr: {
                    type: "email",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val();
            },

            setter: function(value, media) {
                // apply rules
                // https://www.w3.org/TR/2012/WD-html-markup-20120329/input.email.html#input.email.attrs.value.single
                value = (value || "")
                    .match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

                // ignore invalid
                if (!value)
                    return;

                // not an css property, ignore media
                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
