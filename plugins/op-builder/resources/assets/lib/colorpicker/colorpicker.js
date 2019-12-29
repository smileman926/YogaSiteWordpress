;(function($, Color, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";
    if (typeof Color === "undefined")
        throw "Missing dependency: Color" + "\n" + "https://github.com/fffilo/color";

    /**
     * Extend objects (additional arguments) into
     * target respecting getters and setters
     *
     * @param  {Object} target
     * @return {Object}
     */
    var _extend = function(target) {
        Array.prototype.slice.call(arguments, 1).forEach(function(item) {
            for (var prop in item) {
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(item, prop));
            }
        });

        return target;
    }

    /**
     * Initialize ColorPicker
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see ColorPicker.prototype._defaults
     * @return {Void}
     */
    var ColorPicker = function(element, options) {
        if (!(this instanceof ColorPicker))
            throw "ColorPicker: ColorPicker is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * ColorPicker prototype
     *
     * @type {Object}
     */
    _extend(ColorPicker.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            parent: null,
            color: null,
            default: "black",
            allowEmpty: false,
            autoClose: true,
            forceOpacity: false,
            anchorDistance: 8,
            widgetOffset: 24,
            align: "bottom right",

            //storage: [
            //    "red",
            //    "yellow",
            //    "lime",
            //    "cyan",
            //    "blue",
            //    "magenta",
            //],
            storage: [
                "#ffc32e",
                "#ff5839",
                "#c62039",
                "#8e1841",
                "#591e45",
            ],
            schemeVars: [
                "--color-scheme-1",
                "--color-scheme-2",
                "--color-scheme-3",
                "--color-scheme-4",
                "--color-scheme-5",
            ],
            format: "rgb",
            anchor: null,
            cssVarNode: null,
            link: '<a href="#" draggable="false" class="jquery-colorpicker-link jquery-colorpicker-preview jquery-colorpicker-preview-css"></a>',
            widget: ''
                + '<div class="jquery-colorpicker-widget" data-tab="storage">'
                + '<nav class="jquery-colorpicker-tabs">'
                + '<ul class="jquery-colorpicker-clearfix">'
                + '<li><a draggable="false" data-tab-open="storage" href="#">Recent</a></li>'
                /*+ '<li><a draggable="false" data-tab-open="scheme" href="#">Colour Scheme</a></li>'*/
                + '<li><a draggable="false" data-tab-open="scheme" href="#">&lt; Back to Palette</a></li>'
                + '</ul>'
                + '</nav>'
                + '<article class="jquery-colorpicker-tab-selected" data-tab-content="storage">'
                + '<div class="jquery-colorpicker-row jquery-colorpicker-split jquery-colorpicker-clearfix">'
                + '<ul class="jquery-colorpicker-storage jquery-colorpicker-list">'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"></a></li>'
                + '</ul>'
                + '<div><a title="Reset Colour" draggable="false" data-reset-color href="#">Reset Colour</a></div>'
                + '</div>'
                + '<div class="jquery-colorpicker-row jquery-colorpicker-split jquery-colorpicker-clearfix">'
                + '<div class="jquery-colorpicker-light jquery-colorpicker-draggable"></div>'
                + '<div class="jquery-colorpicker-hue jquery-colorpicker-draggable jquery-colorpicker-draggable-vertical"></div>'
                + '</div>'
                + '<div class="jquery-colorpicker-row">'
                + '<div class="jquery-colorpicker-alpha jquery-colorpicker-draggable jquery-colorpicker-draggable-horizontal"></div>'
                + '</div>'
                + '<div class="jquery-colorpicker-row">'
                + '<label>'
                + '<span class="jquery-colorpicker-preview jquery-colorpicker-preview-css"></span>'
                + '<input class="jquery-colorpicker-preview jquery-colorpicker-preview-hex" type="text" value="" />'
                + '</label>'
                + '<label class="jquery-colorpicker-float-right">'
                + '<span>Opacity</span>'
                + '<input class="jquery-colorpicker-preview jquery-colorpicker-preview-alpha" type="number" value="" min="0" max="100" maxlength="3" />'
                + '<span>%</span>'
                + '</label>'
                + '</div>'
                + '<div class="jquery-colorpicker-row">'
                + '<button class="jquery-colorpicker-action jquery-colorpicker-action-hide" type="button"><span>Done</span></button>'
                + '</div>'
                + '</article>'
                + '<article data-tab-content="scheme">'
                + '<div class="jquery-colorpicker-row jquery-colorpicker-split jquery-colorpicker-clearfix">'
                + '<ul class="jquery-colorpicker-scheme jquery-colorpicker-list">'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"><span>1</span></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"><span>2</span></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"><span>3</span></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"><span>4</span></a></li>'
                + '<li class="jquery-colorpicker-item"><a draggable="false" href="#"><span>5</span></a></li>'
                + '</ul>'
                + '<div><a title="Edit Scheme" draggable="false" data-tab-open="edit" href="#">Edit Scheme</a></div>'
                + '</div>'
                // + '<div class="jquery-colorpicker-row jquery-colorpicker-split jquery-colorpicker-clearfix">'
                // + '<div class="jquery-colorpicker-light jquery-colorpicker-draggable"></div>'
                // + '<div class="jquery-colorpicker-hue jquery-colorpicker-draggable jquery-colorpicker-draggable-vertical"></div>'
                // + '</div>'
                // + '<div class="jquery-colorpicker-row">'
                // + '<div class="jquery-colorpicker-alpha jquery-colorpicker-draggable jquery-colorpicker-draggable-horizontal"></div>'
                // + '</div>'
                // + '<div class="jquery-colorpicker-row">'
                // + '<label>'
                // + '<span class="jquery-colorpicker-preview jquery-colorpicker-preview-css"></span>'
                // + '<input class="jquery-colorpicker-preview jquery-colorpicker-preview-hex" type="text" value="" />'
                // + '</label>'
                // + '<span class="jquery-colorpicker-preview jquery-colorpicker-preview-scheme"></span>'
                // + '<label class="jquery-colorpicker-float-right">'
                // + '<span>Opacity</span>'
                // + '<input class="jquery-colorpicker-preview jquery-colorpicker-preview-alpha" type="number" value="" min="0" max="100" maxlength="3" />'
                // + '<span>%</span>'
                // + '</label>'
                // + '</div>'
                + '<div class="jquery-colorpicker-row">'
                + '<button class="jquery-colorpicker-action jquery-colorpicker-action-hide" type="button"><span>Done</span></button>'
                + '</div>'
                + '</article>'
                + '<article data-tab-content="edit">'
                + '<p>Customize the colours in your colour scheme for the page. Remember any locations where you have used colours from your color scheme will be updated when you change these colour selections.</p>'
                + '<p>...work in progress</p>'
                + '</article>',
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            this._element = $(this._element)
                .addClass("jquery-colorpicker")
                .on("change.jquerycolorpicker", this._handleInputChange.bind(this))
                .data("jquery-colorpicker", this)
                .get(0);

            // extend options
            this._options = $.extend(true, {}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // user interface: link/widget
            this.$ui = {};
            this.$ui.link = $(this.options.link)
                .addClass("jquery-colorpicker-link")
                .on("click.jquerycolorpicker", this._handleLinkClick.bind(this))
                .insertAfter(this.element);
            this.$ui.widget = $(this.options.widget)
                .addClass("jquery-colorpicker-widget")
            this.$ui.tabLink = this.$ui.widget
                .find("[data-tab-open]")
                    .on("click.jquerycolorpicker", this._handleTabsClick.bind(this));
            this.$ui.resetColor = this.$ui.widget
                .find("[data-reset-color]")
                .on("click.jquerycolorpicker", this._handleResetColorClick.bind(this));
            this.$ui.tabContent = this.$ui.widget
                .find("[data-tab-content]");
            this.$ui.storage = this.$ui.widget
                .find(".jquery-colorpicker-storage")
                    .on("click.jquerycolorpicker", "a", this._handleStorageClick.bind(this))
                    .find("a");
            this.$ui.scheme = this.$ui.widget
                .find(".jquery-colorpicker-scheme")
                    .on("click.jquerycolorpicker", "a", this._handleSchemeClick.bind(this))
                    .find("a");
            if ($(this.options.parent).length) {
                this.$ui.widget
                    .appendTo($(this.options.parent).first());
            }
            else {
                this._options.parent = null;
                this.$ui.widget
                    .insertAfter(this.$ui.link.length ? this.$ui.link : this.element);
            }

            // user interface: preview inputs and buttons
            this.$ui.preview = $(false)
                .add(this.$ui.link)
                .add(this.$ui.widget);
            this.$ui.preview = this.$ui.preview
                .filter(".jquery-colorpicker-preview")
                .add(this.$ui.preview.find(".jquery-colorpicker-preview"))
                    .on("change", this._handlePreviewChange.bind(this));

            // user interface: show/hide/toggle buttons
            this.$ui.actionShow = this.$ui.widget
                .find(".jquery-colorpicker-action-show")
                .on("click", this._handleActionShowClick.bind(this));
            this.$ui.actionHide = this.$ui.widget
                .find(".jquery-colorpicker-action-hide")
                .on("click", this._handleActionHideClick.bind(this));
            this.$ui.actionToggle = this.$ui.widget
                .find(".jquery-colorpicker-action-toggle")
                .on("click", this._handleActionToggleClick.bind(this));

            // user interface: light/hue/alpha
            this.$ui.light = this.$ui.widget.find(".jquery-colorpicker-light");
            this.$ui.hue = this.$ui.widget.find(".jquery-colorpicker-hue");
            this.$ui.alpha = this.$ui.widget.find(".jquery-colorpicker-alpha");

            // init draggable
            $(false)
                .add(this.$ui.light)
                .add(this.$ui.hue)
                .add(this.$ui.alpha)
                    .addClass(".jquery-colorpicker-draggable")
                    .on("mousedown.jquerycolorpicker", this._handleDraggableMousedown.bind(this))
                    .append('<span class="jquery-colorpicker-draggable-handle" />');

            // draggable handles
            this.$ui.lightDragHandle = this.$ui.light.find(".jquery-colorpicker-draggable-handle");
            this.$ui.hueDragHandle = this.$ui.hue.find(".jquery-colorpicker-draggable-handle");
            this.$ui.alphaDragHandle = this.$ui.alpha.find(".jquery-colorpicker-draggable-handle");

            // get current color string
            var color = new Color();
            $.each([ this.options.default, $(this.element).val(), this.options.color ], function(key, value) {
                var computed = this._getCssVar(value);
                if (computed === null)
                    computed = value;

                color.fromString(computed);
            }.bind(this));
            color = color.toString("rgb");

            // color property
            this._color = new Color();
            this.color.on("change", this._handleColorChange.bind(this));
            this.color.fromString(color);

            // using forceOpacity option if opacity is
            // zero on widget show
            this._startWithNullOpacity = false;

            this.refresh();
            this.reposition();

            $(this.element)
                .trigger("colorpickerinit", this.color);
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            var $element = $(this.element);

            this._dragCancel();
            this.hide()

            $(this.document)
                .off(".jquerycolorpicker");

            this.$ui.link
                .remove();
            this.$ui.widget
                .remove();

            this.$ui = null;
            this._color = null;
            this._options = null;
            this._element = null;

            $element
                .off(".jquerycolorpicker")
                .removeClass("jquery-colorpicker")
                .removeData("jquery-colorpicker")
                .trigger("colorpickerdestroy");
        },

        /**
         * Element property getter
         *
         * @return {Object}
         */
        get element() {
            return this._element;
        },

        /**
         * Window property getter
         *
         * @return {Object}
         */
        get window() {
            return this.document.defautView;
        },

        /**
         * Document property getter
         *
         * @return {Object}
         */
        get document() {
            return this.$ui.widget.get(0).ownerDocument;
        },

        /**
         * Options property getter
         * (result is extended object to
         * prevent user changes)
         *
         * @return {Object}
         */
        get options() {
            return $.extend(true, {}, this._options);
        },

        /**
         * Color property getter
         *
         * @return {Object}
         */
        get color() {
            return this._color;
        },

        /**
         * Get/set color value
         *
         * @param  {String} color (optional)
         * @return {Mixed}
         */
        value: function(color) {
            if (typeof color === "undefined")
                return this.color.toString(this.options.format);

            this.color.fromString(color);
        },

        /**
         * Show widget
         *
         * @return {Void}
         */
        show: function() {
            if (this.$ui.widget.is(".jquery-colorpicker-show"))
                return;

            var event = jQuery.Event("colorpickershow");
            $(this.element).trigger(event, this.color);
            if (event.isDefaultPrevented())
                return;

            // using forceOpacity option if opacity is
            // zero on widget show
            this._startWithNullOpacity = this.color._a === 0;

            // if colorpicker is intialized on at the time
            // invisible element then the position is wrong
            this.reposition();

            if ($(this.element).val())
                this.store();

            // display tab
            if (this._getSchemeDesc() !== null)
                this.tab("scheme");
            else
                this.tab("storage");

            // show
            this.$ui.widget
                .addClass("jquery-colorpicker-show");

            // autoClose
            if (this.options.autoClose)
                $(this.document)
                    .on("keydown.jquerycolorpicker", this._handleDocumentKeydown.bind(this))
                    .on("mousedown.jquerycolorpicker", this._handleDocumentMousedown.bind(this));

            var event = jQuery.Event("colorpickershown");
            $(this.element).trigger(event, this.color);
        },

        /**
         * Hide widget
         *
         * @return {Void}
         */
        hide: function() {
            if (!this.$ui.widget.is(".jquery-colorpicker-show"))
                return;

            var event = jQuery.Event("colorpickerhide");
            $(this.element).trigger(event, this.color);
            if (event.isDefaultPrevented())
                return;

            this._startWithNullOpacity = false;

            this.$ui.widget
                .removeClass("jquery-colorpicker-show");

            $(this.document)
                .off("mousedown.jquerycolorpicker")
                .off("keydown.jquerycolorpicker");

            if ($(this.element).val())
                this.store();
        },

        /**
         * Toggle widget
         *
         * @return {Void}
         */
        toggle: function() {
            if (this.$ui.widget.is(".jquery-colorpicker-show"))
                this.hide();
            else
                this.show();
        },

        /**
         * Get/set current tab
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        tab: function(value) {
            if (typeof value === "undefined")
                return this.$ui.widget.attr("data-tab");

            var select = this.$ui.tabContent.filter('[data-tab-content="' + value + '"]');
            if (!select.length)
                return;

            var event = jQuery.Event("colorpickertab", { detail: { tab: value } });
            $(this.element).trigger(event, this.color);
            if (event.isDefaultPrevented())
                return;

            this.$ui.widget.attr("data-tab", value);
            this.$ui.tabContent.removeClass("jquery-colorpicker-tab-selected");
            select.addClass("jquery-colorpicker-tab-selected");

            this.$ui.tabLink
                .removeClass("jquery-colorpicker-tab-selected")
                .filter('[data-tab-open="' + value + '"]')
                    .addClass("jquery-colorpicker-tab-selected");

            this.reposition();
        },

        /**
         * Get colors from storage option
         * merged with values in local
         * storage
         *
         * @return {Array}
         */
        storage: function() {
            var storage = localStorage.getItem("jquery-colorpicker") || [];
            try {
                storage = JSON.parse(storage) || [];
            }
            catch(e) {
                storage = [];
            }

            var result = $.extend([], this.options.storage, storage);
            result = result.slice(0, this.$ui.storage.length);

            return result;
        },

        /**
         * Append color to storage
         *
         * @return {Void}
         */
        store: function() {
            var storage = this.storage()
            var color = this.color.toString("rgb");
            if (this.color._a == 0)
                color = new Color("transparent").toString("rgb");
            var index = storage.indexOf(color)
            if (index !== -1)
                return this.refresh()

            storage.pop();
            storage.unshift(color);

            this._options.storage = storage;
            localStorage.setItem("jquery-colorpicker", JSON.stringify(storage));

            return this.refresh()
        },

        /**
         * Refresh widget
         *
         * @return {Void}
         */
        refresh: function() {
            var hsv = this.color.toHsv();
            var rgb = this.color.toString("rgb");
            var alpha = new Color().fromHsv(hsv.h, hsv.s, hsv.v, 1).toString("rgb");
            var hue = new Color().fromHsv(hsv.h, 1, 1, 1).toString("rgb");

            this._refreshInput(!this.options.allowEmpty);

            // preview
            this.$ui.preview.each(function(index, node) {
                if ($(node).is(".jquery-colorpicker-preview-css"))
                    $(node).css("color", rgb);
                else if ($(node).is(".jquery-colorpicker-preview-hex") && $(node).is("input,textarea"))
                    $(node).val(this.color.toString("hexa").substr(0, 7));
                else if ($(node).is(".jquery-colorpicker-preview-hex"))
                    $(node).text(this.color.toString("hexa").substr(0, 7));
                else if ($(node).is(".jquery-colorpicker-preview-hexa") && $(node).is("input,textarea"))
                    $(node).val(this.color.toString("hexa"));
                else if ($(node).is(".jquery-colorpicker-preview-hexa"))
                    $(node).text(this.color.toString("hexa"));
                else if ($(node).is(".jquery-colorpicker-preview-alpha") && $(node).is("input,textarea"))
                    $(node).val(Math.round(hsv.a * 100));
                else if ($(node).is(".jquery-colorpicker-preview-alpha"))
                    $(node).text(Math.round(hsv.a * 100));
                else if ($(node).is(".jquery-colorpicker-preview-scheme"))
                    $(node).html(this._getSchemeDesc() || "");
            }.bind(this));

            // set color/background to light/aplha
            this.$ui.light.css({ color: hue });
            this.$ui.alpha.css({ color: alpha });

            // set drag handle position
            this.$ui.lightDragHandle.css({ left: hsv.s * 100 + "%", top: 100 - hsv.v * 100 + "%" });
            if (this.$ui.hue.is(".jquery-colorpicker-draggable-vertical"))
                this.$ui.hueDragHandle.css({ top: hsv.h * 100 + "%" });
            else
                this.$ui.hueDragHandle.css({ left: hsv.h * 100 + "%" });
            if (this.$ui.alpha.is("jquery-colorpicker-draggable-vertical"))
                this.$ui.alphaDragHandle.css({ top: hsv.a * 100 + "%" });
            else
                this.$ui.alphaDragHandle.css({ left: hsv.a * 100 + "%" });

            // storage
            this.$ui.storage
                .each(function(index, node) {
                    $(node).css("color", this.storage()[index])
                    this._options.storage[index] = $(node).css("color");
                }.bind(this));

            // scheme
            this.$ui.scheme
                .each(function(index, node) {
                    var prop = this.options.schemeVars[index];
                    var value = this._getCssVar("var(" + prop + ")");

                    $(node)
                        .attr("data-scheme", prop)
                        .css("color", value);
                }.bind(this));
        },

        /**
         * Reposition absolute positioned
         * widget below link
         *
         * @return {Void}
         */
        reposition: function() {
            if (!this.options.parent)
                return;

            var rect = this._getRect();
            var offset = 0;
            var align = rect.align.split("-");
            if (align[0] === "top" || align[0] === "bottom")
                offset = (this.options.widgetOffset*1 || 0) + rect._rect.anchor.width / 2;
            else if (align[0] === "left" || align[0] === "right")
                offset = (this.options.widgetOffset*1 || 0) + rect._rect.anchor.height / 2;

            this.$ui.widget
                .attr("data-align", rect.align)
                .css({
                    visibility: "",
                    display: "",
                    top: rect.top + "px",
                    left: rect.left + "px",
                    "--arrow-offset": offset + "px",
                });
        },

        /**
         * Calculate widget rect box
         *
         * @return {Object}
         */
        _getRect: function() {
            var result = {
                align: null,
                width: null,
                height: null,
                left: null,
                top: null,
                marginTop: null,
                marginRight: null,
                marginBottom: null,
                marginLeft: null,
            }

            // align
            var re = /top|right|bottom|left/g;
            var match = this.options.align.match(re);
            if (!match)
                match = this._defaults.align.match(re);
            var align1 = match[0];
            var align2 = match[1];
            if (!align2 || align1 === align2)
                align2 = "center";
            result.align = align1 + "-" + align2;

            // can not get rect for elements with display none
            var css = this.$ui.widget.css([ "display", "visibility" ]);
            this.$ui.widget
                .attr("data-align", result.align)
                .css({
                    visibility: "hidden",
                    display: "block",
                });

            // get rect
            var pbox = this.$ui.widget.offsetParent().get(0).getBoundingClientRect();
            var wbox = this.$ui.widget.get(0).getBoundingClientRect();
            var abox = ($(this.options.anchor).get(0) || this.$ui.link.get(0)).getBoundingClientRect();

            // calc size
            result.width = wbox.width;
            result.height = wbox.height;
            result.margins = this.$ui.widget.css([ "marginTop", "marginRight", "marginBottom", "marginLeft" ]);
            Object.keys(result.margins).forEach(function(value, index) {
                result[value] = parseFloat(result.margins[value]);
            });
            delete result.margins;

            // calculate position
            if (align1 === "top")
                result.top = abox.top - pbox.top - wbox.height + this.$ui.widget.parent().scrollTop() ;
            else if (align1 === "bottom")
                result.top = abox.top - pbox.top + abox.height + this.$ui.widget.parent().scrollTop();
            else if (align1 === "left")
                result.left = abox.left - pbox.left - wbox.width;
            else if (align1 === "right")
                result.left = abox.left + abox.width - pbox.left;
            if (align2 === "top")
                result.top = abox.top - pbox.top + this.$ui.widget.parent().scrollTop();
            else if (align2 === "bottom")
                result.top = abox.top - pbox.top - wbox.height + abox.height + this.$ui.widget.parent().scrollTop();
            else if (align2 === "left")
                result.left = abox.left - pbox.left;
            else if (align2 === "right")
                result.left = abox.left - pbox.left + abox.width - wbox.width;
            else {
                if (align1 === "top" || align1 === "bottom")
                    result.left = abox.left - pbox.left + abox.width / 2 - wbox.width / 2;
                else
                    result.top = abox.top - pbox.top + abox.height / 2 - wbox.height / 2 + this.$ui.widget.parent().scrollTop();
            }

            // include margins
            result.top -= result.marginTop;
            result.left -= result.marginLeft;

            // anchor distance
            var offset = this.options.anchorDistance*1 || 0;
            if (align1 === "top")
                result.top -= offset;
            else if (align1 === "bottom")
                result.top += offset;
            else if (align1 === "left")
                result.left -= offset;
            else if (align1 === "right")
                result.left += offset;

            // widget offset
            offset = this.options.widgetOffset*1 || 0;
            if (align2 === "top")
                result.top -= offset;
            else if (align2 === "bottom")
                result.top += offset;
            else if (align2 === "left")
                result.left -= offset;
            else if (align2 === "right")
                result.left += offset;

            // default widget css
            this.$ui.widget.css(css);

            result._rect = {
                parent: pbox,
                widget: wbox,
                anchor: abox,
            }

            return result;
        },

        /**
         * Get css variable from
         * options.cssVarNode and
         * convert it to formated
         * color string
         *
         * @param  {String} prop
         * @return {Mixed}
         */
        _getCssVar: function(prop) {
            if (!prop || !this.options.cssVarNode)
                return null;

            var match = prop.match(/var\((--[\w-]+)\)/)
            if (!match)
                return null;

            var value = $(this.options.cssVarNode).css(match[1]);
            if (typeof value === "undefined")
                return null;

            var color = new Color();
            color.fromString(value);

            return color.toString(this.options.format);
        },

        /**
         * Get scheme description if current
         * color is an css variable
         * (description is taken from color
         * scheme link innerHTML)
         *
         * @return {Mixed}
         */
        _getSchemeDesc: function() {
            var match = this.element.value.match(/var\((--[\w-]+)\)/)
            if (!match)
                return null;

            var scheme = this.$ui.scheme.filter('[data-scheme="' + match[1] + '"]');
            var result = scheme.html();
            if (typeof result === "undefined")
                result = null;

            return result;
        },

        /**
         * Refresh input value (from this.color)
         * and trigger change event
         *
         * @param  {Boolean} force
         * @return {Void}
         */
        _refreshInput: function(force) {
            var value = $(this.element).val();
            var computed = this._getCssVar(value);
            if (computed === null)
                computed = value;
            var color = this.color.toString(this.options.format);
            if (computed === color)
                return;

            // allow empty value in input
            if (!computed && !force)
                return this.color.fromString(this.options.default);

            this._setInput(color);
        },

        /**
         * Set input value and trigger change
         *
         * @param {String} value
         * @return {Void}
         */
        _setInput: function(value) {
            var current = $(this.element).val();
            var computed = this._getCssVar(value);
            if (computed === null)
                computed = value;
            if (value === current)
                return;

            // from some reason jquery trigger change can
            // not be catched with addEventListener, so
            // we're using plain js here
            //$(this.element)
            //    .val(value)
            //    .trigger("change");

            this.element.value = value;
            this.element.dispatchEvent(new Event("change", { bubbles: true }));
        },

        /**
         * Initialize draggable event, store drag
         * calculations, bind events to documents
         * and reposition handle
         *
         * @param  {Object} e
         * @return {Void}
         */
        _dragInit: function(e) {
            this._refreshInput(true);

            var container = e.currentTarget;
            var $this = $(container);
            var $handle = $this.find(".jquery-colorpicker-draggable-handle");
            var offset = container.getBoundingClientRect();
            var hsva = this.color.toHsv();

            var direction = "xy";
            if ($this.is(".jquery-colorpicker-draggable-horizontal"))
                direction = "x";
            if ($this.is(".jquery-colorpicker-draggable-vertical"))
                direction = "y";

            var x = ((e.clientX - offset.left) / offset.width) * 100;
            x = Math.min(Math.max(x, 0), 100);
            var y = ((e.clientY - offset.top) / offset.height) * 100;
            y = Math.min(Math.max(y, 0), 100);

            $handle.css({
                left: x + "%",
                top: y + "%",
            });

            var drag = {
                container: container,
                property: undefined,
                handle: $handle.get(0),
                offset: offset,
                direction: direction,
                mouse: {
                    start: {
                        x: x,
                        y: y
                    },
                    drag: {
                        x: x,
                        y: y
                    }
                },
                color: {
                    start: {
                        h: hsva.h,
                        s: hsva.s,
                        v: hsva.v,
                        a: hsva.a
                    },
                    drag: {
                        h: hsva.h,
                        s: hsva.s,
                        v: hsva.v,
                        a: hsva.a
                    }
                }
            }

            if ($(container).is(".jquery-colorpicker-light"))
                drag.property = "light";
            else if ($(container).is(".jquery-colorpicker-hue"))
                drag.property = "hue";
            else if ($(container).is(".jquery-colorpicker-alpha"))
                drag.property = "alpha";
            this._drag = drag;

            $(this.document)
                .on("mousemove.jquerycolorpicker", this._handleDraggableMousemove.bind(this))
                .on("mouseup.jquerycolorpicker", this._handleDraggableMouseup.bind(this))
                .on("mouseleave.jquerycolorpicker", this._handleDraggableMouseleave.bind(this))
            $(this.document.documentElement)
                .addClass("jquery-colorpicker-draggable-dragging");
        },

        /**
         * Recalculate drag object and reposition handle
         *
         * @param  {Object} e
         * @return {Void}
         */
        _dragCalc: function(e) {
            var drag = this._drag;
            var x = ((e.clientX - drag.offset.left) / drag.offset.width) * 100;
            x = Math.min(Math.max(x, 0), 100);
            var y = ((e.clientY - drag.offset.top) / drag.offset.height) * 100;
            y = Math.min(Math.max(y, 0), 100);

            drag.mouse.drag.x = x;
            drag.mouse.drag.y = y;

           $(drag.handle).css({
                left: x + "%",
                top: y + "%",
            });

            if (drag.property === "light") {
                drag.color.drag.s = x/100;
                drag.color.drag.v = (100-y)/100;
            }
            else if (drag.property === "hue" && drag.direction === "x")
                drag.color.drag.h = x/100;
            else if (drag.property === "hue")
                drag.color.drag.h = y/100;
            else if (drag.property === "alpha" && drag.direction === "x")
                drag.color.drag.a = x/100;
            else if (drag.property === "alpha")
                drag.color.drag.a = y/100;

            if (this.options.forceOpacity && this._startWithNullOpacity) {
                this._startWithNullOpacity = false;
                drag.color.drag.a = 1;
            }

            this.color.fromHsv(drag.color.drag.h, drag.color.drag.s, drag.color.drag.v, drag.color.drag.a);
        },

        /**
         * Unbind document drag events
         *
         * @param  {Object} e
         * @return {Void}
         */
        _dragCancel: function(e) {
            $(this.document.documentElement)
                .removeClass("jquery-colorpicker-draggable-dragging");
            $(this.document)
                .off("mousemove.jquerycolorpicker")
                .off("mouseup.jquerycolorpicker")
                .off("mouseleave.jquerycolorpicker");

            delete this._drag;
        },

        /**
         * Element input change event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleInputChange: function(e) {
            if (this._drag)
                return;

            var value = $(e.target).val();
            var computed = this._getCssVar(value);
            if (computed === null)
                computed = value;

            this.color.fromString(computed);

            this.refresh();
        },

        /**
         * Preview inputs change event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handlePreviewChange: function(e) {
            if (!$(e.target).is("input,textarea"))
                return;

            var value = $(e.target).val();
            this._refreshInput(true);

            var hsv = this.color.toHsv();
            var color = new Color().fromHsv(hsv.h, hsv.s, hsv.v, hsv.a);

            if ($(e.target).is(".jquery-colorpicker-preview-hex")) {
                if (this.options.forceOpacity) {
                    this._startWithNullOpacity = false;
                    hsv.a = hsv.a || 1;
                }

                color.fromString(value);
                var newhsv = color.toHsv();
                color.fromHsv(newhsv.h, newhsv.s, newhsv.v, hsv.a);
                this.color.fromString(color.toString("rgb"));
            }
            else if ($(e.target).is(".jquery-colorpicker-preview-hexa")) {
                color.fromString(value);
                this.color.fromString(color.toString("rgb"));
            }
            else if ($(e.target).is(".jquery-colorpicker-preview-alpha")) {
                var alpha = hsv.a;
                if (value+"")
                    alpha = value/100;
                if (isNaN(alpha))
                    alpha = hsv.a;
                alpha = Math.max(0, alpha);
                alpha = Math.min(1, alpha);

                this.color.fromHsv(hsv.h, hsv.s, hsv.v, alpha);
            }

            this.refresh();
        },

        /**
         * Show action button click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleActionShowClick: function(e) {
            e.preventDefault();
            this.show();
        },

        /**
         * Hide action button click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleActionHideClick: function(e) {
            e.preventDefault();
            this.hide();
        },

        /**
         * Toggle action button click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleActionToggleClick: function(e) {
            e.preventDefault();
            this.toggle();
        },

        /**
         * Color change event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleColorChange: function(e) {
            this.refresh();

            $(this.element)
                //.trigger("change")
                .trigger("colorpickerchange", this.color);
        },

        /**
         * Link click event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleLinkClick: function(e) {
            this.toggle();
            e.preventDefault();
        },

        /**
         * Tab click event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleTabsClick: function(e) {
            this.tab($(e.currentTarget).attr("data-tab-open"));

            e.preventDefault();
        },

        /**
         * Reset colour click event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleResetColorClick: function (e) {
            var event = jQuery.Event("colorpickerreset");
            $(this.element).trigger(event, this.element);

            e.preventDefault();
        },

        /**
         * Recent color click event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleStorageClick: function(e) {
            var color = $(e.currentTarget).css("color");
            this._setInput(color);

            e.preventDefault();
        },

        /**
         * Scheme click event handler
         *
         * @param  {Void} e
         * @return {Void}
         */
        _handleSchemeClick: function(e) {
            var color = "var(" + $(e.currentTarget).attr("data-scheme") + ")";
            this._setInput(color);

            e.preventDefault();
        },

        /**
         * Document keydown event handler:
         * hide widget on ESC
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDocumentKeydown: function(e) {
            if (e.which === 27)
                this.hide();
        },

        /**
         * Document mousedown event handler:
         * hide on outside widget click
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDocumentMousedown: function(e) {
            if (this._drag)
                return;

            var $el = $(e.target).closest(".jquery-colorpicker, .jquery-colorpicker-link, .jquery-colorpicker-widget");
            if ($el.length && ($el.is(this.element) || $el.is(this.$ui.link) || $el.is(this.$ui.widget)))
                return;

            this.hide();
        },

        /**
         * Draggable element mousedown event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDraggableMousedown: function(e) {
            if (e.which !== 1)
                return;

            $(this.element)
                .trigger("colorpickerdragstarting");

            this._dragInit(e);
            this._dragCalc(e);

            $(this.element)
                .trigger("colorpickerdragstart", this.color);

            e.preventDefault();
        },

        /**
         * Document draggable mousemove event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDraggableMousemove: function(e) {
            this._dragCalc(e);

            $(this.element)
                .trigger("colorpickerdragmove", this.color);
        },

        /**
         * Document draggable mouseup event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDraggableMouseup: function(e) {
            this._dragCalc(e);
            this._dragCancel(e);

            $(this.element)
                .trigger("colorpickerdragstop", this.color);
        },

        /**
         * Document draggable mouseleave event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDraggableMouseleave: function(e) {
            this._handleDraggableMouseup(e);
        },

    });


    // jQuery plugin
    $.fn.colorpicker = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-colorpicker");

            // create new instance
            if (!lib)
                lib = new ColorPicker(this, typeof options === "object" ? options : {});

            // global methods
            if (typeof options === "string") {
                if (options.substr(0,1) !== "_" && options in lib && typeof lib[options] === "function") {
                    // execute
                    var result = lib[options].apply(lib, args);

                    // result, exit loop
                    if (typeof result !== "undefined") {
                        $this = result;
                        return false;
                    }
                }
                else
                    throw "ColorPicker: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window.Color, window, document);
