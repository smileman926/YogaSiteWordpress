/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ajax.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_Font = function() {
        this._element = null;
        this._uid = null;
        this._url = null;
        this._preview = null;
        this._title = null;
        this._family = null;
        this._style = null;
        this._weight = null;
        this._lang = null;
    }

    OP3_Font.prototype = {

        // fix constructor
        // @todo - properly extend OP3_Font.prototype
        constructor: OP3_Font,

        /**
         * Element parent selector
         *
         * @type {String}
         */
        _parent: "head",

        /**
         * Property element getter
         * (create if not already done so)
         *
         * @return {Mixed}
         */
        get element() {
            if (!this._element && this.url)
                this._element = null
                    || $(this._parent + ' ' + 'link[href="' + this.url + '"]').get(0)
                    || $("<link />")
                        .attr("class", "op3-designer-stylesheet-font-family")
                        .attr("rel", "stylesheet")
                        .attr("href", this.url)
                            .get(0);

            return this._element;
        },

        /**
         * Property uid getter
         *
         * @return {Mixed}
         */
        get uid() {
            return this._uid;
        },

        /**
         * Property url getter
         *
         * @return {Mixed}
         */
        get url() {
            return this._url;
        },

        /**
         * Property preview getter
         *
         * @return {Mixed}
         */
        get preview() {
            return this._preview;
        },

        /**
         * Property title getter
         *
         * @return {Mixed}
         */
        get title() {
            return this._title;
        },

        /**
         * Property family getter
         *
         * @return {Mixed}
         */
        get family() {
            return this._family;
        },

        /**
         * Property style getter
         *
         * @return {Mixed}
         */
        get style() {
            if (!this._style)
                return this._style;

            return $.merge([], this._style);
        },

        /**
         * Property weight getter
         *
         * @return {Mixed}
         */
        get weight() {
            if (!this._weight)
                return this._weight;

            return $.merge([], this._weight);
        },

        /**
         * Property lang getter
         *
         * @return {Mixed}
         */
        get lang() {
            if (!this._lang)
                return this._lang;

            return $.merge([], this._lang);
        },

        /**
         * Font property as object
         *
         * @return {Object}
         */
        toJSON: function() {
            return {
                uid: this.uid,
                url: this.url,
                preview: this.preview,
                title: this.title,
                family: this.family,
                style: this.style,
                weight: this.weight,
                lang: this.lang,
            }
        },

        /**
         * Load font
         *
         * @return {Void}
         */
        load: function() {
            if (!this.element || $(this.element).parent().length)
                return;

            $(this.element).appendTo(this._parent);

            var emit = this.toJSON();
            OP3.transmit("elementfontload", emit);
            OP3.transmit("elementfontload::" + this.uid, emit);
        },

        /**
         * Unload font
         *
         * @return {Void}
         */
        unload: function() {
            if (!this.element || !$(this.element).parent().length)
                return;

            $(this.element).detach();

            var emit = this.toJSON();
            OP3.transmit("elementfontunload", emit);
            OP3.transmit("elementfontunload::" + this.uid, emit);
        },

    }

    /**
     * window.OP3.Fonts object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Font config from API
         *
         * @type {Array}
         */
        _config: [],

        /**
         * Font sprite url
         *
         * @return {String}
         */
        sprite: function() {
            return OP3.Meta.assets + "/img/fonts-sprite.svg";
        },

        /**
         * Refresh config
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._config = [];

            OP3.Ajax.request({
                url: "fonts",
                success: that._handleAjax,
            });
        },

        /**
         * Search for font (from config) by
         * it's uid/title/url/family and return
         * OP3_Font object
         *
         * @param  {String} font (optional)
         * @return {Object}
         */
        find: function(font) {
            // find font by uid/url/title/family
            if (font) {
                var uid = font;
                var url = font;
                var title = font.toLowerCase();
                var family = font.replace(/\s|-|_|"|'/g, "").toLowerCase();

                for (var i = 0; i < that._config.length; i++) {
                    var match = false
                        || that._config[i].uid === uid
                        || that._config[i].url === url
                        || that._config[i].title.toLowerCase() === title
                        || that._config[i].family.replace(/\s|-|_|"|'/g, "").toLowerCase() === family;
                    if (match)
                        return that._prepare(that._config[i]);
                }
            }

            // find font by family (without fallback)
            if (font) {
                var family = font.replace(/\s|-|_|"|'/g, "").toLowerCase().split(",").shift();

                for (var i = 0; i < that._config.length; i++) {
                    if (that._config[i].family.replace(/\s|-|_|"|'/g, "").toLowerCase().split(",").shift() === family)
                        return that._prepare(that._config[i]);
                }
            }

            // empty font object
            return that._prepare();
        },

        /**
         * List font data suitable for
         * property rendering
         *
         * @return {Array}
         */
        data: function() {
            if ("_data" in this)
                return that._data;

            that._data = that._config
                .map(function(item) {
                    var key = item.family;
                    var val = {
                        title: item.title,
                        // "data-format": '<img alt="' + item.title + '" src="' + item.preview + '" />',
                        "data-format": ''
                            + '<span class="op3-iconfont-text">' + item.title + '</span>'
                            + '<span class="op3-iconfont op3-iconfont-' + item.title.toLowerCase().replace(/ /g, '_') + '"></span>'
                    }

                    var map = {};
                    map[key] = val;

                    return map;
                });

            // default font family
            that._data.splice(0, 0, { "": { title: "(Default)" }});

            return that.data();
        },

        /**
         * Fonts list as option tags
         *
         * @return {String}
         */
        render: function() {
            if ("_render" in that)
                return that._render;

            that._render = that.data()
                .map(function(item) {
                    var key = Object.keys(item)[0];
                    var val = Object.values(item)[0];

                    return ''
                        + '<option'
                        +   ' value="' + (key || "").replace(/"/g, "&quot;") + '"'
                        +   ' title="' + val.title + '"'
                        +   ' data-format="' + (val["data-format"] || "").replace(/"/g, "&quot;") + '"'
                        + '>'
                        + val.title
                        + '</option>';
                })
                .join("");

            return that.render();
        },

        /**
         * Prepare font object (init properties
         * from config).
         *
         * @param  {Object} font (optional)
         * @return {Object}
         */
        _prepare: function(font) {
            var result = new OP3_Font();

            if (font) {
                result._uid = font.uid;
                result._url = font.url;
                result._preview = font.preview;
                result._title = font.title;
                result._family = font.family;
                result._style = font.style;
                result._weight = font.weight;
                result._lang = font.lang;
            }

            return result;
        },

        /**
         * Ajax request success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(data, textStatus, jqXHR) {
            that._config = data.data;
            that.render();

            OP3.transmit("loadelementfonts");
        },

    }

    // globalize (designer)
    window.OP3.Fonts = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Fonts = that;
    });

    // fonts sprite preload
    OP3.bind("ready", function(e, o) {
        var img = new window.parent.Image();
        img.onload = function() {
            OP3.LiveEditor.$ui.body.addClass("op3-font-preview-loaded");
        }
        img.src = that.sprite();

        // If we don't save the object somewhere, garbage collector
        // removes the object and image is requested again
        that._cache = img;
    });

    // import fonts from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.fonts });
    });

})(jQuery, window, document);
