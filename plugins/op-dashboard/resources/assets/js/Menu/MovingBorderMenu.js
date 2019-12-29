/**
 * Menu navigation that has line on bottom which moves based on hover or selection
 *
 * Run JS code
 import MovingBorderMenu from "./Menu/MovingBorderMenu";
 let movingBorderMenu = new MovingBorderMenu('.ops_movingBorderMenu');
 *
 * Example of HTML Code:
 <nav class="ops_movingBorderMenu">
 <ul class="ops-right-menu">
 <li>
 <a href="">
 <i class="ops-iconFont ops-dashboard-simple-icon"></i>
 <span>Dashboard</span>
 </a>
 </li>
 </ul>
 <span class="ops_movingBorderMenu-hover"></span>
 </nav>
 *
 */

import Emitter from 'es6-event-emitter'

class MovingBorderMenu extends Emitter {
    constructor(selector, preventClick = false) {
        super();

        this.selector = selector;
        this.preventClick = preventClick;
        this.eventWaiting = false;
        this.$movingBorderMenu = null;
        this.$movingBorderMenuHover = null;

        this['jQueryInit']();
    }

    /**
     * Initialize all objects used in UserBooking class
     */
    ['jQueryInit']() {
        let _this = this;

        (function ($) {

            $(document).ready(() => {
                _this.$movingBorderMenu = $(_this.selector);
                if (_this.$movingBorderMenu.length === 0) {
                    return;
                }

                _this.$movingBorderMenuHover = _this.$movingBorderMenu.find(_this.selector + '-hover');

                _this['appInit']($);

                if (_this.eventWaiting) {
                    _this.triggerInitialEvents();
                }
            });

        })(jQuery);
    }

    /**
     * JS functionality
     *
     * @param {jQuery} $
     */
    ['appInit']($) {
        let _this = this;

        _this['setMovingBorderMenuHover']($);

        _this.$movingBorderMenu.find('li')
            .hover(
                (e) => {
                    let $this = $(e.currentTarget);

                    _this.$movingBorderMenuHover.css('width', $this.width());
                    _this.$movingBorderMenuHover.css('left', $this.position().left + parseInt($this.css('marginLeft')));
                },
                (e) => {
                    let $this = $(e.currentTarget);

                    _this.$movingBorderMenuHover.css('width', parseFloat(_this.$movingBorderMenuHover.attr('data-width')));
                    _this.$movingBorderMenuHover.css('left', parseFloat(_this.$movingBorderMenuHover.attr('data-left')));
                }
            )
        ;

        _this.$movingBorderMenu.find('a')
            .click((e) => {
                if (_this.preventClick) {
                    e.preventDefault();
                }


                let $this = $(e.currentTarget);
                let $thisLI = $this.parent('li');

                _this.$movingBorderMenu.find('li').removeClass('selected').removeClass('ops-active');
                $thisLI.addClass('selected').addClass('ops-active');

                if ($thisLI.hasClass('op3_menuNoSelect') === false) {
                    _this.$movingBorderMenuHover.attr('data-width', $thisLI.width());
                    _this.$movingBorderMenuHover.attr('data-left', $thisLI.position().left + parseInt(_this.$movingBorderMenu.find('li.selected, li.ops-active').css('marginLeft')));
                }

                _this.trigger('movingBorderMenu:change', $this.parent());
            })
        ;
    }

    /**
     * Set current position based on selected menu point
     */
    ['setMovingBorderMenuHover']($) {
        let _this = this;

        let leftPosition = 0;
        let menuWidth = 0;

        if (_this.$movingBorderMenu.find('li.selected, li.ops-active').length > 0) {
            menuWidth = _this.$movingBorderMenu.find('li.selected, li.ops-active').width();
            leftPosition = _this.$movingBorderMenu.find('li.selected, li.ops-active').position().left + parseInt(_this.$movingBorderMenu.find('li.selected, li.ops-active').css('marginLeft'));
        }

        _this.$movingBorderMenuHover.attr('data-width', menuWidth).css('width', parseFloat(_this.$movingBorderMenuHover.attr('data-width')));
        _this.$movingBorderMenuHover.attr('data-left', leftPosition).css('left', parseFloat(_this.$movingBorderMenuHover.attr('data-left')));
    }

    /**
     * When waiting for some menus to still be initialized you can force reposition over this function
     */
    triggerInitialEvents() {
        let _this = this;
        if (_this.$movingBorderMenu === null) {
            _this.eventWaiting = true;
            return;
        }
        _this.eventWaiting = false;
        _this.$movingBorderMenu.find('li.selected, li.ops-active').trigger('mouseover');
        _this.$movingBorderMenu.find('li.selected a, li.ops-active a').trigger('click');
    }

    /**
     * Change menu point based on index
     *
     * @param {int} index
     */
    changeMenu(index) {
        let _this = this;
        index = parseInt(index) + 1;

        _this.$movingBorderMenu.find('li').removeClass('selected').removeClass('ops-active');
        _this.$movingBorderMenu.find('li:nth-child(' + index + ')').addClass('selected').addClass('ops-active');
        _this.$movingBorderMenu.find('li.selected, li.ops-active').trigger('mouseover');
    }
}

export default MovingBorderMenu;
