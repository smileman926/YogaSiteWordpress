;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="membership"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent)
            .find(_selector)
                .each(function() {
                    var $select = $(this),
                        $wrapper = $select.closest(".op3-element-options-property");

                    $wrapper
                        .css("display", "none");

                    var html = ''
                        + '<div class="op3-wizard-membership-thumb">'
                        + '<figure>'
                        + '<img src="" alt="" />'
                        + '</figure>'
                        + '<span>Membership Options</span>'
                        + '<button type="button" class="op3-wizard-membership-trigger">Edit Membership Options</button>'
                        + '</div>';
                    $(html)
                        .insertAfter($wrapper);
                });
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
