;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize SimpleNavTree
     *
     * @param  {Node}   element HTML node
     * @param  {Object} options see SimpleNavTree.prototype._defaults
     * @return {Void}
     */
    var SimpleNavTree = function(element, options) {
        if (!(this instanceof SimpleNavTree))
            throw "SimpleNavTree: SimpleNavTree is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * SimpleNavTree prototype
     *
     * @type {Object}
     */
    $.extend(SimpleNavTree.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            // toggle nav on event (hover/click/auto/none)
            eventTrigger: "hover",

            // css selector targeting list wrapper elements
            ulSelector: "ul",

            // css selector targeting list elements
            liSelector: "li",

            // css selector targeting dropdown arrow elements
            dropdownArrowSelector: '.jquery-simple-nav-tree-arrow',

            // leave ul element visible on mouseleave for X
            // miliseconds (only for eventTrigger:hover)
            collapseDelay: 0,


            // When eventTrigger is set to auto, both click and hover
            // events will be registered, but interaction will
            // happen based  on the value in this attribute.
            eventTriggerAttribute: "data-trigger",
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            this._element = $(this._element)
                .data("jquery-simple-nav-tree", this)
                .addClass("jquery-simple-nav-tree")
                .get(0);
            if (!(this._element instanceof Node))
                throw "SimpleNavTree: element argument must be of type Node.";

            // extend options with default
            this._options = $.extend({}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // elements
            this.$ui = {
                document: $(this._element.ownerDocument),
                element: $(this._element),
                ul: $(this._element).find(this._options.ulSelector).addClass("jquery-simple-nav-tree-ul"),
                li: $(this._element).find(this._options.liSelector).addClass("jquery-simple-nav-tree-li"),
            }

            // uuid (for namespacing events)
            this._uuid = this.$ui.element.attr("id") || this._getUuid();

            // bind events
            this._bind();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._unbind();

            this.$ui.element
                .removeData("jquery-simple-nav-tree")
                .removeClass("jquery-simple-nav-tree");

            this._element = null;
            this._options = null;

            delete this.$ui;
            delete this._uuid;
        },

        /**
         * Get unique uuid
         * (used for namespacing events)
         *
         * @return {String}
         */
        _getUuid: function() {
            var valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var length = 8;
            var result = "";

            // logic
            for (var i = 0; i < length; i++) {
                result += valid.charAt(Math.floor(Math.random() * valid.length));
            }

            // already exists
            var used = this.$ui.document.data("jquery-simple-nav-tree-uuids");
            if (!used) {
                used = [];
                this.$ui.document.data("jquery-simple-nav-tree-uuids", used);
            }
            if (used.indexOf(result) !== -1)
                return this._getUuid();

            // make sure we can only use this uuid once
            used.push(result);

            // unique
            return result;
        },

        /**
         * Bind events
         *
         * @return {Void}
         */
        _bind: function() {
            this._unbind();

            var ns = ".jquery-simple-nav-tree-" + this._uuid;
            var trigger = this._options.eventTrigger;
            if (trigger === "click" || trigger === "auto") {
                this.$ui.element
                    .on("click" + ns, this._options.liSelector, this._handleListClick.bind(this));
                this.$ui.document
                    .on("click" + ns, this._handleDocumentClick.bind(this));
            }

            if (trigger === "hover" || trigger === "auto") {
                this.$ui.element
                    .on("mouseenter" + ns, this._options.liSelector, this._handleListMouseEnter.bind(this))
                    .on("mouseleave" + ns, this._options.liSelector, this._handleListMouseLeave.bind(this));
            }
        },

        /**
         * Unbind events
         *
         * @return {Void}
         */
        _unbind: function() {
            $(null)
                .add(this.$ui.element)
                .add(this.$ui.document)
                    .off(".jquery-simple-nav-tree-" + this._uuid);
        },

        /**
         * Toggle (expand/collapse) list
         *
         * @param  {Node} list
         * @return {Void}
         */
        toggle: function(list) {
            var $list = $(list).closest(this._options.liSelector).first();
            if (!$list.length)
                return;

            if ($list.is(".jquery-simple-nav-tree-expand"))
                this.collapse($list);
            else
                this.expand($list);
        },

        /**
         * Expand list
         *
         * @param  {Node} list
         * @return {Void}
         */
        expand: function(list) {
            var $list = $(list).closest(this._options.liSelector).first();
            if (!$list.length)
                return;
            var $parent = $list.parents(this._options.liSelector);
            var $children = $list.find(this._options.liSelector);

            // remove expand class from all other lists
            this.$ui.li
                .not($list)
                .not($parent)
                .not($children)
                .removeClass("jquery-simple-nav-tree-expand");

            // add expand class to curent list and
            // all it's list parents
            $(null)
                .add($list)
                .add($parent)
                    .addClass("jquery-simple-nav-tree-expand");

            // flip child list if it goes out of document bounds
            var $child = $list.find(this._options.ulSelector).first();
            var child = $child.get(0).getBoundingClientRect();
            var doc = document.documentElement.getBoundingClientRect();
            if (child.x + child.width > doc.width) {
                $child.addClass("jquery-simple-nav-tree-expand-flip");
            }

        },

        /**
         * Collapse list
         *
         * @param  {Node} list
         * @param  {Boolean} leaveFirstChildrenExpanded
         * @return {Void}
         */
        collapse: function(list, leaveFirstChildrenExpanded) {
            var $list = $(list).closest(this._options.liSelector).first();
            if (!$list.length)
                return;

            var $children = $list.find(this.$ui.li);

            // include list first childrens
            // (if they should be hidden)
            // --
            // Commenting this out for now
            // since this should only happen in LiveEditor
            // if (!leaveFirstChildrenExpanded)
            $children = $children.add($list);

            $children.removeClass("jquery-simple-nav-tree-expand");
        },

        /**
         * Collapse all list(s)
         *
         * @return {Void}
         */
        collapseAll: function() {
            $(this.$ui.li)
                .removeClass("jquery-simple-nav-tree-expand");
        },

        /**
         * List mouseenter event handler:
         * expand list
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleListMouseEnter: function(e) {
            if (this._options.eventTrigger === "auto" && $(this._element).attr(this._options.eventTriggerAttribute) !== "hover")
                return;

            if (this._hoverCollapseInterval && this._hoverCollapseDelay)
                clearInterval(this._hoverCollapseInterval);

            this.expand(e.currentTarget);
        },

        /**
         * List mouseleave event handler:
         * collapse list
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleListMouseLeave: function(e) {
            if (this._options.eventTrigger === "auto" && $(this._element).attr(this._options.eventTriggerAttribute) !== "hover")
                return;

            if (this._hoverCollapseInterval && this._hoverCollapseDelay)
                clearInterval(this._hoverCollapseInterval);

            this._hoverCollapseDelay = function(target) {
                this.collapse(target);

                clearInterval(this._hoverCollapseInterval);

                delete this._hoverCollapseInterval;
                delete this._hoverCollapseDelay;
            }.bind(this, e.currentTarget);
            this._hoverCollapseInterval = setTimeout(this._hoverCollapseDelay, this._options.collapseDelay);
        },

        /**
         * List click event handler:
         * toggle list
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleListClick: function(e) {
            if (this._options.eventTrigger === "auto" && $(this._element).attr(this._options.eventTriggerAttribute) !== "click")
                return;

            var $list = $(e.currentTarget).closest(this._options.liSelector).first();
            if (!$list.length)
                return;

            if ($list.is(".jquery-simple-nav-tree-expand"))
                this.collapse($list, true);
            else
                this.expand($list);

            e.stopPropagation();

            // Click on dropdown arrow shouldn't navigate to a new page
            if ($(e.target).is(this._options.dropdownArrowSelector))
                e.preventDefault();
        },

        /**
         * Document click event handler:
         * collapse all on outside element click
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleDocumentClick: function(e) {
            if (this._options.eventTrigger === "auto" && $(this._element).attr(this._options.eventTriggerAttribute) !== "click")
                return;

            var $target = $(e.target);
            if ($target.closest(this.$ui.li).length)
                return;

            this.collapseAll();

            // Click on dropdown arrow shouldn't navigate to a new page
            if ($target.is(this._options.dropdownArrowSelector))
                e.preventDefault();
        },

    });

    // jQuery plugin
    $.fn.simpleNavTree = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-simple-nav-tree");

            // create new instance
            if (!lib)
                lib = new SimpleNavTree(this, typeof options === "object" ? options : {});

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
                    throw "SimpleNavTree: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(jQuery, window, document);
