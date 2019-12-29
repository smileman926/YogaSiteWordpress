/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ajax.js
 *     - op3-designer.js
 *     - op3-icons.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Configuration for each icon
     * (tag list to append)
     *
     * @type {Object}
     */
    window.OP3.Icons._config = {
        // Social icons
        "op3-icon-logo-facebook": [ "op3-social" ],
        "op3-icon-logo-fb-simple": [ "op3-social" ],
        "op3-icon-logo-twitter": [ "op3-social" ],
        "op3-icon-logo-youtube": [ "op3-social" ],
        "op3-icon-logo-instagram": [ "op3-social" ],
        "op3-icon-logo-wordpress": [ "op3-social" ],
        "op3-icon-logo-dribbble": [ "op3-social" ],
        "op3-icon-logo-behance": [ "op3-social" ],
        "op3-icon-logo-soundcloud": [ "op3-social" ],
        "op3-icon-logo-vimeo": [ "op3-social" ],
        "op3-icon-logo-skype": [ "op3-social" ],
        "op3-icon-logo-pinterest": [ "op3-social" ],
        "op3-icon-logo-github": [ "op3-social" ],
        "op3-icon-logo-linkedin": [ "op3-social" ],
        "op3-icon-logo-spotify": [ "op3-social" ],
        "op3-icon-logo-whatsapp" : ["op3-social"],
        "op3-icon-email-85-1" : ["op3-social"],
        // Hamburger menu icons
        "op3-icon-menu-34-1": [ "op3-hamburger" ],
        "op3-icon-menu-35-2": [ "op3-hamburger" ],
        "op3-icon-menu-bold-1": [ "op3-hamburger" ],
        "op3-icon-menu-bold-2": [ "op3-hamburger" ],
        "op3-icon-menu-square-1": [ "op3-hamburger" ],
        "op3-icon-menu-square-2": [ "op3-hamburger" ],
        "op3-icon-segmentation-1": [ "op3-hamburger" ],
        "op3-icon-segmentation-2": [ "op3-hamburger" ],
        // Hamburger menu close icon set
        "op3-icon-bold-remove-1": [ "op3-close" ],
        "op3-icon-bold-remove-2": [ "op3-close" ],
        "op3-icon-fat-remove-1": [ "op3-close" ],
        "op3-icon-fat-remove-2": [ "op3-close" ],
        "op3-icon-circle-remove-1": [ "op3-close" ],
        "op3-icon-circle-remove-2": [ "op3-close" ],
        "op3-icon-square-remove-09-2": [ "op3-close" ],
        "op3-icon-square-remove-09-1": [ "op3-close" ],
        "op3-icon-simple-remove-2": [ "op3-close" ],
        "op3-icon-small-remove-2": [ "op3-close" ],
        "op3-icon-bold-remove-1": [ "op3-close" ],
        // Video Thumbnail icons
        "op3-icon-button-circle-play-2": [ "op3-play", "op3-video-play" ],
        "op3-icon-button-circle-play-1": [ "op3-play", "op3-video-play" ],
        "op3-icon-button-play-1": [ "op3-play" ],
        "op3-icon-button-play-2": [ "op3-play" ],
        "op3-icon-play-68-1": [ "op3-play" ],
        "op3-icon-play-68-2": [ "op3-play", "op3-video-play" ],
        "op3-icon-play-69-1": [ "op3-play", "op3-video-play" ],
        "op3-icon-play-69-2": [ "op3-play" ],
        "op3-icon-folder-play-1": [ "op3-play", "op3-video-play" ],
        "op3-icon-folder-play-2": [ "op3-play", "op3-video-play" ],
        "op3-icon-play-1": [ "op3-play", "op3-video-play" ],
        "op3-icon-play-2": [ "op3-play", "op3-video-play" ],
        "op3-icon-video-64-2-2": [ "op3-play" ],
        "op3-icon-video-64-1-2": [ "op3-play" ],
        "op3-icon-player-19-2": [ "op3-play", "op3-video-play" ],
        "op3-icon-player-19-1": [ "op3-play", "op3-video-play" ],
        "op3-icon-tv-2-2": [ "op3-play" ],
        "op3-icon-desktop-screen-2": [ "op3-play" ],
        "op3-icon-player": [ "op3-play" ],
        "op3-icon-tv-old-2": [ "op3-play" ],
        "op3-icon-tv-old-1": [ "op3-play" ],
        "op3-icon-ban-bold-2": [ "op3-play" ],
        "op3-icon-ban-2": [ "op3-play" ],
        "op3-icon-key-26-2": [ "op3-play" ],
        "op3-icon-hourglass-2": [ "op3-play" ],
        "op3-icon-hourglass-1": [ "op3-play" ],
        "op3-icon--stopwatch-2": [ "op3-play" ],
        "op3-icon-watch-dev-2": [ "op3-play" ],
        "op3-icon-time-2": [ "op3-play" ],
        "op3-icon-calendar-grid-61-2": [ "op3-play" ],
        "op3-icon-opening-times-2": [ "op3-play" ],
        "op3-icon-opening-times-1": [ "op3-play" ],
        "op3-icon-eye-ban-18-1": [ "op3-play" ],
        "op3-icon-eye-ban-18-2": [ "op3-play" ],
        "op3-icon-lock-open-2": [ "op3-play" ],
        "op3-icon-lock-2": [ "op3-play" ],
        "op3-icon-lock-circle-2": [ "op3-play" ],
        "op3-icon-lock-circle-open-2": [ "op3-play" ],
        "op3-icon-lock-1": [ "op3-play" ],
        "op3-icon-lock-open-1": [ "op3-play" ],
        "op3-icon-locked-2": [ "op3-play" ],
        "op3-icon-folder-time-2": [ "op3-play" ],
        "op3-icon-folder-locked-2": [ "op3-play" ],
        "op3-icon-engine-start-1": [ "op3-play" ],
        "op3-icon-engine-start-2": [ "op3-play" ],
    }

})(jQuery, window, document);
