export default class Ajax {
    /**
     * Init the library
     */
    init() {
        // And initialize all remote actions
        this.initRemoteActions();
    }

    /**
     * Initialize all remote actions on DOM elements
     */
    initRemoteActions() {
        let self = this;

        jQuery("body").on("click", "a[data-opd-remote]", function(e) {
            e.preventDefault();
            return self.fireRemoteAction(this);
        });

        jQuery("body").on("submit", "form[data-opd-remote]", function(e) {
            e.preventDefault();
            return self.submitRemoteForm(this);
        });
    }

    /**
     * Fires the remote action
     * @param  {object} el
     * @return {boolean}
     */
    fireRemoteAction(el) {
        const self         = this;
        const $el          = jQuery(el);
        const href         = $el.attr("data-action") || $el.attr("href");
        let method         = $el.attr("data-remote") ? $el.attr("data-remote").toLowerCase() : 'get';
        const id           = $el.attr("data-id");
        const before       = this.parseCallback($el.attr("data-before"));
        const after        = this.parseCallback($el.attr("data-after"));
        const callback     = this.parseCallback($el.attr("data-callback"));
        let redirectUrl    = $el.attr("data-redirect");
        const confirmation = $el.attr("data-confirm");
        const sendData     = {_token: this.token};
        const successMsg   = $el.attr("data-success-message");
        const errorMsg     = $el.attr("data-error-message");

        // Simulate PUT, PATCH and DELETE requests
        if (method === 'put' || method === 'patch' || method === 'delete') {
            sendData._method = method;
            method = 'post';
        }

        // Add the ID
        if (id) sendData.id = id;

        // Before action
        if (before) before($el);

        // Confirmation
        if (confirmation) {
            if ( ! self.confirm(confirmation)) {
                return false;
            }
        }

        if (href && method) {
            self.showLoader($el);

            jQuery.ajax({
                url:      href,
                data:     sendData,
                type:     method,
                dataType: 'json',
                success: function(response) {
                    // Call the callback method if defined
                    if (callback)               callback(response, $el);
                    else if (response.redirect) document.location = response.redirect;

                    if ( ! response.redirect && ! redirectUrl) {
                        self.alert(
                            null,
                            (response.message ? response.message : successMsg),
                            (response.message_type ? response.message_type : null)
                        );
                    }
                },
                error: function(el) {
                    const message = (el.responseJSON.message ? el.responseJSON.message : errorMsg);
                    if (message) self.alert(null, message, "error");
                },
                complete: function(response) {
                    if (after)            after(response, $el);
                    else if (redirectUrl) document.location = redirectUrl;

                    self.hideLoader($el);
                }
            });
        }

        return false;
    }

    /**
     * Submit the form via ajax
     *
     * @param  {object} el
     * @return {boolean}
     */
    submitRemoteForm(el) {
        const self         = this;
        const $el          = jQuery(el);
        const href         = $el.attr("action");
        let method         = $el.attr("data-remote") ? $el.attr("data-remote") : ($el.find("input[name=_method]").val() ? $el.find("input[name=_method]").val() : 'post');
        const before       = this.parseCallback($el.attr("data-before"));
        const after        = this.parseCallback($el.attr("data-after"));
        const callback     = this.parseCallback($el.attr("data-callback"));
        const redirectUrl  = $el.attr("data-redirect");
        const confirmation = $el.attr("data-confirm");
        const sendData     = this.serializeObject(el);
        const successMsg   = $el.attr("data-success-message");
        const errorMsg     = $el.attr("data-error-message");

        // Simulate PUT, PATCH and DELETE requests
        if (method === 'put' || method === 'patch' || method === 'delete') {
            sendData._method = method;
            method = 'post';
        }

        // Before action
        if (before) before($el);

        // Confirmation
        if (confirmation) {
            if ( ! self.confirm(confirmation)) {
                return false;
            }
        }

        if (href && method) {
            self.showLoader($el);

            jQuery.ajax({
                url:      href,
                data:     sendData,
                type:     method,
                dataType: 'json',
                success: function(response) {
                    // Call the callback method if defined
                    if (callback)               callback(response, $el);
                    else if (response.redirect) document.location = response.redirect;

                    self.alert(null, response.message ? response.message : "Success", response.message_type ? response.message_type : null);
                },
                error: function(el) {
                    const message = ((el.responseJSON && el.responseJSON.message) ? el.responseJSON.message : errorMsg);
                    if (message) self.alert("Error", message, "error");
                },
                complete: function(response) {
                    if (after)            after(response, $el);
                    else if (redirectUrl) document.location = redirectUrl;

                    self.hideLoader($el);
                }
            });
        }

        return false;
    }

    /**
     * Parse the callback string
     * @param  {string} callback
     * @return {Function}
     */
    parseCallback(callback) {
        if (callback) {
            return new Function(callback);
        }

        /*if (callback) {
            var method = window;
            var path   = callback.split(".");

            for (let i = 0; i < path.length; i++) {
                method = method[path[i]];
            }
            console.log(method);

            return method;
        }*/
    }

    /**
     * Confirmation
     *
     * @param  {string} message
     * @return {boolean}
     */
    confirm(message) {
        // const selft = this;
        /*if (_.isFunction(_this.app.confirm)) {
            test = _this.app.confirm(message);
            console.log(test);
            test = window.confirm(message);
            console.log(test);
        }*/

        return window.confirm(message);
    }

    /**
     * Display preloader
     *
     * @param  {object} $el
     * @return {void}
     */
    showLoader($el) {
        // if ($el) jQuery($el).stop().fadeTo(100, 0.5);
        //
        // jQuery(".loading").stop().fadeIn(100);
    }

    /**
     * Hides the preloader
     *
     * @param  {object} $el
     * @return {void}
     */
    hideLoader($el) {
        setTimeout(function() {
            // if ($el) jQuery($el).stop().fadeTo(100, 1);
            //
            // jQuery(".loading").stop().fadeOut(300);
        }, 300);
    }

    /**
     * Serialize form data to JSON object
     *
     * @param  {object} el
     * @return {object}
     */
    serializeObject(el) {
        if ( ! jQuery.fn.serializeArray) {
            return null;
        }

        var serialized = jQuery(el).serializeArray();

        // Make sure that unchecked
        // inputs have default value
        // This way hidden inputs are avoided
        jQuery(el).find("input:checkbox").each(function() {
            if (this.checked)
                return true;

            serialized.push({
                name: this.name,
                value: this.checked ? this.value : "0",
            });
        });

        return serialized;
    }

    /**
     * Show a notification
     * @type {void}
     */
    alert(title, message, alertType = "error") {
        if ( ! title && alertType === "error")   title = "Error";
        if ( ! title && alertType === "success") title = "Success";
        if ( ! alertType)                        alertType  = "success";

        if (message) {
            window.OPDashboard.Helpers.notify(message, alertType);
            // alert(message);
            // if (alertType === "error") window.OPDashboard.Helpers.modal(title, message, alertType);
            // else                       window.OPDashboard.Helpers.notification(message, alertType);
        }
    }
}

window.OPDashboard.Ajax = new Ajax;
jQuery(function() { window.OPDashboard.Ajax.init(); });
