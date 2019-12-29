/**
 * OptimizePress3 CodeHtmlSeparatorType property.
 *
 * Proxy property for selecting separator svg-s.
 * Svg-s are loaded from separators config
 * via inital ajax api call and appended
 * to select2.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CodeHtmlSeparatorType = OP3.defineClass({

        Name: "OP3.Property.CodeHtmlSeparatorType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "codeHtmlSeparatorType",

            _defaults: {
                label: function() {
                    return OP3._("Separator Type");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "None" },
                    { 'separator-1': 'Separator 1' },
                    { 'spearator-2': "Separator 2" },
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
                var html = proxy.computed();
                if (!html)
                    return "";

                return html;
            },

            getter: function(media) {
                return this.proxy().getter(media);
            },

            setter: function(value, media) {
                var proxy = this.proxy();

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value, media);
            },

        },

    });

    // append svg-s from separators config
    OP3.bind("loadajaxinit", function(e, o) {
        OP3.Elements._extension.prop.CodeHtmlSeparatorType.prototype._defaults.options = o.separators.map(function(item) {
            var option = {};
            option[item.svg] = { 'data-format': item.svg }

            return option;
        });

        OP3.Elements._extension.prop.CodeHtmlSeparatorType.prototype._defaults.options.splice(0, 0, { "": "None"});
    });

})(jQuery, window, document);
