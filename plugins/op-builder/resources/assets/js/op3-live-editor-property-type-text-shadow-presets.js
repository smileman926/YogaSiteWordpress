/**
 * OptimizePress3 textShadow property manipulation
 *
 * Extension which create range sliders
 * and colorpicker to manipulate
 * textShadow option.
 *
 * text-shadow: <color> <offset-x> <offset-y> <blur-radius>
 */
;(function($, window, document) {

    "use strict";

    /**
     * textShadow input selector
     *
     * @type {Object}
     */
    var _selector = '.op3-element-options-property[data-op3-element-options-property-name="textShadow"]';

    /**
     * Widget template
     *
     * return {String}
     */
    var _template = [
        '<div class="shadow-presets-widget shadow-presets-text-shadow">',
            '<label>Text Shadow Presets</label>',
            '<ul class="shadow-list">',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-1" data-op3-preset-value="rgba({color-red}, {color-green}, {color-blue}, 0) 0px 0px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-2" data-op3-preset-value="rgb({color-red}, {color-green}, {color-blue}, 0.3) 0px 2px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-3" data-op3-preset-value="rgb({color-red}, {color-green}, {color-blue}, 0.3) 2px 0px 0px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-4" data-op3-preset-value="rgb({color-red}, {color-green}, {color-blue}, 0.3) 0px 0px 2px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-5" data-op3-preset-value="rgb({color-red}, {color-green}, {color-blue}, 0.3) 0px 0px 40px"></a>',
                '</li>',
                '<li class="shadow-item">',
                    '<a href="#" class="shadow-preset shadow-preset-6" data-op3-preset-value="rgb({color-red}, {color-green}, {color-blue}, 0.3) 0px -2px 0px"></a>',
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
                .replace(/{h-shadow}/g, data.hShadow)
                .replace(/{v-shadow}/g, data.vShadow)
                .replace(/{blur-radius}/g, data.blurRadius);
        }

        $input
            .val(value)
            .trigger("change");

        e.preventDefault();
    }

    // init
    OP3.bind("elementoptionsrefresh::textShadow elementoptionsformprerender", _render);

})(jQuery, window, document);
