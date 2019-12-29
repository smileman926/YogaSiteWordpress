;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize GridPicker
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see GridPicker.prototype._defaults
     * @return {Void}
     */
    var GridPicker = function(element, options) {
        if (!(this instanceof GridPicker))
            throw "GridPicker: GridPicker is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * GridPicker prototype
     *
     * @type {Object}
     */
    $.extend(GridPicker.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            select: null,
            unselect: null,
            render: null,
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            // dom node element
            this._element = $(this._element)
                .addClass("jquery-grid-picker")
                .off(".jquerygridpicker")
                .on("change.jquerygridpicker", this._handleElementChange.bind(this))
                .data("jquery-grid-picker", this)
                .get(0);

            // extend options
            this._options = $.extend({}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // interface
            this.$ui = {};
            this.$ui.widget = $("<ul />")
                .addClass("jquery-grid-picker-widget")
                .on("click.jquerygridpicker", ".jquery-grid-picker-item", this._handleItemClick.bind(this))
                .insertAfter(this._element);
            this.$ui.items = $(null);

            // render items
            $(this._element)
                .find("option")
                .each(function(index, node) {
                    var html = this._render(node);
                    if (html === false)
                        return;

                    var $item = $("<li />")
                        .attr("class", "jquery-grid-picker-item")
                        .attr("data-jquery-grid-picker-value", $(node).val())
                        .appendTo(this.$ui.widget);
                    $(html)
                        .addClass("jquery-grid-picker-item-content")
                        .appendTo($item);

                    this.$ui.items = this.$ui.items
                        .add($item);
                }.bind(this));

            this._handleElementChange();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._element = $(this._element)
                .off(".jquerygridpicker")
                .removeClass("jquery-grid-picker")
                .removeData("jquery-grid-picker");
            this.$ui.widget
                .remove();

            this.$ui = null;
            this._element = null;
        },

        /**
         * Render item method
         *
         * @param  {Node}   node
         * @return {String}
         */
        _render: function(node) {
            if (typeof this._options.render === "function")
                return this._options.render.call(this, node);

            var $node = $(node),
                display = $node.css("display");
            if (display === "none")
                return false;
            var label = $node.text();

            return ''
                + '<a href="#" title="' + label + '">'
                + label
                + '</a>';
        },

        /**
         * Select item method
         *
         * @param  {Node}    node
         * @return {Boolean}
         */
        _select: function(node) {
            if (this._options.select === true)
                return true;
            else if (typeof this._options.select === "function")
                return !!this._options.select.call(this, node);

            return true;
        },

        /**
         * Unselect item method
         *
         * @param  {Node}    node
         * @return {Boolean}
         */
        _unselect: function(node) {
            if (this._options.unselect === true)
                return true;
            else if (typeof this._options.unselect === "function")
                return !!this._options.unselect.call(this, node);

            return typeof $(this._element).attr("multiple") !== "undefined";
        },

        /**
         * Element change event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementChange: function(e) {
            var value = $(this._element).val() || "";
            var filter = null;

            if (typeof value === "string")
                filter = '[data-jquery-grid-picker-value="' + value + '"]';
            else
                filter = value
                    .map(function(item) {
                        return '[data-jquery-grid-picker-value="' + item + '"]';
                    })
                    .join(",");

            this.$ui.items
                .removeClass("jquery-grid-picker-active")
                .filter(filter)
                    .addClass("jquery-grid-picker-active");
        },

        /**
         * Item click event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleItemClick: function(e) {
            e.preventDefault();

            var target = e.currentTarget;
            var value = $(target).attr("data-jquery-grid-picker-value") || "";
            var option = $(this._element).find('option[value="' + value + '"]').get(0);
            var length = $(this._element).find("option:selected").length;

            if ($(option).is(":selected") && this._unselect(option)) {
                $(option).prop("selected", false);

                if (length - 1 === 0)
                    $(this._element).val("");
            }
            else if (!$(option).is(":selected") && this._select(option))
                $(option).prop("selected", true);
            else
                return;

            $(this._element)
                .trigger("change");
        },

    });

    // jQuery plugin
    $.fn.gridPicker = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-grid-picker");

            // not init, create new instance
            if (!lib)
                lib = new GridPicker(this, typeof options === "object" ? options : {});

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
                    throw "GridPicker: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
