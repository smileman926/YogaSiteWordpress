/**
 * OptimizePress3 UI:
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 *     - op3-modal.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.UI object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Execute callback function
         *
         * @param  {Function} fn
         * @param  {Mixed}   value
         * @return {Void}
         */
        _callback: function(fn, value) {
            if (typeof fn === "function") {
                fn.call(that, value || null);
            }
        },

        /**
         * Alert box
         *
         * @param  {String}   title
         * @param  {String}   message
         * @param  {Function} onok
         * @return {Void}
         */
        alert: function(title, message, onok) {
            alert(title + "\n" + message);
            that._callback(onok, true);
        },

        /**
         * Confirm box
         *
         * @param  {String}   title
         * @param  {String}   message
         * @param  {Function} onok
         * @param  {Function} oncancel
         * @return {Void}
         */
        confirm: function(title, message, onok, oncancel) {
            var result = confirm(title + "\n" + message);
            that._callback(result ? onok : oncancel, !!result);
        },

        /**
         * Prompt box
         *
         * @param  {String}   title
         * @param  {String}   message
         * @param  {String}   value
         * @param  {Function} onok
         * @param  {Function} oncancel
         * @return {Void}
         */
        prompt: function(title, message, value, onok, oncancel) {
            var result = prompt(title + "\n" + message, value);
            that._callback(result !== null ? onok : oncancel, result);
        },

        /**
         * Notify method -> console.log
         *
         * @param  {String}   message
         * @param  {String}   type
         * @param  {Number}   wait
         * @param  {Function} callback
         * @return {Void}
         */
        notify: function(message, type, wait, callback) {
            if ("console" in window) {
                if (!(type in console)) {
                    type = "log";
                }
                if (type in console) {
                    console[type](message);
                }
            }

            setTimeout(function() {
                that._callback(callback);
            }, (wait / 1000) || 0);
        },

        /**
         * Get modal
         *
         * If no option is provided result will be
         * existing modal object. If options are
         * provided modal object will be reset to
         * default value and new options will be
         * appended.
         *
         * @param  {Mixed}  options
         * @return {Object}
         */
        modal: function(options) {
            if (typeof options === "undefined") {
                return that._modal;
            }

            that._modal.hide();
            that._modal.off();
            that._modal.reset();
            that._modal.className(null);

            if (typeof options === "object") {
                if ("className" in options)
                    $(that._modal.element).addClass(options.className);
                if ("title" in options)
                    that._modal.title(options.title);
                if ("search" in options)
                    that._modal.search(options.search);
                if ("content" in options)
                    that._modal.content(options.content);
                if ("message" in options)
                    that._modal.message(options.message);
            }

            return that._modal;
        },

        /**
         * Returns an SVG code for the loader
         *
         * @return {string}
         */
        loader: function() {
            return '<svg class="preloader" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 50 50">'
                    + '<path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(50 25 25)">'
                        + '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite">'
                        + '</animateTransform>'
                    + '</path>'
                + '</svg>';
        }

    }

    // globalize
    window.OP3.UI = that;

    // autoinit
    $(function() {
        OP3.UI._modal = new OP3.Modal();
    });

})(jQuery, window, document);
