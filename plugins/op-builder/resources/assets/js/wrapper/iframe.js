/**
 * Wordpress OptimizePress3 plugin:
 * wrapper around live editor.
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Wrapper object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Iframe element
         *
         * @type {Object}
         */
        $frame: {},

        /**
         * Object initialization
         *
         * @return {void}
         */
        _init: function() {
            // Empty
        },

        /**
         * Set the URL for the iframe element
         *
         * @param url
         */
        setURL: function(url) {
            // Blank out the URL
            // that.$frame.attr("src", "about:blank");

            // Then after little time update it
            // setTimeout(function() {
                that.$frame.attr("src", url);
            // }, 100);
        },

        /**
         * Reload iframe content
         *
         * @return {void}
         */
        reload: function() {
            var src = that.$frame.attr("data-src");

            that.$frame.attr("src", "about:blank");
            that.$frame.attr("src", src);
        },

        /**
         * Build up the initial iframe for the OP editor
         *
         * @param editorUrl
         * @returns {*|jQuery}
         */
        build: function(editorUrl) {
            that.$frame = $("<iframe />")
                .attr("id", "op3-frame-live-editor")
                .attr("data-src", editorUrl)
                .attr("src", "about:blank")
                .appendTo("body");

            return that.$frame;
        }

    };

    // Globalize
    window.OP3.Wrapper = window.OP3.Wrapper || {};
    window.OP3.Wrapper.Iframe = that;

    // Auto init
    $(function() {
        OP3.Wrapper.Iframe._init();
    });

})(jQuery, window, document);
