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
    OP3.Elements._extension.prop.BoxShadowInsetPresets = OP3.defineClass({

        Name: "OP3.Property.BoxShadowInsetPresets",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "boxShadowInsetPresets",

            _defaults: {
                label: function() {
                    return OP3._("Inner Shadow Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: function() {
                    return [
                        { "": "Custom", disabled: true },
                        ...this._presets,
                    ];
                },
                serialize: false,
            },

            _presets: [
                // Browser returns box shadow value in following order:
                // color, x, y, blur, spread, inset
                //
                // Example: rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset
                { "none" : "None"},
                { "rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset": "1px Inner Shadow" },
                { "rgba(255, 255, 255, 0.3) 0px 2px 1px 0px inset": "2px Inner Shadow" },
                { "rgba(255, 255, 255, 0.25) 0px 7px 15px 0px inset": "Large Soft Inner Shadow" },
            ],

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Angle' at end)
                this._proxy = this.element.findProperty(this.id().replace(/Presets$/, ""));

                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                var value = this.proxy().getter(media);

                // Checks if values is present in predefined presets
                if (value && !this._presets.some(element => element[value]) || value === null)
                    return "";

                return value;
            },

            setter: function(value, media) {
                this.element.setOption(this.proxy().id(), value, media);
            },

        },

    });

    // Sync with boxShadow property
    OP3.bind("elementchange::*::boxShadow", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element();
        var prop = element.findProperty("boxShadowInsetPresets");

        if (!prop || prop.id().indexOf("Inset") === -1)
            return;

        var valueBefore = o.value.before;
        var valueAfter = prop.getter();

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: prop.id(),
            name: prop.name(),
            selector: prop._selector,
            serialize: prop._serialize,
            forceComputed: prop._forceComputed,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: valueBefore,
                after: valueAfter,
            },
        }

        OP3.transmit("elementchanging", emit);
        OP3.transmit("elementchanging::" + emit.type, emit);
        OP3.transmit("elementchanging::*::" + emit.name, emit);
        OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
        OP3.transmit("elementchange", emit);
        OP3.transmit("elementchange::" + emit.type, emit);
        OP3.transmit("elementchange::*::" + emit.name, emit);
        OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
    });

})(jQuery, window, document);
