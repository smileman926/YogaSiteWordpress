<div id="partiallyCheckout">

    <script>
        var partially = {
             offer: '<?php echo $partially_offer;?>',
             amount: <?php echo WC()->cart->total;?>,
             returnUrl: '<?php echo get_site_url();?>/cart',
             meta: {
                source: 'woocommerce',
                items: [],
                <?php if (WC()->cart->shipping_total > 0 || (WC()->cart->tax_total + WC()->cart->shipping_tax_total) > 0):?>
                subtotal: <?php echo WC()->cart->subtotal_ex_tax;?>,
                <?php if (WC()->cart->tax_total + WC()->cart->shipping_tax_total > 0):?>
                tax: <?php echo WC()->cart->tax_total + WC()->cart->shipping_tax_total;?>,
                <?php endif;?>
                <?php if (WC()->cart->shipping_total > 0):?>
                shipping: <?php echo WC()->cart->shipping_total;?>,
                <?php endif;?>
                <?php endif;?>
            }
           };
           <?php foreach (WC()->cart->get_cart() as $cart_item_key => $item):?>
           partially.meta.items.push({
             id: '<?php echo $cart_item_key;?>',
             name: '<?php echo addslashes($item['data']->get_name());?>',
             <?php if ($item['data']->get_sku()):?>
             sku: '<?php echo $item['data']->get_sku();?>',
             <?php endif;?>
             price: <?php echo $item['line_subtotal'];?>,
             quantity: <?php echo $item['quantity'];?>,
             total: <?php echo $item['line_total'];?>,
             <?php $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($item['product_id']));
             	if ($thumb && $thumb[0]):?>
             image: '<?php echo $thumb[0];?>',
         	<?php endif;?>
             product_id: '<?php echo $item['product_id'];?>',
             <?php if ($item['variation_id']):?>
             variant_id: '<?php echo $item['variation_id'];?>'
             <?php endif;?>
           });
           <?php endforeach;?>
    </script>
    <script src="https://partial.ly/js/partially.js"></script>

</div>
