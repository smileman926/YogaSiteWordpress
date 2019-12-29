;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize Resizable
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see Resizable.prototype._defaults
     * @return {Void}
     */
    var Resizable = function(element, options) {
        if (!(this instanceof Resizable))
            throw "Resizable: Resizable is a constructor.";

        this._element = element;
        this._options = $.extend({}, this._defaults, options || {});

        this._init();
    }

    /**
     * Resizable prototype
     *
     * @type {Object}
     */
    $.extend(Resizable.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            handles: "n, e, s, w, nw, nw, ne, ne, se, se, sw, sw",
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            var $element = $(this._element);
            if ($element.data("jquery-resizable"))
                return;

            $element
                .data("jquery-resizable", this)
                .addClass("jquery-resizable")
                .on("mousedown.jqueryresizable", "[data-jquery-resizable-handle]", this._handleDragStart.bind(this));

            // create drag handles
            this._options.handles.split(",").forEach(function(item) {
                $('<span data-jquery-resizable-handle="' + item.trim() + '" />')
                    .appendTo($element);
            }.bind(this));
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
                .off("jqueryresizable")
                .removeClass("jquery-resizable")
                .removeData("jquery-resizable")
                    .find("[data-jquery-resizable-handle]")
                    .remove();

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
         * @param  {String} handle
         * @return {Object}
         */
        _getDragObject: function(x, y, handle) {
            var $window = $(this._element.ownerDocument.defaultView),
                $element = $(this._element),
                position = $element.position(),
                offset = $element.offset(),
                boxSizing = $element.css("box-sizing"),
                minWidth = parseFloat($element.css("min-width")),
                minHeight = parseFloat($element.css("min-height")),
                maxWidth = parseFloat($element.css("max-width")),
                maxHeight = parseFloat($element.css("max-height")),
                width = $element[boxSizing === "content-box" ? "width" : "outerWidth"](),
                height = $element[boxSizing === "content-box" ? "height" : "outerHeight"]();

            return {
                handle: handle,
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
                    min: [
                        Math.max(minWidth, boxSizing === "content-box" ? 0 : parseFloat($element.css("border-left-width")) + parseFloat($element.css("padding-left")) + parseFloat($element.css("padding-right")) + parseFloat($element.css("border-right-width"))),
                        Math.max(minHeight, boxSizing === "content-box" ? 0 : parseFloat($element.css("border-top-width")) + parseFloat($element.css("padding-top")) + parseFloat($element.css("padding-bottom")) + parseFloat($element.css("border-bottom-width"))),
                    ],
                    max: [
                        maxWidth,
                        maxHeight,
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
                    width: width + "px",
                    height: height + "px",
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
                .removeAttr("data-jquery-resizable-dragging-handle");
            $(this._element.ownerDocument)
                .off(".jqueryresizable");

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
            var handle = $(e.currentTarget).attr("data-jquery-resizable-handle"),
                drag = this._getDragObject(e.pageX, e.pageY, handle),
                event = this._triggerEvent("resizablestart", drag);
            if (event.isDefaultPrevented())
                return;

            // store drag object
            this._drag = drag;

            // apply css
            $(this._element).css(drag.css);

            // bind move/stop
            $(this._element.ownerDocument)
                .off(".jqueryresizable")
                .on("mousemove.jqueryresizable", this._handleDragMove.bind(this))
                .on("mouseup.jqueryresizable", this._handleDragStop.bind(this))
                .on("mouseleave.jqueryresizable", this._handleDragStop.bind(this));

            // add class to <html> element
            $(this._element.ownerDocument.documentElement)
                .attr("data-jquery-resizable-dragging-handle", drag.handle);

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
            if (drag.handle.indexOf("n") !== -1) {
                drag.rect.top = drag.element.position[1] + y;
                drag.rect.height = drag.element.size[1] - y;
            }
            if (drag.handle.indexOf("e") !== -1) {
                drag.rect.width = drag.element.size[0] + x;
            }
            if (drag.handle.indexOf("w") !== -1) {
                drag.rect.left = drag.element.position[0] + x;
                drag.rect.width = drag.element.size[0] - x;
            }
            if (drag.handle.indexOf("s") !== -1) {
                drag.rect.height = drag.element.size[1] + y;
            }

            // fit rect to minWidth/minHeight
            if (drag.rect.width < drag.element.min[0]) {
                if (drag.handle.indexOf("w") !== -1) {
                    drag.rect.left -= drag.element.min[0] - drag.rect.width;
                    drag.rect.width = drag.element.min[0];
                }
                if (drag.handle.indexOf("e") !== -1) {
                    drag.rect.width = drag.element.min[0];
                }
            }
            if (drag.rect.height < drag.element.min[1]) {
                if (drag.handle.indexOf("n") !== -1) {
                    drag.rect.top -= drag.element.min[1] - drag.rect.height;
                    drag.rect.height = drag.element.min[1];
                }
                if (drag.handle.indexOf("s") !== -1) {
                    drag.rect.height = drag.element.min[1];
                }
            }

            // fit rect to maxWidth/maxHeight
            // @todo - do we really need this???

            // set css
            drag.css = {
                top: drag.rect.top + "px",
                right: "auto",
                bottom: "auto",
                left: drag.rect.left + "px",
                width: drag.rect.width + "px",
                height: drag.rect.height + "px",
            };

            /*
            // fix negative size
            if (drag.rect.width < drag.element.min[0]) {
                if (drag.handle.indexOf("w") !== -1) {
                    drag.css.left = drag.rect.left - (drag.element.min[0] - drag.rect.width) + "px";
                    drag.css.width = drag.element.min[0] + "px";
                }
                if (drag.handle.indexOf("e") !== -1) {
                    drag.css.width = drag.element.min[0] + "px";
                }
            }
            if (drag.rect.height < drag.element.min[1]) {
                if (drag.handle.indexOf("n") !== -1) {
                    drag.css.top = drag.rect.top - (drag.element.min[1] - drag.rect.height) + "px";
                    drag.css.height = drag.element.min[1] + "px";
                }
                if (drag.handle.indexOf("s") !== -1) {
                    drag.css.height = drag.element.min[1] + "px";
                }
            }
            */

            // trigger event
            var event = this._triggerEvent("resizablemove", drag);
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
            this._triggerEvent("resizablestop", this._drag);
            $(this._element).css(this._drag.css);
            this._cancelDrag();
        },

    });

    // jQuery plugin
    $.fn.resizable = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-resizable");

            // not init, create new instance
            if (!lib)
                lib = new Resizable(this, typeof options === "object" ? options : {});

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
                    throw "Resizable: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
