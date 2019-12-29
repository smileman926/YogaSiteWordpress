/**
 * OptimizePress3 element type:
 * op3 property type color manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="device-visibility"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            // wrapper
            var $this = $(this);
            var $parent = $this.parent();
            var $widget = $("<div />")
                .addClass("jquery-select-buttons-widget")
                .appendTo($parent);

            // button for each device
            OP3.LiveEditor.forEachDevice(function(device, media) {
                var $button = $("<button />")
                    .addClass("jquery-select-buttons-option")
                    .attr("type", "button")
                    .attr("title", device.charAt(0).toUpperCase() + device.slice(1))
                    .attr("data-jquery-select-buttons-option-value", media)
                    .attr("data-jquery-select-buttons-option-media", media)
                    .attr("data-jquery-select-buttons-option-device", device)
                    .on("click", _click)
                    .appendTo($widget);
                $("<span />")
                    .addClass("jquery-select-buttons-option-text")
                    .text(device)
                    .appendTo($button);
                $("<span />")
                    .addClass("jquery-select-buttons-option-icon")
                    .appendTo($button);
            });

            // description
            $("<div />")
                .addClass("jquery-select-buttons-description")
                .text("None")
                .appendTo($parent);

            // bind, hide and refresh
            $this
                .on("change", _change)
                .css("display", "none");
            _change.call(this);
        });
    }

    /**
     * Widget button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        var element = OP3.Designer.activeElement();
        var defaultValue = OP3.Designer.getElementDefaultCssDisplay(element.type());
        var value = defaultValue;
        var device = $(this).attr("data-jquery-select-buttons-option-device");
        var media = $(this).attr("data-jquery-select-buttons-option-media");
        if ($(this).hasClass("jquery-select-buttons-option-selected"))
            value = "none";

        // when we set media desktop visibility, the
        // tablet and mobile medias should be set to
        // current computed (default?) value, not
        // inherit it from desktop
        var computed = null;
        OP3.LiveEditor.forEachDevice(function(key, item) {
            // append current media to computed
            if (computed === null && item === media) {
                computed = [ [value, media], ];
                return;
            }

            // still not current media
            else if (computed === null)
                return;

            // not set, append default value
            var prop = element.getOption("displayDeviceVisibility", item);
            if (prop === null)
                computed.push([defaultValue, item]);
        });

        // set option
        //
        (computed || []).forEach(function(item) {
            element.setOption("displayDeviceVisibility", item[0], item[1]);
        })
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var value = $(this).val();
        var $parent = $(this).parent();
        var $buttons = $parent.find(".jquery-select-buttons-option");
        var $desc = $parent.find(".jquery-select-buttons-description");
        var desc = [];

        $buttons.each(function() {
            var device = $(this).attr("data-jquery-select-buttons-option-device");
            var media = $(this).attr("data-jquery-select-buttons-option-media");
            var selected = value.indexOf(device) !== -1;

            $(this)
                .removeClass("jquery-select-buttons-option-selected")
                .addClass(selected ? "jquery-select-buttons-option-selected" : "_temp")
                .removeClass("_temp");

            if (selected)
                desc.push(device.charAt(0).toUpperCase() + device.slice(1));
        });

        if (!desc.length)
            desc = "None";
        else if (desc.length === 1)
            desc = desc[0] + " Only";
        else
            desc = desc.join(" & ");
        $desc.text(desc);
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
