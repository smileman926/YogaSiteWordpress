<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version 3.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

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
			 * woocommerce_before_main_content hook.
			 *
			 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
			 * @hooked woocommerce_breadcrumb - 20
			 */
			do_action( 'woocommerce_before_main_content' );
		?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php wc_get_template_part( 'content', 'single-product' ); ?>

			<?php endwhile; // end of the loop. ?>

		<?php
			/**
			 * woocommerce_after_main_content hook.
			 *
			 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
			 */
			do_action( 'woocommerce_after_main_content' );
		?>

		<?php
			/**
			 * woocommerce_sidebar hook.
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
                    <?php get_sidebar('shop-single'); ?>
                </div>
            </div>
        </div>
    <?php endif; ?>

<?php get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
