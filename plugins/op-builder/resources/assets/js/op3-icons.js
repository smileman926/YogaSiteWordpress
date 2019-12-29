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

    /**
     * window.OP3.Icons object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Icon data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * Icon config
         *
         * @type {Object}
         */
        _config: {},

        /**
         * Refresh config
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "icons",
                success: that._handleAjax,
            });
        },

        /**
         * List icon data suitable for
         * property rendering
         *
         * @return {String} filter
         * @return {Array}
         */
        data: function(filter) {
            filter = filter || "";

            if (("_cache" in this) && (filter in this._cache))
                return that._cache[filter];

            that._cache = that._cache || {};
            that._cache[filter] = that._data
                .filter(function(item) {
                    if (!filter)
                        return true;

                    var key = Object.keys(item)[0];
                    var val = Object.values(item)[0];

                    return val && val.tags && val.tags.split(", ").indexOf(filter) !== -1;
                })
                .map(function(item) {
                    var key = Object.keys(item)[0];
                    var val = Object.values(item)[0];

                    var map = {};
                    map[key] = {
                        title: val.name + ' (' + val.tags + ')',
                        "data-format": '<span><i class="op3-icon ' + key + '"></i> ' + val.name + '</span>',
                    }

                    return map;
                });

            return that.data(filter);
        },

        /**
         * Icon list as option tags
         *
         * @return {String} filter
         * @return {String}
         */
        render: function(filter) {
            filter = filter || "";

            if (("_render" in this) && (filter in this._render))
                return that._render[filter];

            that._render = that._render || {};
            that._render[filter] = that.data(filter)
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

            return that.render(filter);
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
            that._data = data.data;

            // append op3 tags
            that._data = that._data.map(function(item) {
                var key = Object.keys(item)[0];
                if (key && that._config && (key in that._config)) {
                    if (!item[key].tags)
                        item[key].tags = "";

                    // split and fix comma separator
                    item[key].tags = item[key].tags
                        .split(",")
                        .map(function(tag, index) {
                            return tag.trim();
                        });

                    // ...concat tags from _config
                    item[key].tags = item[key].tags
                        .concat(that._config[key]);

                    // ...filter out duplicates, and
                    // join with comma
                    item[key].tags = item[key].tags
                        .filter(function(tag, index) {
                            return item[key].tags.indexOf(tag) === index;
                        })
                        .join(", ");
                }

                return item;
            });

            // pre-render to cache data
            that.render();

            OP3.transmit("loadelementicons");
        },

        /**
         * Filter each option by element path
         *
         * @param  {Node}    form
         * @param  {Node}    select
         * @param  {Node}    option
         * @return {Boolean}
         */
        filterByElementPath: function(form, select, option) {
            var path = $(form).attr("data-op3-element-options-path");
            var id = $(select).attr("data-op3-element-options-property-id");

            if (/\/socialicons\/icon$/.test(path))
                return $(option).text().indexOf("op3-social") !== -1;
            else if (/\/treemenu$/.test(path) && id === "hamburgerIcon")
                return $(option).text().indexOf("op3-hamburger") !== -1;
            else if (/\/treemenu$/.test(path) && id === "hamburgerIconClose")
                return $(option).text().indexOf("op3-close") !== -1;
            else if (/\/videothumbnail$/.test(path) && id === "op3Icon")
                return $(option).text().indexOf("op3-play") !== -1;
            else if (/\/video$/.test(path) && id === "op3Icon")
                return $(option).text().indexOf("op3-video-play") !== -1;
            //else if
            //    @todo

            return true;
        },

    }

    // globalize (designer)
    window.OP3.Icons = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Icons = that;
    });

    // import icons from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.icons });
    });

})(jQuery, window, document);
