<div class="row">
    <div class="col-md-8">
        <h3>Flowplayer License</h3>
        <p>
            To be able to remove the Flowplayer logo from the video player, you need
            to have it licensed for this domain. The license key and the commercial
            version files can be uploaded here.
        </p>

        <form action="" class="ops-form" data-opd-remote="post">
            <?php wp_nonce_field('opd_save_flowplayer_settings'); ?>
            <input type="hidden" name="opd_settings_section" value="flowplayer">

            <div class="ops-form-group">
                <label for="">Twitter Consumer Key</label>
                <input type="text" placeholder="Enter your Twitter consumer key" name="opd_twitter_consumer_key" value="<?php echo get_option('opd_twitter_consumer_key') ?>" class="ops-form-control">
            </div>

            <div class="ops-form-group">
                <label for="">HTML commercial version file (JS)</label>
                <input type="file" name="opd_flowplayer_html_file">
            </div>

            <div class="ops-form-group">
                <label for="">Flash commercial version file (SWF)</label>
                <input type="file" name="opd_flowplayer_flash_file">
            </div>

            <div class="ops-form-group">
                <label for="">Custom logo</label>
                <input type="file" name="opd_flowplayer_custom_logo">
            </div>

            <div class="ops-form-actions">
                <button class="ops-button ops-button-success" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
