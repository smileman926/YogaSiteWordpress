/**
 * OptimizePress3 BackgroundImageStartColor property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImageStartColor = OP3.defineClass({

        Name: "OP3.Property.BackgroundImageStartColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImageStartColor",

            _defaults: {
                label: function() {
                    return OP3._("Start Color");
                },
                attr: {
                    "data-property-type": "color",
                },
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'StartColor' at end)
                this._proxy = this.element.findProperty(this.id().replace(/StartColor$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.startColor || "rgba(0, 0, 0, 0)";

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.startColor;

                return result;
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var result = null;

                if (value) {
                    var css = proxy.getter(media);
                    if (!css)
                        css = proxy.computed();
                    var parse = proxy._parse(css);
                    if (parse.type !== "linear-gradient" && parse.type !== "radial-gradient")
                        return;

                    result = ""
                        + parse.type + "("
                        + (parse.angle || parse.position) + ", "
                        + value + " "
                        + (parse.startPosition || "0%") + ", "
                        + (parse.stopColor || "rgba(0, 0, 0, 0)") + " "
                        + (parse.stopPosition || "100%") + ")";
                }

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },

        },

    });

})(jQuery, window, document);
