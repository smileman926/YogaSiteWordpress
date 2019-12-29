 /**
 * Unsplash integration:
 *
 * Used for generate unsplash api calls
 * and storing response.
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Unsplash data from api
         *
         * @type {Array}
         */
        _data: {
            popular: [],
            latest: [],
            oldest: [],
        },

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
            callback.apply(this, args);
        },

        /**
         * Get unsplash api data
         *
         * @return {Array}
         */
        getFirstPage: function(order, callback) {
            if (!order)
                order = "popular";

            if (typeof callback !== "function")
               callback = function() {};

            if (!that._data && !that._data[order])
                return null;

            if (that._data[order].length !== 0)
                return that._call(callback, that._data[order]);

            OP3.Ajax.request({
                url: OP3.Meta.api + '/unsplash/' + order,
                success: function(response, textStatus, jqXHR) {
                    that._data[order] = response.data;

                    return that._call(callback, that._data[order]);
                }.bind(that),
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + textStatus);
                },
            });
        },

        /**
         * Get next page from unsplash api
         *
         * @param {Object} url
         * @param {Function} callback
         * @return {Void}
         */
        getNextPage: function(url, callback) {
            if (typeof callback !== "function")
                callback = function() {};

            OP3.Ajax.request({
                url: url,
                success: function(response, textStatus, jqXHR) {
                    var regex = /<(.*?)>/g;
                    var string = jqXHR.getResponseHeader('link');
                    var matches, links = [];

                    while (matches = regex.exec(string)) {
                        links.push(matches[1]);
                    }

                    var photos = response.results || response;

                    var headers = {
                        urls: {
                            first: links[0] || '',
                            prev: links[1] || '',
                            last: links[2] || '',
                            next: links[3] || '',

                        },
                        total: jqXHR.getResponseHeader('x-total'),
                        perPage: jqXHR.getResponseHeader('x-per-page'),
                    }

                    return that._call(callback, photos, headers);
                }.bind(that),
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + textStatus);
                },
            });
        },

        /**
         * Search photos from unsplash api
         *
         * @param  {Object} query
         * @param  {Function} callback
         * @return {Void}
         */
        search: function(query, callback) {
            if (!query)
                return;

            OP3.Ajax.request({
                url: OP3.Meta.api + '/unsplash/search?query=' + query,
                success: function(response, textStatus, jqXHR) {
                    var unsplashResponse = JSON.parse(response.data.response);

                    return that._call(callback, {
                        photos: unsplashResponse.results,
                        urls: response.data.urls,
                    });
                }.bind(that),
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + textStatus);
                },
            });
        },

        /**
         * Event endpoint used to increment
         * the number of downloads a photo has
         *
         * @param {String} id
         * @param {Function} callback
         * @return {Void}
         */
        download: function(id, callback) {
            if (!id)
                return;

            OP3.Ajax.request({
                url: OP3.Meta.api + '/unsplash/download?id=' + id,
                success: function(response, textStatus, jqXHR) {
                    var unsplashResponse = JSON.parse(response.data.response);

                    return that._call(callback, {
                        url: unsplashResponse.url,
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + textStatus);
                },
            });
        }
    }

    // globalize
    window.OP3.Unsplash = that;

})(jQuery, window, document);
