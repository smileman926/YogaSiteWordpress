/**
 * OptimizePress3 FieldWidthDefault property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FieldWidthDefault = OP3.defineClass({

        Name: "OP3.Property.FieldWidthDefault",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fieldWidthDefault",

            _defaults: {
                label: function() {
                    return OP3._("Field Width");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: function() {
                    return [
                        { "null": "Custom", disabled: true },
                        ...this._presets,
                    ];
                },
                serialize: false,
            },

            _presets: [
                { "100%": "100%" },
                { "75%": "75%" },
                { "66%": "66%" },
                { "50%": "50%" },
                { "33.33%": "33%" },
                { "25%": "25%" },
            ],

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has id as this object (without keyword
                // 'Default+') - fieldWidthDefault & fieldWidthDefaultInline
                this._proxy = this.element.findProperty(this.id().replace(/Default(.+)?/, ""));


                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                var value = this.proxy().getter(media);
                if (!value)
                    value = this.computed();

                // Check if value is present in predefined presets
                if (!this._presets.some(element => element[value]))
                    return "null";

                return value;
            },

            setter: function(value, media) {
                // fieldWidthDefault & fieldWidthDefaultInline
                this.element.setOption(this.id().replace(/Default(.+)?/, ""), value, media);

                // OP3-767
                if (this.element.type() === "form") {
                    OP3.$(this.element).find("button").element().setOption("maxWidth", value, media);
                }
            },

        },

    });

    // Sync width with fieldWidthDefault & fieldWidthDefaultInline
    OP3.bind("elementchange::form::width", function(e, o) {
        if (o.id !== "fieldWidth" && o.id !== "fieldWidthDefaultInline")
            return;

        // Props to sync
        var element = OP3.$(o.node).element();
        var props = ["fieldWidthDefault", "fieldWidthDefaultInline"];

        props.forEach(function(propId) {
            var prop = element.findProperty(propId);
            if (!prop)
                return;

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
                    before: o.value.before,
                    after: o.value.after,
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
    });

})(jQuery, window, document);
