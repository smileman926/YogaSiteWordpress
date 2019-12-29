;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="integration"]';

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
                        // @todo - OP3.Integration.createThumb()???
                        + '<div class="op3-wizard-integration-thumb">'
                        + '<figure>'
                        + '<img src="" alt="" />'
                        + '</figure>'
                        + '<span>My Integration</span>'
                        + '<button type="button" class="op3-wizard-integration-trigger">Edit Integration</button>'
                        + '</div>';
                    $(html)
                        .insertAfter($wrapper);
                });
    }

    /**
     * Option refresh
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _refresh = function(e, o) {
        var $property = $(o.input).closest(".op3-element-options-property"),
            $widget = $property.nextAll(".op3-wizard-integration-thumb").first(),
            element = OP3.$(o.node),
            provider = element.getOption("optinIntegration", "all"),
            integration = OP3.Integrations.find(provider),
            image = integration ? integration.image : null,
            title = integration ? integration.title : null;

        $widget
            .find("img")
                .attr("src", image || "");
        $widget
            .find("span")
                .text(title || "");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionssync::*::optinIntegration", _refresh);

})(jQuery, window, document);
