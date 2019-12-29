
/**
 * Optimizepress ElementStorage designer extension
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * All saved pages
         */
        _pages: [],

        /**
         * All saved elements
         */
        _elements: [],

        /**
         * Get all pages data
         *
         * @return {Array}
         */
        pages: function() {
            return that._pages;
        },

        /**
         * Get all elements data
         *
         * @return {Array}
         */
        elements: function() {
            return that._elements;
        },

        /**
         * Find element
         *
         * @param pageId
         * @param elementId
         * @return {Mixed}
         */
        find: function(pageId, elementId) {
            var found = that.elements().find(function(element) {
                return element.pageId == pageId && element.uuid === elementId;
            });

            if (!found)
                return false;

            return found;
        },

        /**
         * Get all elements by type.
         *
         * @param {String} type
         */
        getAllElementsByType: function(type) {
            var found = that.elements().map(function(element) {
                if (element.type === type)
                    return element;
            });

            if (!found)
                return false;

            return found;
        },

        /**
         * Process raw data from API
         *
         * @return {Void}
         */
        _processApiData: function() {
            that.pages().forEach(function(page) {
                Object.values(page.elements).forEach(function(element) {
                    that._elements.push({
                        type: element.type,
                        uuid: element.uuid,
                        pageId: page.id,
                        pageTitle: page.title,
                    });
                });
            });
        },

        /**
         * Ajax success event handler
         *
         * @param {Object} response
         * @param {String} textStatus
         * @param {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(response, textStatus, jqXHR) {
            that._pages = Object.values(response.data);
            that._processApiData();

            OP3.transmit("loadelementstorage");
        },

    };

    window.OP3.ElementStorage = that;

    // import element storage data
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.element_storage });
    });

})(jQuery, window, document);

