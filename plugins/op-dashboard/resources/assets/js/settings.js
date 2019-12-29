export default class Settings {
    /**
     * Init integrations
     */
    init() {
        this.addEvents();
    }

    addEvents() {
        jQuery('.ops-js-clear-cache').click(function(e) {
            let $el = jQuery(this);
            let url = $el.data('url');
            let confirmMessage = $el.data('confirm');

            if (confirm(confirmMessage)) {
                let nonce = null
                    || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                    || (window.OpsScriptData && OpsScriptData.nonce ? OpsScriptData.nonce : "")
                    || "";

                jQuery.ajax({
                    url: url,
                    method: 'post',
                    data: { _wpnonce: nonce },
                    success: function () {
                        window.OPDashboard.Helpers.notify("The cache was cleared.", "success");
                    },
                    error: function () {
                        window.OPDashboard.Helpers.notify("Error occurred when clearing the cache.", "error");
                    }
                });
            }

            e.preventDefault();
        });
    }
}

window.OPDashboard.Settings = new Settings;
jQuery(function() { window.OPDashboard.Settings.init(); });
