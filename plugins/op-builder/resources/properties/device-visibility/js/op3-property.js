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
    OP3.Elements._extension.prop.DeviceVisibility = OP3.defineClass({

        Name: "OP3.Property.DeviceVisibility",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "deviceVisibility",

            _defaults: {
                label: function() {
                    return OP3._("Device Visibility");
                },
                attr: {
                    "readonly": "readonly",
                    "data-property-type": "device-visibility",
                },
                serialize: false,
            },

            computed: function() {
                var element = OP3.$(this.element);
                var value = OP3.Designer.getElementDefaultCssDisplay(element.type());
                var result = [];

                OP3.LiveEditor.forEachDevice(function(device, media) {
                    var option = element.getOption("displayDeviceVisibility", media);
                    if (option !== null)
                        value = option;

                    if (value !== "none")
                        result.push(device);
                });

                return result.join(",");
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                // pass
            },

        },

    });

    // trigger virtual property change
    OP3.bind("elementchange::*::display", function(e, o) {
        if (o.id !== "displayDeviceVisibility")
            return;

        // @todo - calculate before value?
        var element = OP3.$(o.node);
        var value = element.getOption("deviceVisibility", true);
        var emitData = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: "deviceVisibility",
            name: "deviceVisibility",
            selector: "",
            serialize: false,
            forceComputed: false,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: null,
                after: value,
            },
        }

        OP3.LiveEditor.forEachDevice(function(device, media) {
            var emit = $.extend({}, emitData, { media: media });
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
