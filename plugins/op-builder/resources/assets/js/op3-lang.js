/**
 * OptimizePress3 language object.
 *
 * Dependencies:
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Lang object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Translation data
         *
         * @type {Object}
         */
        _data: {},

        /**
         * Translate text
         *
         * @param  {String} text
         * @return {String}
         */
        translate: function(text) {
            if (text in that._data)
                return that._data[text];

            return text;
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

            OP3.transmit("loadlang");
        },

    }

    // globalize (designer)
    window.OP3.Lang = that;

    // alias
    window.OP3._ = that.translate;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Lang = that;
        window.parent.OP3._ = that.translate;
    });

    // import lang from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.lang });
    });

})(jQuery, window, document);
