import Emitter from "es6-event-emitter";
import MovingBorderMenu from "./MovingBorderMenu";

class CollapsibleMenu extends Emitter {
    /**
     * Init new menu
     * @param selector
     */
    constructor(selector) {
        super();

        this.menuWidth = 0;
        this.availableWidth = 0;
        this.selector = selector;
        this.eventWaiting = false;
        this.collapsed = false;

        this['jQueryInit']();
    }

    /**
     * Initialize all objects used in CollapsibleMenu class
     */
    ['jQueryInit']() {
        let _this = this;
        let $ = jQuery;

        (function ($) {

            $(document).ready(() => {
                _this.$menu = $(_this.selector);
                if (_this.$menu.length === 0) {
                    return;
                }

                _this['appInit']($);

                if (_this.eventWaiting) {
                    _this.triggerInitialEvents();
                }
            });

        })(jQuery);
    }

    /**
     * Resize the menu and hide certain items
     * @param {jQuery} $
     */
    ['resizeMenu']() {
        let _this = this;
        let $ = jQuery;

        this.availableWidth = _this.$menu.width() - _this.$menu.find(".ops-nav-item-more").width() - 300;
        this.menuWidth = 0;

        // Get width for all menu items
        this.$menu.find(".ops-nav-item").not(".ops-hidden").each(function(index, el) {
            _this.menuWidth =  _this.menuWidth + $(el).width();
        });

        // If there's not enough room for all items we hide the last one
        if (this.menuWidth > this.availableWidth) {
            this.$menu.find(".ops-nav-item").not(".ops-hidden, .ops-nav-item-more").last().addClass("ops-hidden");

            // Show only when we have hidden items
            if (this.$menu.find(".ops-nav-item.ops-hidden").not(".ops-nav-item-more, .ops-nav-item-less").length) {
                this.$menu.find(".ops-nav-item-more").show();
            } else {
                this.$menu.find(".ops-nav-item-more").hide();
            }

            // Run the resize again
            this['resizeMenu']($);
            this.collapsed = true;
        }
    }

    /**
     * JS functionality
     *
     * @param {jQuery} $
     */
    ['appInit']($) {
        let _this = this;

        _this.$menu.find('a.ops-nav-link')
            .click((e) => {
                if (_this.preventClick) {
                    e.preventDefault();
                }

                let $this = $(e.currentTarget);
                let $thisLI = $this.parent('li');

                _this.$menu.find('li').removeClass('ops-active');
                $thisLI.addClass('ops-active');

                _this.trigger('collapsibleMenu:change', $this.parent());
            })
        ;
    }

    /**
     * When waiting for some menus to still be initialized you can force reposition over this function
     */
    triggerInitialEvents() {
        let _this = this;
        let $ = jQuery;

        if (_this.$menu === null) {
            _this.eventWaiting = true;
            return;
        }

        if (_this.$menu.length === 0) {
            return;
        }

        _this.eventWaiting = false;
        // _this.$menu.find('li.ops-active').trigger('mouseover');
        // _this.$menu.find('li.ops-active a').trigger('click');
        _this['resizeMenu']($);

        _this.$menu.find('.ops-nav-link-more').click(function(e) {
            e.preventDefault();
            _this.collapsed = false;
            _this.$menu.find(".ops-nav-item.ops-hidden").removeClass("ops-hidden");
            _this.$menu.find(".ops-nav-item-more").hide();
            _this.$menu.find(".ops-nav-item-less").show();
        });

        _this.$menu.find('.ops-nav-link-less').click(function(e) {
            e.preventDefault();
            _this.collapsed = true;
            _this.$menu.find(".ops-nav-item-more").show();
            _this.$menu.find(".ops-nav-item-less").hide();
            _this['resizeMenu']($);
        });

        // Don't thins this is needed
        /*window.onresize = function() {
            _this['resizeMenu']($);
        }*/
    }

    /**
     * Change menu point based on index
     *
     * @param {int} index
     */
    changeMenu(index) {
        let _this = this;
        index = parseInt(index) + 1;

        _this.$menu.find('li').removeClass('ops-active');
        _this.$menu.find('li:nth-child(' + index + ')').addClass('ops-active');
        _this.$menu.find('li.ops-active').trigger('mouseover');
    }
}

export default CollapsibleMenu;
