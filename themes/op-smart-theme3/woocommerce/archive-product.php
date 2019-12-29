<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );
?>
<?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
<div class="op-entry op-entry-woo single">
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <?php else: ?>
            <div class="op-entry-woo-sidebar <?php op_template_shop_container_class(); ?>">
                <div class="row">
                    <div class="<?php op_template_main_column_class(); ?>">
                        <?php endif; ?>

                        <?php
                        /**
                         * Hook: woocommerce_before_main_content.
                         *
                         * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
                         * @hooked woocommerce_breadcrumb - 20
                         * @hooked WC_Structured_Data::generate_website_data() - 30
                         */
                        do_action( 'woocommerce_before_main_content' );

                        if ( have_posts() ) {

                            /**
                             * Hook: woocommerce_before_shop_loop.
                             *
                             * @hooked wc_print_notices - 10
                             * @hooked woocommerce_result_count - 20
                             * @hooked woocommerce_catalog_ordering - 30
                             */
                            do_action( 'woocommerce_before_shop_loop' );

                            woocommerce_product_loop_start();

                            if ( wc_get_loop_prop( 'total' ) ) {
                                while ( have_posts() ) {
                                    the_post();

                                    /**
                                     * Hook: woocommerce_shop_loop.
                                     *
                                     * @hooked WC_Structured_Data::generate_product_data() - 10
                                     */
                                    do_action( 'woocommerce_shop_loop' );

                                    wc_get_template_part( 'content', 'product' );
                                }
                            }

                            woocommerce_product_loop_end();

                            /**
                             * Hook: woocommerce_after_shop_loop.
                             *
                             * @hooked woocommerce_pagination - 10
                             */
                            do_action( 'woocommerce_after_shop_loop' );

                        } else {
                            /**
                             * Hook: woocommerce_no_products_found.
                             *
                             * @hooked wc_no_products_found - 10
                             */
                            do_action( 'woocommerce_no_products_found' );
                        }

                        /**
                         * Hook: woocommerce_after_main_content.
                         *
                         * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
                         */
                        do_action( 'woocommerce_after_main_content' );

                        /**
                         * Hook: woocommerce_sidebar.
                         *
                         * @hooked woocommerce_get_sidebar - 10
                         */
                        // do_action( 'woocommerce_sidebar' );
                        ?>

                        <?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
                    </div>
                </div>
            </div>
            <?php else: ?>
        </div>
        <div class="<?php op_template_side_column_class(); ?>">
            <?php //do_action( 'woocommerce_sidebar' ); ?>
            <?php get_sidebar('shop'); ?>
        </div>
    </div>
</div>
<?php endif; ?>

<?php get_footer( 'shop' ); ?>
