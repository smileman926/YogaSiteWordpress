/**
 * OptimizePress3 designer extension:
 * adding onclick focus/unfocus functionality to designer.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.Designer
    var that = window.OP3.Designer;

    /**
     * Get op3 active element. If no
     * element is focused result is
     * OP3.Document
     *
     * @return {Object}
     */
    that.activeElement = function() {
        if (!that.$ui.focused.length)
            return OP3.Document;

        return OP3.$(that.$ui.focused).element();
    }

    /**
     * OP3 element focus event handler:
     * save focused element to $ui
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleElementFocusFocus = function(e, o) {
        that.$ui.focused = $(o.node);

        // start worker if there are jobs ready
        setTimeout(function() {
            if (OP3.Worker._jobList.length)
                OP3.Worker.start();
        });
    }

    /**
     * OP3 element focus event handler:
     * save focused element to $ui
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleElementFocusUnfocus = function(e, o) {
        that.$ui.focused = $(null);

        // cancel worker
        OP3.Worker.stop();
        OP3.Worker.clear();
    }

    /**
     * OP3 element mousedown event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleElementFocusMousedownFocus = function(e) {
        var element = OP3.$.closest(e.target);
        var bubbling = !element.is(this);

        if (!bubbling)
            that.focus(this);
    }

    /**
     * Non OP3 element mousedown event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleElementFocusMousedownUnfocus = function(e) {
        var element = OP3.$.closest(e.target);
        var cancel = element.is(that.$ui.focused);

        if (!cancel)
            that.unfocus();
    }

    /**
     * Document click event handler:
     * making sure that that we prevent default
     * on any link click
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleElementFocusClickPreventDefault = function(e) {
        e.preventDefault();
    }

    /**
     * OP3 element remove event handler
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleElementFocusRemoving = function(e,o) {
        var focused = OP3.$(o.node).filter(":focused");
        if (!focused.length)
            focused = OP3.$(o.node).find(":focused");
        if (!focused.length)
            return;

        focused.unfocus();

        if (o.parent)
            setTimeout(function() {
                OP3.$(o.parent).focus();
            });
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
        that.$ui.focused = $(null);
    }

    /**
     * Bind events
     *
     * @return {Void}
     */
    var _bind = function() {
        /*
        $("html")
            .on("click", that._handle_element_focus_click_unfocus);

        $(that.$ui.babysitter)
            .on("click", '.op3-element', that._handle_element_focus_click_focus);
        */

        $("html")
            .on("mousedown", function(e) {
                var target = $(e.target);
                var element = target.closest(".op3-element");
                var bubbling = element.is(that.$ui.focused);

                if (!bubbling)
                    that.unfocus();
            });
        $(that.$ui.babysitter)
            .on("mousedown", ".op3-element", function(e) {
                var target = $(e.target);
                var element = target.closest(".op3-element");
                var bubbling = !element.is(this);

                if (!bubbling)
                    that.focus(this);
            });

        $("html")
            .on("mousedown", that._handleElementFocusMousedownUnfocus)
            .on("click", that._handleElementFocusClickPreventDefault);
        $(that.$ui.babysitter)
            .on("mousedown", that._handleElementFocusMousedownFocus);

        OP3.bind("elementfocus", that._handleElementFocusFocus);
        OP3.bind("elementunfocus", that._handleElementFocusUnfocus);
        OP3.bind("elementremoving", that._handleElementFocusRemoving);
    }

    // autoinit
    $(function() {
        _init();
    });

})(jQuery, window, document);
