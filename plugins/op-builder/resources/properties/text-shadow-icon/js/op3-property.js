/**
 * OptimizePress3 textShadowIcon property
 *
 * Used to toggle on/off text-shadow on op3Icon
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.TextShadowIcon = OP3.defineClass({

        Name: "OP3.Property.TextShadowIcon",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textShadowIcon",

            _defaults: {
                label: function() {
                    return OP3._("Icon Shadow");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Color' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Icon$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);

                if (parse.color === "rgba(0, 0, 0, 0.2)" &&
                    parse.hShadow === "0px" &&
                    parse.vShadow === "2px" &&
                    parse.blurRadius === "6px")
                    return "1";

                return "0";
            },

            // getter: function(media) {
            //     var proxy = this.proxy();
            //     var css = proxy.getter(media);

            //     if (css === "0px 2px 6px rgba(0, 0, 0, 0.2)")
            //         return "1";

            //     return "0";
            // },

            setter: function(value, media) {
                var proxy = this.proxy();
                var result = null;

                if (value === "1")
                    result = "0px 2px 6px rgba(0, 0, 0, 0.2)";

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },

        },

    });

})(jQuery, window, document);
