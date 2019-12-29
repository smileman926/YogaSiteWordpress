/**
 * OptimizePress3 BackgroundImageMediaType property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BackgroundImageMediaType = OP3.defineClass({

        Name: "OP3.Property.BackgroundImageMediaType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "backgroundImageMediaType",

            _defaults: {
                label: function() {
                    return OP3._("Background Image Media Type");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "image": "Image" },
                    { "video": "Video" },
                    { "map": "Map" }
                ],
                serialize: false,
            },

            computed: function() {
                for (var i = 0; i < this._options.length; i++) {
                    var map = this._options[i];
                    var key = Object.keys(map)[0];
                    var prop = "background" + key.charAt(0).toUpperCase() + key.slice(1) + "Display";

                    if (this.element.getOption(prop, "all") !== "none")
                        return key;
                }

                return "";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                var options = {
                    "backgroundImageDisplay": "none",
                    "backgroundVideoDisplay": "none",
                    "backgroundMapDisplay": "none",
                }
                var key = "background" + value.charAt(0).toUpperCase() + value.slice(1) + "Display";
                if (!(key in options))
                    return;

                options[key] = "block";
                for (var prop in options) {
                    this.element.setOption(prop, options[prop], "all");
                }
            },

        },

    });

})(jQuery, window, document);
