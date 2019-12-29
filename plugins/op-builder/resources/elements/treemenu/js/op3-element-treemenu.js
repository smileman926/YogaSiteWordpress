;(function($, window, document) {

    "use strict";

    $(function() {

        /**
         * Delay before closing dropdown on mouseleave event
         */
        var _dropdownCollapseDelay = 600;

        /**
         * Handles hamburger menu opening
         *
         * @param {Object} $element
         * @retur {Void}
         */
        var hamburgerOpen = function($element) {

            // stop if already opening/closing
            if ($element.hasClass("op3-hamburger-is-animating"))
                return;

            // is-animaing class sets the initial position,
            // and animate-in starts the animation, that's
            // why it nees to be wrapped in setTimeout
            $element.addClass("op3-hamburger-show op3-hamburger-is-animating");
            setTimeout(function() {
                $element.addClass("op3-hamburger-animate-in")
            });

            // Intentionally not using transitionend event,
            // because animaiton sometiems stuters and the
            // event isn't triggered
            setTimeout(function() {
                $element.removeClass("op3-hamburger-is-animating");
            }, _dropdownCollapseDelay);
        }

        /**
         * Handles hamburger menu cosing
         *
         * @param {Object} $element
         */
        var hamburgerClose = function($element) {

            // Stop immediately if already opening/closing
            if ($element.hasClass("op3-hamburger-is-animating"))
                return;

            $element.addClass("op3-hamburger-animate-out")

            // Intentionally not using transitionend event,
            // because animaiton sometiems stuters and the
            // event isn't triggered
            setTimeout(function() {
                $element.removeClass("op3-hamburger-show op3-hamburger-animate-in op3-hamburger-animate-out op3-hamburger-is-animating");
            }, _dropdownCollapseDelay);
        }

        // Sets data-op3-simplenavtree-trigger attribute depending
        // if hamburger or non-hamburger menu is shown
        /**
         *
         * @param {Object} $element menu container
         * @return {Void}
         */
        var setHamburgerTrigger = function($element) {
            var trigger = "hover";

            // When hamburger menu is show, always default to click
            if ($element.find('.op3-hamburger').css('display') !== "none")
                trigger = "click";

            $element.attr("data-op3-simplenavtree-trigger", trigger);
        }

        // On window resize we want to updte navtree-triger action
        $(window).on("resize", function() {
            $('.op3-element[data-op3-element-type="treemenu"]').each(function() {
                setHamburgerTrigger($(this));
            });
        })

        // Initialize menu
        $('.op3-element[data-op3-element-type="treemenu"]')
            .attr("data-op3-simplenavtree-trigger", "hover")
            .simpleNavTree({
                ulSelector: ".op3-treemenuitem-children-content",
                liSelector: ".op3-treemenuitem-content",
                dropdownArrowSelector: ".op3-dropdown-icon",
                collapseDelay: _dropdownCollapseDelay,
                eventTrigger: "auto",
                eventTriggerAttribute: "data-op3-simplenavtree-trigger",
            })
            .on("click", ".op3-treemenuitem-link", function (e) {
                // Close the hamburger menu if link href is anchor
                // (both for "#hash" and "/page#hash" versions),
                // but not when dropdown arrow is clicked
                if (!$(e.target).is(".op3-dropdown-icon") && $(this).attr("href").indexOf("#") > -1)
                    hamburgerClose($(this).closest('.op3-treemenu-content').find(" > .op3-hamburger"));
            })
            .each(function() {
                setHamburgerTrigger($(this));
            })
            .find(".op3-hamburger")
            .on("click", function(e) {
                var $this = $(this);
                e.preventDefault();

                if ($this.hasClass("op3-hamburger-show")) {
                    hamburgerClose($this);
                    return;
                }

                hamburgerOpen($this);
            })
            .siblings(".op3-hamburger-close")
            .on("click", function(e) {
                e.preventDefault();
                hamburgerClose($(this).siblings(".op3-hamburger"));
            });
    });

})(jQuery, window, document);
