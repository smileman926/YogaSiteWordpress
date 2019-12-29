/**
 * wp.media.view.MediaFrame.Post
 *
 * Extending MediaFrame.Post to add new tab
 * and logic for it in mediy library.
 */
;(function($, window, document) {

    "use strict";

    if (typeof wp.Backbone === "undefined")
        return;

    var UnsplashPhoto = wp.Backbone.View.extend({
        tagName: "li",
        className: "photo",
        template: wp.template("unsplash-photo"),
        render: function() {
            this.$el.html(this.template(this.options.photo));

            return this;
        }
    });

    var UnsplashView = wp.Backbone.View.extend({
        tagName: "div",
        className: "unsplash",
        template: wp.template("unsplash"),

        events: {
            "click #load-more" : "loadMoreClickHandlerer",
        },

        loadMoreClickHandlerer: function(e) {
            var $button = $(e.target),
                url = $button.attr("data-unsplash-next-url");

            $button.addClass("loading");

            OP3.Unsplash.getNextPage(url, function(response, headers) {
                var photos = [];

                response.forEach(function(photo, i) {
                    var template = new UnsplashPhoto({
                        photo: photo,
                    })

                    photos.push(template.render().$el);
                }, this);

                this.$el
                    .find(".frame-content button")
                    .removeClass("loading")
                    .attr("data-unsplash-next-url", headers.urls.next);

                this.$el
                    .find(".frame-content .photos")
                    .append(photos);

            }.bind(this));
        }
    });

    var frame = wp.media.view.MediaFrame.Post;
    wp.media.view.MediaFrame.Post = frame.extend({
        initialize: function() {
            frame.prototype.initialize.apply(this, arguments);

            var State = wp.media.controller.State.extend({
                insert: function() {
                    this.frame.close();
                }
            })

            this.states.add([
                new State({
                    id: "unsplash",
                    search: false,
                    title: "Unsplash"
                })
            ]);

            this.on("content:render:unsplash", this.renderUnsplashTabContent, this);
            this.on("open", this.frameOpen, this);
        },

        /**
         * Register medialibrary tabs.
         *
         * @param  {Object} routerView
         * @return {Void}
         */
        browseRouter: function(routerView) {
            routerView.set({
                upload: {
                    text: wp.media.view.l10n.uploadFilesTitle,
                    priority: 20
                },
                unsplash: {
                    text: wp.media.view.l10n.unsplashTitle,
                    priority: 30
                },
                browse: {
                    text: wp.media.view.l10n.mediaLibraryTitle,
                    priority: 40
                },
            });
        },

        /**
         * Crate view from template and set it as current one.
         * (see resources/assets/views/live-editor/unsplash.php)
         *
         * @return {Void}
         */
        renderUnsplashTabContent: function() {
            OP3.Unsplash.getFirstPage("popular", function(response) {
                var view = new UnsplashView({
                    photos: JSON.parse(response.photos),
                    urls: response.urls,
                });

                this.content.set(view);
            }.bind(this));
        },

        /**
         * Wp media frame open event handlerer.
         * Refresh attachments, because when unsplash image
         * is imported and frame is opened second time
         * imported images aren't displayed.
         *
         * @return {Void}
         */
        frameOpen: function() {
            OP3.WpMediaFramePost._forceAttachmentsFetch();
        }
    });

    var that = {
        /**
         * Ajax success event handler.
         * Image downloaded and imported into
         * wordpress library successfully.
         *
         * @param  {Object} response
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjaxSuccess: function(response, textStatus, jqXHR) {
            // Remove downloading image overlay
            wp.media.frame.$el
                .find(".unsplash .frame-content .loading")
                .removeClass("loading");

            var content = wp.media.frame.content;
            var photoId = response.data.media.ID;

            // Switch to Media Library tab
            if ("unsplash" === content.mode()) {
                content.mode("browse");
            }

            // Refresh media library to display downloaded image
            that._forceAttachmentsFetch();

            // Select downloaded image in media library
            setTimeout(function() {
                var selection = wp.media.frame.state().get("selection");
                var attachment = wp.media.attachment(photoId);
                selection.add(attachment);
            }, 500);
        },

        /**
         * Force wordpress attachment fetch
         *
         * @return {Void}
         */
        _forceAttachmentsFetch: function() {
            var content = wp.media.frame.content;
            if (content.get() !== null &&
                content.get().collection &&
                content.get().options &&
                content.get().options.selection) {
                // this forces a refresh of the content
                content.get().collection._requery(true);
                // optional: reset selection
                content.get().options.selection.reset();
            }
        },

        /**
         * Unsplash image download event handler.
         *
         * @param  {Object} element
         * @return {Void}
         */
        handleUnsplashImageClick: function(e, element) {
            if (e.target.nodeName === "A")
                return;

            var $element = $(element),
                url = $element.attr("data-download-url");

            OP3.Ajax.request({
                url: OP3.Meta.api + "/media/import?url=" + url,
                method: "post",
                data: JSON.stringify({url: url}),
                beforeSend: function() {
                    this.closest(".photo-wrapper").addClass("loading");
                }.bind($element),
                success: that._handleAjaxSuccess,
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo - handle error
                    alert("ERROR: " + textStatus);
                },
            });

            // After user downloaded photo
            // trigger event endpoint
            var id = $element.attr("data-photo-id");
            OP3.Unsplash.download(id)
        },

        /**
         * Popular/Latest category change event handler
         * Currently not in use.
         *
         * @param  {Object} element
         * @return {Void}
         */
        handleOrderBySelectChange: function(element) {
            var $elem = $(element),
                order = $elem.find(":selected").attr("value");

            OP3.Unsplash.getFirstPage(order, function(response) {
                var view = new UnsplashView({
                    photos: JSON.parse(response.photos),
                    urls: response.urls,
                });

                wp.media.frame.content.set(view);
            });
        },

        /**
         * Unsplash search photos by given query
         *
         * @param  {Object} e
         * @param  {Object} element
         * @return {Void}
         */
        handleSearch: function(e, element) {
            if (e.keyCode !== 13)
                return;

            var query = $(element).val();

            OP3.Unsplash.search(query, function(response) {
                var view = new UnsplashView({
                    query: query,
                    photos: response.photos,
                    urls: response.urls,
                });

                wp.media.frame.content.set(view);
            });
        }
    }

    window.OP3.WpMediaFramePost = that;

})(jQuery, window, document);
