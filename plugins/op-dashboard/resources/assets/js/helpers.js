import Alertify from 'alertify.js';

export default class Helpers {
    /**
     * Init integrations
     */
    init() {
        // Setup Alertify library
        Alertify.parent(document.getElementById("wpwrap"));
        Alertify.logPosition("bottom right");
        Alertify.closeLogOnClick(true);
        Alertify.delay(5000);

        // Init more UI stuff
        this.initLightbox();
    }

    /**
     * jQuery shorthand
     *
     * @param selector
     * @returns {*}
     */
    $(selector) {
        return window.jQuery(selector);
    }

    /**
     * Display a notification
     *
     * @param message
     * @param type
     */
    notify(message, type) {
        if (type === 'success') {
            Alertify.success(message);
        } else if (type === 'error') {
            Alertify.error(message);
        } else {
            Alertify.log(message);
        }
    }

    /**
     * Display alert
     *
     * @param message
     * @param type
     */
    alert(message, type) {
        // Alertify.alert(message);
        Alertify.alert(message);
    }

    /**
     * Confirmation box
     *
     * @param message
     * @param confirmed
     * @param dismissed
     */
    confirm(message, confirmed, dismissed) {
        Alertify.confirm(message, confirmed, dismissed);
    }

    initLightbox() {
        let imageSrc = '';

        jQuery('.js-image-lightbox-trigger').click(function() {
            imageSrc = jQuery(this).data('big-image');
            jQuery(".image-modal-img").attr('src', imageSrc);
        });

        jQuery('.template-image-modal').on('shown.bs.modal', function (e) {
            jQuery(".image-modal-img").attr('src', imageSrc);
        });

        jQuery('.template-image-modal').on('hide.bs.modal', function (e) {
            jQuery(".image-modal-img").attr('src', '');
        });
    }
}

window.OPDashboard.Helpers = new Helpers;
jQuery(function() { window.OPDashboard.Helpers.init(); });
