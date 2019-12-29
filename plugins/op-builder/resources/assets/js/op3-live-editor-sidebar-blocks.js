/**
 * OptimizePress3 live editor extension:
 * adding blocks to sidebar and binding
 * events to it.
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

    /**
     * Sidebar block element template
     *
     * @type {String}
     */
    var _templateSidebarBlocksElement = ''
        //+ '<li class="block-item-wrapper">'
        //+ '<a href="#" class="block-item" title="{title}" data-op3-element-type="section" data-op3-async-drop-method="OP3.Blocks.template" data-op3-async-drop-args="[&quot;{category}&quot;,&quot;{uid}&quot;]" data-jquery-mmdnd-draggable="op3-query">'
        //+ '<div class="op3-block-thumb">'
        //+ '<img src="{preview.medium}" alt="{title}" />'
        //+ '<span>{title}</span>'
        //+ '</div>'
        //+ '</a>'
        //+ '</li>';
        + '<li class="template-thumb-item">'
        + '<a href="#" class="template-thumb-link" title="{title}" data-op3-element-type="section" data-op3-async-drop-method="OP3.Blocks.template" data-op3-async-drop-args="[&quot;{category}&quot;,&quot;{uid}&quot;]" data-jquery-mmdnd-draggable="op3-query">'
        + '<div class="template-thumb">'
        + '<img class="template-thumb-image" src="{preview.medium}" alt="{title}" />'
        + '<span class="template-thumb-label">{title}</span>'
        + '</div>'
        + '</a>'
        + '</li>';

    /**
     * Set sidebar logic for blocks tab
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleSidebarBlocks = function(e, o) {
        var categories = OP3.Blocks._data;
        // adding customer sections category
        var customerCategory = {
            "uid"           : "customer-templates",
            "description"   : "",
            "order"         : "1000",
            "preview"       : {},
            "template_count": "0",
            "title"         : "My Sections",
        };
        categories.push(customerCategory);
        var $blocksTab = OP3.LiveEditor.$ui.sidebar.find(".blocks");
        var $select = $blocksTab
            .find(".block-categories select");

        // Fill select with categories
        for (var i in categories) {
            $("<option />", {value: categories[i].uid, text: categories[i].title}).appendTo($select);
        }

        if ($select.has('option').length === 0)
            $("<option />", {value: "", text: "None"}).appendTo($select);

        // Init select2
        $select.select2({
            width: '100%',
            dropdownCssClass: "select2-block-categories",
            containerCssClass: "select2-block-categories",
            dropdownParent: $select.parent(),
        })
        .on("change", _handleBlockCategoryOrStyleChange)
        .trigger("change");

        // Dark|Light tab click handler
        $blocksTab
            .find(".op3-tab")
            .on("click", _handleBlockCategoryOrStyleChange);

        // Input search
        $blocksTab
            .find(".tab-heading-search-input")
            .on("input", _handleBlocksSearch);
    }

    /**
     * Block categoriy or style change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleBlockCategoryOrStyleChange = function(e) {
        var $target = $(e.target),
            $tab = $target.closest(".blocks"),
            $content = $tab.find(".content"),
            category = $tab.find("select :selected").val();

        var style = $target.parent().attr("data-tab") || $tab.find(".op3-tab.selected").attr("data-tab");
        if (category === "" || style === "")
            return;

        $tab.addClass("op3-block-categories-loadinfo");
        $content.empty();

        // Get blocks by category and style
        // OP3.Blocks will return data from
        // cache or api
        OP3.Blocks.getCategoryBlocks(category, style, _handleBlocksData.bind($target));
    }

    /**
     * getCategoryBlocks Callback.
     * Generate html from given data and preload images.
     *
     * @param  {Array} data
     * @return {Void}
     */
    var _handleBlocksData = function(data) {
        var $target = $(this),
            $tab = $(this).closest(".blocks"),
            $content = $tab.find(".content");

        $content.attr('data-blocks', data.length);
        if (!data || data && data.length === 0)
            return $tab.removeClass("op3-block-categories-loadinfo");

        var html = "";
        var images = [];
        // Generate html from blocks object
        for (var i = 0; i < data.length; i++) {
            // logo fallback
            var logo = OP3.Meta.assets + "/img/optimizepress-placeholder.svg";
            if (!data[i].preview.thumb) data[i].preview.thumb = logo;
            if (!data[i].preview.medium) data[i].preview.medium = logo;
            if (!data[i].preview.large) data[i].preview.large = logo;

            // Extract images for preload purpose
            images.push(data[i].preview);
            html += OP3.$.templating(_templateSidebarBlocksElement, data[i]);
        }

        // Preload images before append
        // html blocks to DOM
        _preloadImages(images).done(function() {
            $tab.removeClass("op3-block-categories-loadinfo");
            $(html).appendTo($content);
            $tab
                .find(".tab-heading-search-wrapper tab-heading-search-input")
                .trigger("input");
        })
    }

    /**
     * Preload images:
     * If not images rendering will be visible.
     *
     * @param  {Array} images
     * @return {Void}
     */
    var _preloadImages = function(images) {
        var newimages=[], loadedimages = 0;
        var postaction = function() {};
        var images = (typeof images != "object") ? [images] : images;

        function imageloadpost() {
            loadedimages++;

            if (loadedimages == images.length)
                postaction(newimages);
        }

        for (var i=0; i < images.length; i++){
            newimages[i] = new Image();
            newimages[i].src = images[i].medium;
            newimages[i].onload = function() {
                imageloadpost();
            }
            newimages[i].onerror = function() {
                imageloadpost();
            }
        }

        return {
            done:function(f) {
                postaction = f || postaction;
            }
        }
    }

    /**
     * Custom search for blocks
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleBlocksSearch = function(e) {
        var $target, filter, ul, li, span, i, txtValue;
        $target = $(e.target);
        filter = $target.val().toUpperCase();
        ul = $target.closest(".blocks").find(".content");
        li = ul.find("li");

        // Hide items that don't match
        // input value
        for (i = 0; i < li.length; i++) {
            span = li[i].getElementsByTagName("span")[0];
            txtValue = span.textContent || span.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1)
                li[i].style.display = "";
            else
                li[i].style.display = "none";
        }
    }

    OP3.bind("ready", _handleSidebarBlocks);

})(jQuery, window, document);
