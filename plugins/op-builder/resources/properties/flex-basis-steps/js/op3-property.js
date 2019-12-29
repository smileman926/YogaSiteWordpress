/**
 * OptimizePress3 FlexBasisSteps property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.FlexBasisSteps = OP3.defineClass({

        Name: "OP3.Property.FlexBasisSteps",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexBasisSteps",

            _defaults: {
                label: function() {
                    return OP3._("Columns");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: function() {
                    return [
                        { "none": "Custom" },
                        ...this._presets,
                    ];
                },
                serialize: false,
            },

            _presets: [
                { "100%": "1" },
                { "50%": "2" },
                { "33.33%": "3" },
                { "25%": "4" },
            ],

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has id as this object (without keyword
                // 'Columns') - flexBasisSteps
                this._proxy = this.element.findProperty(this.id().replace(/Steps(.+)?/, ""));


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
                    return "none";

                return value;
            },

            setter: function(value, media) {
                // WidthSteps & WidthDefaulSteps
                // this.proxy().setOption(this.proxy().id(), value, media)
                // OP3.$(this.element.node()).setOption(this.proxy().id(), value, media);
                this.element.setOption(this.proxy().id(), value, media);
            },

        },

    });

    // Sync width with WidthSteps & WidthDefaulSteps
    // OP3.bind("elementchange::numberblock::flexBasis", function(e, o) {

    //     // Props to sync
    //     var element = OP3.$(o.node).element();
    //     var props = ["flexBasisSteps"];

    //     props.forEach(function(propId) {
    //         var prop = element.findProperty(propId);
    //         if (!prop)
    //             return;

    //         var emit = {
    //             node: o.node,
    //             uuid: o.uuid,
    //             type: o.type,
    //             media: o.media,
    //             id: prop.id(),
    //             name: prop.name(),
    //             selector: prop._selector,
    //             serialize: prop._serialize,
    //             forceComputed: prop._forceComputed,
    //             important: o.important,
    //             historyPending: OP3.Designer.isHistoryPending(),
    //             value: {
    //                 before: o.value.before,
    //                 after: o.value.after,
    //             },
    //         }

    //         OP3.transmit("elementchanging", emit);
    //         OP3.transmit("elementchanging::" + emit.type, emit);
    //         OP3.transmit("elementchanging::*::" + emit.name, emit);
    //         OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
    //         OP3.transmit("elementchange", emit);
    //         OP3.transmit("elementchange::" + emit.type, emit);
    //         OP3.transmit("elementchange::*::" + emit.name, emit);
    //         OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
    //     });
    // });

})(jQuery, window, document);
