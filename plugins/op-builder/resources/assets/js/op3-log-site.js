/**
 * Display OptimizePress3 console log info.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Logo image url
     *
     * @type {String}
     */
    var _imgUrl = "img/logo.svg";

    /**
     * Logo image as ASCII
     *
     * @type {Array}
     */
    var _logo = [
        "                 ,++",
        "     `+++++++, ,++++",
        "    ++++;,:++ +++++:",
        "   ++'      `+++ ++",
        "  ++.      :++; ++:",
        " '+,      '++. :++",
        " ++     `'++` `++ .",
        ";+`    ++++   ++.++",
        "++    ++++,  ++; ++",
        "++   ++++++,++'  '+",
        "++      ; +++'   ;+",
        "++     '+;+++.   ++",
        "++    '+` +++    ++",
        ",+,   +;  ++     ++",
        " ++  '    +     ++",
        " ,++           :++",
        "  +++         :++",
        "   +++,     `+++",
        "    ,+++++++++'",
        "      ,+++++:",
    ].join("\n").split("").join(" ");

    /**
     * Logo color
     *
     * @type {String}
     */
    var _color = "#2346CA";

    /**
     * Log message
     *
     * @type {String}
     */
    var _message = "%cOptimizePress v" + OP3.version;

    /**
     * Display log
     *
     * @return {Void}
     */
    var _init = function() {
        if (!window.console || !window.console.log)
            return;
        if (sessionStorage.getItem("op3-log-site"))
            return;

        if (navigator.userAgent.search("Chrome") !== -1 || navigator.userAgent.search("Safari") !== -1 || navigator.userAgent.search("Opera") !== -1)
            _logWebkit();
        else if (navigator.userAgent.search("Firefox") !== -1)
            _logFirefox();
        else
            _logOther();

        sessionStorage.setItem("op3-log-site", "1");
    }

    /**
     * Display log for Chrome, Safari & Opera browsers
     *
     * @return {Void}
     */
    var _logWebkit = function() {
        var url = OP3.Meta.assets + "/" + _imgUrl;
        var msg = "%c00" + _message;
        var css = ""
            + "margin-right: 7px;"
            + "line-height: 16px;"
            + "font-size: 16px;"
            + "font-weight: bold;"
            + "background-image: url(" + url + ");"
            + "color: transparent;"
            + "background-repeat: no-repeat;"
            + "background-size: 100% 100%";
        var clr = "color: " + _color + ";"
            + "line-height: 16px;"
            + "font-size: 16px;"
            + "font-weight: normal;";

        // load image before showing log
        var img = new Image();
        img.onload = function() {
            console.log(msg, css, clr, ""); /*RemoveLogging:skip*/
        }
        img.src = OP3.Meta.assets + "/" + _imgUrl;
    }

    /**
     * Display log for Firefox browser
     *
     * @return {Void}
     */
    var _logFirefox = function() {
        var msg = "%c" + _message;
        var css = ""
            + "font-size: 16px;"
            + "font-weight: bold;"
            + "color: " + _color + ";";
        var clr = "color: " + _color;

        console.log(msg, css, clr, ""); /*RemoveLogging:skip*/
    }

    /**
     * Display log fallback
     *
     * @return {Void}
     */
    var _logOther = function() {
        var msg = _message.replace(/%c/g, "");
        console.log(msg); /*RemoveLogging:skip*/
    }

    // autoinit
    OP3.bind("domcontentloaded::designer", function(e, o) {
        if (OP3.layer !== e.origin.layer)
            return;

        _init();
    });

})(jQuery, window, document);
