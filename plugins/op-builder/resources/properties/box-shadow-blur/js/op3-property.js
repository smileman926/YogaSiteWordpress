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
    OP3.Elements._extension.prop.BoxShadowBlur = OP3.defineClass({

        Name: "OP3.Property.BoxShadowBlur",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "boxShadowBlur",

            _defaults: {
                label: function() {
                    return OP3._("Blur");
                },
                attr: {
                    // @todo - units px only 'cuz calculating
                    // angle/distance precision is not working
                    // (problem with rounding, needs more
                    // testing)
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "64",
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
                // id as this object (without keyword
                // 'Blur' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Blur$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();
                var parse = proxy._parse(css);
                var result = parse.blur;

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
                var result = parse.blur;

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

                    try {
                        value = this._fix(value);
                        value = this._doReplace(value);
                        value = this._validateUnit(value);

                        parse.blur = value;
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
