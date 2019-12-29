;(function($, window, document) {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize AnglePicker
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see AnglePicker.prototype._defaults
     * @return {Void}
     */
    var AnglePicker = function(element, options) {
        if (!(this instanceof AnglePicker))
            throw "AnglePicker: AnglePicker is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * AnglePicker prototype
     *
     * @type {Object}
     */
    $.extend(AnglePicker.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            parent: null,
            roundStep: 45,
            startOffset: 0,
            prefix: "",
            suffix: "",
            inputUnit: true,
            widget: ''
                + '<div class="jquery-anglepicker-widget">'
                + '<div class="jquery-anglepicker-dragarea">'
                + '<span class="jquery-anglepicker-handle">'
                + '</span>'
                + '</div>'
                + '<input class="jquery-anglepicker-numeric" type="number" min="0" max="359" step="1" />'
                + '<div class="jquery-anglepicker-unit-container">'
                + '<a class="jquery-anglepicker-unit-item jquery-anglepicker-unit-item-selected" href="#" tabindex="-1" onclick="return false;">deg</a>'
                + '</div>'
                + '</div>'
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
             this._element = $(this._element)
                .addClass("jquery-anglepicker")
                .data("jquery-anglepicker", this)
                .get(0);

            // extend options
            this._options = $.extend(true, {}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // interface
            this.$ui = {};
            this.$ui.widget = $(this._options.widget);
            this.$ui.numeric = this.$ui.widget.find(".jquery-anglepicker-numeric");
            this.$ui.dragarea = this.$ui.widget.find(".jquery-anglepicker-dragarea");
            this.$ui.handle = this.$ui.dragarea.find(".jquery-anglepicker-handle");

            // bind events
            $(this._element).on("change.jqueryanglepicker", this._handleElementChange.bind(this))
            this.$ui.numeric.on("change.jqueryanglepicker", this._handleNumericChange.bind(this))
            this.$ui.dragarea.on("mousedown.jqueryanglepicker", this._handleDragareaMousedown.bind(this));

            // append widget to dom
            if ($(this._options.parent).length) {
                this.$ui.widget
                    .appendTo($(this.options.parent).first());
            }
            else {
                this._options.parent = null;
                this.$ui.widget
                    .insertAfter(this._element);
            }

            // values
            var value = this._degrees($(this._element).val());
            if (this.$ui.numeric.val() !== value+"")
                this.$ui.numeric
                    .val(value)
                    .trigger("change");

            $(this._element)
                .trigger("jqueryanglepickerinit");
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            //this._cancelDrag();

             $(document)
                .off(".jqueryanglepicker");

            this.$ui.widget
                .remove();

            this.$ui      = null;
            this._options = null;
            this._element = null;

            $(this._element)
                .off(".jqueryanglepicker")
                .removeClass("jquery-anglepicker")
                .trigger("anglepickerdestroy");
        },

        /**
         * Work in progress...
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Mixed}
         */
        options: function(key, value) {
            // pass
        },

        /**
         * Escape regular expression
         *
         * https://github.com/sindresorhus/escape-string-regexp
         *
         * @param  {String} value
         * @return {String}
         */
        _re: function(value) {
            return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        },

        /**
         * Remove prefix/suffix from value and
         * convert it to angle degrees (integer)
         * between 0 and 359
         *
         * @param  {Mixed}  value
         * @param  {Number} step  (optional)
         * @return {Number}
         */
        _degrees: function(value, step) {
            var result = value + "";
            result = result.replace(new RegExp("^" + this._re(this._options.prefix)), "");
            result = result.replace(new RegExp(this._re(this._options.suffix) + "$"), "");
            result = parseInt(result) || 0;

            if (step && step*1 > 1)
                result = step * Math.ceil(result / step);

            // normalize
            result = result % 360;
            if (result < 0)
                result += 360;

            return result;
        },

        /**
         * Initialize drag event
         *
         * @param  {Event} e
         * @return {Void}
         */
        _dragInit: function(e) {
            var drag = {};
            drag.target = e.currentTarget;
            drag.rect = drag.target.getBoundingClientRect();
            drag.center = {
                x: Math.round(drag.rect.left + (drag.rect.width / 2)),
                y: Math.round(drag.rect.top + (drag.rect.height / 2)),
            }
            this._drag = drag;

            var doc = this.$ui.widget.get(0).ownerDocument;
            $(doc)
                .on("mousemove.jqueryanglepicker", this._handleDragareaMousemove.bind(this))
                .on("mouseup.jqueryanglepicker", this._handleDragareaMouseup.bind(this))
                .on("mouseleave.jqueryanglepicker", this._handleDragareaMouseleave.bind(this))
            $(doc.documentElement)
                .addClass("jquery-anglepicker-dragarea-dragging");
        },

        /**
         * Execute drag event calculations
         *
         * @param  {Event} e
         * @return {Void}
         */
        _dragCalc: function(e) {
            var drag = this._drag;
            if (!drag)
                return;

            // calculate angle
            var deltaX = e.clientX - drag.center.x,
                deltaY = e.clientY - drag.center.y,
                angle = (Math.round(Math.atan2(deltaY, deltaX) * 180 / Math.PI) - (this._options.startOffset || 0)) % 360;

            // zero is at 3o'clock, make it at 12
            angle += 90;

            // normalize
            angle = this._degrees(angle, e.shiftKey ? this._options.roundStep : false);

            // render change
            if (this.$ui.numeric.val() !== angle+"")
                this.$ui.numeric
                    .val(angle)
                    .trigger("change");
        },

        /**
         * Cancel drag event
         *
         * @param  {Event} e
         * @return {Void}
         */
        _dragCancel: function(e) {
            var doc = this.$ui.widget.get(0).ownerDocument;
            $(doc.documentElement)
                .removeClass("jquery-anglepicker-dragarea-dragging");
            $(doc)
                .off("mousemove.jqueryanglepicker")
                .off("mouseup.jqueryanglepicker")
                .off("mouseleave.jqueryanglepicker");

            delete this._drag;
        },

        /**
         * Element change event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementChange: function(e) {
            var value = this._degrees($(e.target).val());
            if (this.$ui.numeric.val() !== value+"")
                this.$ui.numeric
                    .val(value)
                    .trigger("change")
                    .trigger("jqueryanglepickerchange");
        },

        /**
         * Numeric change event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleNumericChange: function(e) {
            var value = this._degrees($(e.target).val());
            if ($(this._element).val() !== (this._options.prefix || "") + value + (this._options.inputUnit ? "deg" : "") + (this._options.suffix || ""))
                $(this._element)
                    .val((this._options.prefix || "") + value + (this._options.inputUnit ? "deg" : "") + (this._options.suffix || ""))
                    .trigger("change");

            this.$ui.handle
                .attr("data-value", value)
                .css("transform", "rotate(" + (value + (this._options.startOffset || 0)) + "deg)");
        },

        /**
         * Dragarea mousedown event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDragareaMousedown: function(e) {
            if (e.which !== 1)
                return;

            $(this._element)
                .trigger("jqueryanglepickerdragstarting");

            this._dragInit(e);
            this._dragCalc(e);

            $(this._element)
                .trigger("jqueryanglepickerdragstart");

            e.preventDefault();
        },

        /**
         * Dragarea mousemove event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDragareaMousemove: function(e) {
            this._dragCalc(e);

            $(this._element)
                .trigger("jqueryanglepickerdragmove");
        },

        /**
         * Dragarea mouseup event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDragareaMouseup: function(e) {
            this._dragCalc(e);
            this._dragCancel(e);

            $(this._element)
                .trigger("jqueryanglepickerdragend");
        },

        /**
         * Dragarea mouseleave event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDragareaMouseleave: function(e) {
            this._handleDragareaMouseup(e);
        },

    });

    // jQuery plugin
    $.fn.anglepicker = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-anglepicker");

            // create new instance
            if (!lib)
                lib = new AnglePicker(this, typeof options === "object" ? options : {});

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
                    throw "AnglePicker: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window, document);
