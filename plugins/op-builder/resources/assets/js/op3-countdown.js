/**
 * OptimizePress3 Live Editor Countdown Timer
 *
 * Dependencies:
 *     - jquery-countdown.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Init countdown timer
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _init = function(e, o) {
        $(o ? o.node : document)
            .find(".op3-countdown-timer")
                .each(function() {
                    var date = new Date($(this).attr("data-op3-date-time"));
                    $(this)
                        .countdown(date, function(e) {
                            _template(e, this);
                        })
                        .countdown("stop");
                });
    }

    /**
     * Generate template for
     * countdown timer
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
     * dateTime property change event.
     * Update countdowntimer with new date.
     *
     * @paramn {Object} e
     * @paramn {Object} o
     * @return {Void}
     */
    var _change = function(e, o) {
        if (!$(o.node).parent().length)
            return;

        var element = $(o.node)
            .find(".op3-countdown-timer");

        if (element.length === 0)
            return;

        var date = new Date(element.attr("data-op3-date-time"));
        element
            .countdown("remove")
            .countdown(date, function(e) {
                _template(e, element);
            })
            .countdown("stop");
    }

    OP3.bind("load elementappendfirst", _init);
    OP3.bind("elementchange::countdowntimer::dateTime", _change);
    OP3.bind("elementchange::countdowntimer::countdownTimerUnitDay elementchange::countdowntimer::countdownTimerUnitHour elementchange::countdowntimer::countdownTimerUnitMin elementchange::countdowntimer::countdownTimerUnitSec", _change);

})(jQuery, window, document);
