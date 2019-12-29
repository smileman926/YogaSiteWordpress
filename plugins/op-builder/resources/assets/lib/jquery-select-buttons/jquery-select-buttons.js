;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize SelectButtons
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see SelectButtons.prototype._defaults
     * @return {Void}
     */
    var SelectButtons = function(element, options) {
        if (!(this instanceof SelectButtons))
            throw "SelectButtons: SelectButtons is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * SelectButtons prototype
     *
     * @type {Object}
     */
    $.extend(SelectButtons.prototype, {

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
                .addClass("jquery-select-buttons")
                .on("change.jqueryselectbuttons", this._handleChange.bind(this))
                .data("jquery-select-buttons", this)
                .get(0);

            // extend options
            this._options = $.extend({}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            this.$ui = {};
            this.$ui.button = $(false);
            this.$ui.widget = $("<div />")
                .addClass("jquery-select-buttons-widget")
                .insertAfter(this._element);

            $(this._element).find("option").each(function(index, value) {
                var $value = $(value);
                var format = $value.attr("data-format");
                var txt = $value.text();
                var val = $value.attr("value");
                var sel = $value.is(":selected");

                var btn = $("<button />")
                    .addClass("jquery-select-buttons-option")
                    .addClass(sel ? "jquery-select-buttons-option-selected" : "_temp")
                    .removeClass("_temp")
                    .attr("type", "button")
                    .attr("title", $(value).text())
                    .attr("data-jquery-select-buttons-option-value", val)
                    .on("click.jqueryselectbuttons", this._handleClick.bind(this));
                this.$ui.button = this.$ui.button.add(btn);

                $("<span />")
                    .addClass("jquery-select-buttons-option-format")
                    .html(format)
                    .appendTo(btn);
                $("<span />")
                    .addClass("jquery-select-buttons-option-text")
                    .css("display", format ? "none": "")
                    .text(txt)
                    .appendTo(btn);
                $("<span />")
                    .addClass("jquery-select-buttons-option-icon")
                    .css("display", format ? "none": "")
                    //.text(txt)
                    .appendTo(btn);

                btn.appendTo(this.$ui.widget);
            }.bind(this));
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._element = $(this._element)
                .off(".jqueryselectbuttons")
                .removeClass("jquery-select-buttons")
                .removeData("jquery-select-buttons");
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
            this.$ui.button
                .removeClass("jquery-select-buttons-option-selected")
                .filter('[data-jquery-select-buttons-option-value="' + $(e.target).val() + '"]')
                    .addClass("jquery-select-buttons-option-selected");
        },

        /**
         * Element change event handler:
         * change element value
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleClick: function(e) {
            var $select = $(this._element)
            var before = $select.val();
            var after = $(e.currentTarget).attr("data-jquery-select-buttons-option-value");
            if (before == after)
                return;

            $select
                .val(after)
                .trigger("change");
        },

    });

    // jQuery plugin
    $.fn.selectButtons = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-select-buttons");

            // not init, create new instance
            if (!lib)
                lib = new SelectButtons(this, typeof options === "object" ? options : {});

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
                    throw "SelectButtons: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
