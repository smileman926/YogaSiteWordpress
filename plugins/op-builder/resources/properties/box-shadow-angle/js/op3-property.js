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
    OP3.Elements._extension.prop.BoxShadowAngle = OP3.defineClass({

        Name: "OP3.Property.BoxShadowAngle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "boxShadowAngle",

            _defaults: {
                label: function() {
                    return OP3._("Angle");
                },
                attr: {
                    "data-property-type": "rotate",
                    "data-start-offset": "90",
                },
                units: [
                    "deg",
                ],
                defaultUnit: "deg",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Angle' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Angle$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var data = proxy._encodePosition(parse.offsetX, parse.offsetY);
                var result = data.angle;

                result = this._fix(result);
                result = this._doReplace(result);
                result = this._validateUnit(result, [ this._defaultUnit ]);

                return result;
            },

            getter: function(media) {
                var proxy = this.proxy();
                var css = proxy.getter(media);
                if (!css)
                    return null;
                var parse = proxy._parse(css);
                var data = proxy._encodePosition(parse.offsetX, parse.offsetY);
                var result = data.angle;

                result = this._fix(result);
                result = this._doReplace(result);
                result = this._validateUnit(result);

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
                    var data = proxy._encodePosition(parse.offsetX, parse.offsetY);

                    try {
                        value = this._fix(value);
                        value = this._doReplace(value);
                        value = this._validateUnit(value);

                        data = proxy._decodePosition(value, data.distance);
                        parse.offsetX = data.offsetX;
                        parse.offsetY = data.offsetY;
                    }
                    catch(e) {
                        return;
                    }

                    result = ""
                        + parse.color
                        + " " + parse.offsetX
                        + " " + parse.offsetY
                        + " " + parse.blur
                        + " " + parse.spread
                        + (parse.inset*1 ? " inset" : "");
                }

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },

        },

    });

})(jQuery, window, document);
