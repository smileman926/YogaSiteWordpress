/**
 * OptimizePress3 element type:
 * op3 property type image url manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="image-url-preview"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            var $this = $(this);
            var $widget = $("<div />")
                .addClass("op3-image-url-preview-widget")
                .insertAfter($this);
            $("<button />")
                .addClass("op3-image-url-preview-set")
                .attr("type", "button")
                .on("click", _clickSet)
                .appendTo($widget);
            $("<button />")
                .attr("type", "button")
                .addClass("op3-image-url-preview-clear")
                .text("Remove Image")
                .on("click", _clickClear)
                .appendTo($widget);

            // bind, hide and refresh
            $this
                .on("change", _change)
                .css("display", "none");
            _change.call(this);
        });
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var value = $(this).val();
        var $widget = $(this).nextAll(".op3-image-url-preview-widget:first");

        $widget
            .css("background-image", value ? "url(" + value + ")" : "none");
        $widget
            .find(".op3-image-url-preview-set")
                .attr("title", value)
                .text(value ? "Replace Image" : "Set Image");
        $widget
            .find(".op3-image-url-preview-clear")
                .css("display", value ? "flex" : "none");
    }

    /**
     * Widget set button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickSet = function(e) {
        var $input = $(this).closest(".op3-image-url-preview-widget").prevAll(_selector + ":first");
        var value = $input.val();

        OP3.Media.modalImage(function(attach) {
            var url = attach.url;
            if (attach.settings && attach.settings.size && attach.sizes && attach.sizes[attach.settings.size] && attach.sizes[attach.settings.size].url)
                url = attach.sizes[attach.settings.size].url;

            if (url !== value)
                $input
                    .val(url)
                    .trigger("change");

            OP3.transmit("insertmedia", {
                node: OP3.Designer.activeElement().node(),
                property: $input.attr("data-op3-element-options-property-id"),
                attachment: attach,
            });
        });
    }

    /**
     * Widget clear button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickClear = function(e) {
        var $input = $(this).closest(".op3-image-url-preview-widget").prevAll(_selector).first();
        var value = $input.val();

        if (value !== "")
            $input
                .val("")
                .trigger("change");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
