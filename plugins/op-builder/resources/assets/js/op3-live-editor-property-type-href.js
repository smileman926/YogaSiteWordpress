/**
 * OptimizePress3 element type:
 * op3 element type href additional manipulation.
 *
 * Creates a link preview button
 * and initializes autocomplete
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="href"]';

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
            var $container = $("<div/>")
                .addClass("op3-href-container")
            var $button = $("<a/>")
                .addClass("op3-href-preview")
                .attr("target", "_blank")
                .attr("href", "")
                .html('<span class="visually-hidden">Preview</span><i class="op3-icon op3-icon-eye-17-1"></i>');
            $this
                .wrap($container)
                .after($button);

            _autocomplete($this);

            // Set the preview href to the
            // value entered in the input
            $this.next().on("click", function() {
                $(this).attr("href", $(this).prev().val());
            });
        });
    }

    // Copied and slightly modified from op3-text-editor.js
    function _autocomplete($element) {
        // extract to OP3.nonce?
        var _nonce = null
            || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
            || "";

        // extract too autocomplete-url?
        var autocompleteUrl = (null
            || (window.OP3 && OP3.Meta ? OP3.Meta.api : "")
            || "/wp-json/op3/v1") + "/pages?type[]=post&type[]=page&_wpnonce=" + _nonce;

        $element
            .autocomplete({
                serviceUrl: autocompleteUrl,
                dataType: "json",
                transformResult: function(response) {
                    return {
                        suggestions: $.map(response, function(data) {
                            return {
                                value: data.post_title,
                                data: data.post_title,
                                permalink: data.permalink,
                            };
                        })
                    };
                },
                forceFixPosition: true,
                maxHeight: 200,
                appendTo: $element.parent(),
                onSearchStart: function(params) {
                    if (params.query.length <= 1)
                        return false;
                },
                onSelect: function(suggestion) {
                    $(this)
                        .val(suggestion.permalink)
                        .trigger("change");
                },
            });
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
