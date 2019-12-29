;(function($, window, document) {

    // strict mode
    "use strict";

    /**
     * Default options
     *
     * @type {Object}
     */
    var _defaults = {
        type: "info",
        timeout: 5000,
        message: ""
    }

    /**
     * Clear interval and remove message
     *
     * @return {Void}
     */
    var _clear = function() {
        var interval = $(this).attr("data-jquery-opnotify-interval");
        clearInterval(interval);

        $(this).remove();
    }

    /**
     * Click event handler
     *
     * @param  {Event} e
     * @return {Void}
     */
    var _handleClick = function(e) {
        e.preventDefault();
        _clear.call(this);
    }

    /**
     * Timeout event handler
     *
     * @return {Void}
     */
    var _handleTimeout = function() {
        _clear.call(this);
    }

    /**
     * jQuery plugin
     *
     * @param  {Object} options
     * @return {Object}
     */
    $.fn.opnotify = function(options) {
        // extend options
        options = $.extend({}, _defaults, options);

        // return self
        return $(this).each(function() {
            var $element = $("<div />")
                .addClass("jquery-opnotify")
                .attr("data-jquery-opnotify-type", options.type)
                .attr("data-jquery-opnotify-timeout", options.timeout)
                .attr("data-jquery-opnotify-interval", "-1")
                .appendTo(this);
            $("<div />")
                .addClass("jquery-opnotify-message")
                .html(options.message)
                .appendTo($element);
            $("<a />")
                .addClass("jquery-opnotify-clear")
                .attr("href", "#")
                .html("&times;")
                .on("click", _handleClick.bind($element))
                .appendTo($element);

            if (options.timeout && options.timeout*1 && options.timeout*1 > 0) {
                var interval = setTimeout(_handleTimeout.bind($element), options.timeout*1);
                $element.attr("data-jquery-opnotify-interval", interval)
            }
        });
    }

})(window.jQuery, window, document);
