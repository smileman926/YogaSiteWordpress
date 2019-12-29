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
    OP3.Elements._extension.prop.BorderAllColor = OP3.defineClass({

        Name: "OP3.Property.BorderAllColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderAllColor",

            _defaults: {
                label: function() {
                    return OP3._("Border All Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                },
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (replacing All with
                // Top)
                this._proxy = this.element.findProperty(this.id().replace(/All/, "Top"));

                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                return this.proxy().getter(media);
            },

            setter: function(value, media) {
                this.element.setOption(this.id().replace(/All/, "Top"), value, media);
                this.element.setOption(this.id().replace(/All/, "Bottom"), value, media);
                this.element.setOption(this.id().replace(/All/, "Left"), value, media);
                this.element.setOption(this.id().replace(/All/, "Right"), value, media);
            },

        },

    });

})(jQuery, window, document);
