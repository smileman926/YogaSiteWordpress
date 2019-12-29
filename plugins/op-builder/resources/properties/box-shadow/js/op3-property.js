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
    OP3.Elements._extension.prop.BoxShadow = OP3.defineClass({

        Name: "OP3.Property.BoxShadow",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "boxShadow",

            _defaults: {
                label: function() {
                    return OP3._("Box Shadow");
                },
                hidden: true,
            },

            _parse: function(value) {
                var match = (value || "").split(/ (?![^\(]*\))/);
                if (match.length === 1 && match[0] === "none")
                    match = [];

                // @todo
                //     - some browsers may have different order on computed value
                //     - possible to have multiple shadows on computed value (separated with space)
                var result = {
                    color: match[0] || "rgb(0, 0, 0)",
                    offsetX: match[1] || "0px",
                    offsetY: match[2] || "0px",
                    blur: match[3] || "0px",
                    spread: match[4] || "0px",
                    inset: match[5] ? "1" : "0",
                };

                // color split to rgba values (useful for parser in presets)
                match = result.color.replace(/\s/g, "").match(/rgba?\((\d+),(\d+),(\d+),?([\d\.]+)?\)/);
                result.colorRed = match ? match[1] : 0;
                result.colorGreen = match ? match[2] : 0;
                result.colorBlue = match ? match[3] : 0;
                result.colorAlpha = match ? ((typeof match[4] !== "undefined" ? match[4] : 1)*1) : 1;

                return result;
            },

            _encodePosition: function(offsetX, offsetY) {
                offsetX = offsetX || "0px";
                offsetY = offsetY || "0px";

                var match, unit;
                match = offsetX.match(/[a-z]+$/);
                unit = match ? match[0] : "";
                offsetX = parseFloat(offsetX);
                offsetY = parseFloat(offsetY);

                // @todo - rounding values (only works for deg/px)
                return {
                    angle: (Math.round(Math.atan2(parseFloat(offsetY), parseFloat(offsetX)) * 180/Math.PI) + 360) % 360 + "deg",
                    distance: Math.round(Math.sqrt(Math.pow(parseFloat(offsetX), 2) + Math.pow(parseFloat(offsetY), 2))) + unit,
                }
            },

            _decodePosition: function(angle, distance) {
                angle = angle || "0deg";
                distance = distance || "0px";

                var match, unit;
                match = distance.match(/[a-z]+$/);
                unit = match ? match[0] : "";
                angle = parseFloat(angle);
                distance = parseFloat(distance);

                // @todo - rounding values (only works for deg/px)
                return {
                    offsetX: Math.round(Math.cos(angle * Math.PI/180) * distance) + unit,
                    offsetY: Math.round(Math.sin(angle * Math.PI/180) * distance) + unit,
                }
            },

            // @todo
            //     - computed - replace "none" with "rgb(0, 0, 0) 0px 0px 0px 0px"
            //                - return value in color|offsetX|offsetY|blur|spread|inset format
            //     - setter   - convert value to color|offsetX|offsetY|blur|spread|inset format

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::boxShadow", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element();
        var prop = element.findProperty(o.id);

        var parseBefore = prop._parse(o.value.before);
        var parseAfter = prop._parse(o.value.after);
        var keys = ["color", "offsetX", "offsetY", "blur", "spread", "inset"];
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

        var posBefore = prop._encodePosition(parseBefore.offsetX, parseBefore.offsetY);
        var posAfter = prop._encodePosition(parseAfter.offsetX, parseAfter.offsetY);
        var keys = ["angle", "distance"];
        for (var i = 0; i < keys.length; i++) {
            if (posBefore[keys[i]] == posAfter[keys[i]])
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
                    before: posBefore[keys[i]],
                    after: posAfter[keys[i]],
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
            name = "boxShadow",
            keys = ["color", "offsetX", "offsetY", "angle", "distance", "blur", "spread", "inset"],
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
