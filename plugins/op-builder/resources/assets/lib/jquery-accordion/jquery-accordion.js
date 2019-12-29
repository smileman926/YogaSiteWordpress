;(function($, window, document) {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize Accordion
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see Accordion.prototype._defaults
     * @return {Void}
     */
    var Accordion = function(element, options) {
        if (!(this instanceof Accordion))
            throw "Accordion: Accordion is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * Accordion prototype
     *
     * @type {Object}
     */
    $.extend(Accordion.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            parent: null,
            questionClass: '.question',
            answerClass: '.answer',
            itemClass: '.item',
            closeOthers: true,
            animationDuration: 200,
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
             this._element = $(this._element)
                .addClass("jquery-accordion")
                .data("jquery-accordion", this)
                .get(0);

            // extend options
            this._options = $.extend(true, {}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // bind events
            $(this._element)
                // .find(this._options.questionClass)
                .on("click.jqueryaccordion", this._options.questionClass, this._handleQuestionClick.bind(this));

            $(this._element).trigger("jqueryaccordioninit");
        },

        /**
         * Question click event handler
         *
         * @param {Event} e
         */
        _handleQuestionClick: function(e) {
            e.stopPropagation();
            var $target = $(e.currentTarget);
            this.toggle($target);
        },

        /**
         * Open/Close question
         *
         * @param {Object} element
         */
        toggle: function(element) {
            $(this._element).trigger("jqueryaccordiontoggle");
            var $answer = element
                .parent()
                .find(this._options.answerClass)
                .first();

            var item = element.closest(this._options.itemClass);
            if (this._options.closeOthers)
                item
                    .siblings()
                    .removeClass("jquery-accordion-active")
                    .find(this._options.answerClass)
                    .slideUp(this._options.animationDuration);

            item.toggleClass("jquery-accordion-active")
            $answer.slideToggle(this._options.animationDuration);
            $(this._element).trigger("jqueryaccordiontoggled");
        },

        /**
         * Open accordion item
         *
         * @param {Object} item
         * @return {Void}
         */
        open: function(item) {
            item
                .addClass("jquery-accordion-active")
                .find(this._options.answerClass)
                .first()
                .slideDown(this._options.animationDuration);
        },

        /**
         * Close accordion item
         *
         * @param {Object} item
         * @return {Void}
         */
        close: function(item) {
            item
                .removeClass("jquery-accordion-active")
                .find(this._options.answerClass)
                .first()
                .slideUp(this._options.animationDuration);
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            $(this._element)
                .removeClass("jquery-accordion")
                .removeData("jquery-accordion")
                .trigger("jqueryaccordiondestroy");

            this._element = null;
            this._options = null;
        },

        /**
         * Get/Set lib option
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Mixed}
         */
        options: function(key, value) {
            if (!(key in this._options))
                throw "Accordion: invalid options key '" + key + "'";

            // get
            if (typeof value === "undefined")
                return this._options[key];

            // set
            this._options[key] = value
        },

    });

    // jQuery plugin
    $.fn.accordion = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-accordion");

            // create new instance
            if (!lib)
                lib = new Accordion(this, typeof options === "object" ? options : {});

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
                    throw "Accordion: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window, document);
