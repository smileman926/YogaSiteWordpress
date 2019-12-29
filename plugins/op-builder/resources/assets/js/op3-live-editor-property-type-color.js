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
    var _selector = '[data-property-type="color"]';
    var _selector2 = '[data-property-type="color-simple"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var defaults = {
            parent: o.parent,
            format: "rgb",
            forceOpacity: true,
            anchorDistance: 8,
            widgetOffset: 12,
            cssVarNode: OP3.Designer.$ui.html,
            schemeVars: [
                "--op3-color-scheme-1",
                "--op3-color-scheme-2",
                "--op3-color-scheme-3",
                "--op3-color-scheme-4",
                "--op3-color-scheme-5",
            ],
        }

        // initialize colorpicker
        $(o.parent)
            .find(_selector + "," + _selector2)
                .on("colorpickerinit.op3colorpicker", _colorpickerInit)
                .on("colorpickertab.op3colorpicker", _colorpickerTab)
                .on("colorpickershow.op3colorpicker", _colorpickerShow)
                .on("colorpickershown.op3colorpicker", _colorpickerShown)
                .on("colorpickerdragstart.op3colorpicker", _colorpickerDragstart)
                .on("colorpickerdragstop.op3colorpicker", _colorpickerDragstop)
                .on("colorpickerreset.op3colorpicker", _colorpickerReset)
                .each(function() {
                    var options = $.extend(true, {}, defaults, {
                        parent: $(this).closest(".jquery-colorpicker-widget-parent,[data-op3-element-options-type]").get(0) || o.parent,
                    });

                    $(this).colorpicker(options);
                });
    }

    /**
     * Colorpicker init event handler
     * widget class color/color-simple
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerInit = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        lib.$ui.widget.addClass("jquery-colorpicker-type-" + $(this).attr("data-property-type"));

        // when colorpicker is only property in parent,
        // add inline class to propery wrapper. toolbar
        // will automatically open/close picker on tab
        // change (picker can not be always visible
        // 'cause then recent colors won't be saved
        // or refreshed)
        if ($(lib.options.parent).is(".jquery-colorpicker-widget-parent") && lib.$ui.widget.is(":last-child")) {
            var $prop = $(lib.element).closest(".op3-element-options-property");
            if ($prop.is(":first-child") && $prop.next().is(lib.$ui.widget)) {
                $(null)
                    .add(lib.$ui.widget)
                    .add($prop)
                        .addClass("jquery-colorpicker-inline");

                lib.$ui.link
                    .attr("data-op3-tab-focus-trigger", "click")
                    .attr("data-op3-tab-unfocus-trigger", "click");

                lib._options.autoClose = false;
            }
        }
    }

    /**
     * Colorpicker init event handler
     * open settings
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerTab = function(e, o) {
        if (e.detail.tab !== "edit")
            return;

        // @todo - refacture this!!!
        OP3.LiveEditor.$ui.sidebarTabs.find('[data-tab="settings"]').click();
        OP3.Designer.unfocus();
        e.preventDefault();
    }

    // reposition under/above
    var _colorpickerShow = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        if (lib.$ui.widget.hasClass("jquery-colorpicker-inline"))
            return;

        // get scrollParent on first show
        if (!lib.$ui.scrollParent)
            lib.$ui.scrollParent = lib.$ui.widget
                .parents()
                .filter(function() {
                    var $this = $(this);
                    var position = $this.css("position");
                    var overflow = $this.css("overflow-y");
                    var match = /(auto|scroll)/;

                    return position !== "static" && match.test(overflow);
                })
                .eq(0);

        // scroll parent element
        var scrollParent = lib.$ui.scrollParent.get(0) || document.documentElement;
        var scrollPosition = scrollParent.scrollTop;
        var scrollBox = scrollParent.getBoundingClientRect();

        // fix html box
        if (scrollParent === document.documentElement) {
            scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
            scrollBox.height = $(window).height();
        }

        // default position
        lib._options.align = "bottom-right";
        var rect = lib._getRect();

        // compare DOMRect of widget and scrollParent:
        // ...no place below, put it above
        if (lib._options.align === "bottom-right" && rect._rect.parent.top + rect.top + rect.marginTop + rect.height + rect.marginBottom > scrollBox.top + scrollBox.height + scrollPosition) {
            //console.log("_colorpickerShow", 0);
            lib._options.align = "top-right";
            rect = lib._getRect();
        }

        // ...no place above, put it right
        if (lib._options.align === "top-right" && rect._rect.parent.top + rect.top < scrollBox.top + scrollPosition) {
            lib._options.align = "right";
            rect = lib._getRect();
        }

        // ...no place right, put it left
        if (lib._options.align === "right" && rect._rect.parent.left + rect.left + rect.marginLeft + rect.width + rect.marginBottom > scrollBox.left + scrollBox.width) {
            lib._options.align = "left";
            rect = lib._getRect();
        }

        // ...still not right
        if (lib._options.align === "left" || lib._options.align === "right") {
            if (rect._rect.parent.top + rect.top + rect.marginTop + rect.height + rect.marginBottom > scrollBox.top + scrollBox.height + scrollPosition) {
                lib._options.align += "-bottom";
                rect = lib._getRect();
            }
            if (rect._rect.parent.top + rect.top < scrollBox.top + scrollPosition) {
                lib._options.align += "-top";
                rect = lib._getRect();
            }

            // ...this widget can not be placed anywhere,
            // put it back below (default position,
            // colorpickershown event will handle
            // scrollParent scroll)
            if (scrollParent !== document.documentElement && rect._rect.parent.left + rect.left < scrollBox.left) {
                lib._options.align = "bottom right";
                //rect = lib._getRect();
            }
        }
    }

    // scroll to viewport
    var _colorpickerShown = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        if (lib.$ui.widget.hasClass("jquery-colorpicker-inline"))
            return;

        var $scrollParent = lib.$ui.scrollParent;
        if (!$scrollParent.length)
            return;

        var heightWindow = $(window).scrollTop() + $(window).height();
        var rectParent = $scrollParent.get(0).getBoundingClientRect();
        var rectWidget = lib.$ui.widget.get(0).getBoundingClientRect();
        var marginWidget = {
            top: parseInt(lib.$ui.widget.css("margin-top")),
            bottom: parseInt(lib.$ui.widget.css("margin-bottom")),
        }

        if (rectWidget.top + rectWidget.height + marginWidget.bottom > heightWindow)
            $scrollParent.animate({
                scrollTop: rectWidget.top + rectWidget.height + marginWidget.bottom - rectParent.top - rectParent.height + $scrollParent.scrollTop(),
            }, 200);
    }

    // drag start
    var _colorpickerDragstart = function(e, o) {
        OP3.LiveEditor.$ui.body
            .addClass("op3-live-editor-user-select-off")
            .addClass("op3-live-editor-pointer-events-off");
    }

    // drag stop
    var _colorpickerDragstop = function(e, o) {
        OP3.LiveEditor.$ui.body
            .removeClass("op3-live-editor-pointer-events-off")
            .removeClass("op3-live-editor-user-select-off");
    }

    /**
     * Rest the color property to default
     * (null / default )
     *
     * @param {Object} e
     * @param {Object} o
     */
    var _colorpickerReset = function(e, o) {
        var key = $(this).attr("data-op3-element-options-property-id");
        var title = "Color Picker";
        var message = "Are you sure you want to reset the color to default?";
        var media = OP3.LiveEditor.deviceMedia();
        var element = OP3.Designer.activeElement();
        var style = element.style();
        var config = element.config(style);
        var options = config.style ? config.style.options : config.options;

        OP3.UI.confirm(title, message, function () {

            // check if initial value is set in options style
            // and set the style to it or null
            var value = null;
            if (options && options[key])
                value = options[key];

            element.setOption(key, value, media);
            // console.log("Reset color property `" + key + "` to `" + value + "`.");
        });
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
