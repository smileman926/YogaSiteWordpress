export default class Messages {
    /**
     * Init integrations
     */
    init() {
        this.addEvents();
    }

    addEvents() {
        jQuery('.js-ops-close-broadcast-message').click(function(e) {
            let $el = jQuery(this);
            let $message = $el.closest(".ops-alert");
            let uid = $message.data('message-uid');
            let confirmMessage = $el.data('confirm');
            let url = $message.data('read-url');
            let nonce = null
                || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                || (window.OpsScriptData && OpsScriptData.nonce ? OpsScriptData.nonce : "")
                || "";

            // Hide the message
            $message.fadeOut();

            // The mark as read
            jQuery.ajax({
                url: url,
                method: 'post',
                data: { _wpnonce: nonce, uid: uid },
                error: function () {
                    window.OPDashboard.Helpers.notify("Error occurred.", "error");
                }
            });

            e.preventDefault();
        });
    }
}

window.OPDashboard.Messages = new Messages;
jQuery(function() { window.OPDashboard.Messages.init(); });
