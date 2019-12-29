;(function($, window, document) {

    "use strict";

    $(function() {
        $('[data-op3-element-type="evergreencountdowntimer"]')
            .each(function() {
                var $this = $(this);
                var $target = $this.find(" > .op3-evergreen-countdown-timer");
                var props = _getProperties($target);

                var cookieName = props.type + ":" + OP3.Meta.pageId + ":" + props.uuid;
                var cookieValue = new Date().getTime() + ((props.days * 24 * 60 * 60 + props.hrs * 60 * 60 + props.mins * 60 + props.secs) * 1000);
                if (props.linked !== "none")
                    cookieValue = OP3.Cookie.get(props.type + ":" + props.linked) ? OP3.Cookie.get(props.type + ":" + props.linked).value : cookieValue;

                var oldCookie = OP3.Cookie.get(cookieName);
                if (!oldCookie)
                    OP3.Cookie.set(cookieName, cookieValue);

                var time = parseInt(oldCookie ? oldCookie.value : cookieValue);
                $target.countdown(new Date(time))
                    .on("update.countdown", _handleCountdownUpdate)
                    .on("finish.countdown", _handleCountdownFinish);
            });
    });

    /**
     * Countdown timer update event handler
     *
     * @param {Event} e
     */
    var _handleCountdownUpdate = function(e) {
        _template(e, this);
    }

    /**
     * Countdown timer finish event handler
     *
     * @param {Event} e
     */
    var _handleCountdownFinish = function(e) {
        var $target = $(e.target);
        var props = _getProperties($target);

        if (props.shouldRestart) {
            var restarted = _restartTimer($target);
            if (restarted)
                return;
        }

        if (props.finishAction === 'redirect') {
            var link = $target.attr("data-op3-redirect-url");
            _redirect(link);
        } else if (props.finishAction === 'text') {
            var text = $target.attr("data-op3-text");
            $target.hide();
            $target.parent().append('<h1 class="op3-countdown-text">' + text + '</h1>');
        } else if (props.finishAction === 'hide') {
            $target.hide();
        }
    }

    /**
     * When time expired check if timer
     * needs to be restarted.
     *
     * @param {Object} $target
     * @return {Boolean}
     */
    var _restartTimer = function($target) {
        var props = _getProperties($target);
        var restartAfter = (props.restartDays * 24 * 60 * 60 + props.restartHrs * 60 * 60) * 1000;
        var cookieName = props.type + ":" + OP3.Meta.pageId + ":" + props.uuid;
        var oldTime = OP3.Cookie.get(cookieName);
        var now = new Date();

        if (now.getTime() > parseInt(oldTime.value) + restartAfter) {
            var cookieValue = now.getTime() + (props.hrs * 60 * 60 + props.mins * 60 + props.secs) * 1000;
            OP3.Cookie.set(cookieName, cookieValue);
            $target.countdown(new Date(cookieValue));
            $target.show();

            return true;
        }

        return false;
    }

    /**
     * Redirect action on evergreencountdown finish
     *
     * @param {String} url
     * @return {Void}
     */
    var _redirect = function(url) {
        if (url.length > 0)
            window.location.replace(url);
    }

    /**
     * Get element properties value
     *
     * @param {Object} $target
     * @return {Object}
     */
    var _getProperties = function($target) {
        return {
            uuid: $target.parent().attr("data-op3-uuid") || "",
            type: $target.parent().attr('data-op3-element-type') || "",
            days: parseInt($target.attr("data-op3-day")) || 0,
            hrs: parseInt($target.attr("data-op3-hr")) || 0,
            mins: parseInt($target.attr("data-op3-min")) || 0,
            secs: parseInt($target.attr("data-op3-sec")) || 0,
            finishAction: $target.attr("data-op3-finish-action") || "",
            redirectUrl: $target.attr("data-op3-redirect-url") || "",
            text: $target.attr("data-op3-text") || "",
            shouldRestart: parseInt($target.attr("data-op3-restart-timer")) || 0,
            restartDays: parseInt($target.attr("data-op3-restart-day")) || 0,
            restartHrs: parseInt($target.attr("data-op3-restart-hr")) || 0,
            linked: $target.attr("data-op3-link-evergreen") || "",
        };
    }

    /**
     * Update evergreencountdowntimer template
     * on update event
     *
     * @param {Object} e
     * @param {Object} element
     * @return {Void}
     */
    var _template = function(e, element) {
        if (!(element instanceof jQuery))
            element = $(element);

        var dayTemplate = '' +
            '<div class="wrapper day">'+
                '<span class="digits day">%D</span><span class="units day">' + element.attr('data-op3-unit-day') + '</span>' +
            '</div>';
        var hrTemplate = '' +
            '<div class="wrapper hr">' +
                '<span class="digits hr">%H</span><span class="units hr">' + element.attr('data-op3-unit-hour') + '</span>' +
            '</div>';
        var minTemplate = '' +
            '<div class="wrapper min">' +
                '<span class="digits min">%M</span><span class="units min">' + element.attr('data-op3-unit-min') + '</span>' +
            '</div>';
        var secTemplate = '' +
            '<div class="wrapper sec">' +
                '<span class="digits sec">%S</span><span class="units sec">' + element.attr('data-op3-unit-sec') + '</span>' +
            '</div>';

        var template = '',
            day = e.strftime('%D'),
            hr = e.strftime('%H'),
            min = e.strftime('%M');

        if (day == 0 && hr == 0 && min == 0)
            template = secTemplate;
        else if (hr == 0 && min == 0)
            template = minTemplate + secTemplate;
        else if (day == 0)
            template = hrTemplate + minTemplate + secTemplate;
        else
            template = dayTemplate + hrTemplate + minTemplate + secTemplate;

        element.html(e.strftime(template));
    }

})(jQuery, window, document);
