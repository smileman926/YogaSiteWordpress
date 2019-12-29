/**
 * OptimizePress3 block type:
 * op3 element manipulation
 * for each block type.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Blocks object
     *
     * @type {Object}
     */
    var that = {

        /**
         * List of blocks
         * append item after API request
         *
         * @type {Array}
         */
        _data: [],

        /**
         * Call callback function
         * (you can pass additional arguments
         * after callback)
         *
         * @param  {Mixed} callback (optional)
         * @return {Void}
         */
        _call: function(callback) {
            if (typeof callback !== "function")
                return;

            var args = Array.prototype.slice.call(arguments, 1);
            callback.apply(that, args);
        },

        /**
         * Data iterator
         *
         * @param  {Function} callback
         * @return {Void}
         */
        forEach: function(callback) {
            for (var i in that._data) {
                that._call(callback, that._data[i]);
            }
        },

        /**
         * Get all category blocks.
         * _data is used as cache.
         *
         * @param  {String} category
         * @param  {String} style (optional)
         * @param  {Function} callback (optional)
         * @return {}
         */
        getCategoryBlocks(category, style, callback) {
            var categoryData = null;
            for (var i in that._data) {
                if (that._data[i].uid === category) {
                    categoryData = that._data[i];
                    break;
                }
            }

            // category not found?
            if (!categoryData)
                return that._call(callback, null);

            // If data is already cache, return it
            if (categoryData && categoryData.blocks) {
                var filterByStyle = categoryData.blocks.filter(function(data) {
                    return data.style === style;
                });

                return that._call(callback, filterByStyle);
            }

            // If there is no data in cache
            // make api call
            var apiUrl = OP3.Meta.api + "/block-categories/" + category;
            OP3.Ajax.request({
                url: apiUrl,
                success: function(response, textStatus, jqXHR) {
                    categoryData.blocks = response.data ? response.data : [];
                    var filterByStyle = categoryData.blocks.filter(function(data) {
                        return data.style === style;
                    });
                    that._call(callback, filterByStyle);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + errorThrown);
                },
            });
        },

        /**
         * Get category-block or block data
         *
         * @param  {String} category
         * @param  {String} block    (optional)
         * @return {Object}
         */
        data: function(category, block) {
            if (!that._data)
                return null;

            if (!category)
                return that._data;

            // find category
            var categoryData = null;
            for (var i in that._data) {
                if (that._data[i].uid == category) {
                    categoryData = that._data[i];
                    break;
                }
            }

            // category not found?
            if (!categoryData)
                return null;

            // get category data
            if (typeof block === "undefined")
                return categoryData;

            // find block
            var blockData = null;
            for (var i in categoryData.blocks) {
                if (categoryData.blocks[i].uid == block) {
                    blockData = categoryData.blocks[i];
                    break;
                }
            }

            return blockData;
        },

        /**
         * Get block template config
         *
         * @param  {String}   category
         * @param  {String}   block
         * @param  {Function} progress (optional)
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        template: function(category, block, progress, callback) {
            var noop = function() {};
            if (typeof callback !== "function") {
                callback = progress;
                progress = noop;
            }
            if (typeof callback !== "function") {
                callback = noop;
            }

            // get data
            var data = that.data(category, block);

            if (!data)
                return that._call(callback, null);

            // found data
            if (data.template)
                return that._call(callback, $.extend(true, {}, data.template));

            var apiUrl = "blocks/" + data.uid;
            if (category === "customer-templates")
                apiUrl = "my-blocks/" + data.uid;
            // no data, ajax request
            OP3.Ajax.request({
                url: apiUrl,
                progress: function(e) {
                    that._call(progress, e.progress);
                },
                success: function(response, textStatus, jqXHR) {
                    data.template = JSON.parse(response.data.template);
                    that._call(callback, $.extend(true, {}, data.template));
                },
            });
        },

        /**
         * Refresh block list
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = null;
            OP3.transmit("blocksdataclear");

            OP3.Ajax.request({
                url: "block-categories",
                success: that._handleAjaxRefresh,
            });
        },

        /**
         * Ajax blocks request success event handler
         *
         * @param  {Object} response
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjaxRefresh: function(response, textStatus, jqXHR) {
            that._data = response.data;
            OP3.transmit("blocksdatarefresh");
        },

    };

    // globalize (designer)
    window.OP3.Blocks = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Blocks = that;
    });

    // import blocks from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjaxRefresh({ data: o.block_categories });
    });

})(jQuery, window, document);
