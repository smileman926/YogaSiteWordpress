;(function(window, document) {

    // strict mode
    "use strict";

    // use native
    if (typeof window.ResizeObserver === "function")
        return;

    /**
     * Initialize DOMRectReadOnly
     *
     * @param  {Element} target
     * @return {Void}
     */
    var DOMRectReadOnly = function(target) {
        var doc = target.ownerDocument,
            win = doc.defaultView,
            style = win.getComputedStyle(target),
            paddingTop = parseInt(style.getPropertyValue("padding-top")),
            paddingRight = parseInt(style.getPropertyValue("padding-right")),
            paddingBottom = parseInt(style.getPropertyValue("padding-bottom")),
            paddingLeft = parseInt(style.getPropertyValue("padding-left")),
            rect = {
                x: paddingLeft,
                y: paddingTop,
                width: target.clientWidth - paddingLeft - paddingRight,
                height: target.clientHeight - paddingTop - paddingBottom,
            };

        rect.left = rect.x;
        rect.top = rect.y;
        rect.right = rect.left + rect.width;
        rect.bottom = rect.top + rect.height;

        for (var prop in rect) {
            Object.defineProperty(this, prop, {
                value: rect[prop],
                writable: false,
                enumerable: true,
                configurable: false,
            });
        }
    }

    /**
     * DOMRectReadOnly prototype
     *
     * @type {Object}
     */
    DOMRectReadOnly.prototype = {

        /**
         * DOMRectReadOnly constructor
         *
         * @type {Function}
         */
        constructor: DOMRectReadOnly,

    };

    /**
     * Initialize ResizeObserverEntry
     *
     * @param  {Element} target
     * @return {Void}
     */
    var ResizeObserverEntry = function(target) {
        Object.defineProperty(this, "target", {
            value: target,
            writable: false,
            enumerable: true,
            configurable: false,
        });

        Object.defineProperty(this, "contentRect", {
            value: new DOMRectReadOnly(target),
            writable: false,
            enumerable: true,
            configurable: false,
        });
    }

    /**
     * ResizeObserverEntry prototype
     *
     * @type {Object}
     */
    ResizeObserverEntry.prototype = {

        /**
         * ResizeObserverEntry constructor
         *
         * @type {Function}
         */
        constructor: ResizeObserverEntry,

    };

    /**
     * Initialize ResizeObserver
     *
     * @param  {Element} target
     * @return {Void}
     */
    var ResizeObserver = function(callback) {
        if (!(this instanceof ResizeObserver))
            throw "Failed to construct 'ResizeObserver': Please use the 'new' operator, this DOM object constructor cannot be called as a function.";
        else if (typeof callback === "undefined")
            throw "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.";
        else if ((typeof callback !== "function"))
            throw "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element'.";

        this._callback = callback;
        this._observables = [];
        this._boundIntervalHandler = this._intervalHandler.bind(this);
        this._interval = null;
    }

    /**
     * ResizeObserver prototype
     *
     * @type {Object}
     */
    ResizeObserver.prototype = {

        /**
         * ResizeObserver constructor
         *
         * @type {Function}
         */
        constructor: ResizeObserver,

        /**
         * Observe
         *
         * @param  {Element} element
         * @return {Void}
         */
        observe: function(element) {
            if (!(element instanceof Element))
                throw "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element'.";

            // append entry to observables list
            var exists = this._observables.some(function(item) {
                return item.target === element;
            });
            if (!exists) {
                var entry = new ResizeObserverEntry(element);
                this._observables.push(entry);
            }

            // start interval handler (if not already done so)
            if (!this._interval)
                this._interval = this._boundIntervalHandler();
        },

        /**
         * Unobserve
         *
         * @param  {Element} element
         * @return {Void}
         */
        unobserve: function(element) {
            this._observables = this._observables.filter(function(item) {
                return item.target !== element;
            });

            // observing nothing, stop interval handler
            if (!this._observables.length)
                this.disconnect();
        },

        /**
         * Disconnect
         *
         * @return {Void}
         */
        disconnect: function() {
            window.clearInterval(this._interval);
            this._interval = null;

            this._observables = [];
        },

        /**
         * Interval handler:
         * iterate observables list and call
         * callback on any changes
         *
         * @return {Number}
         */
        _intervalHandler: function() {
            var observables = this._observables,
                changes = observables
                    .map(function(item, index) {
                        var entry = new ResizeObserverEntry(item.target);
                        if (item.contentRect.height === entry.contentRect.height && item.contentRect.width === entry.contentRect.width)
                            return null;

                        observables[index] = entry;

                        return entry;
                    })
                    .filter(function(item) {
                        return item !== null;
                    });

            if (changes.length > 0)
                this._callback(changes);

            this._interval = window.requestAnimationFrame(this._boundIntervalHandler);

            return this._interval;
        },

    }

    // globalize
    window.ResizeObserver = ResizeObserver;

})(window, document);
