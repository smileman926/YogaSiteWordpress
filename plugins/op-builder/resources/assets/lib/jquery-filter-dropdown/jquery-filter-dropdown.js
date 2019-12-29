;(function() {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize FilterDropdown
     *
     * @param  {Node} options
     * @param  {Object} options
     * @return {Void}
     */
    var FilterDropdown = function(element, options) {
        if (!(this instanceof FilterDropdown))
            throw "FilterDropdown: FilterDropdown is a constructor.";

        this._element = element;
        this._options = options;

        this._init(options);
    }

    /**
     * FilterDropdown prototype
     *
     * @type {Object}
     */
    $.extend(FilterDropdown.prototype, {

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
                .addClass("jquery-filter-dropdown")
                .data("jquery-filter-dropdown", this)
                .on("change.jqueryfilterdropdown", this._handleElementChange.bind(this));

            // create items
            this._options.forEach(function(item) {
                var $item = $("<option />")
                    .text(item.label || "undefined")
                    .data("jquery-filter-dropdown-content", $(item.content))
                    .appendTo(this._element);

                this.$ui.item = this.$ui.item
                    .add($item);
                this.$ui.content = this.$ui.content
                    .add($item.data("jquery-filter-dropdown-content"));
            }.bind(this));

            // set class attribute
            this.$ui.item
                .addClass("jquery-filter-dropdown-item")
                .removeClass("jquery-filter-dropdown-active");
            this.$ui.content
                .addClass("jquery-filter-dropdown-content")
                .removeClass("jquery-filter-dropdown-active");

            // hide all and activate first item/content
            var $select = this.$ui.item.filter(":selected");
            var $content = $select.data("jquery-filter-dropdown-content");
            $($content)
                .addClass("jquery-filter-dropdown-active");
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this.$ui.item
                .remove();

            this.$ui.content
                .css("display", "")
                .removeClass("jquery-filter-dropdown-active")
                .removeClass("jquery-filter-dropdown-content");

            $(this._element)
                .removeClass("jquery-filter-dropdown")
                .removeData("jquery-filter-dropdown")
                .off("jqueryfilterdropdown");

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
         * Element change event handler:
         * activate content
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementChange: function(e) {
            var $select = this.$ui.item.filter(":not(.jquery-filter-dropdown-active):selected");
            var $content = $select.data("jquery-filter-dropdown-content");
            if (!$content)
                return;

            this.$ui.content
                .removeClass("jquery-filter-dropdown-active");
            $content
                .addClass("jquery-filter-dropdown-active");
        },

    });

    // jQuery plugin
    $.fn.filterDropdown = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-filter-dropdown");

            // not init, create new instance
            if (!lib)
                lib = new FilterDropdown(this, typeof options === "object" ? options : []);

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
                    throw "FilterDropdown: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})();
