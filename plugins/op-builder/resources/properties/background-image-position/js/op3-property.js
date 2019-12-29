/**
 * OptimizePress3 BackgroundImagePosition property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImagePosition = OP3.defineClass({

        Name: "OP3.Property.BackgroundImagePosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImagePosition",

            _defaults: {
                label: function() {
                    return OP3._("Position");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "at center center": "Center Center" },
                    { "at left center": "Center Left" },
                    { "at right center": "Center Right" },
                    { "at center top": "Top Center" },
                    { "at left top": "Top Left" },
                    { "at right top": "Top Right" },
                    { "at center bottom": "Bottom Center" },
                    { "at left bottom": "Bottom Left" },
                    { "at right bottom": "Bottom Right" },
                ],
                replace: [
                    { "at center": "at center center" },
                    { "at center left": "at left center" },
                    { "at center right": "at right center" },
                    { "at top center": "at center top" },
                    { "at top left": "at left top" },
                    { "at top right": "at right top" },
                    { "at bottom center": "at center bottom" },
                    { "at bottom left": "at left bottom" },
                    { "at bottom right": "at right bottom" },
                ],
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Position' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Position$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.position || "at center center";

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.position;

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
                    if (parse.type !== "radial-gradient")
                        return;

                    result = ""
                        + parse.type + "("
                        + value + ", "
                        + (parse.startColor || "rgba(0, 0, 0, 0)") + " "
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
