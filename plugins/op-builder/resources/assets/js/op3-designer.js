/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-ajax.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Designer object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Document node
         *
         * @type {Object}
         */
        ownerDocument: document,

        /**
         * UI elements
         *
         * @type {Object}
         */
        $ui: {},

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            OP3.layer = "designer";

            that._ui();
            that._bind();

            OP3.transmit("domcontentloaded");
            OP3.transmit("domcontentloaded::designer");

            // window already loaded???
            if (OP3.status.load)
                that._handle_window_load();
        },

        /**
         * Init UI elements
         *
         * @return {Void}
         */
        _ui: function() {
            that.$ui.html       = $("html");
            that.$ui.body       = $("body");
            that.$ui.parent     = $("#op3-designer-element");
            that.$ui.babysitter = that.$ui.parent.children("[data-op3-children]");
            that.$ui.stylesheet = $(".op3-designer-stylesheet");

            that.$ui.html.attr("data-op3-layer", OP3.layer);
        },

        /**
         * Bind events
         *
         * @return {Void}
         */
        _bind: function() {
            $(window)
                .on("load", that._handle_window_load)
                .on("beforeunload", that._handle_window_beforeunload);

            OP3.bind("load", that._handle_transmit_load);
        },

        /**
         * Window load event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_window_load: function(e) {
            OP3.transmit("load");
            OP3.transmit("load::designer");
        },

        /**
         * Window beforeunload event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_window_beforeunload: function(e) {
            if (!that.changed())
                return;

            return "Your document has not been saved. Are you sure you want to close it?";
        },

        /**
         * Transmitted load event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_transmit_load: function(e) {
            window.OP3.LiveEditor = (window.parent && window.parent.OP3) ? window.parent.OP3.LiveEditor : null;
        },

        /**
         * Document has changes
         *
         * @return {Boolean}
         */
        changed: function() {
            return false;
        },

        /**
         * Set focus on element
         *
         * @param  {Mixed} node DOM node, jQuery element or string selector
         * @return {Void}
         */
        focus: function(node) {
            OP3.$(node).focus();

            // Make sure sidebar is closed, but not
            // on popoverlay at the moment
            if (!$(node).is("[data-op3-popoverlay-active]"))
                OP3.LiveEditor.sidebarHide();
        },

        /**
         * Remove focus from elements
         *
         * @return {Void}
         */
        unfocus: function() {
            OP3.$($(".op3-focus")).each(function() {
                OP3.$(this).element().unfocus();
            });

            // When unfocus happens, and sidebar is visible,
            // we mark elements as selected, but only
            // if a tab isn't already selected
            var $selectedTab = OP3.LiveEditor.$ui
                .headerTabs
                .find(".tab-button.selected");

            if (OP3.LiveEditor.$ui.body.hasClass("sidebar") && $selectedTab.length === 0)
                OP3.LiveEditor.$ui
                    .headerTabs
                    .find('[data-tab="elements"]')
                    .addClass("selected");
        },

        /**
         * Get focused element
         *
         * @return {Object}
         */
        focused: function() {
            return OP3.$($(".op3-focus")).get(0);
        },

        /**
         * Get element config by type
         *
         * @param  {String} type
         * @param  {String} style (optional)
         * @return {Object}
         */
        config: function(type, style) {
            return OP3.Elements.config(type, style);
        },

        /**
         * Create op3element
         *
         * @param  {String} type
         * @param  {String} style (optional)
         * @return {Object}       op3 query object
         * /
        create: function(type, style) {
            return OP3.Elements.create(type, style);
        },

        /**
         * Serialize op3 document
         *
         * @return {Object}
         */
        serialize: function() {
            return OP3.Elements.serialize();
        },

        /**
         * List of element categories
         *
         * @return {Array}
         */
        categories: function() {
            return OP3.Elements._categories;
        },

        /**
         * List of element types
         *
         * @return {Array}
         */
        types: function() {
            return OP3.Elements._types;
        },

        /**
         * Get default CSS default property
         * for specific element type
         *
         * @param  {String} type
         * @return {String}
         */
        getElementDefaultCssDisplay: function(type) {
            return OP3.Elements.getDefaultCssDisplay(type);
        },

        /**
         * Is history pending
         *
         * @return {Boolean}
         */
        isHistoryPending: function() {
            return false;
        },

    }

    // globalize
    window.OP3.Designer = that;
    window.OP3.LiveEditor = (window.parent && window.parent.OP3) ? window.parent.OP3.LiveEditor : null;

    // autoinit
    $(function() {
        OP3.Designer._init();
    });

})(jQuery, window, document);
