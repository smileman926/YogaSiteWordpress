<?php
    $op3Affiliate = get_option('opd_affiliate_backlink');
    $op3AffiliateLink = get_option('opd_affiliate_link') ? get_option('opd_affiliate_link') : 'https://www.optimizepress.com';

    // on by default
    if (false === $op3Affiliate) {
        add_option('opd_affiliate_backlink', 'on');
        add_option('opd_affiliate_link', $op3AffiliateLink);
        $op3Affiliate = 'on';
    }
    if ('on' == $op3Affiliate && ! op3_is_admin()): ?>
        <a class="op3badge" target="_blank" href="<?php echo $op3AffiliateLink; ?>">
            <img alt="<?php _e('Page Created with OptimizePress', 'optimizepress');?>" src="<?php echo op3_asset('img/op3badge.svg'); ?>" />
        </a>
    <?php endif; ?>
