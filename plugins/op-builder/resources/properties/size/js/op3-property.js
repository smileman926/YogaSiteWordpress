/**
 * OptimizePress3 property size.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Size = OP3.defineClass({

        Name: "OP3.Property.Size",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "size",

            _defaults: {
                label: function() {
                    return OP3._("Size");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                    settings: {
                        s: {
                            fontSize: "10px",
                            padding: "14px",
                        },
                        m: {
                            fontSize: "16px",
                            padding: "20px",
                        },
                        l: {
                            fontSize: "24px",
                            padding: "28px",
                        },
                        xl: {
                            fontSize: "34px",
                            padding: "40px",
                        }
                    },
                    options: [
                        { "s": "S" },
                        { "m": "M" },
                        { "l": "L" },
                        { "xl": "XL" },
                    ],
                },
                options: [
                    { "s": "S" },
                    { "m": "M" },
                    { "l": "L" },
                    { "xl": "XL" },
                ],
                serialize: false,
            },

            getter: function(media) {
                // default
                var result = "none";

                // iterate this._size object keys and find
                // if any matches current configuration
                $.each(this._attr.settings, function(size, config) {
                    var keys = Object.keys(config);
                    for (var i = 0; i < keys.length; i++) {
                        var option = this.element.getOption(keys[i], media);
                        if (option === null)
                            option = this.element.getOption(keys[i], true);
                        if (option !== config[keys[i]])
                            return true;
                    }

                    result = size;
                    return false;
                }.bind(this));

                return result;
            },

            setter: function(value, media) {
                // invalid
                if (!(value in this._attr.settings))
                    return;

                // iterate and set
                $.each(this._attr.settings[value], function(index, value) {
                    this.element.setOption(index, value, media);
                }.bind(this));
            },

        },

    });

})(jQuery, window, document);
