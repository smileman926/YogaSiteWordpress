/**
 * OptimizePress3 Delete property.
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
    OP3.Elements._extension.prop.Delete = OP3.defineClass({

        Name: "OP3.Property.Delete",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "delete",

            _defaults: {
                label: function() {
                    return OP3._("Delete");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return "0";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                setTimeout(function() {
                    OP3.transmit("elementrequestdetach", { node: this.element.node() });
                }.bind(this));
            },

        },

    });

})(jQuery, window, document);
