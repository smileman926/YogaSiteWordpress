/**
 * OptimizePress3 ApplyToAllSiblings property.
 *
 * Property will use current selected element
 * and apply all css changes to
 * siblings element of same type.
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
    OP3.Elements._extension.prop.ApplyToAllSiblings = OP3.defineClass({

        Name: "OP3.Property.ApplyToAllSiblings",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "applyToAllSiblings",

            _defaults: {
                label: function() {
                    return OP3._("Apply the current element styling to all other elements in the current Block Element.");
                },
                attr: {
                    "data-op3-button-text": "Apply To All",
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return "0";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                if (!value || value === "0")
                    return;

                var element = this.element;
                var preserve = [ "id", "class", "html", "html2" ];

                OP3.$(element).parent().children().each(function() {
                    if (this === element.node())
                        return;

                    var child = OP3.$(this).element();
                    child.forEachProperty(function(property) {
                        var key = property.id();
                        if (preserve.indexOf(key) !== -1)
                            return;

                        window.parent.OP3.LiveEditor.forEachDevice(function(device, media) {
                            var value = element.getOption(key, media);
                            child.setOption(key, value, media);
                        });
                    })
                });

                // trigger virtual property change
                var emit = {
                    node: element.node(),
                    uuid: element.uuid(),
                    type: element.type(),
                    media: OP3.LiveEditor.deviceMedia(),
                    id: this._id,
                    name: this._id,
                    selector: this._selector,
                    serialize: this._serialize,
                    forceComputed: this._forceComputed,
                    important: false,
                    historyPending: OP3.Designer.isHistoryPending(),
                    value: {
                        before: null,
                        after: "0",
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
            },
        },

    });

})(jQuery, window, document);
