/**
 * OptimizePress3 BackgroundImageUrl property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImageUrl = OP3.defineClass({

        Name: "OP3.Property.BackgroundImageUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImageUrl",

            _defaults: {
                label: function() {
                    return OP3._("Background Image");
                },
                attr: {
                    "data-property-type": "image-url-preview",
                },
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Url' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Url$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.url || "";

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.url || "";

                return result;
            },

            setter: function(value, media) {
                var proxy = this.proxy();

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value ? "url(" + value + ")" : "none", media);
            },

        },

    });

})(jQuery, window, document);
