/**
 * OptimizePress3 BackgroundImageStartPosition property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImageStartPosition = OP3.defineClass({

        Name: "OP3.Property.BackgroundImageStartPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImageStartPosition",

            _defaults: {
                label: function() {
                    return OP3._("Start Position");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "%",
                    "data-min-percent": "0",
                    "data-max-percent": "100",
                    "data-step-percent": "1",
                    "data-precision-percent": "0",
                },
                units: [
                    "%",
                ],
                defaultUnit: "%",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'StartPosition' at end)
                this._proxy = this.element.findProperty(this.id().replace(/StartPosition$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.startPosition || "0%";

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.startPosition;

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
                        + (parse.startColor || "rgba(0, 0, 0, 0)") + " "
                        + value + ", "
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
