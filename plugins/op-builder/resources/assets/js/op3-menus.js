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
                url: "menus",
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
        defaultValue: function() {
            try {
                return that._data[0].term_id+"";
            }
            catch(e) {
                return "";
            }
        },

        /**
         * Is menu (term_id) valid
         *
         * @param  {String}  value
         * @return {Boolean}
         */
        isValidMenu: function(value) {
            for (var i = 0; i < that._data.length; i++) {
                if (that._data[i].term_id == value)
                    return true;
            }

            return false;
        },

        /**
         * Menu as Node (null on fail)
         *
         * IMPORTANT: if you're changing render
         * template here, make sure you do the
         * same in backend afterRender method
         * (src/Editor/Elements/ListMenu.php)
         *
         * @param  {String} menu
         * @return {Mixed}
         */
        renderList: function(menu) {
            var data = null;
            for (var i = 0; i < that._data.length; i++) {
                if (that._data[i].ID === menu || that._data[i].term_id === menu || that._data[i].name === menu || that._data[i].slug === menu) {
                    data = that._data[i];
                    break;
                }
            }

            // recursively build menu
            var _build = function(item, parent) {
                if (item.children && item.children.length) {
                    var $ul = $("<ul />")
                        .appendTo(parent);
                    item.children.forEach(function(child) {
                        var $li = $("<li />")
                            .appendTo($ul);
                        $("<a />")
                            .attr("href", child.url)
                            .text(child.name || child.title)
                            .appendTo($li);

                        _build(child, $li);
                    });
                }
            }

            var result = $("<nav />").get(0);
            if (data) {
                $("<span />")
                    .addClass("op3-list-menu-title")
                    .text(data.name)
                    .appendTo(result);
                _build(data, result);
            }

            return result;
        },

        /**
         * Menu as NodeList (null on fail)
         *
         * IMPORTANT: if you're changing render
         * template here, make sure you do the
         * same in backend afterRender method
         * (src/Editor/Elements/TreeMenu.php)
         *
         * @param  {String} menu
         * @return {Mixed}
         */
        renderTree: function(menu) {
            var data = null;
            for (var i = 0; i < that._data.length; i++) {
                if (that._data[i].ID === menu || that._data[i].term_id === menu || that._data[i].name === menu || that._data[i].slug === menu) {
                    data = that._data[i];
                    break;
                }
            }

            var _build = function(item, parent, source, level) {
                if (!item || !item.children || ! item.children.length)
                    return;

                item.children.forEach(function(child) {
                    var element = OP3.$('<treemenuitem spec="treemenuitemlvl' + Math.min(level, 2) + '" />').appendTo(parent);
                    element.setOption("menuItemId", child.ID || 0, "all");
                    element.setOption("label", child.name || child.title || "", "all");
                    element.setOption("href", child.url || "#", "all");
                    element.setOption("target", child.target || "_self", "all");
                    //element.setOption("class", (child.classes || []).join(" "), "all");

                    if (source)
                        source.push(element.node());

                    // recursive
                    _build(child, element.node(), null, level + 1);
                });
            }

            var result = [];
            _build(data, null, result, 1);

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

            OP3.transmit("loadelementmenus");
        },

    }

    // globalize (designer)
    window.OP3.Menus = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Menus = that;
    });

    // import menus from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.menus });
    });

})(jQuery, window, document);
