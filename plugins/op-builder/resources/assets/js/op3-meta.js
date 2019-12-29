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
     * window.OP3.Meta object
     *
     * @type {Object}
     */
    var that = {

        author: null,
        keywords: null,
        description: null,
        name: null,
        nonce: null,
        countryCode: null,
        pageId: null,
        pageTemplate: null,
        pageTitle: null,
        pagePreviewUrl: null,
        pageStatus: null,
        userRole: null,
        api: null,
        assets: null,
        editUrl: null,
        buildEnv: null,
        buildHash: null,

        _init: function() {
            var $author = $('head meta[name="author"]');
            var $desc = $('head meta[name="description"]');
            var $keys = $('head meta[name="keywords"]');
            var $app = $('head meta[name="application-name"]');

            // If meta tag is not found use
            // op3 button for data.
            if ($app.length === 0)
                $app = $('.op-editor-mode-button-wrap');

            // properies
            var prop = {
                value: null,
                writable: false,
                enumerable: true,
                configurable: false
            }

            // make properties read-only
            Object.defineProperty(that, "author",               $.extend({}, prop, { value: $author.attr("content") }));
            Object.defineProperty(that, "description",          $.extend({}, prop, { value: $desc.attr("content") }));
            Object.defineProperty(that, "keywords",             $.extend({}, prop, { value: $keys.attr("content") }));
            Object.defineProperty(that, "name",                 $.extend({}, prop, { value: $app.attr("content") }));
            Object.defineProperty(that, "nonce",                $.extend({}, prop, { value: $app.attr("data-op3-nonce") }, { writable: true }));
            Object.defineProperty(that, "countryCode",          $.extend({}, prop, { value: $app.attr("data-country-code") }));
            Object.defineProperty(that, "pageId",               $.extend({}, prop, { value: $app.attr("data-op3-page-id") }));
            Object.defineProperty(that, "pageTemplate",         $.extend({}, prop, { value: $app.attr("data-op3-page-template") }));
            Object.defineProperty(that, "pageTitle",            $.extend({}, prop, { value: $app.attr("data-op3-page-title") }));
            Object.defineProperty(that, "pageUrl",              $.extend({}, prop, { value: $app.attr("data-op3-page-url") }));
            Object.defineProperty(that, "pagePreviewUrl",       $.extend({}, prop, { value: $app.attr("data-op3-page-preview-url") }));
            Object.defineProperty(that, "pageStatus",           $.extend({}, prop, { value: $app.attr("data-op3-page-status") }));
            Object.defineProperty(that, "userRole",             $.extend({}, prop, { value: $app.attr("data-op3-user-role") }));
            Object.defineProperty(that, "api",                  $.extend({}, prop, { value: $app.attr("data-op3-api-base-url") }));
            Object.defineProperty(that, "resources",            $.extend({}, prop, { value: $app.attr("data-op3-resources-base-url") }));
            Object.defineProperty(that, "assets",               $.extend({}, prop, { value: $app.attr("data-op3-assets-base-url") }));
            Object.defineProperty(that, "adminUrl",             $.extend({}, prop, { value: $app.attr("data-admin-url") }));
            Object.defineProperty(that, "siteUrl",              $.extend({}, prop, { value: $app.attr("data-site-url") }));
            Object.defineProperty(that, "editUrl",              $.extend({}, prop, { value: $app.attr("data-op3-edit-url") }));
            Object.defineProperty(that, "buildEnv",             $.extend({}, prop, { value: $app.attr("data-op3-build-env") }));
            Object.defineProperty(that, "buildHash",            $.extend({}, prop, { value: $app.attr("data-op3-build-hash") }));
            Object.defineProperty(that, "legacyMembership",     $.extend({}, prop, { value: $app.attr("data-op3-membership-legacy") }));
            Object.defineProperty(that, "facebookAppId",        $.extend({}, prop, { value: $app.attr("data-op3-facebook-app-id") }));
            Object.defineProperty(that, "facebookLang",         $.extend({}, prop, { value: $app.attr("data-op3-facebook-lang") }));

            // OptimizeFunnels
            Object.defineProperty(that, "funnelsActive",        $.extend({}, prop, { value: parseInt($app.attr("data-op3-funnels-active")) }));

            // Update nonce on heartbeat
            $(document).on('heartbeat-tick.wp-refresh-nonces', function(e, data) {
                if (data.nonces_expired && data.rest_nonce) {
                    window.OP3.Meta.nonce = data.rest_nonce;
                    window.OP3WP.nonce = data.rest_nonce;
                }
            });
        },
    }

    // globalize
    window.OP3.Meta = that;

    // autoinit
    window.OP3.Meta._init();
    OP3.bind("domcontentloaded::liveeditor", function(e, o) {
        if (OP3.layer !== e.origin.layer)
            return;

        window.OP3.Meta._init();
    });

    // link meta to wrapper
    OP3.bind("domcontentloaded::liveeditor", function(e, o) {
        if (OP3.layer !== "wrapper")
            return;

        window.OP3.Meta = e.origin.Meta;
    });

    // link meta to designer
    OP3.bind("domcontentloaded::designer", function(e, o) {
        if (OP3.layer !== e.origin.layer)
            return;

        window.OP3.Meta = window.parent.OP3.Meta;
    });

})(jQuery, window, document);
