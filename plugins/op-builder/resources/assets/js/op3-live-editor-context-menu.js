/**
 * OptimizePress3 live-editor extension:
 * hijack designer context menu and render
 * it on live-editor.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.ContextMenu object
     *
     * @type {Object}
     */
    var that = {

        /**
         * UI elements
         *
         * @type {Object}
         */
        $ui: {},

        /**
         * Form template
         * (this must be function because we do not have
         * translations yet)
         *
         * @type {String}
         */
        _template: function() {
            return ''
                +   '<nav id="op3-context-menu" data-op3-user-role="' + OP3.Meta.userRole + '">'
                +       '<ul class="op3-context-menu-list">'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;bulletblock&quot;,&quot;bulletlist&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Bullet List") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;featureblock&quot;,&quot;featureblockitem&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Feature Block Item") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;socialicons&quot;,&quot;icon&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Icon Element") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;numberblock&quot;,&quot;numberblockitem&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Number Block Item") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;testimonial&quot;,&quot;testimonialitem&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Testimonial Item") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;faql&quot;,&quot;faqitem&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Faq Item") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="addElement" data-op3-args="[&quot;contenttogglel&quot;,&quot;contenttoggleitem&quot;]">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-circle-add-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Add Content Toggle Item") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="clone">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-ungroup-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Clone Element") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-separator" data-op3-separator="clone/clipboard">-</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="cut">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-scissors-2"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Cut") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="copy">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-copy-2-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Copy") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="paste">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-todo-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Paste") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-separator" data-op3-separator="clipboard/export">-</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="exportTemplate">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-share-66-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Export Template") + '</span>'
                //+                   '<span class="op3-context-menu-list-item-shortcut op3-context-menu-list-item-tier">PRO</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="exportSection">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-share-66-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Export Section") + '</span>'
                //+                   '<span class="op3-context-menu-list-item-shortcut op3-context-menu-list-item-tier">PRO</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-separator" data-op3-separator="export/global">-</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="markAsGlobalElement">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-globe-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Mark Element as Global") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="globalElementWizard">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-globe-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Global Element Wizard") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="unlockGlobalElement">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-lock-circle-open-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Unlock Global Element") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="unlinkGlobalElement">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-link-broken-70-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Unlink Global Element") + '</span>'
                +               '</a>'
                +           '</li>'
                +           '<li class="op3-context-menu-list-separator" data-op3-separator="global/delete">-</li>'
                +           '<li class="op3-context-menu-list-item" data-op3-action="delete">'
                +               '<a class="op3-context-menu-list-item-action" href="#">'
                +                   '<i class="op3-context-menu-list-item-icon op3-icon op3-icon-trash-simple-1"></i>'
                +                   '<span class="op3-context-menu-list-item-title">' + OP3._("Delete") + '</span>'
                +               '</a>'
                +           '</li>'
                +       '</ul>'
                +   '</nav>'
        },

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            if (that.$ui.parent)
                return;

            that.$ui.parent = $(that._template())
                .attr("data-op3-element-type", "")
                .attr("data-op3-element-uuid", "")
                .attr("data-op3-element-gid", "")
                .attr("data-op3-element-style", "")
                .attr("data-op3-element-spec", "")
                .attr("data-op3-element-path", "")
                .attr("data-op3-element-children-count", "")
                .attr("data-op3-element-row-children-count", "")
                .attr("data-op3-element-allow-cut", "")
                .attr("data-op3-element-allow-copy", "")
                .attr("data-op3-element-allow-paste", "")
                .on("contextmenu", that._handlePreventDefault)
                .on("click", ".op3-context-menu-list-item-action", that._handleActionClick)
                .appendTo(OP3.LiveEditor.$ui.body);
            that.$ui.action = that.$ui.parent
                .find("[data-op3-action]");

            var doc = OP3.Designer.$ui.html.get(0).ownerDocument,
                win = doc.defaultView;
            $(win)
                .on("resize", that._handleHide);
            $(doc)
                .on("scroll", that._handleHide)
                .on("contextmenu", that._handleDesignerContextmenu);

            OP3.LiveEditor.$ui.html
                .on("mousedown", that._handleLiveEditorMouseDown);

            OP3.bind("elementgid elementappend elementdetach elementremove elementfocus elementunfocus devicechange togglingsidebar", that._handleHide);

        },

        /**
         * Find the best position for context menu
         * according to x,y coordinates and show it.
         * If x,y arguments are omitted the position
         * will be calculated according to focused
         * element.
         *
         * @param  {Number} x
         * @param  {Number} y
         * @return {Void}
         */
        show: function(x, y) {
            if (OP3.LiveEditor.$ui.html.hasClass("op3-context-menu-active"))
                return;

            that.$ui.parent
                .css({
                    left: x,
                    top: y,
                });

            OP3.LiveEditor.$ui.html
                .addClass("op3-context-menu-active");
            OP3.Designer.$ui.html
                .addClass("op3-context-menu-active");
        },

        /**
         * Hide context menu
         *
         * @return {Void}
         */
        hide: function() {
            OP3.Designer.$ui.html
                .removeClass("op3-context-menu-active");
            OP3.LiveEditor.$ui.html
                .removeClass("op3-context-menu-active");
        },

        /**
         * Create new child type element and append it
         * to it's parent (relative to focused element)
         *
         * @param  {String} parent
         * @param  {String} child
         * @return {Void}
         */
        _actionAddElement: function(parent, child) {
            var element = OP3.Designer.activeElement(),
                rel = OP3.$(element),
                clone;
            if (rel.type() !== child)
                rel = OP3.$(element).closest(parent).children(child).last();

            // create new child-like element
            try {
                clone = OP3.$("<_" + child + "_template />");
            }
            catch (e) {
                clone = OP3.$("<" + child + " />");
            }

            // append it to dom
            clone.insertAfter(rel);
        },

        /**
         * Event handler which prevents default
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handlePreventDefault: function(e) {
            e.preventDefault();
        },

        /**
         * Event handler which hides context menu
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleHide: function(e) {
            that.hide();
        },

        /**
         * Designer document contextmenu event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDesignerContextmenu: function(e) {
            e.preventDefault();

            that.hide();

            // active element and it's config
            var element = OP3.Designer.activeElement(),
                config = element.config(),
                allowCut = config.allowCutElement ? "1" : "0",
                allowCopy = config.allowCopyElement ? "1" : "0",
                allowPaste = OP3.LocalStorage && OP3.LocalStorage.get("clipboard") ? "1" : "0";

            // set data attributes and set visibility (can
            // not calculate positions while display is none)
            that.$ui.parent
                .attr("data-op3-element-type", element.type())
                .attr("data-op3-element-uuid", element.uuid())
                .attr("data-op3-element-gid", element.gid())
                .attr("data-op3-element-style", element.style())
                .attr("data-op3-element-spec", element.spec())
                .attr("data-op3-element-path", element.path())
                .attr("data-op3-element-children-count", element.children().length)
                .attr("data-op3-element-row-children-count", OP3.$(element).closestHorizontal().children().length)
                .attr("data-op3-element-allow-cut", allowCut)
                .attr("data-op3-element-allow-copy", allowCopy)
                .attr("data-op3-element-allow-paste", allowPaste)
                .css({
                    visibility: "hidden",
                    display: "block",
                });

            // replace 'clone element' item title with
            // 'clone {type}'
            that.$ui.parent
                .find('[data-op3-action="clone"] .op3-context-menu-list-item-title')
                .text(OP3._("Clone") + " " + (config.title || OP3._("Element")));

            // get coordinates by mouseevent position
            var viewport = [ $(window).width(), $(window).height() ],
                width = that.$ui.parent.outerWidth(),
                height = that.$ui.parent.outerHeight(),
                offset = OP3.LiveEditor.$ui.frame.offset(),
                left = e.clientX + offset.left,
                top = e.clientY + offset.top;

            // do we have scrollbar
            var hasScroll = OP3.LiveEditor.$ui.frameWrapper.css("overflow-y") === "scroll";
            if (!hasScroll) {
                // frameWrapper element has no overflow-y, maybe
                // the scrollbar is inside frame's html element
                var scrollElement = OP3.Designer.$ui.html.get(0).ownerDocument.scrollingElement;
                hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
            }
            if (hasScroll)
                viewport[0] -= parseInt(window.scrollbarSize) || 17;

            // not actual mouseevent (context menu executed with
            // keyboard?), get coordinates by element position
            if (e.button !== 2) {
                var rect = element.node().getBoundingClientRect();
                left = rect.left + offset.left;
                top = rect.top + offset.top;
            }

            // fix position
            if (left + width > viewport[0])
                left = viewport[0] - width;
            if (top + height > viewport[1])
                top -= height;
            if (top < 0)
                top = 0;
            if (top + height > viewport[1])
                top = viewport[1] - height;

            // reset visibility
            that.$ui.parent
                .css({
                    visibility: "",
                    display: "",
                });

            // ...and display at x,y
            that.show(left, top);
        },

        /**
         * LiveEditor mousedown event handler
         *
         * No need to add same event on designer, be cause
         * designer mousedown is already triggered to
         * LiveEditor (see op3-live-editor-mousedown.js)
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleLiveEditorMouseDown: function(e) {
            if ($(e.target).closest(that.$ui.parent).length)
                return;

            that.hide();
        },

        /**
         * Context menu action list item click event
         * handler.
         *
         * This is proxy handler: it will search for
         * _handleAction_{action} method in ContextMenu
         * object and execute it (if defined).
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleActionClick: function(e) {
            var action = $(e.currentTarget).closest("[data-op3-action]").attr("data-op3-action");
            if (!action)
                return;

            var method = action
                .replace(/[\W_]+/g, "-")
                .replace(/\-(\w)/g, function(a, b) {
                    return b.toUpperCase();
                });

            method = "_handleAction_" + method;
            if (typeof that[method] === "function") {
                that.hide();
                that[method].call(this, e);
            }

            e.preventDefault();
        },

        /**
         * Action clone event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_clone: function(e) {
            var element = OP3.Designer.activeElement();
            OP3.$(element)
                .unfocus()
                .clone()
                    .insertAfter(element.node())
                    .focus();
        },

        /**
         * Action add element event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_addElement: function(e) {
            var args = [];
            try {
                args = JSON.parse($(e.currentTarget).closest("[data-op3-args]").attr("data-op3-args"));
            }
            catch(e) {
                // pass
            }

            that._actionAddElement.apply(this, args);
        },

        /**
         * Action cut event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_cut: function(e) {
            var element = OP3.Designer.activeElement();
            element.cut();
        },

        /**
         * Action copy event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_copy: function(e) {
            var element = OP3.Designer.activeElement();
            element.copy();
        },

        /**
         * Action paste event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_paste: function(e) {
            var element = OP3.Designer.activeElement();
            var clone = element.paste();
            if (clone)
                clone.focus();
        },

        /**
         * Action delete event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_delete: function(e) {
            var element = OP3.Designer.activeElement();
            element.detach();
        },

        /**
         * Action exportTemplate event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_exportTemplate: function(e) {
            OP3.Export.openWizard();
        },

        /**
         * Action exportSection event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_exportSection: function(e) {
            OP3.Export.openWizard();
        },

        /**
         * Action globalElementWizard event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_globalElementWizard: function(e) {
            OP3.GlobalElements.openWizard();
        },

        /**
         * Action markAsGlobalElement event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_markAsGlobalElement: function(e) {
            OP3.GlobalElements.openWizard();
        },

        /**
         * Action unlockGlobalElement event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_unlockGlobalElement: function(e) {
            OP3.GlobalElements.editMode(true);
        },

        /**
         * Action unlinkGlobalElement event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleAction_unlinkGlobalElement: function(e) {
            var element = OP3.Designer.activeElement();
            element.gid("");
        },

    }

    // globalize
    window.OP3.ContextMenu = that;

    // autoinit
    OP3.bind("ready", function(e,o) {
        that._init();
    });

})(jQuery, window, document);
