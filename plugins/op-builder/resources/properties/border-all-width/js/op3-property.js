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
    OP3.Elements._extension.prop.BorderAllWidth = OP3.defineClass({

        Name: "OP3.Property.BorderAllWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderAllWidth",

            _defaults: {
                label: function() {
                    return OP3._("Border Bottom Width");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px,",
                    "data-min-px": "0",
                    "data-max-px": "72",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
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
