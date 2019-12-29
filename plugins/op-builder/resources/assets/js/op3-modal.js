/**
 * OptimizePress3 modal.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 */
;(function(window, document, $) {

    "use strict";

    /**
     * OP3_Modal constructor
     *
     * @param  {Object} options see OP3_Modal.prototype._defaults
     * @return {Void}
     */
    var OP3_Modal = function(options) {
        this.element = null;
        this.options = options;

        this._init();
    }

    /**
     * OP3_Modal prototype
     *
     * @type {Object}
     */
    $.extend(OP3_Modal.prototype, {

        _defaults: {
            template: ''
                + '<div class="op3-modal">'
                + '<div class="op3-modal-wrapper">'
                + '<header>'
                + '<a class="op3-modal-close" href="#" data-click-trigger="cancel" data-click-exec="hide">' + '&times;' + '</a>'
                + '<label>'
                + '<i class="op3-icon op3-icon-zoom-2-2"></i>'
                + '<input class="op3-modal-search" type="search" placeholder="Search..." />'
                + '</label>'
                + '<h3 class="op3-modal-title">Title</h3>'
                + '</header>'
                + '<div class="op3-modal-content">'
                + 'loading...'
                + '</div>'
                + '<footer>'
                + '<button class="op3-modal-cancel" data-click-trigger="cancel" data-click-exec="hide">Cancel</button>'
                + '<button class="op3-modal-ok" data-click-trigger="ok">OK</button>'
                + '<p class="op3-modal-message">Message</p>'
                + '</footer>'
                + '</div>'
                + '</div>',
            parent: "body",
            className: "op3-modal",
            title: "undefined",
            search: "",
            content: '',
                //+ '<svg class="preloader" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 50 50">'
               // + '<path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(50 25 25)">'
                //+ '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite">'
                //+ '</animateTransform>'
                //+ '</path>'
                //+ '</svg>',
            message: "Message",
        },

        /**
         * User event handler:
         * handle click/dblclick on elements with attributes
         * data-click-trigger, data-dblclick-trigger,
         * data-click-exec, data-dblclick-exec
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_user_event: function(e) {
            var type = e.type;
            var data = $(e.currentTarget).attr("data-" + type + "-trigger");
            var event = (data || "").split(" ");
            for (var i = 0; i < event.length; i++) {
                this.trigger(type, {
                    element: e.currentTarget,
                    value: event[i],
                });
            }

            var data = $(e.currentTarget).attr("data-" + type + "-exec");
            var event = (data || "").split(" ");
            for (var i = 0; i < event.length; i++) {
                if (typeof this[event[i]] === "function")
                    this[event[i]].call(this);
            }

            e.preventDefault();
        },

        /**
         * Search event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_search_event: function(e) {
            this.trigger("search", {
                element: e.currentTarget,
                value: $(e.currentTarget).val(),
            });
        },

        /**
         * Append prefix and namespace
         * to event name
         *
         * @param  {String} event
         * @return {String}
         */
        _event: function(event) {
            var prefix = "modal";
            var namespace = "modaluser";
            var result = event;

            if (result) {
                result = prefix + result.split(" ").join(" " + prefix);
                result = result.split(" ").join("." + namespace + " ") + "." + namespace;
            }
            else
                result = "." + namespace;

            return result;
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            var that = this;

            // extend options
            if (typeof that.options !== "object") that.options = {};
            that.options = $.extend({}, that._defaults, that.options);

            // class name
            that.className(that.options.className);

            // create template and bind events
            that.element = $(that.options.template)
                .on("click.modal", "[data-click-trigger],[data-click-exec]", function(e) {
                    that._handle_user_event.call(that, e);
                })
                .on("dblclick.modal", "[data-dblclick-trigger],[data-dblclick-exec]", function(e) {
                    that._handle_user_event.call(that, e);
                })
                .on("input.modal", ".op3-modal-search", function(e) {
                    that._handle_search_event.call(that, e);
                })
                .appendTo(that.options.parent)
                .get(0);

            // render template
            that.render();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            $(this.element)
                .off(".modal")
                .remove();

            this.element = null;
        },

        /**
         * Get/set element class name
         * (if value is null then default
         * value i set)
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        className: function(value) {
            var $el = $(this.element);

            if (value === null) {
                $el.attr("class", this._defaults.className);
                return;
            }
            else if (typeof value === "undefined")
                return $el.attr("class");

            $el.attr("class", value);
        },

        /**
         * Get/set title
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        title: function(value) {
            var $el = $(this.element)
                .find(".op3-modal-title");

            if (typeof value === "undefined")
                return $el.html();

            if (typeof value === "string")
                $el
                    .html(value)
            else
                $el
                    .empty()
                    .append($(value));
        },

        /**
         * Get/set search input value
         *
         * @param  {Mixed} value (optional)
         * @return {Mixed}
         */
        search: function(value) {
            var $el = $(this.element)
                .find(".op3-modal-search");

            if (typeof value === "undefined") {
                return $el.val();
            }

            $el.val(value);
        },

        /**
         * Get/set content
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        content: function(value) {
            var $el = $(this.element)
                .find(".op3-modal-content");

            if (typeof value === "undefined")
                return $el.html();

            if (typeof value === "string")
                $el
                    .html(value)
            else
                $el
                    .empty()
                    .append($(value));
        },

        /**
         * Get/set message
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        message: function(value) {
            var $el = $(this.element)
                .find(".op3-modal-message");

            if (typeof value === "undefined")
                return $el.html();

            if (typeof value === "string")
                $el
                    .html(value)
            else
                $el
                    .empty()
                    .append($(value));
        },

        /**
         * Reset title/content/message to
         * initial state
         *
         * @param  {String} prop (optional)
         * @return {Void}
         */
        reset: function(prop) {
            if (typeof prop === "undefined") {
                this.options.title = this._defaults.title;
                this.options.search = this._defaults.search;
                this.options.content = this._defaults.content;
                this.options.message = this._defaults.message;
            }
            else if (prop === "title")
                this.options.title = this._defaults.title;
            else if (prop === "search")
                this.options.search = this._defaults.search;
            else if (prop === "content")
                this.options.content = this._defaults.content;
            else if (prop === "message")
                this.options.message = this._defaults.message;

            this.render(prop);
        },

        /**
         * Set title/content/message
         *
         * @param  {String} prop (optional)
         * @return {Void}
         */
        render: function(prop) {
            if (typeof prop === "undefined") {
                this.title(this.options.title);
                this.search(this.options.search);
                this.content(this.options.content);
                this.message(this.options.message);
            }
            else if (prop === "title")
                this.title(this.options.title);
            else if (prop === "search")
                this.search(this.options.search);
            else if (prop === "content")
                this.content(this.options.content);
            else if (prop === "message")
                this.message(this.options.message);
        },

        /**
         * Show modal
         *
         * @return {Void}
         */
        show: function() {
            if ($("body").hasClass("modal"))
                return;

            window.focus();
            this.trigger("show");

            $("body")
                .addClass("modal");
        },

        /**
         * Hide modal
         *
         * @return {Void}
         */
        hide: function() {
            if (!$("body").hasClass("modal"))
                return;

            this.trigger("hide");

            $("body")
                .removeClass("modal");
        },

        /**
         * Toggle (show/hide) modal
         *
         * @return {Void}
         */
        toggle: function() {
            if ($("body").hasClass("modal")) {
                return this.hide();
            }

            return this.show();
        },

        /**
         * Bind modal event
         *
         * @param  {String}   event
         * @param  {Function} callback
         * @return {Void}
         */
        on: function(event, callback) {
            $(this.element)
                .on(this._event(event), callback);
        },

        /**
         * Unbind modal event
         *
         * @param  {String}   event
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        off: function(event, callback) {
            $(this.element)
                .off(this._event(event), callback);
        },

        /**
         * Trigger modal event
         *
         * @param  {String} event
         * @param  {Mixed}  data  (optional)
         * @return {Void}
         */
        trigger: function(event, data) {
            $(this.element)
                .trigger(this._event(event), data);
        },

    });

    // globalize
    window.OP3.Modal = OP3_Modal;

    // close modal on ESC
    $(document).on("keydown", function(e) {
        if (e.which === 27 && $(document.body).hasClass("modal")) {
            // @todo - trigger hide?

            $(document.body)
                .removeClass("modal");

            e.preventDefault();
            e.stopImmediatePropagation();
        }
    });

})(window, document, jQuery);
