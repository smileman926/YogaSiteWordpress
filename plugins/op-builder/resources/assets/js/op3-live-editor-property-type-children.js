/**
 * OptimizePress3 element type:
 * property children type
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="children"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            var $list = $("<ul />")
                .attr("class", "op3-element-options-property-children-list")
                .on("click", ".op3-element-options-property-children-list-item", _clickItem)
                .on("click", ".op3-element-options-property-children-list-item-visible", _clickVisible)
                .on("click", ".op3-element-options-property-children-list-item-clone", _clickClone)
                .on("click", ".op3-element-options-property-children-list-item-remove", _clickRemove)
                .insertAfter(this);

            // make list items sortable
            new Sortable($list.get(0), {
                onUpdate: _sort,
            });

            // bind, hide and refresh
            $(this)
                .on("change", _change)
                .css("display", "none");
            _change.call(this);
        });
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var $list = $(this).nextAll(".op3-element-options-property-children-list:first")
            .empty();
        var element = OP3.Designer.activeElement();
        if (!element)
            return;
        var children = element.children();
        var length = children.length;

        children.forEach(function(child, index) {
            var $child = OP3.$(child);

            // Ignore dummy fields
            if ($child.spec() === "dummy")
                return;

            // Ignore button, hidden fields and gdpr checkboxes on the optin form element
            if (element.type() === "form" && ($child.type() === "button" || [ "hidden", "gdpr1", "gdpr2" ].indexOf($child.spec()) !== -1))
                return;

            var $item = $("<li />")
                .attr("class", "op3-element-options-property-children-list-item")
                .attr("data-op3-element-child-uuid", $child.uuid())
                .attr("data-op3-element-child-type", $child.type())
                .attr("data-op3-element-child-style", $child.style())
                .appendTo($list);

            var visibleDisplay = $child.getOption("visible", "all")
            var visibleLock = $child.getOption("visibleLock", "all");

            $("<div />")
                .addClass("op3-element-options-property-children-list-item-desc")
                .html("<p>" + $child.desc() + "</p>")
                .appendTo($item);
            $("<a />")
                .addClass("op3-element-options-property-children-list-item-visible")
                .addClass("op3-element-options-property-children-list-item-visible-display-" + visibleDisplay)
                .addClass("op3-element-options-property-children-list-item-visible-lock-" + visibleLock)
                .attr("href", "#")
                .html(''
                    + '<i class="op3-icon op3-icon-eye-ban-18-1" />'
                    + '<i class="op3-icon op3-icon-eye-17-1" />'
                    + '<i class="op3-icon op3-icon-lock-1" />'
                )
                .appendTo($item);
            $("<a />")
                .addClass("op3-element-options-property-children-list-item-clone")
                .attr("href", "#")
                .html('<i class="op3-icon op3-icon-ungroup-1" />')
                .appendTo($item);
            $("<a />")
                .addClass("op3-element-options-property-children-list-item-remove")
                .attr("href", "#")
                .html('<i class="op3-icon op3-icon-simple-remove-2" />')
                .appendTo($item);
        });

        $list.attr("data-count", length);
    }

    /**
     * Widget sortable update event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _sort = function(e) {
        var element = OP3.$(OP3.Designer.activeElement());
        var children = element.children();
        var target = children.eq(e.oldIndex);
        var index = e.newIndex;
        var method = index > e.oldIndex ? "insertAfter" : "insertBefore";

        target[method](children.eq(index));
    }

    /**
     * Widget item click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickItem = function(e) {
        var element = _getClickChild(e);
        if (!element)
            return;

        element.focus();
    }

    /**
     * Widget icon visible click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickVisible = function(e) {
        var element = _getClickChild(e);
        if (!element)
            return;

        element = OP3.$(element);
        var value = element.getOption("display", "all");
        var reverse = value === "none" ? OP3.Designer.getElementDefaultCssDisplay(element.type()) : "none";
        element.setOption("display", reverse, "all");

        // Refresh element fields
        OP3.transmit("elementoptionsrefreshrequest", { property: [ "children" ] });
    }

    /**
     * Widget icon clone click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickClone = function(e) {
        var element = _getClickChild(e);
        if (!element)
            return;

        element.clone().insertAfter(element);
    }

    /**
     * Widget icon remove click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickRemove = function(e) {
        var element = _getClickChild(e);
        if (!element)
            return;

        element.detach();
    }

    /**
     * Get op3 element from click event
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _getClickChild = function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $item = $(e.target).closest(".op3-element-options-property-children-list-item");
        var uuid = $item.attr("data-op3-element-child-uuid");
        var element = OP3.$(OP3.Designer.activeElement()).children("#" + uuid);

        return element.length ? element : null;
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
