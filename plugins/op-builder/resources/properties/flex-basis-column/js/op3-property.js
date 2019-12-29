/**
 * OptimizePress3 element.
 *
 * This is a proxy property, we use it to manipulate
 * its parent's element flexBasis (used
 * on row & column elements)
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
    OP3.Elements._extension.prop.FlexBasisColumn = OP3.defineClass({

        Name: "OP3.Property.FlexBasisColumn",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "flexBasisColumn",

            _defaults: {
                label: function() {
                    return OP3._("Flex Basis");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-max-px": "2000",
                    "data-max-percent": "100",
                    "data-step-px": "1",
                    "data-step-percent": "1",
                    "data-precision-px": "0",
                    "data-precision-percent": "0",
                },
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            computed: function() {
                var element = OP3.$(this.element.parent()).element();
                var property = this.id().replace(/Column$/, "");

                this._proxy = this._proxy || element.findProperty(property);
                var css = this._proxy.computed();
                return css;
            },

            getter: function(media) {
                var element = OP3.$(this.element.parent()).element();
                var property = this.id().replace(/Column$/, "");

                this._proxy = this._proxy || element.findProperty(property);
                var css = this._proxy.getter(media);
                if (!css)
                    return null;
                return css;
            },

            setter: function(value, media) {
                var element = OP3.$(this.element.parent()).element();
                var property = this.id().replace(/Column$/, "");

                this._proxy = this._proxy || element.findProperty(property);
                return this._proxy.setter(value, media);
            },

        },

    });

    // sync proxy property on row
    OP3.bind("elementchange::*::flexBasisColumn", function(e, o) {
        var element = OP3.$(o.node).parent().element();
        var prop = element.findProperty("flexBasis");
        if (!prop)
            return;

        var emit = {
            node: element.node(),
            uuid: element.uuid(),
            type: element.type(),
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

})(jQuery, window, document);
