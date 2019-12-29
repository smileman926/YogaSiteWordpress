export default class Integrations {
    /**
     * Init integrations
     */
    init() {
        this.addEvents();
    }

    /**
     * Load the URL into the iframe overlay
     *
     * @param url
     */
    loadIframeUrl(url) {
        let iframe = document.getElementById("opd-overlay-frame");
        let $iframe = jQuery("#opd-overlay-frame");

        // Clear contents
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write("");
        iframe.contentWindow.document.close();

        // Load URL and display
        $iframe.attr("src", url);
        jQuery("#opd-overlay").fadeIn();
    }

    /**
     * Close the overlay
     *
     * @return void
     */
    closeOverlay() {
        let el = document.getElementById("opd-overlay") ? document.getElementById("opd-overlay") : window.parent.document.getElementById("opd-overlay");
        jQuery(el).fadeOut();
    }

    /**
     * Add some event listeners
     */
    addEvents() {
        let self = this;

        jQuery('.js-opd-add-integration').on('click', function() {
            let url = jQuery(this).attr("href");
            self.loadIframeUrl(url);
            return false;
        });

        jQuery(".opd-choose-integration-connect").on("click", function() {
            let url = jQuery(this).attr("href");
            window.open(url);
            self.closeOverlay();
            return false;
        });

        jQuery('.opd-popup-close').on('click', function(e) {
            self.closeOverlay();

            e.preventDefault();
        });

        jQuery('.opd-choose-integration-key').on('click', function(e) {
            e.preventDefault();
            // hiding all of them if one is shown
            jQuery('.opd-popup-form-hidden').hide();
            jQuery('.opd-popup-fieldset').removeClass('opd-pale-background');
            jQuery(this).closest('.opd-popup-fieldset').addClass('opd-pale-background');
            jQuery(this).closest('.opd-popup-input-right').next('.opd-popup-form-hidden').fadeIn();
        });

        // Open modal for editing integration
        jQuery(".js-opd-edit-integration").on("click", function() {
            let url = jQuery(this).attr("href");
            self.loadIframeUrl(url);

            return false;
        });

        // Saving credentials for integrations
        jQuery('.opt-form-submit').on('click', function(e) {
            e.preventDefault();
            let $form = jQuery(this).closest(".opd-popup-form");
            let url   = $form.data("action-url");
            let data  = jQuery(this).parent().find(':input').serialize();

            jQuery.ajax({
                method: "POST",
                url:    url,
                data:   data
            }).done(function( result ) {
                alert(result.message);

                if (result.success) {
                    self.closeOverlay();
                    window.top.location.href = window.top.location.href;
                }
            });
        });

        // Disconnect the integration
        jQuery(".js-disconnect-integration-connection").click(function() {
            let $el            = jQuery(this);
            let confirmMessage = $el.data("confirm");
            let url            = $el.attr("href");
            let data           = { provider: $el.data("provider") };

            if (confirm(confirmMessage)) {
                jQuery.ajax({
                    method: "POST",
                    url:    url,
                    data:   data
                }).done(function( result ) {
                    window.OP3General.createSuccess(
                        'Success',
                        result.message
                    );

                    // alert(result.message);
                    if (result.success) {
                        setTimeout(function() {
                            window.top.location.href = window.top.location.href;
                        }, 1000);
                    }
                });
            }

            return false;
        });
    }
}

window.OPDashboard.Integrations = new Integrations;
jQuery(function() { window.OPDashboard.Integrations.init(); });
