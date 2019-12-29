/**
 * OptimizePress3 element type:
 * op3 property type border presets manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * border input selector
     *
     * @type {Object}
     */
    var _selector = '.op3-element-options-property[data-op3-element-options-property-name="borderPresets"]';

    /**
     * Widget template
     *
     * return {String}
     */
    var _template = [
        '<div class="border-presets-widget border-presets">',
            '<label>Border Presets</label>',
            '<ul class="border-presets-list">',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-1" data-op3-preset-type="solid" data-op3-preset-value="0px,0px,0px,0px">No Border</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-2" data-op3-preset-type="solid" data-op3-preset-value="1px,1px,1px,1px">1px Border</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-3" data-op3-preset-type="solid" data-op3-preset-value="2px,2px,2px,2px">2px Border</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-4" data-op3-preset-type="solid" data-op3-preset-value="4px,4px,4px,4px">4px Border</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-5" data-op3-preset-type="solid" data-op3-preset-value="1px,1px,4px,1px">3d Border</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-6" data-op3-preset-type="outline" data-op3-preset-value="1px,1px,1px,1px">1px Outline</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-7" data-op3-preset-type="outline" data-op3-preset-value="2px,2px,2px,2px">2px Outline</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-8" data-op3-preset-type="outline" data-op3-preset-value="4px,4px,4px,4px">4px Outline</a>',
                '</li>',
                '<li class="border-presets-item">',
                    '<a href="#" class="border-preset border-preset-9" data-op3-preset-type="outline" data-op3-preset-value="1px,1px,4px,1px">3d Outline</a>',
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
        var value = $(this).attr("data-op3-preset-value");
        var type = $(this).attr("data-op3-preset-type");
        var media = OP3.LiveEditor.deviceMedia();
        var element = OP3.Designer.activeElement();

        // Current color values
        var color = element.getOption("color", true);
        var backgroundColor = element.getOption("backgroundColorOverlay", true);
        var borderColor = element.getOption("borderTopColor", true);
        var currentType = "solid";

        // If background is set to linear-gradient or radial-gradient,
        // we use gradient start color as background
        var backgroundType = element.getOption("backgroundImageOverlayType", true);
        if (backgroundType !== "none")
            backgroundColor = element.getOption("backgroundImageOverlayStartColor", true);

        // If background is transparent, we assume that the type is outline
        if (backgroundColor === "rgba(0, 0, 0, 0)" || backgroundColor === "transparent")
            currentType = "outline";

        // Set new colors only when type is changed
        if (type === "outline" && currentType === "solid") {

            // For outline, we want to force solid background
            if (backgroundType !== "none")
                element.setOption("backgroundImageOverlayType", "none", media);

            element.setOption("color", backgroundColor, media);
            element.setOption("borderTopColor", backgroundColor, media);
            element.setOption("borderRightColor", backgroundColor, media);
            element.setOption("borderBottomColor", backgroundColor, media);
            element.setOption("borderLeftColor", backgroundColor, media);
            element.setOption("backgroundColorOverlay", "transparent", media);
        }

        // Set new colors only when type is changed
        if (type === "solid" && currentType === "outline") {
            element.setOption("color", "#fff", media);
            element.setOption("borderTopColor", "rgba(0, 0, 0, 0.2)", media);
            element.setOption("borderRightColor", "rgba(0, 0, 0, 0.2)", media);
            element.setOption("borderBottomColor", "rgba(0, 0, 0, 0.2)", media);
            element.setOption("borderLeftColor", "rgba(0, 0, 0, 0.2)", media);
            element.setOption("backgroundColorOverlay", borderColor, media);
        }

        if (value) {
            var values = value.split(",");
            element.setOption("borderTopWidth", values[0], media);
            element.setOption("borderRightWidth", values[1], media);
            element.setOption("borderBottomWidth", values[2], media);
            element.setOption("borderLeftWidth", values[3], media);
        }

        e.preventDefault();
    }

    // init
    OP3.bind("elementoptionsrefresh::borderPresets elementoptionsformprerender", _render);

})(jQuery, window, document);
