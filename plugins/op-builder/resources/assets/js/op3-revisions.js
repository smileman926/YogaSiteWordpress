/**
 * OptimizePress3
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
     * window.OP3.Revisions object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Revisions data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * Refresh config
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "pages/" + OP3.Meta.pageId + "/revisions",
                success: that._handleAjax,
            });
        },

        /**
         * Render revision UI
         *
         * @return {String}
         */
        render: function() {
            var html = '<ul class="op3-revisions-list">';
            (that._data || []).forEach(function(item, index) {
                html += '<li>' + item.human_time + '<button value="' + item.id + '" type="button" class="op3-revision-restore">' + OP3._("Restore") + '</button></li>';
            });
            html += '</ul>';

            return html;
        },

        /**
         * Restore revision
         *
         * @param  {String} revision
         * @return {Void}
         */
        restore: function(revision) {
            OP3.Ajax.request({
                url: "pages/" + OP3.Meta.pageId + "/restore-revision",
                method: "post",
                data: JSON.stringify({
                    "id": OP3.Meta.pageId,
                    "revisionId": revision,
                }),
                success: that._handleRestoreSuccess,
                error: that._handleRestoreError,
            });
        },

        /**
         * Show UI
         *
         * @return {Void}
         */
        show: function() {

        },

        /**
         * Hide UI
         *
         * @return {Void}
         */
        hide: function() {

        },

        /**
         * Load designer frame
         *
         * @param  {String} revision
         * @return {Void}
         */
        load: function(revision) {
            var src = OP3.LiveEditor.$ui.frame.attr("src");
            src = src
                .replace(/(\?|&)op3_revision=.*?(&|$)/g, "")
                .replace(/(\?|&)$/g, "");
            if (revision)
                src += "&op3_revision=" + revision;

            OP3.LiveEditor.$ui.frame.attr("src", null);
            OP3.LiveEditor.$ui.frame.attr("src", src);

            // @todo - check events loadajaxinit, ready, load
        },

        /**
         * Ajax restore success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleRestoreSuccess: function(data, textStatus, jqXHR) {
            OP3.LiveEditor.$ui.body.get(0).ownerDocument.defaultView.frameElement.contentWindow.location.reload();
        },

        /**
         * Ajax restore error event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleRestoreError: function(jqXHR, textStatus, errorThrown) {
            // @todo - handle error
            alert("ERROR: " + errorThrown);
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

            OP3.transmit("loadelementrevisions");
        },

    }

    // globalize (designer)
    window.OP3.Revisions = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Revisions = that;
    });

    // import revisions from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.revisions });
    });

    // new revision list on save
    OP3.bind("save", function(e, o) {
        if (!o || !o.data || !o.data.revisions)
            return;

        that._data = o.data.revisions;
        OP3.transmit("loadelementrevisions");
    });

})(jQuery, window, document);
