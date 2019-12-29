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
    OP3.Elements._extension.prop.FontFamily = OP3.defineClass({

        Name: "OP3.Property.FontFamily",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontFamily",

            _defaults: {
                label: function() {
                    return OP3._("Font Family");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-paginate",
                },
                options: [
                    { 'Arial, "Helvetica Neue", Helvetica, sans-serif': "Arial" },
                    { '"Arial Black", "Arial Bold", Gadget, sans-serif': "Arial Black" },
                    { 'Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace': "Courier" },
                    { 'Geneva, Tahoma, Verdana, sans-serif': "Geneva" },
                    { 'Georgia, Times, "Times New Roman", serif': "Georgia" },
                    { '"Gill Sans", "Gill Sans MT", Calibri, sans-serif': "Gill Sans" },
                    { 'Helvetica, Arial, "Helvetica Neue", sans-serif': "Helvetica" },
                    { 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif"': "Impact" },
                    { '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif': "Lucida" },
                    { '"Myriad Pro", Myriad, sans-serif': "Myriad Pro" },
                    { 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif': "Palatino" },
                    { 'Tahoma, Verdana, Segoe, sans-serif': "Tahoma" },
                    { 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif': "Times New Roman" },
                    { '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif': "Trebuchet MS" },
                    { 'Verdana, Geneva, sans-serif': "Verdana" },
                ],
            },

            /**
             * Fixing IE values
             * (no space after comma)
             *
             * @param  {mixed} value
             * @return {mixed}
             */
            _fix: function(value) {
                if (value)
                    value = value.replace(/,([^\s])/g, ", $1");

                return value;
            },

            /**
             * Render options (for select tag only)
             * OP3.Fonts have rendered options stored,
             * so for quicker access overriding default
             * functionality
             *
             * @return {Array}
             */
            _renderOptions: function() {
                if (OP3.Fonts)
                    return OP3.Fonts.render();

                return OP3.Elements._extension.prop.Default.prototype._renderOptions.call(this);
            },

            /**
             * Get first value on fail
             *
             * @return {String}
             */
            computed: function() {
                var result = OP3.Elements._extension.prop.Default.prototype.computed.call(this);
                var valid = this._validOptions();
                if (valid.indexOf(result) === -1)
                    result = valid[0];

                return result;
            },

            setter: function(value, media) {
                OP3.transmit("elementfontrequest", {
                    value: value,
                });

                OP3.Elements._extension.prop.Default.prototype.setter.apply(this, arguments);
            },

        },

    });

    // load fonts from api (redefine options argument)
    OP3.bind("loadelementfonts", function(e, o) {
        OP3.Elements._extension.prop.FontFamily.prototype._defaults.options = OP3.Fonts.data();
    });

    // load font on fontFamily property change
    OP3.bind("elementfontrequest", function(e, o) {
        OP3.Fonts.find(o.value).load();
    });

    // refresh dynamic properties
    OP3.bind("elementoptionssync::*::fontFamily", function(e, o) {
        var element = OP3.$(o.node).element() || OP3.Document;
        var render = [];
        var key, prop;

        key = o.id
            .replace(/fontFamily/, "fontWeight")
            .replace(/FontFamily/, "FontWeight");
        prop = element.findProperty(key);
        if (prop)
            render.push(key);

        key = o.id
            .replace(/fontFamily/, "fontStyle")
            .replace(/FontFamily/, "FontStyle");
        prop = element.findProperty(key);
        if (prop)
            render.push(key);

        if (render.length && o.node === OP3.Designer.activeElement().node())
            OP3.transmit("elementoptionsrefreshrequest", { property: render });
    });

    // reset invalid dynamic properties
    OP3.bind("elementchange::*::fontFamily", function(e, o) {
        // use properies object for quicker access
        var element = OP3.$(o.node).element() || OP3.Document;
        var prop = element.findProperty(o.id);
        var propWeight = element.findProperty(o.id.replace(/fontFamily/, "fontWeight").replace(/FontFamily/, "FontWeight"));
        var propStyle = element.findProperty(o.id.replace(/fontFamily/, "fontStyle").replace(/FontFamily/, "FontStyle"));

        // validate dynamic properties
        var family = o.value.after;
        if (!family)
            family = prop.computed();
        var font = OP3.Fonts.find(family);
        var validWeight = font.weight || [ 400, 700 ];
        var validStyle = font.style || [ "normal", "italic" ];
        var defaultStyle = validStyle.indexOf("normal") === -1 ? validStyle[0] : "normal";

        // browser renders faux bold if font doesn't
        // contain bold, so we're forcing it here
        if (validWeight.indexOf(700) === -1)
            validWeight.push(700);

        // reset invalid weight/style for o.media and
        // all devices smaller that have same family
        var found = false;
        OP3.LiveEditor.forEachDevice(function(device, media) {
            if (!found && media === o.media)
                found = true;
            if (!found)
                return;
            if (prop.getter(media) !== family)
                return;

            if (propWeight) {
                var key = propWeight.id();
                var value = propWeight.getter(media);

                // reset to default
                if (value !== null && !isNaN(value) && validWeight.indexOf(value*1) === -1)
                    element.setOption(key, null, media);

                // set closest if default is not valid
                value = propWeight.computed();
                if (value !== null && !isNaN(value) && validWeight.indexOf(value*1) === -1) {
                    value = validWeight.reduce(function(prev, curr) {
                        return (Math.abs(curr - value*1) < Math.abs(prev - value*1) ? curr : prev);
                    });

                    element.setOption(key, value+"", media);
                }
            }

            if (propStyle) {
                key = propStyle.id();
                value = propStyle.getter(media);
                if (value !== null && validStyle.indexOf(value) === -1)
                    element.setOption(key, null, media);

                // set first if default is not valid
                value = propStyle.computed();
                if (value !== null && validStyle.indexOf(value) === -1)
                    element.setOption(key, defaultStyle, media);
            }
        });
    });

})(jQuery, window, document);
