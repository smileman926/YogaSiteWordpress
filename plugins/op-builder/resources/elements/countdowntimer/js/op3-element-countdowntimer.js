;(function($, window, document) {

    "use strict";

    $(function() {
        $('[data-op3-element-type="countdowntimer"]')
            .each(function() {
                var timer = $(this).find(" > .op3-countdown-timer"),
                    date = new Date(timer.attr("data-op3-date-time")),
                    link = timer.attr("data-op3-redirect-url"),
                    text = timer.attr("data-op3-text"),
                    method = timer.attr("data-op3-finish-action");

                timer.countdown(date)
                    .on("update.countdown", function(e) {
                        _template(e, this);
                    })
                    .on("finish.countdown", function() {
                        if (method === 'redirect')
                            _redirect(link);
                        else
                            timer.html('<h1>' + text + '</h1>');
                    });
            });
    });

    /**
     * Update countdowntimer template
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

    /**
     * Redirect action on countdown finish
     *
     * @param {String} url
     * @return {Void}
     */
    var _redirect = function(url) {
        if (url.length > 0)
            window.location.replace(url);
    }

})(jQuery, window, document);
