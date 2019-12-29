;(function($, window, document) {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize PaddingDrag
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see PaddingDrag.prototype._defaults
     * @return {Void}
     */
    var PaddingDrag = function(element, options) {
        if (!(this instanceof PaddingDrag))
            throw "PaddingDrag: PaddingDrag is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * PaddingDrag prototype
     *
     * @type {Object}
     */
    $.extend(PaddingDrag.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            parent: null,
            positions: ["top", "bottom"],
            html: '<div data-jquery-paddingdrag=""></div>',
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            var $element = $(this._element);

            // Verify that the element is set to position:relative,
            // to ensure it works properly in Firefox
            // if ($element.css("position") !== "relative") {
            //     console.error("Element: ", this._element);
            //     throw new Error("Element must be set to position relative for PaddingDrag widget to work properly in Firefox.");
            // }

            this._element = $element
                .addClass("jquery-paddingdrag")
                .data("jquery-paddingdrag", this)
                .get(0);

            // extend options
            this._options = $.extend(false, {}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // clean up in case a widget wasn't properly removed
            // this only if
            $element
                .find(" > [data-jquery-paddingdrag]")
                .remove();

            // appending element to dom and initializing
            // paddingdrag in same tick (interval)
            // requires repaint element
            $element.get(0).offsetHeight;

            var widget = $(null);
            for (var key in this._options.positions) {
                var option = this._options.positions[key];
                var value = "0px";
                var dragHandle = $(this._options.html)
                    .attr("data-jquery-paddingdrag", option)
                    .attr("data-jquery-padding", value)
                    .css("height", value);

                widget = widget.add(dragHandle);
            }

            // interface
            this.$ui = {};
            this.$ui.widget = widget;

            // bind events
            $element
                .on("mousedown.jquerypaddingdrag", '[data-jquery-paddingdrag]', this._handleDragareaMousedown.bind(this));

            // append widget to dom
            this.$ui.widget
                .appendTo(this._element);

            // set height(s)
            this.reposition();

            $element
                .trigger("jquerypaddingdraginit");
        },


        /**
         * Recalculate drag handle sizes
         *
         * @param {Object} e
         */
        reposition: function(e) {
            var $element = $(this._element);
            var $handles = $element.find(" > [data-jquery-paddingdrag]");

            // appending element to dom or changing element's padding
            // with paddingdrag repositioning in same tick (interval)
            // requires element repaint
            $element.get(0).offsetHeight;

            for (var key in this._options.positions) {
                var option = this._options.positions[key];
                var value = $element.css("padding-" + option);

                $handles.filter('[data-jquery-paddingdrag="' + option + '"]')
                    .attr("data-jquery-padding", value)
                    .css("height", value);
            }
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            $(this._element)
                .off(".jquerypaddingdrag");

            this.$ui.widget
                .remove();

            $(this._element)
                .removeData("jquery-paddingdrag")
                .removeClass("jquery-paddingdrag")
                .off(".jquerypaddingdrag")
                .trigger("jquerypaddingdragdestroy");

            this.$ui      = null;
            this._options = null;
            this._element = null;
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
         * Initialize drag event
         *
         * @param  {Event} e
         * @return {Void}
         */
        _dragInit: function(e) {
            var drag = {};
            drag.target = e.currentTarget;
            drag.startY = e.pageY;
            drag.position = drag.target.getAttribute("data-jquery-paddingdrag");
            drag.initialPadding = parseInt($(drag.target).css("height"), 10);
            this._drag = drag;

            var doc = this.$ui.widget.get(0).ownerDocument;
            $(doc)
                .on("mousemove.jquerypaddingdrag", this._handleDragareaMousemove.bind(this))
                .on("mouseup.jquerypaddingdrag", this._handleDragareaMouseup.bind(this))
                .on("mouseleave.jquerypaddingdrag", this._handleDragareaMouseleave.bind(this));
            $(doc.documentElement)
                .addClass("jquery-paddingdrag-dragging")
                .addClass("jquery-paddingdrag-dragging-" + drag.position);
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

            var difference = drag.startY - e.pageY;
            var value = drag.initialPadding - difference;

            if (value < 0) value = 0;
            value = value + "px";
            this._drag.value = value;

            $(drag.target)
                .attr("data-jquery-padding", value)
                .css("height", value);

            $(this._element)
                .css("padding-" + drag.position, value);

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
                .removeClass("jquery-paddingdrag-dragging")
                .removeClass("jquery-paddingdrag-dragging-" + this._drag.position);;

            $(doc)
                .off("mousemove.jquerypaddingdrag")
                .off("mouseup.jquerypaddingdrag")
                .off("mouseleave.jquerypaddingdrag");

            delete this._drag;
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
                .trigger("jquerypaddingdragstarting");

            this._dragInit(e);
            this._dragCalc(e);

            $(this._element)
                .trigger("jquerypaddingdragstart");

            // Stop propagation to ensure we don't
            // trigger events on child elements
            e.stopPropagation();
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
                .trigger("jquerypaddingdragmove");
        },

        /**
         * Dragarea mouseup event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDragareaMouseup: function(e) {
            this._dragCalc(e);
            $(this._element)
                .trigger("jquerypaddingdragchange", {
                    position: this._drag.position,
                    padding: this._drag.value
                });
            this._dragCancel(e);

            $(this._element)
                .trigger("jquerypaddingdragend");

            e.stopPropagation();
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
    $.fn.paddingdrag = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-paddingdrag");

            // create new instance
            if (!lib)
                lib = new PaddingDrag(this, typeof options === "object" ? options : {});

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
                    throw "PaddingDrag: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window, document);
