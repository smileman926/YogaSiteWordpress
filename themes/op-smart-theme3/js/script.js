jQuery(document).ready(function($) {

    ;(function () {
        var $navbarFixed = $('.op-navbar.op-navbar-fixed');
        var $removableTop = $('.op-removable-top');
        var $wpAdminBar = $('#wpadminbar');
        var animateTimeout;
        var removableTop = document.querySelector('.op-removable-top');
        var currentRemovableTopAfterContent = '';
        var currentWpAdminBarPosition = '';
        var currentWpAdminBarHeight = $wpAdminBar.height();

        if (removableTop) {
            currentRemovableTopAfterContent = window.getComputedStyle(removableTop, '::after').getPropertyValue('content');
        }

        if ($navbarFixed.length === 0) {
            return false;
        }

        /**
         * Calculates the position of site header;
         *
         */
        function set_fixed_header() {

            var forceRecalculation = false;
            var removableTopHeight = $removableTop.outerHeight();
            var removableTopAfterContent = '';
            var removableTopHeight = 0;
            var navbarFixedHeight;
            var wpAdminBarFixedHeight = $wpAdminBar.css('position') === 'fixed' ? $wpAdminBar.height() : 0;

            // We tie up the removableTop element (which
            // should be hidden on mobile)w to the
            // media query in css (text applied
            // via content css atribute
            // enables us to do this)
            if (removableTop) {
                removableTopAfterContent = window.getComputedStyle(document.querySelector('.op-removable-top'), '::after').getPropertyValue('content');
            }


            // In some cases we need to force racalculation of menu position
            // ...when menu changes due to OP grid changes
            if (removableTopAfterContent !== currentRemovableTopAfterContent) {
                currentRemovableTopAfterContent = removableTopAfterContent;
                forceRecalculation = true;
            }

            // ...when position of the wp admin bar changes
            if (currentWpAdminBarPosition !== $wpAdminBar.css('position')) {
                forceRecalculation = true;
                currentWpAdminBarPosition = $wpAdminBar.css('position');
            }

            // ...or when wp admin bar height changes
            if (currentWpAdminBarHeight !== $wpAdminBar.height()) {
                forceRecalculation = true;
                currentWpAdminBarHeight = $wpAdminBar.height();
            }

            // We position the menu as fixed
            // when the user scrolls below
            // 100px on the screen
            if ($(window).scrollTop() > $navbarFixed.height()) {

                if (!$navbarFixed.hasClass('fixed') || forceRecalculation) {

                    $navbarFixed.addClass('fixed');
                    navbarFixedHeight = $navbarFixed.height();
                    removableTopHeight = removableTopAfterContent.indexOf('op-removable-top-hidden') > -1 ? 0 : $removableTop.outerHeight();

                    // Negative margin is here as a help for animating
                    // the element. CSS transition is set to 'top'
                    // so we instantly position the nav outside
                    // of the screen with marginTop, and then
                    // setting top triggers CSS transition
                    $navbarFixed.css({
                        marginTop: -navbarFixedHeight,
                        top: navbarFixedHeight + wpAdminBarFixedHeight - removableTopHeight
                    });

                }

            } else {

                // If WP admin bar is fixed, we need
                // to take into account its height
                if ($wpAdminBar.css('position') !== 'fixed') {
                    wpAdminBarFixedHeight = $wpAdminBar.height();
                }

                $navbarFixed.css({
                    marginTop: 0,
                    top: 0 + wpAdminBarFixedHeight
                }).removeClass('fixed');

            }
        }

        // We set the position of the site header with
        // a timeout to ensure jank-free experience
        var eventTimeout;
        $(window).on('scroll resize', function () {
            clearTimeout(eventTimeout);
            eventTimeout = setTimeout(function () {
                set_fixed_header();
            }, 100);
        });

        // Set the header immediately
        // when the page is opened
        set_fixed_header();
    }());


    var topVal;
    var $opEntry = $('#primary > .op-entry');

    if ($opEntry.length > 0) {
        var opEntryPadding = parseInt($opEntry.css('padding-top'), 10);
        var entryOffset = $opEntry.offset().top + opEntryPadding;
        var $fixedDynamic = $('.fixed-dynamic');
        var fixedDynamicPosition = $fixedDynamic.hasClass('left') ? 'left' : 'right';
        var $navbarFixed = $('.op-navbar.op-navbar-fixed');
        // if ($('#wpadminbar').length) {
        //     top = $('#wpadminbar').height();
        // }

        var onScroll = function () {
            opEntryPadding = parseInt($opEntry.css('padding-top'), 10);
            entryOffset = $opEntry.offset().top + opEntryPadding;
            topVal = entryOffset - $(window).scrollTop();
            if ($navbarFixed.length > 0) {
                opEntryPadding = opEntryPadding + $navbarFixed.outerHeight();
            }

            if (topVal < opEntryPadding) {
                topVal = opEntryPadding;
            }
            $fixedDynamic.css({top: topVal});
        }

        if ($fixedDynamic.length > 0) {
            if (fixedDynamicPosition === 'left') {
                $('#primary .op-entry > .row, #colophon .op-footer').addClass('fixed-dynamic-content-padding-left');
            } else {
                $('#primary .op-entry > .row, #colophon .op-footer .op-container > .row,  .optin-box-optimizetheme-before-footer').addClass('fixed-dynamic-content-padding-' + fixedDynamicPosition);
            }
            $(window).unbind('scroll', onScroll);
            $(window).unbind('resize', onScroll);
            $(window).bind('scroll', onScroll).trigger('scroll');
            $(window).bind('resize', onScroll).trigger('scroll');
        }
    }

    function set_sm_fixed() {
        if ($(".sm-wrap").hasClass("no") == 'false') {
            if ($(window).width() < 1268) {
                $('.sm-wrap').removeClass('fixed-dynamic');
            } else {
                $('.sm-wrap').addClass('fixed-dynamic');
            }
        }
    }

    set_sm_fixed();

    $(window).bind('resize', function () {
        set_sm_fixed();
    });

    $('.op-navbar .nav-close-wrap .closenav').click(function () {
        $('.op-navbar #navbar').animate({'right': '100%'}, 'fast');
    });

    $('.op-navbar .navbar-toggle').click(function () {
        $('.op-navbar #navbar').animate({'right': 0}, 'fast');
    });

    $("#op_search_link").click(function () {
        op_do_search_toggle();
        return false;
    });

    $("#op_remove_search_link").click(function () {
        // $(".op-search-form-top-menu").val('');
        op_do_search_toggle();
        return false;
    });

    // $( ".menu-item-search-form, .menu-item-remove-search-link, .divider-top-menu-first" ).addClass('menu-item-hidden');
    function op_do_search_toggle() {
        $('.op-navbar .menu-item:not(.menu-item-search-form)').toggleClass('menu-item-hidden');
        $('.op-navbar .menu-item-search-form .menu-item-search-toggle').toggleClass('menu-item-hidden');
        // $( ".menu-item-type-post_type, .menu-item-type-custom, .menu-item-type-taxonomy" ).toggleClass('menu-item-hidden'); /*'on' by default*/
        // $( ".menu-item-search-form, .menu-item-remove-search-link, .divider-top-menu-first" ).toggleClass('menu-item-hidden'); /*'off' by default*/

        var $topMenu = $('.op-navbar  .menu-item-search-form .op-search-form-top-menu');
        if ($topMenu.is(':visible')) {
            $topMenu.focus();
        }
    }

    // Fitvids - makes all embeded videos play nicely,
    // but doesn't touch OP videos, since they're
    // already handled on OP side
    $("#primary").fitVids({ignore: '.video-plugin-new, .video-plugin-frame, .op3-video-wrapper'});

    // Swipebox gallery
    $('.op-hero-gallery .gallery-item a').swipebox();


    // Menu enhancments + mobile functionality
    ;(function () {

        var $navbar = $('.navbar-nav');

        if (!("ontouchstart" in window) && !(navigator.msMaxTouchPoints)) {
            $('body').addClass('op-not-touch-device');
        }

        /**
         * Checks if submenu dropdown is out
         * of the bounds of the screen,
         * and if so, it positions
         * it the opposite side
         * of the screen
         *
         * @param jQuery element
         * @return void
         */
        var checkSubmenuPosition = function ($el) {
            var $subMenu = $el.find('> .sub-menu');

            if ($subMenu.length === 0) {
                return false;
            }

            // If submenu is out of bounds to the left
            // (when submenu is flowing to the left)
            if ($subMenu.hasClass('sub-menu--alt') && $subMenu.offset().left < 0) {

                $subMenu.removeClass('sub-menu--alt')
                    .find('.sub-menu').removeClass('sub-menu--alt');

                // If submenu is out of the bounds to the right
                // (when positioned to the right)
            } else if ($subMenu.offset().left + $subMenu.outerWidth() > window.innerWidth) {

                $subMenu.addClass('sub-menu--alt')
                    .find('.sub-menu').addClass('sub-menu--alt');

            }
        }

        var menuTimeoutDuration = 600;

        $navbar.find('.menu-item-has-children').each(function () {
            var $this = $(this);
            var menuTimeout;

            if (!("ontouchstart" in window) && !(navigator.msMaxTouchPoints)) {

                // not a touch device
                $this
                    .on('mouseenter', function () {
                        clearTimeout(menuTimeout);
                        // $navbar.find('.menu-item--hover').removeClass('menu-item--hover');
                        $this.siblings('.menu-item--hover').removeClass('menu-item--hover');
                        $this.addClass('menu-item--hover');
                        checkSubmenuPosition($this);
                    })
                    .on('mouseleave', function () {
                        menuTimeout = setTimeout(function () {
                            $this.removeClass('menu-item--hover');
                        }, menuTimeoutDuration);
                    });

            } else {

                // touch device
                $this.on('click', function (e) {
                    var $link;

                    // If mobile menu is visible, we don't
                    // have to handle any submenus
                    if ($('#navbar .nav-close-wrap').is(':visible')) {
                        return true;
                    }

                    $this.siblings('.sub-menu--active').removeClass('sub-menu--active')
                        .find('.sub-menu--active').removeClass('sub-menu--active');

                    if ($this.hasClass('menu-item-has-children')) {
                        $link = $this.find('> a');
                        if ($this.hasClass('sub-menu--active')
                            && $link.attr('href') && $link.attr('href') !== '#') {
                            return true;
                        }
                        $this.toggleClass('sub-menu--active');
                        checkSubmenuPosition($this);

                        return false;
                    }

                });
            }

            // Close the hamburger menu if a
            // user clicks on a hash link
            $navbar.on('click', 'a', function () {
                var $closeWrap = $('#navbar .nav-close-wrap');
                var href = $(this).attr('href');

                // Ensures both '#link' and '/page#link' work
                if ($closeWrap.is(':visible') && href.indexOf('#') > -1) {
                    $closeWrap.find('.closenav').trigger('click');
                }
            });

        });

    }());

    /**
     * Social media icons sharing functionality
     */
    ;(function () {
        $('.sm-item-share').on('click', function () {
            window.open($(this).attr('href'), 'sharer', 'toolbar=0,status=0,width=548,height=325');
            return false;
        });
    }());

    ;(function () {
        var $contentGridRow = $('.op-content-grid-row');
        if ($contentGridRow.length > 0) {
            $('body').on('post-load', function () {
                $('.infinite-loader').remove();

                setTimeout(function () {
                    var $handle = $contentGridRow.find('#infinite-handle');
                    if ($handle.length === 0) {
                        $contentGridRow.append('<div class="dummyElement"></div>');
                        $contentGridRow.addClass('op-content-grid-row--show-all');
                    }
                }, 1);
            });
        }
    }());

    // Initialize object-fit polyfil
    ;(function () {
        objectFitImages();
    }());


    // initialize
    ;(function ($, window, document) {
        ;(function () {
            var siteKey = (typeof OP3 !== "undefined" && typeof(OP3.GoogleRecaptcha) !== "undefined") ? OP3.GoogleRecaptcha.googleRecaptchaSiteKey : '';
            var $form = $('[data-op3-form="op3-smart-form"]');
            $form.each(function(){
                // adding Recaptcha token
                if (siteKey !== '' && typeof grecaptcha !== "undefined") {
                    var that = $(this);
                    grecaptcha.ready(function () {
                        grecaptcha.execute(siteKey, {action: 'op3optin'}).then(function (token) {
                            // append hidden field with google's token
                            var grecaptchTokenField = $('<input>').attr({
                                type: 'hidden',
                                name: 'op3-grecaptcha-token',
                                value: token
                            });

                            that.append(grecaptchTokenField);

                            // show Google badge as it is needed
                            var badge = $('.grecaptcha-badge');
                            badge.show();
                            badge.css("visibility", "visible");

                        });
                    });
                }

                $(this).on("submit", function (e) {
                    e.preventDefault();
                    var $form = $(this).closest('form');
                    var params = $form.serialize();
                    var redirectUrl = $form.find('input[name="redirect"]').val();
                    var successMessage = $form.find('input[name="successMessage"]').val();

                    $.ajax({
                        url: $form.attr('action'),
                        type: "post",
                        data: params,
                        success: function(data) {
                            if (redirectUrl !== '' && typeof redirectUrl !== "undefined") {
                                window.location.href = redirectUrl;
                            } else if (successMessage !== '' && typeof successMessage !== "undefined") {
                                var notification = $("<div />")
                                    .text(successMessage)
                                    .addClass("op3-form-notification");

                                notification.insertBefore($form);
                                $form.remove();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (redirectUrl === '' && typeof redirectUrl === "undefined") {
                                var notification = $("<div />")
                                    .text("ERROR: " + errorThrown)
                                    .addClass("op3-form-notification error");

                                notification.insertBefore($form);
                                $form.remove();
                            }
                        },
                    });
                });
            });
        }());

    })(jQuery, window, document);
});
