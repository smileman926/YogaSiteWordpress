;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize MMDND
     *
     * @return {Void}
     */
    var MMDND = function() {
        if (!(this instanceof MMDND))
            throw "MMDND: MMDND is a constructor";

        this._init();
    }

    var AUTOSCROLL_DELAY = 20;
    var AUTOSCROLL_OFFSET = 16;

    /**
     * MMDND prototype
     *
     * @type {Object}
     */
    $.extend(MMDND.prototype, {

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            if ($(document).data("mmdnd"))
                throw "MMDND: already initialized";
            $(document)
                .data("mmdnd", this);

            this._window = window;
            this._document = document;

            this._bindInit();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._clear();

            $(document)
                .removeData("mmdnd");
        },

        /**
         * Remove event handlers and reset
         * all private properties
         *
         * @return {Void}
         */
        _clear: function() {
            $(this._dropElement)
                .removeAttr("data-jquery-mmdnd-dragover");
            $(this._dragElement)
                .off(".mmdnd")
                .removeAttr("data-jquery-mmdnd-dragging");
            $(this._ghostElement)
                .remove();
            $(this._document)
                .off(".mmdnd");
            $(this._document.documentElement)
                .removeAttr("data-jquery-mmdnd-dragging");
            clearInterval(this._autoScrollInterval);

            // @todo - dragOrigin & dropOrigin?
            this._top = null;
            this._origin = null;
            this._children = null;
            this._frameOffsetX = null;
            this._frameOffsetY = null;
            this._windowWidth = null;
            this._windowHeight = null;

            this._dragElement = null;
            this._dropElement = null;
            this._dropTarget = null;
            this._ghostElement = null;
            this._ghostOffsetX = null;
            this._ghostOffsetY = null;
            this._mouseStart = null;
            this._mouseMove = null;
            this._autoScrollInterval = null;
            this._data = null;
        },

        /**
         * Prepare document for dragstart:
         * wait for mousedown
         *
         * @return {Void}
         */
        _bindInit: function() {
            // clear
            this._clear();

            // do some event bindings
            $(this._document)
                .on("mousedown.mmdnd", "[data-jquery-mmdnd-draggable]", this._handleMouseDownPredrag.bind(this));
        },

        /**
         * Prepare document for drag
         *
         * @return {Void}
         */
        _bindDrag: function() {
            // clear
            $(this._document)
                .off(".mmdnd");

            $(this._document.documentElement)
                .attr("data-jquery-mmdnd-dragging", "");

            // get frame offset relative to top frame
            this._calcFrameOffsets();

            // we can drop element on node that
            // data-jquery-mmdnd-droppable attribute
            // matches dragElement's data-jquery-mmdnd-draggable
            // attribute
            var droppable = "[data-jquery-mmdnd-droppable]";
            if (this._origin._dropTarget)
                droppable = '[data-jquery-mmdnd-droppable="' + this._origin._dropTarget + '"]';

            // do some event bindings
            if (this === this._origin)
                $(this._dragElement)
                    .one("mousemove.mmdnd mouseleave.mmdnd", this._handleMouseMoveDragStart.bind(this));
            $(this._document)
                .on("contextmenu.mmdnd", this._handlePreventUserInteraction.bind(this))
                .on("keydown.mmdnd", this._handleKeyPressUserInteraction.bind(this))
                .on("wheel.mmdnd", this._handleWheel.bind(this))
                .on("mousemove.mmdnd", this._handleMouseMoveDrag.bind(this))
                .on("mouseenter.mmdnd", droppable, this._handleMouseEnterDragEnter.bind(this))
                .on("mousemove.mmdnd", droppable, this._handleMouseMoveDragOver.bind(this))
                .on("mouseleave.mmdnd", droppable, this._handleMouseLeaveDragLeave.bind(this))
                .on("mouseup.mmdnd", droppable, this._handleMouseUpDrop.bind(this))
                .on("mousedown.mmdnd mouseup.mmdnd", this._handleMouseUpDragEnd.bind(this));
        },

        /**
         * Prepare all documents for dragstart
         * (same as _bindInit, but execute it
         * on all frames)
         *
         * @return {Void}
         */
        _bindInitAll: function() {
            var all = $.merge($.merge([], [this._top]), this._top._children);
            $.each(all, function(index, child) {
                child._bindInit();
            }.bind(this));
        },

        /**
         * Prepare all documents for drag
         * (same as _bindDrag, but execute
         * it on all frames)
         *
         * @return {Void}
         */
        _bindDragAll: function() {
            var all = $.merge($.merge([], [this._top]), this._top._children);
            $.each(all, function(index, child) {
                // set top, origin and children
                child._top = this._top;
                child._origin = this;
                child._children = child._childFrames();

                // set properties
                child._windowWidth = child._window.jQuery(child._window).width();
                child._windowHeight = child._window.jQuery(child._window).height();
                child._documentScrollWidth = child._document.documentElement.scrollWidth || child._document.body.scrollWidth || 0;
                child._documentScrollHeight = child._document.documentElement.scrollHeight || child._document.body.scrollHeight || 0;

                // bind events
                child._bindDrag();
            }.bind(this));
        },

        /**
         * Get top most parent window that
         * has the mmdnd object initialized
         *
         * @return {Window}
         */
        _topFrame: function() {
            var result = window;
            while (result !== result.parent) {
                try {
                    // no mmdnd
                    if (!result.parent.jQuery(result.parent.document).data("mmdnd"))
                        throw "";
                }
                catch(e) {
                    // no jQuery or cross-origin error
                    break;
                }

                result = result.parent;
            }

            return result.jQuery(result.document).data("mmdnd");
        },

        /**
         * Get list of all frames on
         * current document and it's
         * children
         *
         * @return {Array}
         */
        _childFrames: function() {
            var result = [];

            for (var i = 0; i < this._window.frames.length; i++) {
                var lib;

                try {
                    // no mmdnd?
                    lib = this._window.frames[i].window.jQuery(this._window.frames[i].window.document).data("mmdnd");
                    if (!lib)
                        throw "";
                }
                catch(e) {
                    // no jQuery or cross-origin error
                    continue;
                }

                // append frame and all it's child
                // frames to result
                result.push(lib);
                result.push.apply(result, lib._childFrames());
            }

            return result;
        },

        /**
         * Calculate window frame element
         * offset relative to top frame
         *
         * @return {Void}
         */
        _calcFrameOffsets: function() {
            this._frameOffsetX = 0;
            this._frameOffsetY = 0;
            if (this._window.frameElement) {
                try {
                    var frame = this._window.frameElement;
                    var rect = frame.getBoundingClientRect();
                    var doc = frame.ownerDocument;
                    var win = doc.defaultView;
                    var lib = win.jQuery(doc).data("mmdnd");

                    this._frameOffsetX = lib._frameOffsetX + Math.round(rect.x);
                    this._frameOffsetY = lib._frameOffsetY + Math.round(rect.y);
                }
                catch(e) {
                    // cross origin, or no jQuery, or no mmdnd
                }
            }
        },

        /**
         * Create ghost element (if node is nod
         * defined dragElement clone will be used)
         *
         * @param  {Node} node (optional)
         * @return {Node}
         */
        _createGhost: function(node) {
            // node not defined, use dragElement clone
            if (!node) {
                var style = this._window.getComputedStyle(this._dragElement, null),
                    css = {};
                for (var i = 0; i < style.length; i++) {
                    var key = style[i],
                        val = style.getPropertyValue(key);

                    css[key] = val;
                }

                // @todo - apply style to all children
                node = $(this._dragElement)
                    .clone()
                    .removeAttr("id")
                    .removeAttr("data-jquery-mmdnd-draggable")
                    .css(css)
                    .get(0);
            }

            // wrap it and return
            return $("<div />")
                .attr("data-jquery-mmdnd-ghost", "")
                .append(node)
                .get(0);
        },

        /**
         * Repostion ghostElement
         * (set top/left and append it to
         * document if not already done so)
         *
         * @return {[type]} [description]
         */
        _repositionGhost: function() {
            if (!this._origin._mouseMove)
                return;

            // set top/left
            $(this._origin._ghostElement)
                .css({
                    top: this._origin._mouseMove.clientY + this._frameOffsetY - this._origin._ghostOffsetY + "px",
                    left: this._origin._mouseMove.clientX + this._frameOffsetX - this._origin._ghostOffsetX + "px",
                });

            // append to document
            if (!this._origin._ghostElement.parentElement)
                $(this._origin._ghostElement)
                    .appendTo(this._top._document.body);
        },

        /**
         * Get mouse properties from MouseEvent
         *
         * @param  {Event}   e
         * @param  {Boolean} fixOffset
         * @return {Object}
         */
        _mouseEventProperties: function(e, fixOffset) {
            var result = {
                clientX: e.clientX,
                clientY: e.clientY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                pageX: e.pageX,
                pageY: e.pageY,
                screenX: e.screenX,
                screenY: e.screenY,
            }

            // calculate offset (target position relative
            // to currentTarget)
            if (fixOffset && e.currentTarget !== e.target) {
                try {
                    var offset1 = $(e.currentTarget).offset();
                    var offset2 = $(e.target).offset();

                    result.offsetX += offset2.left - offset1.left;
                    result.offsetY += offset2.top - offset1.top;
                }
                catch(e) {
                    // currentTarget can be document, and
                    // document has no offset, ignore...
                }
            }

            return result;
        },

        /**
         * Trigger custom jQuery event
         *
         * @param  {Node}   target
         * @param  {String} eventName
         * @param  {Event}  proxy     (optional)
         * @param  {Object} data      (optional)
         * @return {Event}
         */
        _triggerEvent: function(target, eventName, proxy, data) {
            // event methods
            var props = {
                getData: this._eventGetData.bind(this),
                setData: this._eventSetData.bind(this),
                setGhostElement: this._eventSetGhostElement.bind(this),
            }

            // inherit common properties from proxy
            if (proxy)
                $.extend(props, {
                    altKey: proxy.altKey,
                    button: proxy.button,
                    buttons: proxy.buttons,
                    char: proxy.char,
                    charCode: proxy.charCode,
                    ctrlKey: proxy.ctrlKey,
                    key: proxy.key,
                    keyCode: proxy.keyCode,
                    metaKey: proxy.metaKey,
                    originalEvent: proxy.originalEvent,
                    shiftKey: proxy.shiftKey,
                    view: proxy.view,
                    which: proxy.which,
                });

            // additional data
            if (data)
                $.extend(props, data);

            // create and trigger
            var event = $.Event("mmdnd" + eventName, props);
            $(target).trigger(event);

            // return
            return event;
        },

        /**
         * Get cross-browser document
         * scrollLeft/scrollTop object
         *
         * @return {Object}
         */
        _getDocumentScroll: function() {
            return {
                x: this._document.documentElement.scrollLeft || this._document.body.scrollLeft || 0,
                y: this._document.documentElement.scrollTop || this._document.body.scrollTop || 0,
            }
        },

        /**
         * Set cross-browser document
         * scrollLeft/scrollTop
         *
         * @return {Object}
         */
        _setDocumentScroll: function(x, y) {
            var scroll, match;

            if (!x && x != 0) {
                scroll = scroll || this._getDocumentScroll();
                x = scroll.x;
            }

            if (!y && y != 0) {
                scroll = scroll || this._getDocumentScroll();
                y = scroll.y;
            }

            match = x.toString().match(/^(\+|-)=(\d+)$/);
            if (match) {
                scroll = scroll || this._getDocumentScroll();
                x = scroll.x + (match[1] + match[2])*1;
            }

            match = y.toString().match(/^(\+|-)=(\d+)$/);
            if (match) {
                scroll = scroll || this._getDocumentScroll();
                y = scroll.y + (match[1] + match[2])*1;
            }

            // set scroll
            this._document.documentElement.scrollLeft = x;
            this._document.body.scrollLeft = x;
            this._document.documentElement.scrollTop = y;
            this._document.body.scrollTop = y;
        },

        /**
         * Get data
         *
         * @param  {String} format
         * @return {Mixed}
         */
        _eventGetData: function(format) {
            return this._origin._data[format];
        },

        /**
         * Set data
         *
         * @param  {String} format
         * @param  {Mixed}  data
         * @return {Void}
         */
        _eventSetData: function(format, data) {
            this._origin._data[format] = data;
        },

        /**
         * Set custom ghostElement
         *
         * If node argument is NULL the new ghost
         * element will be clone of drag element.
         *
         * If offset arguments are not defined position
         * will be calculated by using position in old
         * element (in percentages)
         *
         * @param  {Node}   node
         * @param  {Number} offsetX (optional)
         * @param  {Number} offsetY (optional)
         * @return {Void}
         */
        _eventSetGhostElement: function(node, offsetX, offsetY) {
            // current ghost not yet attached to document
            if (!$(this._ghostElement).parent().length)
                $(this._ghostElement)
                    .css("visibility", "hidden")
                    .appendTo(this._document.body);

            // get current ghost element size
            var oldWidth = $(this._ghostElement).width(),
                oldHeight = $(this._ghostElement).height();

            // remove and create new
            $(this._ghostElement).remove();
            this._ghostElement = this._createGhost($(node).get(0));

            // get new size (element must be attached
            // to document to calculate size)
            $(this._ghostElement)
                .css("visibility", "hidden")
                .appendTo(this._document.body);
            var newWidth = $(this._ghostElement).width(),
                newHeight = $(this._ghostElement).height();
            $(this._ghostElement)
                .detach()
                .css("visibility", "");

            // calculate offsets (if not defined)
            if (isNaN(offsetX*1))
                this._ghostOffsetX = (this._ghostOffsetX / oldWidth) * newWidth;
            if (isNaN(offsetY*1))
                this._ghostOffsetY = (this._ghostOffsetY / oldHeight) * newHeight;

            // reposition
            this._repositionGhost();
        },

        /**
         * Returns document scroll and steps (scroll speed)
         *
         * Scroll speed is calculated by distance
         * of currsor position from window edge
         *
         * @return {Object}
         */
        _autoScrollCalc: function() {
            var scroll = this._getDocumentScroll(),
                step = { x: null, y: null };

            // horizontal scroll
            if (this._origin._mouseMove.clientX < AUTOSCROLL_OFFSET && this._origin._mouseMove.clientX > 0 && scroll.x > 0)
                step.x = "-=" + (AUTOSCROLL_OFFSET - Math.max(this._origin._mouseMove.clientX, 0));
            else if (this._windowWidth - this._origin._mouseMove.clientX < AUTOSCROLL_OFFSET && this._origin._mouseMove.clientX < this._windowWidth && scroll.x < this._documentScrollWidth - this._windowWidth)
                step.x = "+=" + (AUTOSCROLL_OFFSET - Math.max(this._windowWidth - this._origin._mouseMove.clientX, 0));

            // vertical scroll
            if (this._origin._mouseMove.clientY < AUTOSCROLL_OFFSET && this._origin._mouseMove.clientY > 0 && scroll.y > 0)
                step.y = "-=" + (AUTOSCROLL_OFFSET - Math.max(this._origin._mouseMove.clientY, 0));
            else if (this._windowHeight - this._origin._mouseMove.clientY < AUTOSCROLL_OFFSET && this._origin._mouseMove.clientY < this._windowHeight && scroll.y < this._documentScrollHeight - this._windowHeight)
                step.y = "+=" + (AUTOSCROLL_OFFSET - Math.max(this._windowHeight - this._origin._mouseMove.clientY, 0));

            return {
                scroll: scroll,
                step: step,
            }
        },

        /**
         * Initialize autoscroll interval
         *
         * @return {Number}
         */
        _autoScrollInit: function() {
            var all = $.merge($.merge([], [this]), this._children);

            clearInterval(this._autoScrollInterval);
            this._autoScrollInterval = setInterval(function() {
                var calc = this._autoScrollCalc();
                this._setDocumentScroll(calc.step.x, calc.step.y);

                // update frame offset to self
                // and all the children
                $.each(all, function(index, child) {
                    child._calcFrameOffsets();
                }.bind(this));

                if (!calc.step.x && !calc.step.y)
                    this._autoScrollClear();
            }.bind(this), AUTOSCROLL_DELAY);

            return this._autoScrollInterval;
        },

        /**
         * Clear autoscroll interval
         *
         * @return {Void}
         */
        _autoScrollClear: function() {
            clearInterval(this._autoScrollInterval);
            this._autoScrollInterval = null;
        },

        /**
         * Initialize/clear autoscroll interval
         *
         * @return {Void}
         */
        _autoScrollUpdate: function() {
            var calc = this._autoScrollCalc();
            if (!this._autoScrollInterval && (calc.step.x || calc.step.y))
                this._autoScrollInit();
            else if (this._autoScrollInterval && !calc.step.x && !calc.step.y)
                this._autoScrollClear();
        },

        /**
         * Prevent user ineraction while dragging element
         * (contextmenu/wheel)
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handlePreventUserInteraction: function(e) {
            e.preventDefault();
        },

        /**
         * Prevent keypres while dragging element,
         * and cancel on ESC key
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleKeyPressUserInteraction: function(e) {
            if (e.which == 27)
                this._handleMouseUpDragEnd(e);

            this._handlePreventUserInteraction(e);
        },

        /**
         * Clear scroll interval on mousewheel
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleWheel: function(e) {
            this._autoScrollClear();
        },

        /**
         * Document mousedown event handler:
         * predrag
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseDownPredrag: function(e) {
            if (e.which != 1)
                return;

            // get dragElement's position so we can
            // calculate exact position of mousedown
            // (relative to top frame)
            var style = this._window.getComputedStyle(e.currentTarget, null);
            var rect = e.currentTarget.getBoundingClientRect();

            // set properties
            this._top = null;
            this._origin = this;
            this._children = null;
            this._frameOffsetX = null;
            this._frameOffsetY = null;
            this._windowWidth = null;
            this._windowHeight = null;
            this._documentScrollWidth = null;
            this._documentScrollHeight = null;
            this._dragElement = e.currentTarget;
            this._dropTarget = $(e.currentTarget).attr("data-jquery-mmdnd-draggable");
            this._dropElement = null;
            this._ghostElement = this._createGhost();
            this._ghostOffsetX = e.clientX - Math.round(rect.x) + parseFloat(style.getPropertyValue("margin-left"));
            this._ghostOffsetY = e.clientY - Math.round(rect.y) + parseFloat(style.getPropertyValue("margin-top"));
            this._mouseStart = this._mouseEventProperties(e);
            this._mouseMove = null;
            this._data = {};

            // find top frame and all it's children
            this._top = this._topFrame();
            this._top._children = this._top._childFrames();

            $(this._dragElement)
                .attr("data-jquery-mmdnd-dragging", "");

            this._bindDragAll();

            this._origin._triggerEvent(this._origin._dragElement, "predrag", e, this._mouseStart);

            e.preventDefault();
        },

        /**
         * Drag element mousemove event handler:
         * dragstart
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseMoveDragStart: function(e) {
            $(this._dragElement)
                .off(".mmdnd");

            this._triggerEvent(this._dragElement, "dragstart", e, this._mouseStart);
        },

        /**
         * Document mousemove event handler:
         * drag
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseMoveDrag: function(e) {
            this._origin._mouseMove = this._mouseEventProperties(e);

            this._autoScrollUpdate();
            this._repositionGhost();

            this._origin._triggerEvent(this._origin._dragElement, "drag", e, this._origin._mouseMove);
        },

        /**
         * Document mouseenter event handler:
         * dragenter
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseEnterDragEnter: function(e) {
            $(this._origin._dropElement)
                .removeAttr("data-jquery-mmdnd-dragover");
            this._origin._dropElement = null;

            this._triggerEvent(e.currentTarget, "dragenter", e, this._mouseEventProperties(e, true));
        },

        /**
         * Document mousemove event handler:
         * dragover
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseMoveDragOver: function(e) {
            // do not bubble if default is not prevented
            var target = $(e.target).closest('[data-jquery-mmdnd-droppable="' + this._origin._dropTarget + '"]').get(0);
            var bubbling = target !== e.currentTarget;
            var isset = this._origin._dropElement !== null;
            if (bubbling && isset)
                return;

            // using preventDefault we can cancel drop target
            var event = this._triggerEvent(e.currentTarget, "dragover", e, this._mouseEventProperties(e, true));
            if (event.isDefaultPrevented()) {
                $(this._origin._dropElement)
                    .removeAttr("data-jquery-mmdnd-dragover");
                this._origin._dropElement = null;

                return;
            }

            // reset/set dropElement
            $(this._origin._dropElement)
                .removeAttr("data-jquery-mmdnd-dragover");
            this._origin._dropElement = e.currentTarget;
            $(this._origin._dropElement)
                .attr("data-jquery-mmdnd-dragover", "");
        },

        /**
         * Document mouseleave event handler:
         * dragleave
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseLeaveDragLeave: function(e) {
            $(this._origin._dropElement)
                .removeAttr("data-jquery-mmdnd-dragover");
            this._origin._dropElement = null;

            this._triggerEvent(e.currentTarget, "dragleave", e, this._mouseEventProperties(e, true));
        },

        /**
         * Document mouseup event handler:
         * drop
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseUpDrop: function(e) {
            if (e.which != 1)
                return;

            // event is bubbling, wait for the right drop element
            if (!this._origin || !this._origin._dropElement || this._origin._dropElement !== e.currentTarget)
                return;

            this._triggerEvent(this._origin._dropElement, "drop", e, this._mouseEventProperties(e, true));
            // dragEnd handler will do the rest
        },

        /**
         * Document mouseup event handler:
         * dragend
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleMouseUpDragEnd: function(e) {
            if (this._origin._dropElement !== null) {
                var target = this._origin._dropElement;
                var doc = target.ownerDocument;
                var win = doc.defaultView;
                var lib = win.jQuery(doc).data("mmdnd");

                // this method can be called from
                // _handleKeyPressUserInteraction
                // which has other scope, so we're
                // making sure that event is triggered
                // on dropElement's scope
                lib._triggerEvent(target, "dragleave");
            }
            if (this._origin._mouseMove !== null)
                this._origin._triggerEvent(this._origin._dragElement, "dragend", e, this._origin._mouseMove);

            this._bindInitAll();
        },

    });

    // autoinit
    $(function() {
        new MMDND();
    });

})(window.jQuery, window, document);
