import Wallop from 'wallop'
import Hammer from 'hammerjs'
import Emitter from 'es6-event-emitter'
import OP3MovingImage from "../Element/MovingImage";

class OP3WallopAjaxSlider extends Emitter {
    constructor(sliderSelector, $, autoResize) {
        super();

        this.sliderSelector = sliderSelector;
        this.autoResize = autoResize;
        this.wallop = null;
        this.wallopHammer = null;
        this.sliderInterval = null;
        this.$ = $;

        this['initSlider']();
    }

    changeSlide(index) {
        let _this = this;
        _this.wallop.goTo(index);
    }

    ['initSlider']() {
        let _this = this;

        let wallopSelector = _this.sliderSelector + ' .Wallop';
        let wallopEl = document.querySelector(wallopSelector);

        if (wallopEl === null) {
            return;
        }

        _this.wallop = new Wallop(wallopEl);

        let sliderSelector = _this.sliderSelector + ' .slider';
        let $sliderSelector = _this.$(_this.sliderSelector + ' .slider');
        let countOfElements = document.querySelector(sliderSelector + ' .Wallop-list').childElementCount;
        if (countOfElements > 1) {
            _this.wallopHammer = new Hammer(document.querySelector(sliderSelector));
            _this.wallopHammer.on('swipeleft', function () {
                _this.wallop.next();
                clearInterval(_this.sliderInterval);
            });
            _this.wallopHammer.on('swiperight', function () {
                _this.wallop.previous();
                clearInterval(_this.sliderInterval);
            });
        }
        let $wallopPagination = $sliderSelector.find('.Wallop-pagination');
        if ($wallopPagination.length > 0) {
            for (let i = 0; i < countOfElements; i++) {
                $wallopPagination.append('<button class="Wallop-dot"></button>');
            }
        }

        let dotSelector = _this.sliderSelector + ' .Wallop-dot';
        let paginationDots = Array.prototype.slice.call(document.querySelectorAll(dotSelector));
        paginationDots.forEach((dotEl, index) => {
            dotEl.addEventListener('click', () => {
                _this.wallop.goTo(index);
                clearInterval(_this.sliderInterval);
            });
        });
        _this.wallop.on('change', function (event) {
            _this.trigger('wallopSlider:change', event);

            let dotSelector = _this.sliderSelector + ' .Wallop-dot--current';
            let currentItemSelector = _this.sliderSelector + ' .Wallop-item--current';

            _this['removeClass'](document.querySelector(dotSelector), 'Wallop-dot--current');
            _this['addClass'](paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');

            let $slideContentContainer = jQuery(currentItemSelector).find(".opb-slide-content-container");
            let loadedFlag = parseInt($slideContentContainer.data('loaded'));

            // Load the Ajax URL
            let url = $slideContentContainer.data('url');
            
            if (! loadedFlag) {
                jQuery.ajax({
                    url: url,
                    method: "get",
                    success: function (html) {
                        $slideContentContainer.html(html);
                        $slideContentContainer.data('loaded', 1);

                        setTimeout(function() {
                            window.OP3General.createMovingImage('.opb-template-preview', jQuery);
                        }, 800);
                    },
                    error: function () {
                        alert("Error when loading content.");
                    }
                });
            }
            

            if (_this.autoResize) {
                $sliderSelector.addClass('autoResize');
                let wallopItemCurrent = $sliderSelector.find('.Wallop-item--current');
                let slideHeight = wallopItemCurrent.height();
                $sliderSelector.css('min-height', slideHeight).css('max-height', slideHeight);

                setTimeout(function () {
                    let slideHeight = wallopItemCurrent.height();
                    $sliderSelector.css('min-height', slideHeight).css('max-height', slideHeight);
                }, 500);
            }
        });

        _this.trigger('wallopSlider:init', sliderSelector);
    }

    ['addClass'](element, className) {
        if (!element) {
            return;
        }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    }

    ['removeClass'](element, className) {
        if (!element) {
            return;
        }
        element.className = element.className.replace(className, '');
    }
}

export default OP3WallopAjaxSlider;
