class Menus {
    constructor($) {
        this.$html = $('html');
        this.$body = $('body');
        this.$fullScreenBtn = $('.ops-fullscreenBtn');
        this.$fullScreenBtn
            .click((e) => {
                let _this = this;
                e.preventDefault();
                _this.$body.toggleClass('ops_isFullScreen');
                let isFullScreen = 0;
                if (_this.$body.hasClass('ops_isFullScreen')) {
                    isFullScreen = 1;
                }

                /**
                 * AJAX request that add option to WordPress for user full screen
                 *
                 * @see \FunnelBuilder\Service\Ajax\UserAjax::cloneFunnelPage
                 */
                $.post(
                    OpsScriptData.ajax_url,
                    {
                        'action': 'op3toggleFullScreen',
                        'isFullScreen': isFullScreen,
                    },
                    (response) => {
                        // console.log('op3toggleFullScreen');
                        // console.log(response);
                    }
                );
            })
        ;
    }
}

export default Menus;
