
/**
 * OptimizePress3 srcSoundCloudUrl property
 * Used for manipulating url parameter inside src attribute
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.SrcSoundCloudUrl = OP3.defineClass({

        Name: "OP3.Property.SrcSoundCloudUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "srcSoundCloudUrl",

            _defaults: {
                label: function() {
                    return OP3._("Url");
                },
                serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Blur' at end)
                this._proxy = this.element.findProperty(this.id().replace(/SoundCloudUrl$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var src = proxy.computed();
                var match = src.match(/url=([^&]+)?/);

                var url = "";
                if (match && match[1])
                    url = match[1];

                return url;
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var src = proxy.computed();

                // It's not soundcloud url
                if (src.indexOf("soundcloud") === -1)
                    return;

                // Find url parameter in link
                var match = src.match(/url=([^&]+)?/);

                // Replace old url parameter with new one
                var newSrc = "";
                if (match && match[0])
                    newSrc = src.replace(match[0], "url=" + value);

                // Set proxy property (src)
                proxy.element.setOption(proxy.id(), newSrc, media);
            },

        },

    });

})(jQuery, window, document);
