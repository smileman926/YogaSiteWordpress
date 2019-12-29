;(function($, window, document) {

    "use strict";

    /**
     * Custom form validation.
     * Validation check if inputs
     * are empty and required.
     *
     * @return {Boolean}
     */
    var _customValidation = function() {
        var result = false;
        var $inputs = $(this)
            .find('input.op3-element-input-edit-text');

        // Clear old error messages
        $inputs
            .parent('.op3-element-input-edit')
            .siblings('.op3-element-input-edit-error')
            .remove();

        // Check and display error messages
        $inputs
            .each(function(index, input) {
                var $input = $(input);

                if (($input.attr("type") === "text" && $input.attr('required') && $input.val() === "") ||
                    ($input.attr("type") === "checkbox" && $input.attr('required') && !$input.is(":checked"))) {
                    var msg = $input.attr('data-op3-validation-message') || $input.attr('data-op-validation-message');

                    $input
                        .closest('.op3-element-input-wrapper')
                        .append('<p class="op3-element-input-edit-error">' + msg + '</p>');

                    result = true;
                }
            });

        return result;
    }

    /**
     * Serialize form fields:
     * convert node list to key/value object
     *
     * @return {Object}
     */
    var _serializeFields = function() {
        var result = {};

        $(this)
            .each(function() {
                var key = $(this).attr("name");

                // remove unnecessary
                if (key === "op3-dummy")
                    return;
                if (key === "optin-gdpr-activate")
                    return;
                if (/^optin-post-action/.test(key))
                    return;
                var value = $(this).val();

                // checkboxes send it's value only if they
                // are checked. we should send not-checked
                // and not-visible state to api as well, so
                // false means that it's not checked, and
                // null that it's not visible
                if ($(this).attr("type") === "checkbox") {
                    var checked = $(this).is(":checked");
                    var visible = $(this).is(":visible");

                    if (!checked && visible) {
                        value = false;
                    }
                    else if (!checked && !visible)
                        value = null;
                }

                // set key/value
                result[key] = value;

                // some gdpr stuff
                if (key === "optin-gdpr-consent-1")
                    result["optin-gdpr-message-1"] = $(this).closest("label").text();
                if (key === "optin-gdpr-consent-2")
                    result["optin-gdpr-message-2"] = $(this).closest("label").text();
            });

        // send button message for gdpr purpose
        result["optin-button-message"] = $(this).closest("form").find('.op3-element[data-op3-element-type="button"] .op3-text-container').text();

        return result;
    }

    /**
     * Form submit event handler
     *
     * @param  {Event} e
     * @return {Void}
     */
    var _handleFormSubmit = function(e) {
        // check first out custom validation
        if (_customValidation.call(this)) {
            e.preventDefault();
            return;
        }

        // then run default form validation
        if (this.checkValidity()) {
            var $fields = $(this)
                .find("[name]:not(:disabled)")
                    .attr("disabled", "disabled");
            var params = _serializeFields.call($fields);

            $(this)
                .find('[data-op3-element-type="button"] a')
                    .removeAttr("href")
                    .blur();

            $.ajax({
                url: $(this).attr("action"),
                type: "post",
                //dataType: "json",
                //contentType: "application/json; charset=utf-8",
                data: params,
                success: _handleApiSuccess.bind($fields),
                error: _handleApiError.bind($fields),
                beforeSend: _handleBeforeSend.bind(this),
            });
        }
        else
            $(this)
                .find('[type="submit"]')
                    .click();

        e.preventDefault();
    }

    /**
     * Submit button click event handler
     *
     * @param  {Event} e
     * @return {Void}
     */
    var _handleSubmitClick = function(e) {
        if ($(this).attr("href"))
            $(this)
                .closest("form")
                    .submit();

        e.preventDefault();
    }

    /**
     * Api success response event handler
     *
     * @param  {Mixed}  data
     * @param  {String} textStatus
     * @param  {Object} jqXHR
     * @return {Void}
     */
    var _handleApiSuccess = function(data, textStatus, jqXHR) {
        var params = {};
        var urlData = "";

        $(this)
            .each(function() {
                var $this = $(this);

                params[$this.attr("name")] = $this.val();

                // If defined use url mapping for name, otherwise input name attribute
                var urlParameterName = "";
                if ($this.data("op-url-mapping")) {
                    urlParameterName = $this.data("op-url-mapping") ? $this.data("op-url-mapping") : $this.attr("name");
                } else {
                    urlParameterName = $this.data("op3-url-mapping") ? $this.data("op3-url-mapping") : $this.attr("name");
                }
                if ($this.is(":visible"))
                    urlData += "&" + urlParameterName + "=" + encodeURIComponent($this.val());
            });

        var button = $(this.context)
            .find('.op3-element[data-op3-element-type="button"]');

        // Remove button spinner and opacity
        _removeButtonLoadingState(button);

        // Remove old notifications
        $(this.context).closest(".op3-element ").find(".op3-form-notification").remove();

        if (params["optin-post-action"] === "notification" && params["optin-post-action-notification-text"]) {
            var form = $(this).parent("form");
            var notification = $("<div />")
                .text(params["optin-post-action-notification-text"])
                .addClass("op3-form-notification");

            notification.insertBefore(form);
            form.remove();
        }
        else if (params["optin-post-action"] === "redirect" && params["optin-post-action-redirect-url"]) {
            var url = params["optin-post-action-redirect-url"];
            if (params["optin-post-action-redirect-autofill"]*1) {
                url += url.split("?").length > 1 ? "&" : "?";
                url += urlData.substring(1);
            }

            window.location.href = url;
        }
        else if (params["optin-post-action"] === "popoverlay") {
            var id = params["optin-post-action-popoverlay-trigger"];

            // If form is in popoverlay,
            // close current one before
            // opening new
            $(this)
                .closest(".op3-popoverlay-wrapper")
                .find(".op3-popoverlay-close")
                .trigger("click");

            OP3.PopOverlay.open(id);
        }
        else if (params["optin-post-action"] === "hidePopoverlay") {
            // var id = params["optin-post-action-popoverlay-trigger"];

            // If form is in popoverlay,
            // close current one before
            // opening new
            $(this)
                .closest(".op3-popoverlay-wrapper")
                .find(".op3-popoverlay-close")
                .trigger("click");
        }
        else if (params["optin-post-action"] === "nextFunnelStep") {
            var redirectUrl = (data && data.data && data.data.redirect_url) ? data.data.redirect_url : false;

            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
        else if (params["optin-post-action"] === "goToFunnelStep") {
            var redirectUrl = (data && data.data && data.data.redirect_url) ? data.data.redirect_url : false;

            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    }

    /**
     * Api error response event handler
     *
     * @param  {Object} jqXHR
     * @param  {String} textStatus
     * @param  {String} errorThrown
     * @return {Void}
     */
    var _handleApiError = function(jqXHR, textStatus, errorThrown) {
        var params  = {};
        var urlData = "";
        var code    = jqXHR.status;

        $(this)
            .each(function() {
                var $this = $(this);

                params[$this.attr("name")] = $this.val();

                // If defined use url mapping for name, otherwise input name attribute
                var urlParameterName = "";
                if ($this.data("op-url-mapping")) {
                    urlParameterName = $this.data("op-url-mapping") ? $this.data("op-url-mapping") : $this.attr("name");
                } else {
                    urlParameterName = $this.data("op3-url-mapping") ? $this.data("op3-url-mapping") : $this.attr("name");
                }
                if ($this.is(":visible"))
                    urlData += "&" + urlParameterName + "=" + encodeURIComponent($this.val());
            });

        // Get all form elements and data
        var form         = $(this).parent("form");
        var notification = $("<div />");
        var button       = $(this.context).find('.op3-element[data-op3-element-type="button"]');
        var response     = jqXHR.responseJSON;
        var message      = 'Something went wrong.';
        _removeButtonLoadingState(button);

        // Remove old notifications
        $(this.context).closest(".op3-element ").find(".op3-form-notification").remove();

        if (code == 409) {
            message = (response && response.message) ? response.message : 'You are already subscribed.';
            notification.text(message).addClass("op3-form-notification").addClass("warning-notification");
        } else if (code == 401 || code == 403) {
            message = 'API authorization error.';
            notification.text(message).addClass("op3-form-notification").addClass("error-notification");
        } else {
            message = (response && response.message) ? response.message : 'Something went wrong.';
            notification.text(message).addClass("op3-form-notification").addClass("error-notification");
        }

        // Append notification to form
        notification.insertBefore(form).animate({'left':(-4)+'px'}, 120)
            .animate({'left':(+4)+'px'}, 120)
            .animate({'left':(-4)+'px'}, 120)
            .animate({'left':(+4)+'px'}, 120)
            .animate({'left':(0)+'px'}, 120)
        ;

        // Enable fields
        form.find("[name]:disabled")
            .removeAttr("disabled");
        form.find('[data-op3-element-type="button"] a')
            .attr("href", "#")
            .focus();

        // @todo
        // alert("ERROR: " + errorThrown);
    }

    /**
     * Remove the loading state of the button
     *
     * @param button
     * @private
     */
    var _removeButtonLoadingState = function(button) {
        // Remove button spinner and opacity
        button
            .find('[data-op3-background="overlay"]')
            .css("opacity", "");

        button
            .find(".submitting")
            .remove();

        button
            .find('.op3-text-container, .op3-subtext')
            .css("display", "");
    }

    /**
     * Before send response to api event handler
     *
     * @return {Void}
     */
    var _handleBeforeSend = function() {
        // Show button spinner and set opacity
        var $this = $(this);
        $this
            .find('[data-op3-background="overlay"]')
            .css("opacity", 0.65);

        $this
            .find(".op3-text-container, .op3-subtext")
            .css("display", "none");

        $this
            .find("a")
            .append('<div class="submitting"></div>');
    }

    // Initialize google recaptcha
    window.op3GrecaptchaInit = function() {
        var siteKey = OP3.GoogleRecaptcha.googleRecaptchaSiteKey;

        if (!siteKey)
            return;

        $('[data-op3-element-type="form"] form')
            .each(function() {
                // adding Recaptcha token
                var that = $(this);
                grecaptcha.ready(function () {
                    grecaptcha.execute(siteKey, {action: 'op3optin'}).then(function (token) {
                        // append hidden field with google's token
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'op3-grecaptcha-token',
                            value: token
                        }).appendTo(that);

                        // show Google badge as it is needed
                        var badge = $('.grecaptcha-badge');
                        badge.show();
                        badge.css("visibility", "visible");
                    });
                });
            });
    };

    // initialize
    $(function() {
        // Loading google recaptcha asyncronously
        var siteKey = OP3.GoogleRecaptcha.googleRecaptchaSiteKey;
        if (siteKey && typeof grecaptcha === "undefined") {
            var ref = document.getElementsByTagName('script')[0];
            var script = document.createElement('script');
            script.async = true;
            script.src = "https://www.google.com/recaptcha/api.js?onload=op3GrecaptchaInit&render=" + siteKey;
            ref.parentNode.insertBefore(script, ref);
        } else {
            op3GrecaptchaInit();
        }

        $('[data-op3-element-type="form"] form')
            .each(function() {
                $(this)
                    .on("submit", _handleFormSubmit)
                    .find('[data-op3-element-type="button"] a')
                        .on("click", _handleSubmitClick);
            });
    });



})(jQuery, window, document);
