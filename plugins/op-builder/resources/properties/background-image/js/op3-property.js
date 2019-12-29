/**
 * OptimizePress3 BackgroundImage property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImage = OP3.defineClass({

        Name: "OP3.Property.BackgroundImage",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImage",

            _defaults: {
                label: function() {
                    return OP3._("Background Image");
                },
            },

            _parse: function(value) {
                var match, result = {
                    value: value,
                    type: null,
                    url: null,
                    angle: null,
                    position: null,
                    startColor: null,
                    startPosition: null,
                    stopColor: null,
                    stopPosition: null,
                }

                if (!value)
                    return result;

                value = value.replace(/transparent/g, "rgba(0, 0, 0, 0)");
                match = value.match(/^url\("?(.*?)"?\)/);
                if (match)
                    return $.extend(result, {
                        type: "url",
                        url: match[1],
                    });

                match = value.match(/^(linear-gradient)\((rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px)),\s*(rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px))\)/);
                if (match)
                    return $.extend(result, {
                        type: match[1],
                        angle: "180deg",
                        startColor: match[2],
                        startPosition: match[3],
                        stopColor: match[4],
                        stopPosition: match[5],
                    });

                match = value.match(/^(linear-gradient)\((\d+deg),\s*(rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px)),\s*(rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px))\)/);
                if (match)
                    return $.extend(result, {
                        type: match[1],
                        angle: match[2],
                        startColor: match[3],
                        startPosition: match[4],
                        stopColor: match[5],
                        stopPosition: match[6],
                    });

                match = value.match(/^(radial-gradient)\((at\s+\w+\s+\w+),\s*(rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px)),\s*(rgba?\(.*?\)|#?\w+)\s*(\d+(?:%|px))\)/);
                if (match)
                    return $.extend(result, {
                        type: match[1],
                        position: match[2],
                        startColor: match[3],
                        startPosition: match[4],
                        stopColor: match[5],
                        stopPosition: match[6],
                    });

                return result;
            },

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::backgroundImage", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element() || OP3.Document;
        var prop = element.findProperty(o.id);

        var parseBefore = prop._parse(o.value.before);
        var parseAfter = prop._parse(o.value.after);
        var keys = ["url", "type", "angle", "position", "startColor", "startPosition", "stopColor", "stopPosition"];
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
            name = "backgroundImage",
            keys = ["url", "type", "angle", "position", "startColor", "startPosition", "stopColor", "stopPosition"],
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
