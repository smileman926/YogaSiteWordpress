/**
 * Wordpress OptimizePress3 plugin:
 * wrapper around live editor.
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Wrapper object
     *
     * @type {Object}
     */
    var that = {

        /**
         * The WP/Gutenberg editor element
         */
        $editor: {},

        /**
         * The WP/Gutenberg editor toolbar
         */
        $toolbar: {},

        /**
         * The WP/Gutenberg editor button
         */
        $button: {},

        /**
         * The WP/Gutenberg editor button wrapper
         */
        $buttonWrapper: {},

        /**
         * Object initialization
         *
         * @return {void}
         */
        _init: function() {
            that._build();
        },

        /**
         * Check if Gutenberg plugin is enabled
         *
         * @return {Boolean}
         */
        isEnabled: function() {
            return that.$editor && that.$editor.length && that.$editor.hasClass('block-editor__container');
        },

        /**
         * Check if Gutenberg editor is active on current page
         *
         * @return {Boolean}
         */
        isActive: function() {
            return that.$editor && that.$editor.length && that.$editor.hasClass('block-editor__container');
        },

        /**
         * Build up Gutenberg specific UI
         *
         * @return {void}
         */
        _build: function() {
            // Bind existing element
            that.$editor = OP3.Wrapper.Editor.$ui.wpEditor;

            // Inject button to Gutenberg toolbar
            if (OP3.Wrapper.Editor.$ui.dataContainer.length && that.isEnabled() && that.isActive()) {
                that.injectOPButtonToGutenbergToolbar();
            }
        },

        /**
         * Open the OP editor
         *
         * @return {*}
         */
        open: function() {
            return !!OP3.Wrapper.Editor.open();
        },

        /**
         * Inserts a HTML element to the Gutenberg toolbar
         *
         * @return {void}
         */
        injectOPButtonToGutenbergToolbar: function() {
            var $ui         = OP3.Wrapper.Editor.$ui;
            var buttonLabel = $ui.dataContainer.data("op3-button-label");
            that.$toolbar    = that.$editor.find('.edit-post-header-toolbar');
            
            // Prepare elements
            var $icon = $('<img />').attr("src", $ui.dataContainer.data("op3-icon-url"));

            // If Gutenberg is enabled we need to render the button
            that.$button = $("<a />")
                .attr("class", "button button-primary button-large components-button is-button is-large")
                .attr("type", "button")
                .text(buttonLabel);
            that.$button.prepend($icon);

            // Add action
            that.$button.click(function () {
                return that.open();
            });

            // Wrap the button
            that.$buttonWrapper = $("<div />").attr("class", "op-editor-gutenberg-wrapper");
            that.$buttonWrapper.append(that.$button);

            // Append the button to the Gutenberg toolbar
            that.$toolbar.append(that.$buttonWrapper);
        },

        /**
         * Used for new pages where the page is an auto draft
         * When clicking the editor button the page should be changed to draft
         *
         * @return {void}
         */
        autoSaveDraft: function() {
            var pageId = $('#post_ID').val();

            // Create a title if needed
            var pageTitle = wp.data.select('core/editor').getEditedPostAttribute('title');
            if ( ! pageTitle) {
                wp.data.dispatch('core/editor').editPost({ title: 'OptimizePress #' + pageId });
            }

            // Save the post
            wp.data.dispatch('core/editor').savePost();

            // Change the page mode
            OP3.Wrapper.Editor.toggleOPMode(pageId, true);
            that.redirectAfterSave();
        },

        /**
         * Redirect to OP editor page after saving an auto draft
         * This method is called periodically, so we listen for the right time to redirect
         */
        redirectAfterSave: function() {
            setTimeout(function () {
                if (wp.data.select('core/editor').isSavingPost()) {
                    that.redirectAfterSave();
                } else {
                    window.location = OP3.Wrapper.Editor.$ui.dataContainer.data('op3-edit-url');
                    window.location.reload(true);
                }
            }, 300);
        },

        /**
         * Collect all page data for saving
         *
         * @returns {Object}
         */
        collectPageData: function() {
            // Get the elements
            var $wpTitle    = $(".editor-post-title__input");
            var $wpTemplate = $(".editor-page-attributes__template select");

            return {
                title:    $wpTitle.val(),
                template: $wpTemplate.val(),
            };
        }
    };

    // Globalize
    window.OP3.Wrapper = window.OP3.Wrapper || {};
    window.OP3.Wrapper.Gutenberg = that;

    // Auto init
    $(function() {
        // @TODO: Find better way to load after Gutenberg is ready
        setTimeout(function () {
            OP3.Wrapper.Gutenberg._init();
        }, 1);
    });

})(jQuery, window, document);
