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
    OP3.Elements._extension.prop.BorderRadiusPresets = OP3.defineClass({

        Name: "OP3.Property.BorderRadiusPresets",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderRadiusPresets",

            _defaults: {
                label: function() {
                    return OP3._("Corner Style");
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
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            _presets: [
                { "0px": "Square" },
                { "10px": "Rounded" },
                { "100px": "Fully Rounded" },
            ],

            computed: function() {
                return this.getter();
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Presets' at end)
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

                // Sync presets with border widget
                OP3.transmit("elementoptionssyncrequest", { property: [ "borderTopLeftRadius" ] } );
            },
        },

    });

    OP3.bind("elementchange::*::borderTopLeftRadius elementchange::*::borderTopRightRadius elementchange::*::borderBottomRightRadius elementchange::*::borderBottomLeftRadius", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element();
        var prop = element.findProperty("borderRadiusPresets");

        if (!prop)
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
