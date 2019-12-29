<?php
/**
 * WooCommerce post header template.
 */
global $op_options;

if (is_shop() || is_product_category() || is_product_tag()) {
    $current_url = get_permalink(wc_get_page_id('shop'));
    $title = woocommerce_page_title(false);
} else {
    $current_url = get_permalink();
    $title = get_the_title();
}
?>
<header class="op-hero-area op-blog-post-header op-woocommerce-hero">
    <div class="op-blog-hero-background">
        <?php
            $header_additional_style = '';
            $img = false;
            $prefix = 'page_';

            $header_bg = $op_options['woocommerce_page_header_background_color'];

            if (!empty($header_bg['from']) || !empty($header_bg['to'])) {
                $header_additional_style .= ' .op-blog-post-header { ' . op_render_css_gradient($header_bg['from'], $header_bg['to']) . ' }';
            }
        ?>
        <div class="op-blog-header-content">
            <div class="container op-container">
                <div class="row">
                    <div class="col-sm-12">
                        <?php
                            echo '<h1 class="op-headline" itemprop="headline">' . $title . '</h1>';
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <style><?php echo $header_additional_style; ?></style>
    </div>
</header>
