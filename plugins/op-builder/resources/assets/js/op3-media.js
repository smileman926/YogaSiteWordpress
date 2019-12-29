/**
 * OptimizePress3 app.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Media object
     *
     * @type {Object}
     */
    var that = {

        /**
         * window.wp object searched through
         * iframe parents (in autoinit)
         *
         * @type {Object}
         */
        _wp: null,

        /**
         * Modal default settings
         *
         * @type {Object}
         */
        _settings: {
            className: "media-frame op3-modal op3-modal-media",
            title: "Select or Upload Media",
            library: {
                type: "image",
            },
            button: {
                text: "Use this media",
            },
            frame: "post",
            multiple: false,
        },

        /**
         * Show WP media modal
         *
         * @param  {Object}   settings
         * @param  {Function} callback
         * @return {Void}
         */
        _modal: function(settings, callback) {
            if (!that._wp)
                return;

            var frame = that._wp.media($.extend({}, that._settings, settings));

            frame
                .on("open", function() {
                    // select last tab
                    setTimeout(function() {
                        frame.modal.$el
                            .find(".media-frame-router .media-menu-item")
                            .last()
                                .click();
                    });

                    // preselect file(s)
                    // @todo - this is not working as expected,
                    // (disabling all) -> file is selected, but
                    // options in sidebar (attachment display
                    // settings) are not rendered well
                    //var attid = undefined;
                    //var attach = this.attachment(attid);
                    //frame.state().get("selection").add(attach);
                })
                .on("select", function() {
                    var attach = frame.state().props.toJSON();
                    attach.settings = {
                        size: "full",
                    };
                    attach.sizes = {
                        full: {
                            height: attach.height,
                            width: attach.width,
                        }
                    };

                    if (typeof callback === "function")
                        callback.call(this, attach);
                })
                .on("insert", function() {
                    var attach = frame.state().get("selection").first().toJSON();
                    attach.settings = {};
                    frame.$el.find(".attachment-display-settings [data-setting]:not(.hidden)").each(function() {
                        attach.settings[$(this).attr("data-setting")] = $(this).val();
                    });

                    if (typeof callback === "function")
                        callback.call(this, attach);
                })
                .open();
        },

        modalImage: function(callback) {
            return that._modal({}, callback);
        },

        modalVideo: function(callback) {
            // @todo
        },

    }

    // globalize
    window.OP3.Media = that;

    // autoinit
    $(function() {
        try {
            var win = window;
            while ((!win.wp || !win.wp.media) && win.parent !== win) {
                win = win.parent;
            }

            that._wp = win.wp || null;
        }
        catch(e) {
            // crossdomain
        }
    });

})(jQuery, window, document);
