;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize SelectToggleButton
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see SelectToggleButton.prototype._defaults
     * @return {Void}
     */
    var SelectToggleButton = function(element, options) {
        if (!(this instanceof SelectToggleButton))
            throw "SelectToggleButton: SelectToggleButton is a constructor.";
        if (!$(element).is("select"))
            throw "SelectToggleButton: SelectToggleButton first argument must be select node.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * SelectToggleButton prototype
     *
     * @type {Object}
     */
    $.extend(SelectToggleButton.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            // nothing???
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            this._element = $(this._element)
                .addClass("jquery-select-toggle-button")
                .on("change.jqueryselecttogglebutton", this._handleChange.bind(this))
                .data("jquery-select-toggle-button", this)
                .get(0);

            // extend options
            this._options = $.extend({}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            this.$ui = {};
            this.$ui.option = $(this._element).find("option");
            this.$ui.widget = $("<div />")
                .addClass("jquery-select-toggle-button-widget")
                .insertAfter(this._element);

            this.$ui.button = $("<button />")
                .attr("type", "button")
                .attr("data-jquery-select-toggle-button-option-value", "")
                .attr("title", "")
                .text("")
                .on("click.jqueryselecttogglebutton", this._handleClick.bind(this))
                .appendTo(this.$ui.widget);

            this._handleChange();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._element = $(this._element)
                .off(".jqueryselecttogglebutton")
                .removeClass("jquery-select-toggle-button")
                .removeData("jquery-select-toggle-button");
            this.$ui.widget
                .remove();

            this.$ui = null;
            this._element = null;
        },

        /**
         * Element change event handler:
         * highlight selected button
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleChange: function(e) {
            var $current = this.$ui.option.filter(":selected");

            this.$ui.button
                .attr("data-jquery-select-toggle-button-option-value", $(this._element).val())
                .attr("title", $current.text())
                .text($current.text())
        },

        /**
         * Element change event handler:
         * change element value
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleClick: function(e) {
            var $current = this.$ui.option.filter(":selected");
            var index = this.$ui.option.index($current);
            var next = index + 1;
            if (next >= this.$ui.option.length)
                next = 0;
            var value = this.$ui.option.eq(next).val();
            var trigger = $(this._element).val() != value;

            $(this._element)
                .val(value)
                .trigger(trigger ? "change" : "_nothing");
        },

    });

    // jQuery plugin
    $.fn.selectToggleButton = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-select-toggle-button");

            // not init, create new instance
            if (!lib)
                lib = new SelectToggleButton(this, typeof options === "object" ? options : {});

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
                    throw "SelectToggleButton: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
