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
    OP3.Elements._extension.prop.Transform = OP3.defineClass({

        Name: "OP3.Property.Transform",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "transform",

            _defaults: {
                label: function() {
                    return OP3._("Transform");
                },
            },

            /**
             * Parse CSS transform property value
             *
             * @param  {String}  value
             * @param  {Boolean} fallback (optional)
             * @return {Object}
             */
            _parse: function(value, fallback) {
                var result = {
                    rotate: "0deg",
                    //rotateX: "0deg",
                    //rotateY: "0deg",
                    //rotateZ: "0deg",
                    scaleX: "1",
                    scaleY: "1",
                    //scaleZ: "1",
                    //skewX: "0deg",
                    //skewY: "0deg",
                    //translateX: "0",
                    //translateY: "0",
                    //translateZ: "0",
                }

                if (value)
                    for (var prop in result) {
                        var pattern = prop + "\\(\(.*?\)\\)";
                        var match = value.match(new RegExp(pattern));

                        if (match)
                            result[prop] = match[1];
                        else if (!fallback)
                            result[prop] = null;
                    }

                return result;
            },

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::transform", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element();
        var prop = element.findProperty(o.id);

        var parseBefore = prop._parse(o.value.before);
        var parseAfter = prop._parse(o.value.after);
        var keys = [ "rotate", "scaleX", "scaleY", "flipX", "flipY" ];
        for (var i = 0; i < keys.length; i++) {
            if (parseBefore[keys[i]] == parseAfter[keys[i]])
                continue;

            var key = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
            var proxy = element.findProperty(prop.id() + key);
            if (!proxy)
                continue;

            var emit = {
                node: o.node,
                uuid: o.uuid,
                type: o.type,
                media: o.media,
                id: proxy.id(),
                name: proxy.name(),
                selector: proxy._selector,
                serialize: proxy._serialize,
                forceComputed: proxy._forceComputed,
                important: o.important,
                historyPending: OP3.Designer.isHistoryPending(),
                value: {
                    before: parseBefore[keys[i]],
                    after: parseAfter[keys[i]],
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
        }

    });

    // sync proxy properties' widgets
    OP3.bind("elementoptionssyncrequest", function(e, o) {
        if (!o || !o.property || !o.property.length)
            return;

        var element = OP3.Designer.activeElement(),
            name = "transform",
            keys = [ "rotate", "scaleX", "scaleY", "flipX", "flipY" ],
            emit = { property: [] };

        // iterate properties in o object, try to
        // find the one that matches our name
        o.property.forEach(function(key) {
            var prop = element.findProperty(key);
            if (!prop || prop.name() !== name)
                return;

            // iterate proxy keys and append proxy id
            // to emit object
            keys.forEach(function(item) {
                var proxy = key + item.charAt(0).toUpperCase() + item.slice(1);
                proxy = element.findProperty(proxy);
                if (!proxy)
                    return;

                emit.property.push(proxy.id());
            });
        });

        // proxy emit
        if (emit.property.length)
            OP3.transmit("elementoptionssyncrequest", emit);
    });


})(jQuery, window, document);
