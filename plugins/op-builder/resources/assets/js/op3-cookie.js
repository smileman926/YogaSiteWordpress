/**
 * OptimizePress3 cookie object:
 * cookie helper.
 */
;(function(window, document) {

    "use strict";

    var that = {

        /**
         * Cookie default options
         * Used for setting cookie.
         */
        _defaults: {
            expires: 30,  // Cookie lifetime in days
            path: "/",    // Cookie path
        },

        /**
         * Process raw cookie data
         *
         * @return {Array}
         */
        processRawCookieData: function() {
            var rawData = document.cookie ? document.cookie.split('; ') : [];
            var cookies = [];

            rawData.forEach(function(cookie) {
                var parts = cookie.split("=");
                var key = decodeURIComponent(parts[0]);
                var value = decodeURIComponent(parts[1]);

                // Remove double quotes
                if (value.charAt(0) === '"' && value[value.length - 1] === '"')
                    value = value.slice(1, -1)

                cookies.push({
                    key: key,
                    value: value,
                });
            });

            return cookies;
        },

        /**
         * Get cookie by key
         *
         * @param  {String} key
         * @return {Object|Null}
         */
        get: function(key) {
            var cookies = that.processRawCookieData();

            var found = cookies.find(function(cookie) {
                return cookie.key === key;
            });

            if (found)
                return found;

            return null;
        },

        /**
         * Set cookie
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @param  {Object} options
         * @return {Void}
         */
        set: function(key, value, options) {
            if (typeof key === "undefined" || key === "")
                return;

            options = Object.assign(that._defaults, options || {});

            var date = new Date;
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);

            document.cookie = key + "=" + value + ";path=/;expires=" + date.toGMTString();
        },

        /**
         * Remove cookie
         *
         * @param  {String} key
         * @return {Void}
         */
        delete: function(key) {
            that.set(key, '', { expires: -1 });
        }

    };

    // globalize
    window.OP3.Cookie = that;

    // Bind events only in live-editor
    if (OP3.layer && OP3.layer === "none") {
        // link (wrapper)
        OP3.bind("load::liveeditor", function(e, o) {
            if (window !== window.parent)
                window.parent.OP3.Cookie = window.OP3.Cookie;
        });

        // link (designer)
        OP3.bind("load::designer", function(e, o) {
            e.origin.Cookie = window.OP3.Cookie;
        });
    }

})(window, document);