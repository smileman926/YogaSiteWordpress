/**
 * OptimizePress3 live editor extension:
 * adding elements to sidebar and binding
 * events to it.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Show sidebar
     *
     * @return {Void}
     */
    that.sidebarShow = function() {
        if (that.$ui.body.hasClass("sidebar"))
            return;

        var emit = { status: true };
        OP3.transmit("togglingsidebar", emit);

        var transition = !!parseFloat(that.$ui.sidebar.css("transition-duration"));
        var callback = function() { OP3.transmit("togglesidebar", emit); };

        if (transition)
            that.$ui.sidebar.one("transitionend", callback);

        that.$ui.body
            .addClass("sidebar");

        // OP3.LocalStorage.set("sidebar.display", true);
        var $sidebarTab = OP3.LiveEditor.$ui.sidebar
            .find(".sidebar-tabs > .tab-content.selected");
        var tab = $sidebarTab
            .attr("data-tab");
        var $tab = OP3.LiveEditor.$ui.headerNav
            .find('.op3-tabs [data-tab="' + tab + '"]');

        // Unselect all
        OP3.LiveEditor.$ui.headerNav
            .find(".op3-tabs .selected")
            .removeClass("selected");

        // Element tab has categories & options subtabs,
        // and we only want to mark it as selected
        // when categores are showing
        if (tab !== "elements" || $sidebarTab.find(".categories").is(":visible"))
            $tab.addClass("selected");

        // If popoverlay is selected, we
        // want to mark it as active
        else if (OP3.ElementOptions.element.type() === "popoverlay")
            OP3.LiveEditor.$ui.headerNav
                .find(".op3-tabs .tab-button.popoverlay")
                .addClass("selected");

        if (!transition)
            callback();
    }

    /**
     * Hide sidebar
     *
     * @return {Void}
     */
    that.sidebarHide = function() {
        if (!that.$ui.body.hasClass("sidebar"))
            return;

        var emit = { status: false };
        OP3.transmit("togglingsidebar", emit);

        var transition = !!parseFloat(that.$ui.sidebar.css("transition-duration"));
        var callback = function() { OP3.transmit("togglesidebar", emit); };

        if (transition)
            that.$ui.sidebar.one("transitionend", callback);

        $("body")
            .removeClass("sidebar");

        // OP3.LocalStorage.set("sidebar.display", false);
        OP3.LiveEditor.$ui.headerNav
            .find(".op3-tabs .selected")
            .removeClass("selected");

        if (!transition)
            callback();
    }

    /**
     * Toggle (show/hide) sidebar
     *
     * @return {Void}
     */
    that.sidebarToggle = function() {
        if ($("body").hasClass("sidebar")) {
            that.sidebarHide();
        }
        else {
            that.sidebarShow();
        }
    }

    /**
     * Set a sidebar tab as active
     *
     * @param  {String} tab identifier
     * @param  {Boolean} noForce
     * @return {Void}
     */
    that.sidebarTabOpen = function(tab, noForce) {
        var $tab = that.$ui.sidebarTabs
            .find('[data-tab="' + tab + '"]');
        $tab.addClass("selected");
        $tab.siblings()
            .removeClass("selected");

        var $tabs = $tab
            .closest(".op3-tabs");
        $tabs.siblings(".tab-content")
            .removeClass("selected");
        $tabs.siblings('.tab-content[data-tab="' + tab + '"]')
            .addClass("selected");

        // In some cases we don't want to force
        // the style tab to open (for example,
        // for appended elements with design)
        if (tab === "elements" && !noForce)
            OP3.LiveEditor.sidebarTabOpen("style");
    }

    /**
     * Hide visually a sidebar tab. Used,
     * for example, to hide the Design
     * tab when element has no styles
     *
     * @param  {String} tab identifier
     * @return {Void}
     */
    that.sidebarTabHide = function(tab) {

        var $tab = that.$ui.sidebarTabs.find('[data-tab="' + tab + '"]');

        if ($tab.hasClass("hidden"))
            return;

        // if ($tab.hasClass("selected"))
        //     $tab.next("[data-tab]").trigger("click");

        $tab.addClass("hidden");
    }

    /**
     * Show previously hidden sidebar tab
     *
     * @param  {String} tab identifier
     * @return {Void}
     */
    that.sidebarTabShow = function(tab) {
        var $tab = that.$ui.sidebarTabs.find('[data-tab="' + tab + '"]');

        if ($tab.hasClass("hidden"))
            $tab.removeClass("hidden");
    }

    /**
     * Object initialization
     *
     * @return {Void}
     */
    var _init = function() {
        _ui();
        _bind();
    }

    /**
     * Init UI elements
     *
     * @return {Void}
     */
    var _ui = function() {
        that.$ui.sidebar = $("#sidebar");
        that.$ui.headerNav = $("#header .header-nav");
        that.$ui.headerTabs = that.$ui.headerNav.find(".op3-tabs");
        that.$ui.stylePicker = $("#style-picker-content");
        that.$ui.sidebarWrapper = that.$ui.sidebar.find(".wrapper").first();

        // Sidebar tabs navigation is also in haeder
        that.$ui.sidebarTabs = that.$ui.sidebar.add(that.$ui.headerNav);
    }

    /**
     * Handles element append sidebar functionality
     * @param {Object} e
     * @param {Object} o
     */
    var _handle_elementdrop = function(e, o) {
        // Sidebar drop only
        if (typeof o.source !== "string" || o.source.substr(0, 1) !== "<")
            return;

        // Show sidebar on element append for elements that
        // have designs (configured in config.php)
        var config = OP3.Designer.config(o.type);
        if (!config || !config.showStylePickerOnDrop)
            return;

        // Can not just show sidebar be cause elementdrop
        // event triggers too early (before element is
        // focused and sidebar is attached) so we need
        // to 'listen' sidebar form attach event
        // Note: can not use .once() be cause we need to
        // wait for specific form (sidebar) to attach,
        // so we need to .bind() and .unbind()
        OP3.bind("elementoptionsformattach.liveeditorsidebardesigntab", function(e, o) {
            if (!$(o.parent).is(OP3.ElementOptions.form))
                return;

            // Stop 'listening'
            OP3.unbind("elementoptionsformattach.liveeditorsidebardesigntab");

            // Finally do what you need to do
            OP3.LiveEditor.sidebarTabOpen("design", true);
            OP3.LiveEditor.sidebarShow();
        });
    }

    /**
     * Bind tabs event handler
     *
     * @return {Void}
     */
    var _bind = function() {
        OP3.bind("elementdrop", _handle_elementdrop);

        that.$ui.sidebarTabs.find(".op3-tabs").on("click", "[data-tab]", function(e) {
            var $this = $(this);
            var $tabs = $this.closest(".op3-tabs");
            var selector = $tabs.attr("data-tab-content");
            var $menu = $tabs.find("[data-tab]");
            var $content = $tabs.nextAll(".tab-content");

            // Make sure sidebar is scrolled to the top
            that.$ui.sidebarWrapper.scrollTop(0);

            // When element focus is changed
            // force style tab to be open
            if ($(e.target).hasClass("header-btn"))
                OP3.LiveEditor.sidebarTabOpen("style");

            // If current menu is already selected,
            // don't do anything further
            if ($this.hasClass("selected"))
                return false;

            // If tab has data-tab-content attribute set
            // use this value to find the tab content
            if (selector) {
                $content = $("." + selector + " > .tab-content");
            }

            $menu
                .removeClass("selected");

            $this
                .addClass("selected");

            $content
                .removeClass("selected")
                .filter('[data-tab="' + $this.attr("data-tab") + '"]')
                    .addClass("selected");

            // Click on elements tab triggers unfocus
            // to show list of elements instead
            // of element settings
            if ($this.attr("data-unfocus")) {
                OP3.Designer.unfocus();
            }

            // Make sure the sidebar is opened
            that.sidebarShow();

            e.preventDefault();
        });

        OP3.LiveEditor.$ui.sidebar.find(".tab-heading-search-wrapper").on("click", ".tab-heading-search-icon", function(e) {
            var $target = $(e.delegateTarget),
                isOpen = $target
                    .toggleClass("open")
                    .hasClass("open");

            if (isOpen)
                $target.find("input").focus();
        });
    }

    /**
     * Show/hide sidebar (read last state in OP3.LocalStorage)
     *
     * @depricated
     * @return {Void}
     * /
    var _state = function() {
        var fn = OP3.LocalStorage.get("sidebar.display") ? "sidebarShow" : "sidebarHide";
        that[fn]();
    }

    /**
     * Show sidebar
     *
     * @return {Void}
     */
    var _state = function() {
        that.sidebarShow();
    }

    // autoinit
    $(function() {
        _init();
    });

})(jQuery, window, document);
