/**
 * OptimizePress3 ajax request handler.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Ajax object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Default ajax options
         *
         * @type {Object}
         */
        _options: {
            method: "GET",
            dataType: "json",
            contentType: "application/json",
        },

        /**
         * Traverse up to first parent
         *
         * @return {Object}
         */
        _parent: function() {
            var result = window;
            try {
                while (result !== result.parent) {
                    result = result.parent;
                }
            }
            catch(e) {
                // crossdomain
            }

            return result;
        },

        /**
         * Before send event handler:
         * set nonce header
         *
         * @param  {Object} xhr
         * @return {Void}
         */
        _beforeSend: function(xhr) {
            var nonce = null
                || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                || (that._parent().OP3WP ? that._parent().OP3WP.nonce : "")
                || "";
            if (nonce)
                xhr.setRequestHeader("X-WP-Nonce", nonce);
        },

        /**
         * Ajax request
         *
         * @param  {Object} options
         * @return {Void}
         */
        request: function(options) {
            // extend options
            var o = $.extend({}, that._options, options);

            // relative/absolute paths
            var baseUrl = null
                || (window.OP3 && OP3.Meta ? OP3.Meta.api : "")
                || (that._parent().OP3WP ? that._parent().OP3WP.apiBaseUrl : "")
                || "";
            if (baseUrl && o.url && o.url.match(/^[^\/]/) && !o.url.match(/:\/\//))
                o.url = baseUrl + "/" + o.url;
            if (!o.url)
                throw "OP3.Ajax: request url not defined";

            /*
            if (o.url && window.OP3 && OP3.Meta && o.url.match(/^[^\/]/) && !o.url.match(/:\/\//))
                o.url = OP3.Meta.api + "/" + o.url;
            else if (o.url && that._parent().OP3WP && o.url.match(/^[^\/]/) && !o.url.match(/:\/\//))
                o.url = that._parent().OP3WP.apiBaseUrl + "/" + o.url;
            if (!o.url)
                throw "OP3.Ajax: request url not defined";
            */

            // @todo -> quickfix
            // remove this when backend returns proper
            // json, for now we need to check data
            // (jQuery bug when returning empty array)
            if (o.dataType === "json" && typeof o.success === "function") {
                var _old = o.success;
                var _new = function() {
                    var args = Array.prototype.slice.call(arguments);
                    if (typeof args[0] === "string")
                        try {
                            args[0] = JSON.parse(args[0]);
                        }
                        catch(e) {
                            // pass
                        }

                    return _old.apply(this, args);
                }

                o.success = _new;
            }
            // --- //

            // xhr progress events
            var xhr = o.xhr || new window.XMLHttpRequest();
            o.xhr = function() {
                if (typeof o.progress === "function")
                    xhr.addEventListener("progress", function(e) {
                        // the value of e.total can be zero for gzipped
                        // response, so we gonna try to read total
                        // value from custom headers
                        e.progress = {};
                        e.progress.loaded = e.loaded || 0;
                        e.progress.total = e.total || e.target.getResponseHeader("X-OP3-Content-Length")*1 || 0;
                        e.progress.status = e.progress.total ? e.progress.loaded / e.progress.total : 0;

                        // fix wrong content-length header
                        e.progress.status = Math.min(1, e.progress.status);

                        o.progress.apply(this, arguments);
                    });
                if (typeof o.uploadProgress === "function") {
                    xhr.upload.addEventListener("progress", function(e) {
                        e.progress = {};
                        e.progress.loaded = e.loaded || 0;
                        e.progress.total = e.total || 0;
                        e.progress.status = e.progress.total ? e.progress.loaded / e.progress.total : 0;

                        o.uploadProgress.apply(this, arguments);
                    });
                }

                return xhr;
            }

            // nonce header
            var beforeSend = o.beforeSend;
            o.beforeSend = function(xhr) {
                that._beforeSend(xhr);

                if (typeof beforeSend === "function")
                    beforeSend.apply(this, arguments);
            }

            // send request
            $.ajax(o);
        }

    }

    // globalize
    window.OP3.Ajax = that;

    /**
     * Event load::designer event handler:
     * send initial api request
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleLoad = function(e) {
        if (e.target.layer !== "designer")
            return;

        OP3.Loadinfo.message("Loading initial API data");
        OP3.Loadinfo.start(0.01);
        OP3.Loadinfo.status(0);
        OP3.Loadinfo.stop(0.1);

        that.request({
            url: "pages/" + OP3.Meta.pageId + "/data",
            progress: _handleXhrProgress,
            success: _handleXhrSuccess,
        });
        //console.time("OP3.Ajax.init");
    }

    /**
     * Event progress event handler:
     * update loading progress bar
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleXhrProgress = function(e) {
        OP3.Loadinfo.status(e.progress.status);
    }

    /**
     * Event succes (initial request)
     * event handler
     *
     * @param  {Object} data
     * @param  {String} textStatus
     * @param  {Object} jqXHR
     * @return {Void}
     */
    var _handleXhrSuccess = function(data, textStatus, jqXHR) {
        // resetting this would reset progress back to
        // beginning. leave as it is and wait for worker
        // to reset/set it
        //OP3.Loadinfo.clean();

        var emit = {};
        for (var key in data.data) {
            emit[key] = data.data[key];
        }

        OP3.transmit("loadajaxinit", emit);
        //console.timeEnd("OP3.Ajax.init");
    }

    // send initial request
    OP3.bind("load::designer", _handleLoad);

})(jQuery, window, document);
