/**
 * OptimizePress3 flexDirection property proxy.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FlexDirectionHorizontal = OP3.defineClass({

        Name: "OP3.Property.FlexDirectionHorizontal",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexDirectionHorizontal",

            _defaults: {
                label: function() {
                    return OP3._("Flex Direction");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "row": "Left" },
                    { "row-reverse": "Right" },
                ],
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Horizontal' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Horizontal$/, ""));

                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                return this.proxy().getter(media);
            },

            setter: function(value, media) {
                OP3.$(this.element.node()).setOption(this.proxy().id(), value, media);
            },

        },

    });

})(jQuery, window, document);
