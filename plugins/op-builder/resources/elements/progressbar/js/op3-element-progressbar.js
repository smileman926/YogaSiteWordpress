;(function($, window, document) {

    // Don't use this if IntersectionObserver
    // isn't supported by the browser
    if (!'IntersectionObserver' in window &&
        !'IntersectionObserverEntry' in window &&
        !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        return false;
    }

    // Globalize open popoverlay handler, because
    // we want to be able to open it manually,
    // for example, on optin form submit
    window.OP3 = window.OP3 || {};
    OP3.ProgressBar = {};
    OP3.ProgressBar.init = function() {

        var $progressbars = $('.op3-element[data-op3-element-type="progressbar"]');
        if (!$progressbars) return false;

        // When element enters the viewport, we animate it
        // by removing no-animation class from html
        // (see progressbar/sass/op3-element.scss)
        // and remove the observe listener
        var observerCallback = function(entries, observer) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;

                $(entry.target).removeClass("op3-progressbar-no-animaton");
                OP3.ProgressBar.observer.unobserve(entry.target);
            });
        };

        OP3.ProgressBar.observer = new IntersectionObserver(observerCallback);
        $progressbars.each(function() {
            // Only if animation is turned on for the element
            if (!$(this).find('.op3-progressbar-content[data-op3-animation-toggle="1"]')) return;

            $(this).addClass("op3-progressbar-no-animaton");
            OP3.ProgressBar.observer.observe(this);
        });
    }

    // Init
    $(document).ready(function() {
        OP3.ProgressBar.init();
    });

})(jQuery, window, document);