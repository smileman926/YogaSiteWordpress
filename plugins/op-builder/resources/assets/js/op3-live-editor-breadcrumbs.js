/**
 * OptimizePress3 live editor extension:
 * adding breadcrumbs (op3 elements path).
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

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
        that.$ui.breadcrumbs = $(".op3-breadcrumbs");
    }

    /**
     * Bind tabs event handler
     *
     * @return {Void}
     */
    var _bind = function() {
        that.$ui.breadcrumbs.on("click", "a", _handle_click);
        OP3.bind("elementfocus", _handle_elementfocus);
        OP3.bind("elementunfocus", _handle_elementunfocus);
    }

    /**
     * Breadcrumbs link click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handle_click = function(e) {
        var href = $(this).attr("href");

        if (href)
            OP3.$(href).focus();
        else
            OP3.Designer.unfocus();

        e.preventDefault();
    }

    /**
     * Focus event handler:
     * render breadcrumbs
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handle_elementfocus = function(e, o) {
        var el = OP3.$(o.node);
        var ul = $("<ul />");
        var title;

        while (el.length) {
            var li = $("<li />")
                .attr("class", el.type())
                .prependTo(ul);

            // First item in the list is
            // current active element
            if (!title)
                title = el.title();

            $("<a />")
                .attr("href", "#" + el.uuid())
                .text(el.title())
                .appendTo(li);

            el = el.parent();
        }

        // Back / Exit button is commented out for the time being
        // var exitButton = $("<div />")
        //     .addClass("breadcrumbs-back");

        // $("<a />")
        //     .attr("data-unfocus", "true")
        //     .html('<span class="op3-icon op3-icon-small-left"></span>')
        //     .appendTo(exitButton);

        // Unselect all header tabs
        that.$ui.headerTabs
            .find(".selected")
            .removeClass("selected");

        that.$ui.breadcrumbs
            .empty()
            // .append(exitButton)
            .append(ul);

        var $heading = $("#tab-heading-element");
        $heading.find(".tab-heading-title").text(title);

        // Element focus hides the sidebar


        //that.$ui.headerTabs.addClass("op3-tabs-default-cursor");
        //setTimeout(function () {
        //    that.$ui.headerTabs
        //        .removeClass("op3-tabs-default-cursor")
        //        .addClass("op3-tabs-narrow");
        //});

        that.$ui.headerTabs
            .removeClass("op3-tabs-default-cursor")
            .addClass("op3-tabs-narrow");
    }

    /**
     * Unfocus event handler:
     * clear breadcrumbs
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handle_elementunfocus = function(e, o) {
        that.$ui.breadcrumbs.empty();
        //setTimeout(function() {
        //    that.$ui.headerTabs.removeClass("op3-tabs-narrow");
        //});

        that.$ui.headerTabs
            .removeClass("op3-tabs-narrow");
    }

    // autoinit
    $(function() {
        _init();
    });

})(jQuery, window, document);
