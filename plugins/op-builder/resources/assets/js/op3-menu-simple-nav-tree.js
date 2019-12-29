/**
 * OptimizePress3 designer extension:
 * adding undo/redo functionality to designer.
 *
 * Dependencies:
 *     - jQuery.js
 *     - jquery-simple-nav-tree.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * SimpleNavTree options
     *
     * @type {Object}
     */
    var _options = {
        eventTrigger: "click",
        ulSelector: ".op3-treemenuitem-children-content",
        liSelector: ".op3-treemenuitem-content",
    }

    /**
     * Re-init simpleNavTree lib on treemenu element
     * on menuName change
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _treemenuRender = function(e, o) {
        $(o.node)
            .simpleNavTree("destroy")
            .simpleNavTree(_options);
    }

    /**
     * Init simpleNavTree lib on treemenu elements
     * on elementappend event
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _elementAppend = function(e, o) {
        var row = OP3.$(o.node).filter("treemenu");
        var child = OP3.$(o.node).find("treemenu");

        row.add(child).each(function() {
            var element = OP3.$(this);
            var value = element.getOption("menuName", "all");

            if (OP3.Menus.isValidMenu(value))
                $(this)
                    .simpleNavTree("destroy")
                    .simpleNavTree(_options);
        });
    }

    // !!! TODO: Refactor opening/closing
    var hamburgerClose = function($element) {

        // stop if already opening/closing
        if ($element.hasClass("op3-hamburger-is-animating"))
            return;

        $element
            .addClass("op3-hamburger-animate-out op3-hamburger-is-animating")

        // Intentionally not using transitionend event,
        // because animaiton sometiems stuters and the
        // event isn't triggered
        setTimeout(function() {
            $element
                .removeClass("op3-hamburger-show op3-hamburger-animate-in op3-hamburger-animate-out op3-hamburger-is-animating");
        }, 400);
    }

    var hamburgerOpen = function($element) {
        // stop if already opening/closing
        if ($element.hasClass("op3-hamburger-is-animating"))
            return;

        $element.addClass("op3-hamburger-show op3-hamburger-is-animating");
        setTimeout(function() {
            $element
                .addClass("op3-hamburger-animate-in");
        });

        // Intentionally not using transitionend event,
        // because animaiton sometiems stuters and the
        // event isn't triggered
        setTimeout(function() {
            $element
                .removeClass("op3-hamburger-is-animating");
        }, 400);
    }


    // autoinit
    $(function() {
        OP3.$("treemenu").jq()
            .simpleNavTree(_options);


        $('body')
            .on("click", ".op3-hamburger", function(e) {
                var $this = $(this);
                e.preventDefault();

                if ($this.hasClass("op3-hamburger-show")) {
                    hamburgerClose($this);
                    return;
                }

                hamburgerOpen($this);
            })
            .on("click", ".op3-hamburger-close", function(e) {
                e.preventDefault();
                hamburgerClose($(this).siblings(".op3-hamburger"));
            });

        OP3.bind("treemenurender", _treemenuRender);
        OP3.bind("elementappend", _elementAppend);
    });

})(jQuery, window, document);
