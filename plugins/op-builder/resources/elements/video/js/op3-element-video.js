;(function($, window, document) {

    "use strict";

    $(document).ready(function() {
        $(function() {
            $('[data-op3-element-type="video"] iframe').load(function() {
                $('[data-op3-element-type="video"] .op3-video-image-overlay')
                    .on("click", _handleVideoImageOverlayClick);
            })
        });
    });

    /**
     * Video image overlay click event handler
     *
     * @param {Event} e
     * @return {Void}
     */
    var _handleVideoImageOverlayClick = function(e) {
        var iframe = $(this).parent().find("iframe");

        var src = iframe.attr("src");
        if (src.indexOf("autoplay=0") !== -1) {
            src = src.replace("autoplay=0", "autoplay=1");
        } else {
            var symbol = src.indexOf("?") > -1 ? "&" : "?";
            src = src += symbol + "autoplay=1";
        }

        iframe.attr("src", src);
        $(this).css("display", "none");
    }

})(jQuery, window, document);
