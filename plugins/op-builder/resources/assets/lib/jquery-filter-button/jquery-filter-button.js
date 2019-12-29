;(function() {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize FilterButton
     *
     * @param  {Node} options
     * @param  {Object} options
     * @return {Void}
     */
    var FilterButton = function(element, options) {
        if (!(this instanceof FilterButton))
            throw "FilterButton: FilterButton is a constructor.";

        this._element = element;
        this._options = options;

        this._init(options);
    }

    /**
     * FilterButton prototype
     *
     * @type {Object}
     */
    $.extend(FilterButton.prototype, {

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            // define empty ui
            this.$ui = {
                item: $(null),
                content: $(null),
            };

            // create element
            this._element = $(this._element)
                .addClass("jquery-filter-button")
                .data("jquery-filter-button", this)
                .on("click.jqueryfilterbutton", ".jquery-filter-button-item", this._handleItemClick.bind(this));

            // create items
            this._options.forEach(function(item) {
                var $item = $("<button />")
                    .attr("type", "button")
                    .data("jquery-filter-button-content", $(item.content))
                    .appendTo(this._element);
                if (item.icon)
                    $("<span />")
                        .attr("class", "jquery-filter-button-item-icon")
                        .addClass(item.icon)
                        .appendTo($item);
                $("<span />")
                    .attr("class", "jquery-filter-button-item-label")
                    .text(item.label || "undefined")
                    .appendTo($item);

                this.$ui.item = this.$ui.item
                    .add($item);
                this.$ui.content = this.$ui.content
                    .add($item.data("jquery-filter-button-content"));
            }.bind(this));

            // set class attribute
            this.$ui.item
                .addClass("jquery-filter-button-item")
                .removeClass("jquery-filter-button-active");
            this.$ui.content
                .addClass("jquery-filter-button-content")
                .removeClass("jquery-filter-button-active");

            // hide all and activate first item/content
            this.$ui.item
                .first()
                    .addClass("jquery-filter-button-active")
                    .data("jquery-filter-button-content")
                        .addClass("jquery-filter-button-active");
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this.$ui.item
                .remove();

            $(this.$ui.content)
                .css("display", "")
                .removeClass("jquery-filter-button-active")
                .removeClass("jquery-filter-button-content");

            $(this._element)
                .removeClass("jquery-filter-button")
                .removeData("jquery-filter-button")
                .off(".jqueryfilterbutton");

            this.$ui = null;
            this._options = null;
            this._element = null;
        },

        /**
         * Attach element to DOM
         * (before first content)
         *
         * @return {Void}
         */
        attach: function() {
            $(this._element)
                .insertBefore(this.$ui.content.first());
        },

        /**
         * Detach element from DOM
         *
         * @return {Void}
         */
        detach: function() {
            $(this._element)
                .detach();
        },

        /**
         * Item click event handler:
         * activate item/content
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleItemClick: function(e) {
            e.preventDefault();

            var $target = $(e.currentTarget);
            if ($target.is(".jquery-filter-button-active"))
                return;

            this.$ui.item
                .removeClass("jquery-filter-button-active");
            $target
                .addClass("jquery-filter-button-active");

            var $content = $target.data("jquery-filter-button-content");
            this.$ui.content
                .removeClass("jquery-filter-button-active")
                .addClass("jquery-filter-button-hidden");
            $content
                .addClass("jquery-filter-button-active")
                .removeClass("jquery-filter-button-hidden");

            return;
            var index = this.$ui.item.index(target);
            this.$ui.item
                .removeClass("jquery-filter-button-active")
                .eq(index)
                    .addClass("jquery-filter-button-active");
            this.$ui.content
                .removeClass("jquery-filter-button-active")
                .eq(index)
                    .addClass("jquery-filter-button-active");
        },

    });

    // jQuery plugin
    $.fn.filterButton = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-filter-button");

            // not init, create new instance
            if (!lib)
                lib = new FilterButton(this, typeof options === "object" ? options : []);

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
                    throw "FilterButton: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})();
