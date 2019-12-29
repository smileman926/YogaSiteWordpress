/**
 * OptimizePress3 TransformFlipX property.
 *
 * Proxy property for manipulating css
 * FlipX transformation function.
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
    OP3.Elements._extension.prop.TransformFlipX = OP3.defineClass({

        Name: "OP3.Property.TransformFlipX",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "transformFlipX",

            _defaults: {
                label: function() {
                    return OP3._("Horizontal Flip");
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

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'FlipX' at end)
                this._proxy = this.element.findProperty(this.id().replace(/FlipX$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css, true);
                var result = parse.scaleX;

                result = this._fix(result);
                result = this._doReplace(result);
                result = this._validateUnit(result, [ this._defaultUnit ]);

                return result === "-1" ? "1" : "0";
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var result = parse.scaleX;

                result = this._fix(result);
                result = this._doReplace(result);
                result = this._validateUnit(result);

                return result === "-1" ? "1" : "0";
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                var parse = proxy._parse(css);

                try {
                    value = this._fix(value);
                    value = this._doReplace(value);
                    value = this._validateUnit(value);

                    parse.scaleX = value === "1" ? "-1" : "1";
                }
                catch(e) {
                    return;
                }

                // revrse parse
                var result = "";
                for (var key in parse) {
                    if (parse[key] !== null)
                        result += (!result ? "" : " ") + key + "(" + parse[key] + ")";
                }

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },

        },

    });

})(jQuery, window, document);
