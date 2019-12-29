/**
 * OptimizePress3 element type:
 * op3 property type boxshadow manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * boxShadow input selector
     *
     * @type {Object}
     */
    var _selector = '.op3-element-options-property[data-op3-element-options-property-name="boxShadow"]';

    /**
     * Widget template
     *
     * return {String}
     */
    var _template = [
        '<div class="shadow-presets-widget shadow-presets-box-shadow">',
            '<label>Shadow Presets</label>',
            '<ul class="shadow-list">',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-1" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, 0) 0px 0px 0px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-2" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .07) 0px 4px 0px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-3" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .07) 4px 4px 0px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-4" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .43) 5px 5px 37px -4px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-5" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .27) 0px 0px 20px -4px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-6" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .14) 0px 0px 34px 6px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-7" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .33) 0px 0px 35px 1px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-8" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .11) 0px 13px 36px -1px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-9" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .45) 0px 27px 44px -22px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-10" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .3) 0px 17px 44px -2px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-11" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .45) 0px 4px 8px -1px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-12" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .25) 0px 14px 28px -10px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-13" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, .18) 0px 11px 10px -6px"></a>',
                '</li>',
            '</ul>',
        '</div>'
    ].join('');

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            $(_template)
                .attr("data-op3-element-options-property-proxy-id", $(this).attr("data-op3-element-options-property-id"))
                .on("click", "[data-op3-preset-value]", _click)
                .insertAfter(this);
        });
    }

    /**
     * Widget click preset event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        var $target = $(this);
        var $widget = $target.closest(".shadow-presets-widget");
        var $input = $widget.prevAll(_selector + ":first").find(".op3-element-options-property-input");
        var key = $widget.attr("data-op3-element-options-property-proxy-id");
        var value = $(this).attr("data-op3-preset-value");
        var media = OP3.LiveEditor.deviceMedia();

        if (value === "{null}")
            value = null;

        if (value) {
            var prop = OP3.Designer.activeElement().findProperty(key);
            var current = prop.getter(media) || prop.computed();
            var data = prop._parse(current);

            value = value
                .replace(/{color}/g, data.color)
                .replace(/{color-red}/g, data.colorRed)
                .replace(/{color-green}/g, data.colorGreen)
                .replace(/{color-blue}/g, data.colorBlue)
                .replace(/{color-alpha}/g, data.colorAlpha)
                .replace(/{offset-x}/g, data.offsetX)
                .replace(/{offset-y}/g, data.offsetY)
                .replace(/{blur}/g, data.blur)
                .replace(/{spread}/g, data.spread);
        }

        $input
            .val(value)
            .trigger("change");

        e.preventDefault();
    }

    // init
    OP3.bind("elementoptionsrefresh::boxShadow elementoptionsformprerender", _render);

})(jQuery, window, document);
