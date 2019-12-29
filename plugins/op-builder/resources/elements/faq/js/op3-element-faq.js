
;(function($, window, document) {

    "use strict";

    $(function() {
        $('[data-op3-element-type="faq"]')
            .each(function() {
                var $this = $(this);
                var closeOthers = $this
                    .find('.op3-faq-wrapper')
                    .attr("data-op3-close-other-tabs") || 0;

                $this.accordion({
                    questionClass: '.op3-faqitem-header',
                    answerClass: '.op3-faqitem-content',
                    itemClass: '.op3-element[data-op3-element-type="faqitem"]',
                    closeOthers: parseInt(closeOthers),
                });
            });
    });

})(jQuery, window, document);
