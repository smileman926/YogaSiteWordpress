/**
 * OptimizePress3 Loadinfo:
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Loadinfo object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            that.$ui = {};
            that.$ui.parent = window.parent.jQuery("#loadinfo");
            that.$ui.message = that.$ui.parent.find(".op3-loadinfo-message");
            that.$ui.progressbar = that.$ui.parent.find(".op3-loadinfo-progressbar");
        },

        /**
         * Parse value:
         * Value can be blank string (for resetting
         * value) or numeric value between 0 and 1.
         * Since result is used to set some css
         * variables, it must be of string type
         * (browser adds px suffix on numeric
         * values)
         *
         * @param  {Mixed}  value
         * @return {String}
         */
        _parseValue: function(value) {
            var result = value;
            if (typeof result === "string" && (!result || /^\s*$/.test(result)))
                result = "";
            else if (isNaN(result*1))
                result = "";
            else {
                result *= 1;
                result = Math.max(result, 0);
                result = Math.min(result, 1);
                result += "";
            }

            return result;
        },

        /**
         * Get/set display
         *
         * @param  {Boolean} value (optional)
         * @return {Mixed}
         */
        display: function(value) {
            if (typeof value === "undefined")
                return that.$ui.parent.hasClass("op3-loadinfo-active");

            if (value)
                that.$ui.parent.addClass("op3-loadinfo-active");
            else
                that.$ui.parent.removeClass("op3-loadinfo-active");
        },

        /**
         * Get/set message
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        message: function(value) {
            if (typeof value === "undefined")
                return that.$ui.message.html();

            that.$ui.message.html(value);
        },

        /**
         * Get/set start
         *
         * @param  {Numeric} value (optional)
         * @return {Mixed}
         */
        start: function(value) {
            if (typeof value === "undefined")
                return that.$ui.parent.css("--op3-progressbar-start");

            that.$ui.parent.css("--op3-progressbar-start", that._parseValue(value));
        },

        /**
         * Get/set stop
         *
         * @param  {Numeric} value (optional)
         * @return {Mixed}
         */
        stop: function(value) {
            if (typeof value === "undefined")
                return that.$ui.parent.css("--op3-progressbar-stop");

            that.$ui.parent.css("--op3-progressbar-stop", that._parseValue(value));
        },

        /**
         * Get/set status
         *
         * @param  {Numeric} value (optional)
         * @return {Mixed}
         */
        status: function(value) {
            if (typeof value === "undefined")
                return that.$ui.parent.css("--op3-progressbar-status");

            that.$ui.parent.css("--op3-progressbar-status", that._parseValue(value));
        },

        /**
         * Clean all values
         *
         * @return {Void}
         */
        clean: function() {
            that.message("Done");
            that.start("");
            that.stop("");
            that.status("");
        },

    }

    // globalize
    window.OP3.Loadinfo = that;

    // autoinit
    $(function() {
        OP3.Loadinfo._init();

        window.parent.OP3.Loadinfo = that;
    });

})(jQuery, window, document);
