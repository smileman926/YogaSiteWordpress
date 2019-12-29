/**
 * Wordpress OptimizePress3 plugin:
 * wrapper around live editor.
 *
 * Dependencies:
 *     - jQuery
 *     - op3-core.js
 */
;(function($, window) {

    "use strict";

    /**
     * window.OP3.Wrapper object
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
         * Hash prefix for auto opening
         *
         * @type {String}
         */
        hash: 'op-builder',

        /**
         * Simple flag for setting the page to refresh
         *
         * @type {Boolean}
         */
        redirecting: false,

        /**
         * Object initialization
         *
         * @return {void}
         */
        _init: function() {
            // Build up the editor and bind events
            that._build();
            that._bindEvents();

            // And auto-open in certain conditions
            that.autoOpen();
        },

        /**
         * Open OP editor for a specific page
         *
         * @return {*}
         */
        open: function(pageID) {
            var addHash = false;

            // Try to fetch the pageId if not passed
            if (! pageID) {
                addHash = true;
                pageID = that.$ui.dataContainer.data('op3PageId');
            }

            // Only continue if we have a page ID
            if (! pageID) {
                return;
            }

            // Now fetch the editor URL and page status
            var editorUrl  = this.getEditorUrl(pageID);
            var pageStatus = that.$ui.dataContainer.data("op3-page-status");

            // Bail if not found
            if (! editorUrl) {
                alert("Editor URL not found!");

                return false;
            }

            // Trigger auto save so we have no errors
            that.toggleButton(false);
            if (OP3.Wrapper.Gutenberg.isActive()) {
                OP3.Wrapper.Gutenberg.autoSaveDraft();
            } else {
                that.autoSaveDraft();
            }

            // Only go further for pages with a valid status
            if (pageStatus !== 'auto-draft') {
                // Change OP mode
                that.toggleOPMode(pageID, true);

                // Set URL for editor in iframe
                OP3.Wrapper.Iframe.setURL(editorUrl);

                // Add location hash to URL
                if (addHash) {
                    window.location.hash = "#" + that.hash;
                }

                // And display the editor
                that.$ui.body.addClass("wp-plugin-op3-show");
            } else {
                $("#op3-wrapper").fadeTo(100, .5);
            }
        },

        /**
         * Close page builder
         *
         * @return {void}
         */
        close: function() {
            // Reload iframe on fadeout
            that.$ui.frame.one("transitionend.op3-transition", function() {
                that.$ui.frame.attr("src", "about:blank");
            });

            // Fade-out
            that.$ui.body.removeClass("wp-plugin-op3-show");

            // Page status attribute is only added if status is changed in live editor.
            var editorBody = that.$ui.frame.contents().find('body');
            if (editorBody && editorBody.attr("data-op3-page-status")) {
                // alert("BAD REDIRECT IN wrapper/editor.js");
                // window.location.href = "/wp-admin/post.php?post=" + OP3.Meta.pageId + "&action=edit";
            } else {
                window.location.hash = "";
            }

            // Browser does not support transition fallback
            if (! parseFloat(that.$ui.frame.css("transition-duration"))) {
                that.$ui.frame.attr("src", "about:blank");
            }
        },

        /**
         * Auto open the editor when a URL hash is present
         *
         * @return {void}
         */
        autoOpen: function() {
            if (window.location.hash === "#" + that.hash) {
                var pageStatus  = that.$ui.dataContainer.attr("data-op3-page-status");
                var pageHasData = parseInt(that.$ui.dataContainer.attr("data-op3-page-has-data"));
                var pageId      = that.$ui.dataContainer.data('op3PageId');
                var url         = that.$ui.frame.attr("data-src");

                // Open the page
                if (pageStatus !== "auto-draft") {
                    if (pageId && url) {
                        that.open(pageId);
                    } else {
                        alert("Missing page ID or editor URL.");
                    }
                } else {
                    // Add hash to URL
                    window.location.hash = "#" + that.hash;

                    // Show editor
                    if (pageHasData) {
                        that.$ui.body.addClass("wp-plugin-op3-show");
                    }

                    // Toggle mode for page so it opens in live editor next time
                    that.toggleOPMode(pageId, true, !pageHasData);
                    // @TODO: Trigger auto save and reload page
                }
            }
        },

        /**
         * Used for new pages where the page is an auto draft
         * When clicking the editor button the page should be changed to draft
         *
         * @return {void}
         */
        autoSaveDraft: function() {
            var baseUrl    = this.apiBaseUrl();
            var $wpTitle   = $('#title');
            var pageStatus = that.$ui.dataContainer.data("op3-page-status");
            var pageId     = that.$ui.dataContainer.data("op3-page-id")*1;

            // Create a title if needed
            if ( ! $wpTitle.val()) {
                $("#title-prompt-text").hide();
                $wpTitle.val('OptimizePress #' + pageId);
            }

            // We also need to save the template
            if (wp.autosave) {
                wp.autosave.server.triggerSave();
            }

            // Redirect for auto draft posts and pages
            $(document).on('heartbeat-tick.autosave', function() {
                $(window).off('beforeunload.edit-post');

                if (pageStatus === "auto-draft" && ! that.redirecting) {
                    that.redirecting = true;

                    // Collect the data
                    var pageData = that.collectPageData();

                    // Make ajax request to save the page template
                    OP3.Ajax.request({
                        method: "post",
                        data: JSON.stringify(pageData),
                        url: baseUrl + "/pages/" + pageId + "/template",
                        success: function(data) {
                            window.location = that.$ui.dataContainer.attr("data-op3-edit-url");
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.error(textStatus); /*RemoveLogging:skip*/
                            that.toggleButton(true);
                        }
                    });
                }
            });
        },

        /**
         * Collect all page data for saving
         *
         * @returns {Object}
         */
        collectPageData: function() {
            // Get the elements
            var $wpTitle    = $('#title');
            var $wpTemplate = $("#page_template");

            return {
                title:    $wpTitle.val(),
                template: $wpTemplate.val(),
            };
        },

        /**
         * Toggle the main editor button
         *
         * @param state
         */
        toggleButton: function(state) {
            if (state) {
                $(".op-editor-gutenberg-wrapper a.button-primary").removeAttr("disabled", "disabled").fadeTo(10, 1);
            } else {
                $(".op-editor-gutenberg-wrapper a.button-primary").attr("disabled", "disabled").fadeTo(10, .5);
            }
        },

        /**
         * Find the editor URL
         *
         * @param id
         * @returns {*}
         */
        getEditorUrl: function(id) {
            var editorUrl = null;

            if (window.OP3WP && window.OP3WP.liveEditorUrl) {
                editorUrl = window.OP3WP.liveEditorUrl;
            } else {
                editorUrl = $('meta[name=opb-live-editor-url]').attr('content');
            }

            // Replace
            if (editorUrl) {
                editorUrl = editorUrl.replace('%objectId%', id);
            }

            return editorUrl;
        },

        /**
         * Toggle the OP editor mode for current page
         * Saved to the database so we can keep the state for the page
         *
         * @param pageID
         * @param mode
         * @param refresh
         */
        toggleOPMode: function(pageID, mode, refresh) {
            // Try to fetch the pageId if not passed
            if (! pageID) {
                pageID = that.$ui.dataContainer.data('op3PageId');
            }

            // Build up API url
            var url = this.apiBaseUrl() + '/pages/' + pageID + '/mode';

            if (mode) {
                $("body").addClass("op-editor-active").removeClass("op-editor-inactive");
            } else {
                $("body").removeClass("op-editor-active").addClass("op-editor-inactive");
            }

            OP3.Ajax.request({
                method: "post",
                url: url + (mode ? "/op" : "/wp"),
                success: function() {
                    if (refresh) {
                        $("#postdivrich").hide();
                        window.location.reload();
                    }
                },
                error: function(jqXHR, textStatus) {
                    console.error(textStatus); /*RemoveLogging:skip*/
                },
            });
        },

        /**
         * Turn off OP editor
         *
         * @returns {boolean}
         */
        backToWPEditor: function(pageID) {
            // Try to fetch the pageId if not passed
            if (! pageID) {
                pageID = that.$ui.dataContainer.data('op3PageId');
            }

            // Clear location has
            window.location.hash = "";

            // Toggle mode for page so it opens in live editor next time
            that.toggleOPMode(pageID, false, true);

            return false;
        },

        /**
         * Build up API base URL from data container or OP meta
         *
         * @returns {boolean}
         */
        apiBaseUrl: function() {
            var $container = that.$ui.dataContainer;
            var url        = false;

            if ($container && $container.length) {
                url = $container.data('op3-api-base-url');
            }

            if (! url && window.OP3WP) {
                url = window.OP3WP.apiBaseUrl;
            }

            return url;
        },

        /**
         * Build up the editor
         *
         * @return {void}
         */
        _build: function() {
            // Find DOM elements for UI
            that.$ui.body          = $("body");
            that.$ui.dataContainer = $(".op-editor-data-container");
            that.$ui.wpEditor      = $('#editor');

            // Fetch required attributes
            var pageStatus = that.$ui.dataContainer.attr("data-op3-page-status");
            var editorUrl  = pageStatus !== "auto-draft" ? that.$ui.dataContainer.attr("data-op3-live-editor-url") : "";

            // And build up the iframe element
            that.$ui.frame = OP3.Wrapper.Iframe.build(editorUrl);
        },

        /**
         * Bind events
         *
         * @return {void}
         */
        _bindEvents: function() {
            $(window).on("message.op3", that._handleMessages);
        },

        /**
         * Window post messages event handler
         *
         * @param  {Object} e
         * @return {void}
         */
        _handleMessages: function(e) {
            var msg;

            try {
                msg = JSON.parse(e.originalEvent.data);
            } catch(e) {
                // pass
            }

            // Not an OP message
            if (!msg || ! typeof msg === "object" || msg.type !== OP3.prefix) {
                return;
            }

            // Callback for event
            if (typeof that._postMessageCallback[msg.message] === "function") {
                that._postMessageCallback[msg.message].call(that, msg);
            }
        },

        /**
         * Post message handler object:
         * communication between iframe i parent.
         * When message is received from iframe this
         * is where we're looking for callback
         *
         * @type {Object}
         */
        _postMessageCallback: {

            /**
             * Loaded message handler
             *
             * @param  {Object} e
             * @return {void}
             */
            loaded: function(e) {
                // pass
            },

            /**
             * Saving message handler
             *
             * @param  {Object} e
             * @return {void}
             */
            saving: function(e) {
                // pass
            },

            /**
             * Saved message handler
             *
             * @param  {Object} e
             * @return {void}
             */
            saved: function(e) {
                // pass
            },

            /**
             * Close message handler
             *
             * @param  {Object} e
             * @return {void}
             */
            close: function(e) {
                that.close();
            }

        }

    };

    // Globalize
    window.OP3.Wrapper = window.OP3.Wrapper || {};
    window.OP3.Wrapper.Editor = that;

    // Auto init
    $(function() {
        OP3.Wrapper.Editor._init();
    });

})(jQuery, window, document);
