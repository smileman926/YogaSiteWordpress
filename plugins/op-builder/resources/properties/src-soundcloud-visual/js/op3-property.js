
/**
 * OptimizePress3 srcSoundCloudVisual property
 * Used for manipulating visual parameter inside src attribute
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.SrcSoundCloudVisual = OP3.defineClass({

        Name: "OP3.Property.SrcSoundCloudVisual",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "srcSoundCloudVisual",

            _defaults: {
                selector: " iframe",
                label: function() {
                    return OP3._("Visual");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Blur' at end)
                this._proxy = this.element.findProperty(this.id().replace(/SoundCloudVisual$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var src = proxy.computed();
                var match = src.match(/visual=([^&]+)?/);

                var url = "";
                if (match && match[1])
                    url = match[1];

                return url === "true" ? "1" : "0";
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var src = proxy.computed();
                var match = src.match(/visual=([^&]+)?/);
                value = value === "1" ? "true" : "false";

                var newSrc = "";
                if (match && match[0])
                    newSrc = src.replace(match[0], "visual=" + value);

                proxy.element.setOption(proxy.id(), newSrc, media);
            },

        },

    });

})(jQuery, window, document);
