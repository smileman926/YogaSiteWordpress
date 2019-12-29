/**
 * OptimizePress3
 *
 * Handles the padding drag functionality on elements.
 * In general, when including this to an element,
 * it should be tied to its padding property.
 *
 * For example, to manipulate paddingTop and bottom,
 * id prefix of 'padding' is used, and drag handles
 * change the paddingTop/paddingBottom properties
 */
;(function($, window, document) {

    "use strict";

    /**
     * When padding is changed in the plugin,
     * sync it with the appropriate OP3
     * padding property
     *
     * @param {Object} e
     * @param {Object} data
     */
    var _handlePaddingDragChange = function(e, data) {
        var $element = $(e.target).closest(".op3-element");
        var element = OP3.$($element.get(0)).element();
        var prop = element.findProperty("paddingDrag");

        if (!prop)
            return;
        var options = prop._options;

        // Capitalize the property position...
        var position = data.position.charAt(0).toUpperCase() + data.position.slice(1);

        // Set op3 property value
        element
            .setOption((options.idPrefix || "padding") + position, data.padding);

        // Stop propagation to ensure we don't
        // trigger events on child elements
        e.stopPropagation();
    }

    /**
     * Handle plugin drag start
     *
     * Ensures we disable pointer events, user select,
     * and hide #toolbar when dragging is happening
     *
     * @param {Object} e
     */
    var _handlePaddingDragStart = function(e) {
        OP3.LiveEditor.$ui.body
            .addClass("jquery-paddingdrag-dragging");

        // Stop propagation to ensure we don't
        // trigger events on child elements
        e.stopPropagation();
    }

    /**
     * Handle plugn drag end
     *
     * Ensures we reenable pointer events, user select
     * and show the #toolbar again.
     *
     * @param {Object} e
     */
    var _handlePaddingDragEnd = function(e) {
        OP3.LiveEditor.$ui.body
            .removeClass("jquery-paddingdrag-dragging");

        // We want to remove the inline styles once the dragging is done,
        // to ensure op3 properties are not overriden by inline style
        $(e.target).removeAttr("style");

        // Stop propagation to ensure we don't
        // trigger events on child elements
        e.stopPropagation();
    }

    /**
     * Handle destroy of the widget
     *
     * @param {Object} e
     */
    var _handlePaddingDragDestroy = function(e) {
        $(e.target)
            .off(".jquerypaddingdrag");

        // Stop propagation to ensure we don't
        // trigger events on child elements
        e.stopPropagation();
    }

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var $element = $(o.node);
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("paddingDrag");
        if (!prop)
            return;

        var options = prop._options;
        var $target = prop._selector ? $element.find(prop._selector) : $element;

        // Only initialize the listener once for each element
        // but reposition after each focus
        if ($target.data("jquery-paddingdrag")) {
            $target.paddingdrag("reposition");
            return;
        }

        $target
            .paddingdrag(options)
            .on("jquerypaddingdragchange.jquerypaddingdrag", _handlePaddingDragChange)
            .on("jquerypaddingdragstart.jquerypaddingdrag", _handlePaddingDragStart)
            .on("jquerypaddingdragend.jquerypaddingdrag", _handlePaddingDragEnd)
            .on("jquerypaddingdragdestroy.jquerypaddingdrag", _handlePaddingDragDestroy);
    }

    // Sync with paddingTop / paddingBottom properties
    OP3.bind("elementchange::*::paddingTop elementchange::*::paddingBottom", function(e, o) {
        var $element = $(o.node);
        var element = OP3.$(o.node).element();
        var prop = element.findProperty("paddingDrag");
        if (!prop)
            return;

        var $target = prop._selector ? $element.find(prop._selector) : $element;
        if ($target.data("jquery-paddingdrag"))
            $target.paddingdrag("reposition");
    });

    // Recalculate paddingdrag handles value after device change
    OP3.bind("devicechange", function() {
        if (!OP3 || !OP3.Designer) return;

        var element = OP3.Designer.activeElement();
        if (!element)
            return;

        var prop = element.findProperty('paddingDrag');
        if (!prop)
            return;

        var $element = $(element.node());
        var $target = prop._selector ? $element.find(prop._selector) : $element;
        if ($target.paddingdrag)
            $target.paddingdrag("reposition");
    });

    OP3.bind("elementfocus", _render);

})(jQuery, window, document);
