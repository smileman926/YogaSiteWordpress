
;(function($, window, document) {

    "use strict";

    $(function() {
        $('[data-op3-element-type="contenttoggle"]')
            .each(function() {
                var $this = $(this);
                var closeOthers = $this
                    .find('.op3-contenttoggle-wrapper')
                    .attr("data-op3-close-other-tabs") || 0;

                $this.accordion({
                    questionClass: '.op3-contenttoggleitem-header',
                    answerClass: '.op3-contenttoggleitem-content',
                    itemClass: '.op3-element[data-op3-element-type="contenttoggleitem"]',
                    closeOthers: parseInt(closeOthers),
                });
            });
    });

})(jQuery, window, document);
