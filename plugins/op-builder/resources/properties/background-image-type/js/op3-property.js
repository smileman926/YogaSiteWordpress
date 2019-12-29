/**
 * OptimizePress3 BackgroundImageType property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImageType = OP3.defineClass({

        Name: "OP3.Property.BackgroundImageType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImageType",

            _defaults: {
                label: function() {
                    return OP3._("Background Image Type");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "None" },
                    { "url": "URL" },
                    { "linear-gradient": "Linear Gradient" },
                    { "radial-gradient": "Radial Gradient" },
                ],
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Type' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Type$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.type || "none";

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.type || "none";

                return result;
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    css = proxy.computed();
                var parse = proxy._parse(css);
                var result = null;

                // preserve value from/to backgroundColor
                var colorValue = null;
                var colorKey = this.id()
                    .replace(/Image/, "Color")
                    .replace(/Type$/, "");

                if (value) {
                    if ((!parse.type || parse.type === "none") && (value === "linear-gradient" || value === "radial-gradient")) {
                        colorValue = "rgba(0, 0, 0, 0)";
                        parse.startColor = this.element.getOption(colorKey, media) || this.element.getOption(colorKey, true);
                    }
                    else if ((parse.type === "linear-gradient" || parse.type === "radial-gradient") && (!value || value === "none")) {
                        colorValue = parse.startColor == "rgba(0, 0, 0, 0)" ? parse.stopColor : parse.startColor;
                    }

                    if (value === "linear-gradient")
                        result = ""
                            + value + "("
                            + ("180deg") + ", "
                            + (parse.startColor || "rgba(0, 0, 0, 0)") + " "
                            + (parse.startPosition || "0%") + ", "
                            + (parse.stopColor || "rgba(0, 0, 0, 0)") + " "
                            + (parse.stopPosition || "100%") + ")";
                    else if (value === "radial-gradient")
                        result = ""
                            + value + "("
                            + ("at center center") + ", "
                            + (parse.startColor || "rgba(0, 0, 0, 0)") + " "
                            + (parse.startPosition || "0%") + ", "
                            + (parse.stopColor || "rgba(0, 0, 0, 0)") + " "
                            + (parse.stopPosition || "100%") + ")";
                    else if (value === "url")
                        result = "url(" + (parse.url || "") + ")";
                    else
                        result = "none";
                }

                // need to set/reset color as well
                proxy.element.setOption(colorKey, colorValue, media);

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },

        },

    });

})(jQuery, window, document);
