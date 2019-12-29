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
     * window.OP3.Funnels object
     *
     * @type {Object}
     */
    var that = {

        pluginActive: false,
        funnelId:     null,
        nextPageId:   null,
        nextPageUrl:  null,
        prevPageId:   null,
        prevPageUrl:  null,
        pages:        [],

        /**
         * Ajax request success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(data, textStatus, jqXHR) {
            Object.defineProperty(that, "pluginActive",           { value: data.data.plugin_active || false });
            Object.defineProperty(that, "funnelId",               { value: data.data.funnel_id     || null });
            Object.defineProperty(that, "nextPageId",             { value: data.data.next_page_id  || null });
            Object.defineProperty(that, "nextPageUrl",            { value: data.data.next_page_url || null });
            Object.defineProperty(that, "prevPageId",             { value: data.data.prev_page_id  || null });
            Object.defineProperty(that, "prevPageUrl",            { value: data.data.prev_page_url || null });
            Object.defineProperty(that, "pages",                  { value: data.data.pages         || [] });

            OP3.transmit("loadelementfunnels", that);
        },

    }

    // globalize (designer)
    window.OP3.Funnels = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Funnels = that;
    });

    // add properties from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.funnels });
    });

})(jQuery, window, document);
