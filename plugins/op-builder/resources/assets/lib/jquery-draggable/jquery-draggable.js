;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize Draggable
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see Draggable.prototype._defaults
     * @return {Void}
     */
    var Draggable = function(element, options) {
        if (!(this instanceof Draggable))
            throw "Draggable: Draggable is a constructor.";

        this._element = element;
        this._options = $.extend({}, this._defaults, options || {});

        this._init();
    }

    /**
     * Draggable prototype
     *
     * @type {Object}
     */
    $.extend(Draggable.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            handle: null,
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            var $element = $(this._element);
            if ($element.data("jquery-draggable"))
                return;

            $element
                .data("jquery-draggable", this)
                .addClass("jquery-draggable");

            // init handle
            var handle = this._options.handle;
            if (handle)
                $element
                    .on("mousedown.jquerydraggable", handle, this._handleDragStart.bind(this))
                    .find(handle)
                    .addClass("jquery-draggable-handle");
            else
                $element
                    .on("mousedown.jquerydraggable", this._handleDragStart.bind(this))
                    .addClass("jquery-draggable-handle");
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._cancelDrag();

            // clean
            $(this._element)
                .off("jquerydraggable")
                .removeClass("jquery-draggable-handle")
                .removeClass("jquery-draggable")
                .removeData("jquery-draggable");

            this._options = null;
            this._element = null;
        },

        /**
         * Trigger event
         *
         * @param  {String} name
         * @param  {Object} data (optional)
         * @return {Event}
         */
        _triggerEvent: function(name, data) {
            var result = jQuery.Event(name);
            $(this._element).trigger(result, data);

            return result;
        },

        /**
         * Get drag object
         *
         * @param  {Number} x
         * @param  {Number} y
         * @return {Object}
         */
        _getDragObject: function(x, y) {
            var $window = $(this._element.ownerDocument.defaultView),
                $element = $(this._element),
                position = $element.position(),
                offset = $element.offset(),
                width = $element.outerWidth(),
                height = $element.outerHeight();

            return {
                mouseevent: {
                    start: [
                        x,
                        y,
                    ],
                    move: null,
                    stop: null,
                },
                viewport: [
                    0,
                    0,
                    $window.width(),
                    $window.height(),
                ],
                element: {
                    size: [
                        width,
                        height,
                    ],
                    position: [
                        position.left,
                        position.top,
                    ],
                    offset: [
                        offset.left,
                        offset.top,
                    ],
                    rel: [
                        Math.round(position.left) - Math.round(offset.left),
                        Math.round(position.top) - Math.round(offset.top),
                    ],
                },
                rect: {
                    top: position.top,
                    right: position.left + width,
                    bottom: position.top + height,
                    left: position.left,
                    width: width,
                    height: height,
                },
                css: {
                    top: position.top + "px",
                    right: "auto",
                    bottom: "auto",
                    left: position.left + "px",
                },
            };
        },

        /**
         * Cancel drag (mouse events)
         *
         * @return {Void}
         */
        _cancelDrag: function() {
            $(this._element.ownerDocument.documentElement)
                .removeClass("jquery-draggable-dragging");
            $(this._element.ownerDocument)
                .off(".jquerydraggable");

            delete this._drag;
        },

        /**
         * Drag start event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDragStart: function(e) {
            if (e.which != 1)
                return;

            // trigger event
            var drag = this._getDragObject(e.pageX, e.pageY),
                event = this._triggerEvent("draggablestart", drag);
            if (event.isDefaultPrevented())
                return;

            // store drag object
            this._drag = drag;

            // apply css
            $(this._element).css(drag.css);

            // bind move/stop
            $(this._element.ownerDocument)
                .off(".jquerydraggable")
                .on("mousemove.jquerydraggable", this._handleDragMove.bind(this))
                .on("mouseup.jquerydraggable", this._handleDragStop.bind(this))
                .on("mouseleave.jquerydraggable", this._handleDragStop.bind(this));

            // add class to <html> element
            $(this._element.ownerDocument.documentElement)
                .addClass("jquery-draggable-dragging");

            e.preventDefault();
        },

        /**
         * Drag move event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDragMove: function(e) {
            var drag = this._drag;
            drag.mouseevent.move = [
                e.pageX,
                e.pageY,
            ];

            // cursor moved
            var x = drag.mouseevent.move[0] - drag.mouseevent.start[0],
                y = drag.mouseevent.move[1] - drag.mouseevent.start[1];

            // set rect
            drag.rect.top = drag.element.position[1] + y;
            drag.rect.right = drag.element.position[0] + x + drag.element.size[0];
            drag.rect.bottom = drag.element.position[1] + y + drag.element.size[1];
            drag.rect.left = drag.element.position[0] + x;

            // set css
            drag.css = {
                top: drag.rect.top + "px",
                right: "auto",
                bottom: "auto",
                left: drag.rect.left + "px",
            };

            // trigger event
            var event = this._triggerEvent("draggablemove", drag);
            if (event.isDefaultPrevented())
                return;

            // apply css
            $(this._element).css(drag.css);
        },

        /**
         * Drag stop event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleDragStop: function(e) {
            this._triggerEvent("draggablestop", this._drag);
            $(this._element).css(this._drag.css);
            this._cancelDrag();
        },

    });

    // jQuery plugin
    $.fn.draggable = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-draggable");

            // not init, create new instance
            if (!lib)
                lib = new Draggable(this, typeof options === "object" ? options : {});

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
                    throw "Draggable: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
