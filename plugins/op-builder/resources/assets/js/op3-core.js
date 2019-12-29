/**
 * OptimizePress3 core:
 * object with data and event handling methods
 * taken from jQuery.
 *
 * Dependencies:
 *     - jQuery
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3 object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Page load status
         * (DOM ready, window load)
         *
         * @type {Object}
         */
        status: {
            ready: false,
            load: false
        },

        /**
         * Version
         *
         * @type {String}
         */
        version: "3.0",

        /**
         * Prefix
         *
         * @type {String}
         */
        prefix: "op3",

        /**
         * OP3 layer (wrapper|live-editor-designer)
         *
         * @type {String}
         */
        layer: "none",

        /**
         * jQuery 'data' functionality
         *
         * @param  {Mixed} key
         * @param  {Mixed} value
         * @return {Mixed}
         */
        data: function(key, value) {
            return $(document).data(key, value);
        },

        /**
         * jQuery 'removeData' functionality
         *
         * @param  {Mixed} key
         * @return {Void}
         */
        removeData: function(key) {
            $(document).removeData(key);
        },

        /**
         * jQuery 'on' functionality
         *
         * @param  {String}   events
         * @param  {Function} callback
         * @return {Void}
         */
        bind: function(events, callback) {
            $(document).on(_jqkeyfix(events), callback);
        },

        /**
         * jQuery 'one' functionality
         *
         * @param  {String}   events
         * @param  {Function} callback
         * @return {Void}
         */
        once: function(events, callback) {
            $(document).one(_jqkeyfix(events), callback);
        },

        /**
         * jQuery 'off' functionality
         *
         * @param  {String} events
         * @param  {Mixed}  callback
         * @return {Void}
         */
        unbind: function(events, callback) {
            $(document).off(_jqkeyfix(events), callback);
        },

        /**
         * jQuery 'trigger' functionality
         *
         * @param  {String}  eventType      event name
         * @param  {Mixed}   extraArguments (optional) array of arguments to pass along side $.Event
         * @param  {Mixed}   additionalData (optional) extend $.Event with object
         * @return {Boolean}                event canceled (called event.preventDefault())
         */
        emit: function(eventType, extraArguments, additionalData) {
            if (OP3.disableEvents)
                return false;

            var name = _jqkeyfix(eventType);
            var data = $.extend({ origin: OP3 }, additionalData, { type: name, target: OP3 });
            var event = $.Event(name, data);

            $(document).trigger(event, extraArguments);

            var cancel = event.isDefaultPrevented();
            return cancel;
        },

        /**
         * Dispatch an event, first triggering it on the
         * instance itself, and then propagates upward
         * along the parent chain (window.parent).
         *
         * @param  {String}  eventType      event name
         * @param  {Mixed}   extraArguments (optional) array of arguments to pass along side $.Event
         * @param  {Mixed}   additionalData (optional) extend $.Event with object
         * @return {Boolean}                event canceled (called event.preventDefault())
         */
        dispatch: function(eventType, extraArguments, additionalData) {
            if (OP3.disableEvents)
                return false;

            var frame  = window;
            var data   = $.extend({ origin: window.OP3 }, additionalData);
            var cancel = false;

            cancel = cancel || frame.OP3.emit(eventType, extraArguments, data);

            // dispatch each parent
            while (!cancel && frame !== frame.parent && _same_origins(frame, frame.parent) && frame.parent.OP3 && typeof frame.parent.OP3.emit === "function") {
                frame  = frame.parent;
                cancel = cancel || frame.OP3.emit(eventType, extraArguments, data);
            }

            return cancel;
        },

        /**
         * Broadcast an event that propagates downward to
         * all descendants of the current instance
         * (window.frames).
         *
         * @param  {String}  eventType      event name
         * @param  {Mixed}   extraArguments (optional) array of arguments to pass along side $.Event
         * @param  {Mixed}   additionalData (optional) extend $.Event with object
         * @return {Boolean}                event canceled (called event.preventDefault())
         */
        broadcast: function(eventType, extraArguments, additionalData) {
            if (OP3.disableEvents)
                return false;

            var frame = window;
            var data  = $.extend({ origin: window.OP3 }, additionalData);
            var cancel = false;

            for (var i = 0; i < frame.frames.length; i++) {
                if (!cancel && _same_origins(frame, frame.frames[i]) && frame.frames[i].OP3 && typeof frame.frames[i].OP3.emit === "function") {
                    cancel = cancel || frame.frames[i].OP3.emit(eventType, extraArguments, data);
                    cancel = cancel || frame.frames[i].OP3.broadcast(eventType, extraArguments, data);
                }
            }

            return cancel;
        },

        /**
         * Execute dispatch and broadcast.
         *
         * @param  {String}  eventType      event name
         * @param  {Mixed}   extraArguments (optional) array of arguments to pass along side $.Event
         * @param  {Mixed}   additionalData (optional) extend $.Event with object
         * @return {Boolean}                event canceled (called event.preventDefault())
         */
        transmit: function(eventType, extraArguments, additionalData) {
            if (OP3.disableEvents)
                return false;

            return false
                || that.dispatch(eventType, extraArguments, additionalData)
                || that.broadcast(eventType, extraArguments, additionalData);
        },

        /**
         * Define class constructor
         *
         * @param  {Object}   options
         * @return {Function}
         */
        defineClass: function(options) {
            /*
            window.OP3.Elements._extension.prop.Color = OP3.$.defineClass({

                Name: "OP3_Element_Prop",

                Extends: OP3.Elements._extension.prop.Default,

                Constructor: function() {
                    OP3.Elements._extension.prop.Default.apply(this, arguments);
                },

                Prototype: {

                    _name: "color",

                    _defaults: {
                        label: "Colour",
                        attr: {
                            type: "text",
                            "data-property-type": "color",
                        },
                    },

                },

            });
             */

            options = options || {};

            // get options
            var _name = options.Name,
                _constructor = options.Constructor,
                _extends = options.Extends,
                _prototype = options.Prototype;

            // validate
            if (typeof _name !== "undefined" && typeof _name !== "string")
                throw new TypeError("Class argument options.Name must be of type string");
            if (typeof _constructor !== "undefined" && typeof _constructor !== "function")
                throw new TypeError("Class argument options.Constructor must be of type function");
            if (typeof _extends !== "undefined" && typeof _extends !== "function")
                throw new TypeError("Class argument options.Extends must be of type function");
            if (typeof _prototype !== "undefined" && typeof _prototype !== "object")
                throw new TypeError("Class argument options.Prototype must be of type function");

            // more name validation
            if (_name) {
                _name = (_name || "").replace(/\W+/g, "_");
                if ([ "_name", "_constructor", "_extends", "_prototype" ].indexOf(_name) !== -1)
                    throw new TypeError("Class argument options.Name can not be '" + _name + "' (reserved identifier)");
                if (/^[0-9]/.test(_name))
                    throw new TypeError("Class argument options.Name can not start with number");
            }

            // constructor wrapper
            var OP3_Class, OP3_Wrapper = function() {
                if (!(this instanceof OP3_Class))
                    throw new TypeError("Class constructor " + _name + " cannot be invoked without 'new'");

                if (typeof _constructor === "function")
                    _constructor.apply(this, arguments);
            }

            // constructor:
            // using eval so we can use option.Name
            // as pretty name in developer tools
            try {
                if (!_name)
                    throw "";

                // skip eval in production, because
                // 'eval is evil' - and to prevent
                // 'blocked by CSP' errors
                var meta = OP3.Meta;
                if (!meta || !meta.pageId)
                    meta = window.parent.OP3.Meta;
                if (!meta || meta.buildEnv !== "dev")
                    throw "";

                // evaluate/execute
                var code = ""
                    + "var " + _name + " = " + OP3_Wrapper.toString() + ";"
                    + "OP3_Class = " + _name + ";";
                eval(code);
            }
            catch(e) {
                // fallback
                OP3_Class = function() {
                    OP3_Wrapper.apply(this, arguments);
                }
            }

            // inherit one class
            if (_extends)
                OP3_Class.prototype = Object.create(_extends.prototype);

            // mixin another
            if (_prototype)
                for (var prop in _prototype) {
                    var desc = Object.getOwnPropertyDescriptor(_prototype, prop);
                    Object.defineProperty(OP3_Class.prototype, prop, desc);
                }

            // re-assign constructor
            OP3_Class.prototype.constructor = OP3_Class;

            return OP3_Class;
        },

    }

    /**
     * OP3 helper:
     * append prefix to each word
     *
     * @param  {String} value
     * @return {String}
     */
    var _jqkeyfix = function(value) {
        value = (value || "")
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "");

        return OP3.prefix + value.split(" ").join(" " + OP3.prefix);
    }

    /**
     * Compare location origins for each argument.
     * If all origins are the same result will be
     * true (false otherwise).
     *
     * @param  {Object}  window1
     * @param  {Object}  window2
     * @return {Boolean}
     */
    var _same_origins = function(window1, window2) {
        try {
            for (var i = 1; i < arguments.length; i++) {
                if (arguments[0].location.origin !== arguments[i].location.origin) {
                    throw "";
                }
            }
        }
        catch(e) {
            return false;
        }

        return true;
    }

    // set read-only properties
    $.each(["version", "prefix"], function() {
        try {
            Object.defineProperty(that, this, {
                value: that[this],
                writable: false,
                enumerable: true,
                configurable: false
            });
        }
        catch (e) {
            // Object.defineProperty not supported?
            return false;
        }
    });

    // globalize
    window.OP3 = that;

    // flag load status
    $(document).ready(function() { OP3.status.ready = true; });
    $(window).on("load", function() { OP3.status.load = true; });

})(jQuery, window, document);
