/**
 * OptimizePress3 property type:
 * border-radius manipulation
 */
;(function($, window, document) {

    "use strict";

    /**
     * borderTopLeftRadius input selector
     *
     * @type {Object}
     */
    var _selector = '.op3-element-options-property[data-op3-element-options-property-name="borderTopLeftRadius"]';

    /**
     * Template for border-radius manipulation
     *
     * @type {Array}
     */
    var _template = [
        '<div class="op3-element-options-property op3-element-options-border-radius-wrapper">',
            '<div class="op3-element-options-label-group">',
                '<label>Border Radius</label>',
            '</div>',
            '<div class="op3-element-options-corner-boxes">',
                '<div class="op3-corner-box top-left" data-op3-border-radius="topleft"></div>',
                '<div class="op3-corner-box top-right" data-op3-border-radius="topright"></div>',
                '<div class="op3-corner-box bottom-left" data-op3-border-radius="bottomleft"></div>',
                '<div class="op3-corner-box bottom-right" data-op3-border-radius="bottomright"></div>',
                '<div class="op3-corner-box all active" data-op3-border-radius="all"></div>',
            '</div>',
            '<input data-property-type="range" data-units="px, %" data-min-px="0" data-min-percent="0" data-max-px="100" data-max-percent="50" data-step-px="1" data-step-percent="1" data-precision-px="0" data-precision-px="0"/>',
        '</div>',
    ].join('');

    /**
     * Set choosen border active
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleActiveBorder = function(e) {
        $(e.target)
             .addClass("active")
            .siblings()
                .removeClass("active");
    }

 /**
     * Template input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleInputChange = function(e) {
        var value = $(e.target).val();
        var wrapper = $(e.target)
            .closest(".op3-element-options-border-radius-wrapper");

        var properties = wrapper
            .data("data-op3-element-options-property-proxy-ids");

        var border = wrapper
            .find('.op3-corner-box.active')
            .attr("data-op3-border-radius");

        $.each(properties, function(i, elem) {
            var $element = $(elem);
            var attr = $element
                .attr("data-op3-element-options-property-id");

            // specific border
            if (attr.toLowerCase().indexOf(border) !== -1)
                $element
                    .find("input")
                    .val(value)
                    .trigger("change");
            // all borders
            else if (border === "all")
                $element
                    .find("input")
                    .val(value)
                    .trigger("change");
        });
    }


    /**
     * Template border change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleBorderChange = function(e) {
        var $target = $(e.target);
        var border = $target
            .attr("data-op3-border-radius");

        var properties = $target
            .closest(".op3-element-options-border-radius-wrapper")
            .data("data-op3-element-options-property-proxy-ids");

        var property = properties
            .filter(function(i, v) {
                var attr = $(v).attr("data-op3-element-options-property-id");
                if (attr.toLowerCase().indexOf(border) !== -1)
                    return $(v);
            });

        var value = property
            .find("input")
            .val();

        if (!value) {
            value = properties
                .map(function(i, v) {
                    return $(v)
                        .find("input")
                        .val();
                })
                .get();

            var index = value.findIndex(function(number) {
                return parseInt(number) > 0;
            })

            value = value[index] || "0";
        }

        // Update inputRange input and slider
        // avoid trigger change
        $target
            .closest(".op3-element-options-border-radius-wrapper")
            .find('input.jquery-input-range-numeric')
                .val(parseInt(value));

        var range = $target
            .closest(".op3-element-options-border-radius-wrapper")
            .find('input.jquery-input-range-slider');

        range.val(parseInt(value));
        range.css("--jquery-input-range-slider", parseInt(value) + "%");

    }

    /**
     * For each sidebar input with
     * data-op3-element-options-property-name="borderTopLeftRadius"
     * initialize borders tool
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _init = function(e, o) {
        $(o.parent)
            .find(_selector)
                .each(function() {
                    var $template = $(_template);
                    var properties = $(this).nextAll().slice(0,3).add(this);
                    var value = properties
                        .map(function(i, v) {
                            return $(v)
                                .find("input")
                                .val();
                        })
                        .get();

                    var index = value.findIndex(function(number) {
                        return parseInt(number) > 0;
                    })

                    value = value[index] || "0";

                    var input = $template
                        .data("data-op3-element-options-property-proxy-ids", [])
                        .find('input[data-property-type="range"]');

                    input.val(parseInt(value))

                    input.inputRange({
                        data: {
                            property: "borderRadius",
                            element: null,
                            alias: {
                                "%": "percent",
                            }
                        }
                    })
                    .on('change', _handleInputChange);


                    $template
                        .data("data-op3-element-options-property-proxy-ids", properties);

                    $template
                        .find('.op3-corner-box')
                            .on('click', function(e) {
                                _handleActiveBorder(e);
                                _handleBorderChange(e);
                            });

                    $template
                        .insertBefore(this);
                });
    }

    var _refresh = function(e, o) {
        var $border = $(o.parent)
            .find(_selector)
            .filter('[data-op3-element-options-property-id="' + o.id + '"]');
        var value = $border
            .find("input")
            .val();

        $border
            .siblings(".op3-element-options-border-radius-wrapper")
            .find('[data-property-type="range"]')
            .val(value)
            .trigger("change");
    }

    // bind event
    OP3.bind("elementoptionsformprerender", _init);
    OP3.bind("elementoptionssync::*::borderTopLeftRadius", _refresh);

})(jQuery, window, document);
