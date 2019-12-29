<?php /*if (count(OPDashboard\product_available_channels()) > 1) : ?>
    <div class="channel-picker">
        <select name="release_channel" class="js-release-channel-picker" data-product="<?php echo $product->uid ?>" style="font-size: 11px; position: absolute; top: 6px; right: 16px;">
            <?php foreach (OPDashboard\product_available_channels() as $channel) : ?>
                <option value="<?php echo $channel['id'] ?>"><?php echo $channel['name'] ?></option>
            <?php endforeach; ?>
        </select>
    </div>
<?php endif;*/ ?>
