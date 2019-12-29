;(function($, window, document) {

    /**
     * Handles opening of a popoverlay
     *
     * @param {Object} $el popoverlay container
     * @return {Void}
     */
    var _open_popoverlay = function($el) {
        var animation = $el
            .find(".op3-popoverlay-content")
            .attr("data-op3-animation");

        $el
            .removeClass("op3-popoverlay-hide")
            .removeClass("op3-popoverlay-show")
            .addClass("op3-popoverlay-effect-" + animation);

        setTimeout(function () {
            $el.css("display", "block");
        });

        setTimeout(function () {
            $el.addClass("op3-popoverlay-show")
        }, 60);

        _play_video($el);
    }

    /**
     * Handles click on trigger element
     * (like button that has action
     * defined as Show Pop Overlay)
     *
     * @param {Object} e
     * @return {Boolean}
     */
    var _handle_open_click = function(e) {
        var $this = $(this);

        // If button is in popoverlay
        // close current one before
        // opening new
        // changed op3 to op, but kept the old one just in case
        var action = $this.attr("data-op3-action") || $this.attr("data-op-action");

        if (action === "popoverlay")
            $this
                .closest(".op3-popoverlay-wrapper")
                .find(".op3-popoverlay-close")
                .trigger("click");

        // changed op3 to op, but kept the old one just in case
        // TODO: Remove "data-op3" part after a few versions (OP3-1228)
        var id = $this.attr("data-op-popoverlay-trigger") || $this.attr("data-op3-popoverlay-trigger");
        var $el = $("#op3-element-" + id);

        _open_popoverlay($el);
        return false;
    }

    /**
     * Handles click on close (either
     * on overlay or close icon)
     *
     * @param {Object} e
     * @return {Boolean}
     */
    var _handle_close_click = function(e) {
        var $el = $(this).closest('[data-op3-element-type="popoverlay"]');

        // No animation
        if ($el.find(".op3-popoverlay-content").attr("data-op3-animation") === "0") {
            $el
                .removeClass("op3-popoverlay-show")
                .css("display", "none");

            return false;
        }

        // Hide the element after the animation has finished
        $el.find(".op3-popoverlay-content").one("transitionend animationend", function () {
            $el.css("display", "none");
        });

        $el
            .removeClass("op3-popoverlay-show")
            .addClass("op3-popoverlay-hide");

        _stop_video($el);

        return false;
    }

    /**
     * If popoverlay have video that is playing
     * make sure to stop it.
     *
     * @param {Object} $popoverlay
     */
    var _stop_video = function($popoverlay) {
        $popoverlay
            .find('[data-op3-element-type="video"] iframe')
            .each(function() {
                var newSrc = $(this).closest(".op3-video-wrapper").attr("data-op3-src");

                if (newSrc)
                    $(this).attr("src", "");
            });
    }

    var _play_video = function($popoverlay) {
        $popoverlay
            .find('[data-op3-element-type="video"] iframe')
            .each(function() {
                var $this = $(this);
                var src = $this.attr("src");
                var newSrc = $this.closest(".op3-video-wrapper").attr("data-op3-src");

                if (!src && newSrc)
                    $this.attr("src", newSrc);
            });
    };

    /**
     * Go through all popoverlay elements on the page
     * and initialize all set up timers
     */
    $("#op3-designer-element")
        .find('.op3-element[data-op3-element-type="popoverlay"]')
        .each(function() {
            var $el = $(this).removeClass("op3-popoverlay-show");
            var $content = $el.find(".op3-popoverlay-content");
            var timerCheck = $content.attr("data-op3-timer-check");
            if (timerCheck == 0) {
                return true;
            }

            var timer = $content.attr("data-op3-timer");
            var delay;

            if (timer.indexOf("sec") > -1) {
                delay = parseInt(timer) * 1000;
            }

            if (timer.indexOf("min") > -1) {
                delay = parseInt(timer) * 1000 * 60;
            }

            setTimeout(function() {
                // Only open on delay if pop overlay
                // isn't already opened
                if ($(".op3-popoverlay-show").length === 0)
                    _open_popoverlay($el);
            }, delay);
        });

    // Setup click events for open/closing of popoverlay elements
    var body = $("body");
    // changed op3 to op, but kept the old one just in case
    // TODO: Remove "data-op3" part after a few versions (OP3-1228)
    body.on("click", '[data-op3-action="popoverlay"], [data-op-action="popoverlay"]', _handle_open_click);
    body.on("click", '.op3-popoverlay-background,.op3-popoverlay-close', _handle_close_click);

    // Globalize open popoverlay handler, because
    // we want to be able to open it manually,
    // for example, on optin form submit
    window.OP3 = window.OP3 || {};
    OP3.PopOverlay = {};
    OP3.PopOverlay.open = function(id) {
        var $el = $("#op3-element-" + id);
        _open_popoverlay($el);
    }
})(jQuery, window, document);
