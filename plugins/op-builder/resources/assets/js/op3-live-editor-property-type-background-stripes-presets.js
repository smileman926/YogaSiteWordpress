/**
 * OptimizePress3 element type:
 * op3 property type background stripes presets manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * border input selector
     *
     * @type {Object}
     */
    var _selector = '.op3-element-options-property[data-op3-element-options-property-name="backgroundStripesPresets"]';

    /**
     * Widget template
     *
     * return {String}
     */
    var _template = [
        '<div class="background-stripes-presets-widget background-stripes-presets">',
            '<label>Progress Bar Style</label>',
            '<ul class="background-stripes-presets-list">',
                '<li class="background-stripes-presets-item">',
                    '<a href="#" class="background-stripes-preset background-stripes-preset-1" data-op3-preset-type="none"><span class="visually-hidden">Solid Colour</span></a>',
                '</li>',
                '<li class="background-stripes-presets-item">',
                    '<a href="#" class="background-stripes-preset background-stripes-preset-2" data-op3-preset-type="forward"><span class="visually-hidden">Stripes</span></a>',
                '</li>',
                '<li class="background-stripes-presets-item">',
                    '<a href="#" class="background-stripes-preset background-stripes-preset-3" data-op3-preset-type="backward"><span class="visually-hidden">Backward Stripes</span></a>',
                '</li>',
                '<li class="background-stripes-presets-item">',
                    '<a href="#" class="background-stripes-preset background-stripes-preset-4" data-op3-preset-type="wide-forward"><span class="visually-hidden">Wide Stripes</span></a>',
                '</li>',
                '<li class="background-stripes-presets-item">',
                    '<a href="#" class="background-stripes-preset background-stripes-preset-5" data-op3-preset-type="wide-backward"><span class="visually-hidden">Wide Backward Stripes</span></a>',
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
                .on("click", "[data-op3-preset-type]", _click)
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
        // var value = $(this).attr("data-op3-preset-value");
        var type = $(this).attr("data-op3-preset-type");
        var media = OP3.LiveEditor.deviceMedia();
        var element = OP3.Designer.activeElement();

        // Current color values
        element.setOption("backgroundStripes", type, media);

        e.preventDefault();
    }

    // init
    OP3.bind("elementoptionsrefresh::backgroundStripesPresets elementoptionsformprerender", _render);

})(jQuery, window, document);
