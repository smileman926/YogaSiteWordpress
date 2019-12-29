/**
 * OptimizePress3 UI:
 *
 * Dependencies:
 *     - jQuery
 *     - alertify.js
 *     - op3-core.js
 *     - op3-ui.js
 */
;(function($, window, document) {

    "use strict";

    // library included?
    if (!("alertify" in window)) {
        return;
    }

    // options
    alertify.defaults.movable = false;
    alertify.defaults.transition = "zoom";

    // extending window.OP3.UI
    var that = OP3.UI;

    /**
     * Alertify alert box
     *
     * @param  {String}   title
     * @param  {String}   message
     * @param  {Function} onok
     * @return {Void}
     */
    that.alert = function(title, message, onok) {
        return alertify.alert(title, message, onok);
    }

    /**
     * Alertify confirm box
     *
     * @param  {String}   title
     * @param  {String}   message
     * @param  {Function} onok
     * @param  {Function} oncancel
     * @return {Void}
     */
    that.confirm = function(title, message, onok, oncancel) {
        return alertify.confirm(title, message, onok, oncancel);
    }

    /**
     * Alertify prompt box
     *
     * @param  {String}   title
     * @param  {String}   message
     * @param  {String}   value
     * @param  {Function} onok
     * @param  {Function} oncancel
     * @return {Void}
     */
    that.prompt = function(title, message, value, onok, oncancel) {
        return alertify.prompt(title, message, value, onok, oncancel);
    }

    /**
     * Alertify notify method
     *
     * @param  {String}   message
     * @param  {String}   type
     * @param  {Number}   wait
     * @param  {Function} callback
     * @return {Void}
     */
    that.notify = function(message, type, wait, callback) {
        return alertify.notify(message, type, wait, callback);
    }

    // no need for this anymore
    delete that._callback;

})(jQuery, window, document);
