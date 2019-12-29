/**
 * OptimizePress3 live editor:
 * page builder wrapper.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Media devices
     *
     * @type {Object}
     */
    that._devices = {
        desktop: "all",
        tablet: "screen and (max-width: 1023px)",
        mobile: "screen and (max-width: 767px)",
    }

    /**
     * Get/set designer device
     *
     * @param  {String} device (optional)
     * @return {Mixed}
     */
    that.device = function(device) {
        if (typeof device === "undefined")
            return $("body").attr("data-op3-device") || "desktop";

        if (Object.keys(that._devices).indexOf(device) === -1)
            return;
        if (device === that.device())
            return;

        var transmit = function() {
            var emit = {
                device: device,
                media: that.deviceMedia(),
            }
            OP3.transmit("devicechange", emit);
            OP3.transmit("devicechange::" + device, emit);
        }

        // Transmit device change start
        // to select menu in devices
        // before the transition
        // is finished
        OP3.transmit("devicechangestart", {
            device: device,
            media: that.deviceMedia(),
        });

        var transition = !!parseFloat(that.$ui.frame.parent().css("transition-duration"));
        if (transition)
            that.$ui.frame.parent().one("transitionend", transmit);

        $("body").attr("data-op3-device", device);

        // We write the current device into sessionStorage
        // because we only want to keep it for a session;
        // new pages should always start with desktop
        // OP3-230
        sessionStorage.setItem('op3-device', device);
        sessionStorage.setItem('op3-device-page', OP3.Meta.pageId);

        if (!transition)
            transmit();
    }

    /**
     * Get set designer device
     *
     * @param  {String} device (optional)
     * @return {Mixed}
     */
    that.deviceMedia = function(device) {
        if (typeof device === "undefined")
            device = that.device();
        if (Object.keys(that._devices).indexOf(device) === -1)
            device = that.device();

        return that._devices[device];
    }

    /**
     * Device iterator
     *
     * @param  {Function} callback
     * @return {Void}
     */
    that.forEachDevice = function(callback) {
        if (typeof callback !== "function")
            return;

        [ "desktop", "tablet", "mobile" ].forEach(function(item) {
            callback.call(that, item, that._devices[item]);
        });
    }

    /**
     * Object initialization
     *
     * @return {Void}
     */
    var _init = function() {
        var device = sessionStorage.getItem('op3-device');
        var pid = sessionStorage.getItem('op3-device-page');

        if (!device || pid != OP3.Meta.pageId)
            device = "desktop";

        that.device(device);
    }

    // autoinit
    $(function() {
        _init();
    });

    // designer stylesheets
    OP3.bind("load", function(e) {
        if (e.origin.layer !== "designer") {
            return;
        }

        // Go through all stylesheets (desktop/tablet/mobile)
        // and insert into document the ones that are
        // missing in the correct order
        OP3.LiveEditor.forEachDevice(function(device, media) {
            // stylesheet all is always present,
            // so there's no need to handle it
            if (device === "desktop")
                return;

            // find stylesheet for device and detach it
            // (so we can append it in correct order)
            var $node = e.origin.Designer.$ui.stylesheet
                .filter('[media="' + that._devices[device] + '"]')
                .detach();

            // get last stylesheet present on page
            var $last = e.origin.Designer.$ui.stylesheet
                .filter(function() {
                    return !!$(this).parent().length;
                })
                .last();

            // stylesheet not found, create it
            if (!$node.length) {
                $node = $("<style />")
                    .attr("media", that._devices[device])
                    .addClass("op3-designer-stylesheet");
            }

            // append it and refresh $ui.stylesheet
            $node.insertAfter($last);
            e.origin.Designer.$ui.stylesheet = e.origin.Designer.$ui.stylesheet.add($node);
        });

        OP3.transmit("devicesinit", that._devices);
    });

    /**
     * Set initial selection (on load)
     * for devices preview menu
     *
     * @return {Void}
     */
    OP3.bind("devicesinit", function() {
        var $menu = $("#op3-devices-menu");
        $menu.find(".op3-device").removeClass("selected");
        $menu.find(".op3-device-" + that.device()).addClass("selected");
    });

    /**
     * Set selection after change (devicechange)
     * for the devices preview menu
     *
     * @param  {Event} e
     * @param  {Object} settings (device properties)
     * @return {Void}
     */
    OP3.bind("devicechangestart", function(e, settings) {
        var $menu = $("#op3-devices-menu");
        $menu.find(".op3-device").removeClass("selected");
        $menu.find(".op3-device-" + settings.device).addClass("selected");
    });

    /**
     * If LiveEditor is manually closed,
     * we clear the current device
     *
     * @return {Void}
     */
    OP3.bind("close", function() {
        sessionStorage.removeItem('op3-device');
        sessionStorage.removeItem('op3-device-page');
    });

})(jQuery, window, document);
