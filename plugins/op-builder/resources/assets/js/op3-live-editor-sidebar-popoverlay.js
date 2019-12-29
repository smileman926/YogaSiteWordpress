/**
 * OptimizePress3 live editor extension:
 * handling pop overlay
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    // Texts used for the interface
    var strings = {
        edit: "Edit ",
        delete: "Delete",
        deletePopOverlay: "Delete Pop Overlay",
        settings: "Popup Settings",
        close: "Close Popup Editor",
        name: "Overlay ",
        confirmDelete: "Are you sure you want to delete",
    }

    // PopOverlay list
    var popoverlays = [];

    /**
     * Header menu item template
     *
     * @type {String}
     */
    that._template_header_popoverlay_menu_item = ''
        + '<li class="popoverlay-menu-item">'
            + '<button data-target="{target}">' + strings.edit + '{text}</button>'
        + '</li>'

    /**
     * Adds a new item to the Pop Overlay
     * menu in live editor header
     *
     * @param {Object} data
     * @return {Void}
     */
    that._add_header_popoverlay_menu_item = function(data) {
        var $nav = that.$ui.headerNav.find(".popoverlay-menu li");
        var $add = $nav.filter(":last-child");
        var $edit = $nav.not(":last-child");
        var html = OP3.$.templating(that._template_header_popoverlay_menu_item, data);

        if (data.index === 0)
            $nav.parent().prepend(html);
        else if (typeof data.index === "number" && data.index > 0 && data.index < $edit.length)
            $edit.eq(data.index).before(html);
        else
            $add.before(html);
    }

    /**
     * Removes a menu item from Pop Overlay
     * dropdown list in header
     *
     * @param {String} uuid
     * @return {Void}
     */
    that._remove_header_popoverlay_menu_item = function (uuid) {
        that.$ui.headerNav
            .find('.popoverlay-menu [data-target="' + uuid + '"]')
            .closest(".popoverlay-menu-item")
            .remove();
    }

    /**
     * Returns the list of all pop overlays
     *
     * @return {Object}
     */
    that._get_popoverlays = function() {
        return popoverlays;
    }

    /**
     * When popoverlay name changes,
     * update it in popoverlay list
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_name_change = function(e, o) {
        // Update new name
        popoverlays.filter(function(popoverlay) {
            if (popoverlay.name === o.value.before)
                popoverlay.name = o.value.after;
        });

        that.$ui.headerNav
            .find('[data-target="' + o.uuid + '"]')
            // .attr("data-name", o.value.after)
            .text(strings.edit + o.value.after);
    }

    /**
     * When pop overlay animation changes, we want
     * to show it to the user
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_animation_change = function(e, o) {
        var $el = $(o.node);
        var animation = o.value.after;

        $el
            .removeClass("op3-popoverlay-effect-" + o.value.before)
            .addClass("op3-popoverlay-effect-" + animation)
            .removeClass("op3-popoverlay-show")
            .addClass("op3-popoverlay-hide");

        $el.find(".op3-popoverlay-content").one("transitionend animationend", function () {
            setTimeout(function () {
                $el
                    .removeClass("op3-popoverlay-hide")
                    .addClass("op3-popoverlay-show");
            }, 200);
        });
    }

    /**
     * Creates a new popoverlay and prepends it
     * to the #op3-designer-element after all
     * other existing popoverlay elements
     *
     * @param {Object} e
     * @return {Void}
     */
    that._add_popoverlay = function(e) {
        var target = OP3.$("<_popoverlay_template />");
        var position = OP3.Designer.$ui.parent
            .find('> [data-op3-children] [data-op3-element-type="popoverlay"]')
            .last();

        // Either prepend it to #op3-designer-element
        // or add it after the last
        // existing popoverlay
        if (!position.length)
            target.prependTo(OP3.Designer.$ui.parent);
        else
            target.insertAfter(position);

        that._edit_popoverlay(target.uuid());

        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * Close the currently open Pop Overlay
     *
     * @return {Void}
     */
    that._close_popoverlay = function() {
        if (!OP3.Designer.$ui.activePopOverlay)
            return;

        OP3.Designer.$ui.activePopOverlay.removeAttr("data-op3-popoverlay-active");
        OP3.Designer.$ui.parent.removeClass("op3-popoverlay-active");
        OP3.Designer.$ui.activePopOverlay = null;
        OP3.Designer.unfocus();
        OP3.LiveEditor.sidebarHide();
    }

    /**
     * Open/Show a Pop Overlay
     * and focus it
     *
     * @param {String} uuid
     * @return {Void}
     */
    that._edit_popoverlay = function(uuid) {
        var el = OP3.$("#" + uuid);
        var $el = el.jq();

        // Close any opened popoverlays
        that._close_popoverlay();

        // Set the the popoverlay as active
        OP3.Designer.$ui.activePopOverlay = $el;
        $el.attr("data-op3-popoverlay-active", "");
        OP3.Designer.$ui.parent.addClass("op3-popoverlay-active");
        el.focus();

        // Open the sidebar for now
        OP3.LiveEditor.sidebarShow();
        OP3.LiveEditor.sidebarTabOpen("style");
    }

    /**
     * Adds pop overlay controls toolbar
     * to the popoverlay element
     *
     * @param {String} uuid
     */
    that._add_popoverlay_controls = function(uuid) {
        var html = ''
            + '<div class="op3-popoverlay-controls">'
                + '<button class="op3-popoverlay-controls-btn" data-action="focus-element">'
                + '<span class="op3-icon op3-icon-preferences-2"></span> '
                    + strings.settings
                + '</button>'
                + '<button class="op3-popoverlay-controls-btn" data-action="close-popoverlay">'
                    + '<span class="op3-icon op3-icon-circle-remove-2"></span> '
                    + strings.close
                + '</button>'
            + '</div>'

        OP3.Designer.$ui.parent
            .find("#op3-element-" + uuid + " .op3-popoverlay-content")
            .append(html);
    }

    /**
     * Handle click on edit pop overlay
     * in header dropdown menu
     *
     * @param {Object} e
     * @return {Void}
     */
    that._handle_edit_popoverlay = function(e) {
        that._edit_popoverlay($(this).attr("data-target"));
        return false;
    }

    /**
     * Handle click on edit pop overlay
     * in header dropdown menu
     *
     * @param {Object} e
     * @return {Void}
     */
    that._handle_close_popoverlay = function(e) {
        that._close_popoverlay();
        return false;
    }

    /**
     * Handle popoverlay element focus
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_focus = function () {
        OP3.LiveEditor.sidebarShow();

        if (!OP3.Designer.$ui.activePopOverlay)
            return;

        OP3.Designer.$ui.activePopOverlay
            .find('.op3-popoverlay-controls-btn[data-action="focus-element"]')
            .addClass("active");

        // When unfocus happens, and sidebar is visible,
        // we mark elements as selected
        if (OP3.LiveEditor.$ui.body.hasClass("sidebar"))
            OP3.LiveEditor.$ui.headerTabs
                .find(".popoverlay")
                .addClass("selected");
    }

    /**
     * Handle popoverlay element unfocus
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_unfocus = function () {
        if (!OP3.Designer.$ui.activePopOverlay)
            return;

        OP3.Designer.$ui.activePopOverlay
            .find('.op3-popoverlay-controls-btn[data-action="focus-element"]')
            .removeClass("active");
    }

    /**
     * Handle popoverlay element append
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_append = function(e, o) {
        var element = OP3.$(o.node);
        var animation = element.getOption("animation", "all");

        element.jq()
            .removeClass("op3-popoverlay-hide")
            .removeClass("op3-popoverlay-show")
            .addClass("op3-popoverlay-effect-" + animation)
            .addClass("op3-popoverlay-show");

        var uuid = element.uuid();
        var index = OP3.$("popoverlay").jq().index(o.node);
        that._add_header_popoverlay_menu_item({
            target: uuid,
            index: index,
            text: element.getOption("text", "all"),
        });
    }

    /**
     * Handle popoverlay element append first
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_appendfirst = function(e, o) {
        var element = OP3.$(o.node);

        // Set popoverlay name prefix
        // (video overlay or just overlay)
        var name = strings.name;
        if (element.spec() === "videopopoverlay")
            name = "Video Overlay ";

        // Set the popoverlay name to "Overlay X"
        // where X is the number of pop overlays
        name = name + (popoverlays.length + 1);
        while (popoverlays.some(function(item) { return item.name === name; }))
            name += ".1";
        element.setOption("text", name, "all");

        popoverlays.push({
            uuid: o.uuid,
            name: name,
        })

        that._add_popoverlay_controls(o.uuid);
    }

    /**
     * Handle popoverlay element detach
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    that._handle_popoverlay_detach = function(e, o) {
        popoverlays = popoverlays.filter(function(popoverlay) {
            return popoverlay.uuid !== o.uuid;
        });

        that._close_popoverlay(o.uuid);
        that._remove_header_popoverlay_menu_item(o.uuid);
    }

    // create on op3ready
    OP3.bind("ready", function(e) {
        // Event listener for create new popoverlay
        that.$ui.headerNav.on("click", ".popoverlay-create-new", that._add_popoverlay);
        that.$ui.headerNav.on("click", "button[data-target]", that._handle_edit_popoverlay);
        OP3.Designer.$ui.parent.on("click", '.op3-popoverlay-controls-btn[data-action="close-popoverlay"],.op3-popoverlay-close', that._handle_close_popoverlay);

        // Add menu items and pop overlay controls for every
        // existing pop overlay
        OP3.Designer.$ui.parent
            .find('[data-op3-element-type="popoverlay"]')
            .each(function() {
                var $this = $(this);
                var uuid = $this.attr("data-op3-uuid");
                $this.removeAttr("op3-popoverlay-active");
                that._add_popoverlay_controls(uuid);
                var data = {
                    target: uuid,
                    index: -1,
                    text: $this.find(".op3-popoverlay-content").attr("data-op3-text"),
                };
                that._add_header_popoverlay_menu_item(data);
            });

         // We 're handling dropdown functionality with javascript,
         // because hover state in the browser is retained even
         // when the element is moved, so when switching from
         // full-size navbar to nav-breadcrumbs navbar
         // dropdown menu is not hidden properly if
         // css-only solution is used
        that.$ui.headerNav
            .on("mouseover", ".popoverlay", function() {
                $(this).addClass("hover");
            })
            .on("mouseout", ".popoverlay", function() {
                $(this).removeClass("hover");
            })
            .on("click", ".popoverlay-menu button", function () {
                that.$ui.headerNav.find(".popoverlay").removeClass("hover");
            });
    });

    OP3.bind("elementchange::popoverlay::text", that._handle_popoverlay_name_change);
    OP3.bind("elementchange::popoverlay::animation", that._handle_popoverlay_animation_change);
    OP3.bind("elementappendfirst::popoverlay", that._handle_popoverlay_appendfirst);
    OP3.bind("elementappend::popoverlay", that._handle_popoverlay_append)
    OP3.bind("elementdetach::popoverlay", that._handle_popoverlay_detach)
    OP3.bind("elementfocus::popoverlay", that._handle_popoverlay_focus);
    OP3.bind("elementunfocus::popoverlay", that._handle_popoverlay_unfocus);

    // When editor is loaded
    // get all created popoverlays and
    // add it to popoverlay list
    OP3.bind("load::designer", function(e, o) {
        popoverlays = OP3.$("popoverlay")
            .toArray()
            .map(function(item) {
                var element = OP3.$(item);
                var map = {};
                map.uuid = element.uuid();
                map.name = element.getOption("text");

                return map;
            })
    });

})(jQuery, window, document);
