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
     * window.OP3.Menus object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * Refresh data
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "membership-pages",
                success: that._handleAjax,
            });
        },

        /**
         * Get data
         *
         * @return {Array}
         */
        data: function() {
            return that._data;
        },

        /**
         * Get default menu (first one)
         *
         * @return {String}
         */
        /*defaultValue: function() {
            try {
                return that._data[0].term_id+"";
            }
            catch(e) {
                return "";
            }
        },*/

        /**
         * Is menu (term_id) valid
         *
         * @param  {String}  value
         * @return {Boolean}
         */
        /*isValidMenu: function(value) {
            for (var i = 0; i < that._data.length; i++) {
                if (that._data[i].term_id == value)
                    return true;
            }

            return false;
        },*/

        /**
         * Menu as NodeList (null on fail)
         *
         * IMPORTANT: if you're changing render
         * template here, make sure you do the
         * same in backend afterRender method
         * (src/Editor/Elements/TreeMenu.php)
         *
         * @return {Array}
         */
        renderTree: function() {
            var data = that._data;

            var _build = function(item, parent, source) {
                if (!item)
                    return;

                item.forEach(function(child) {
                    var element = OP3.$('<_membershipcontentlistitem_template />').appendTo(parent);
                    element.setOption("membershipPageId", child.id || '', "all");
                    element.setOption("href", child.href || '', "all");

                    var image= element.find("image");

                    image.setOption("src", child.image, "all");
                    image.setOption("alt", child.title, "all");
                    image.setOption("title", child.title, "all");
                    image.setOption("attrWidth", "300", "all");
                    element.find("headline").setOption("html", child.title || '', "all");
                    element.find("text").setOption("html", child.description || '', "all");

                    if (source)
                        source.push(element.node());
                });
            }

            var result = [];
            _build(data, null, result);

            return result;
        },

        /**
         * Content list as NodeList (null on fail)
         *
         * IMPORTANT: if you're changing render
         * template here, make sure you do the
         * same in backend afterRender method
         * (src/Editor/Elements/TreeMenu.php)
         *
         * @return {Array}
         * @param data
         */
        renderTreeWithOuterData: function(data) {
            var _build = function(item, parent, source) {
                if (!item)
                    return;

                item.data.forEach(function(child) {
                    var element = OP3.$('<_membershipcontentlistitem_template />').appendTo(parent);
                    element.setOption("membershipPageId", child.id || '', "all");
                    element.setOption("href", child.href || '', "all");

                    var image= element.find("image");

                    image.setOption("src", child.image, "all");
                    image.setOption("alt", child.title, "all");
                    image.setOption("title", child.title, "all");
                    image.setOption("attrWidth", "300", "all");
                    element.find("headline").setOption("html", child.title || '', "all");
                    element.find("text").setOption("html", child.description || '', "all");

                    if (source)
                        source.push(element.node());
                });
            }

            var result = [];
            _build(data, null, result);

            return result;
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

            //OP3.transmit("loadelementmembershippages");
        },

    }

    // globalize (designer)
    window.OP3.MembershipPages = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.MembershipPages = that;
    });

    // import menus from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.membership_pages });
    });

})(jQuery, window, document);
