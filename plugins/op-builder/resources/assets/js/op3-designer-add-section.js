/**
 * OptimizePress3 designer extension.
 *
 * Handle "Add new section" button in op3 desinger.
 * On button click user can choose column
 * template layout.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 *     - op3-designer-draganddrop.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.Designer
    var that = window.OP3.Designer;

    /**
     * Column templates
     *
     * @type {String}
     */
    that._templateAddSection = [
        '<div id="op3-designer-element-add-section" data-jquery-mmdnd-droppable="op3-query">',
            '<div class="op3-desinger-add-section-content">',
                '<span>Drag an element here or click to add new section</span>',
                '<button class="op3-designer-element-add-section-new">Add New Section</button>',
            '</div>',

            '<div class="op3-designer-column-layouts-wrapper">',
                '<span>Select column layout</span>',
                '<i class="close op3-icon op3-icon-simple-remove-1"></i>',
                '<div class="op3-designer-column-layouts">',
                    '<div class="column-layout" data-op3-column-width="100%"><div class="one-col"></div></div>',
                    '<div class="column-layout" data-op3-column-width="50%,50%"><div class="one-half"></div><div class="one-half"></div></div>',
                    '<div class="column-layout" data-op3-column-width="33.3333%,33.3333%,33.3334%"><div class="one-thirds"></div><div class="one-thirds"></div><div class="one-thirds"></div></div>',
                    '<div class="column-layout" data-op3-column-width="25%,25%,25%,25%"><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-quarter"></div></div>',
                    '<div class="column-layout" data-op3-column-width="66.6667%,33.3333%"><div class="two-thirds"></div><div class="one-thirds"></div></div>',
                    '<div class="column-layout" data-op3-column-width="33.3333%,66.6667%"><div class="one-thirds"></div><div class="two-thirds"></div></div>',
                    '<div class="column-layout" data-op3-column-width="25%,25%,50%"><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-half"></div></div>',
                    '<div class="column-layout" data-op3-column-width="50%,25%,25%"><div class="one-half"></div><div class="one-quarter"></div><div class="one-quarter"></div></div>',
                    '<div class="column-layout" data-op3-column-width="25%,50%,25%"><div class="one-quarter"></div><div class="one-half"></div><div class="one-quarter"></div></div>',
                '</div>',
            '</div>',
        '</div>',
    ].join("");

    /**
     * Add section dragstart event handler:
     * do not allow drop for addSection element
     * if current drag element is locked to his
     * parent
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleAddSectionDragstart = function(e) {
        var lock = e.getData("lock");
        if (!lock || lock === "document")
            return;

        // jQuery uses his own event handler storage,
        // so we need to make sure that we use the
        // right jQuery (from the right scope)
        var jq = e.target.ownerDocument.defaultView.jQuery;
        jq(e.target)
            .one("mmdnddragend", that._handleAddSectionDragend);

        that.$ui.addSection
            .removeAttr("data-jquery-mmdnd-droppable");
    }

    /**
     * Add section dragover event handler:
     * stop propagation, do not let default
     * _handleDragover (which will prevent
     * default) method to be executed
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleAddSectionDragover = function(e) {
        e.stopPropagation();
    }

    /**
     * Add section drop event handler:
     * set destination and method and let
     * that._handleDragndropDrop do the
     * rest
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleAddSectionDrop = function(e) {
        e.setData("destination", that.$ui.babysitter);
        e.setData("method", "appendTo");
    }

    /**
     * Add section dragend event handler:
     * add back drop functionality for
     * addSection element
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleAddSectionDragend = function(e) {
        that.$ui.addSection
            .attr("data-jquery-mmdnd-droppable", "op3-query");
    }

    /**
     * "Add New Section" button click event handler:
     * Display column layouts
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleAddSectionNewClick = function(e) {
        that.$ui.addSection
            .find(".op3-designer-column-layouts-wrapper")
            .css("display", "flex");

        that.$ui.addSection
            .find(".op3-desinger-add-section-content")
            .css("display", "none");
    }

    /**
     * Column layout click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleColumnLayoutClick = function(e) {
        var row = OP3.$("<row />");
        var attr = $(e.currentTarget).attr("data-op3-column-width");

        if (!attr)
            return;

        var widths = attr.split(",");

        widths.forEach(function(width) {
            var column = OP3.$("<column />");
            column.setOption("width", width, "all");
            column.element().appendTo(row.babysitter());
        });

        row.appendTo(that.$ui.parent);
        that._handleCloseColumnLayoutClick();
        row.parent().focus();

        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * Close button click event handler:
     * Hide column layouts
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleCloseColumnLayoutClick = function(e) {
        that.$ui.addSection
            .find(".op3-designer-column-layouts-wrapper")
            .css("display", "none");

        that.$ui.addSection
            .find(".op3-desinger-add-section-content")
            .css("display", "block");
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
        that.$ui.addSection = $(that._templateAddSection)
            .appendTo(that.$ui.parent);
    }

    /**
     * Bind events
     *
     * @return {Void}
     */
    var _bind = function() {
        OP3.LiveEditor.$ui.body
            .on("mmdnddragstart", that._handleAddSectionDragstart);

        that.$ui.addSection
            .on("mmdnddragover", that._handleAddSectionDragover)
            .on("mmdnddrop", that._handleAddSectionDrop)
            .on("click", ".op3-designer-element-add-section-new", that._handleAddSectionNewClick)
            .on("click", ".op3-designer-column-layouts-wrapper .close", that._handleCloseColumnLayoutClick)
            .on("click", ".op3-designer-column-layouts .column-layout", that._handleColumnLayoutClick);
    }

    // autoinit
    $(function() {
        _init();
    });

})(jQuery, window, document);
