<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">
    <h3><?php _e('Facebook Integration', 'opdash'); ?></h3>

    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="facebook">
        <input type="hidden" name="action" value="opd_update_settings">

        <div class="ops-form-group">
            <label for="opd_facebook_app_id">Facebook App ID</label>
            <input type="text" placeholder="Enter your Facebook APP ID" name="opd_facebook_app_id" id="opd_facebook_app_id" value="<?php echo get_option('opd_facebook_app_id') ?>" class="ops-form-control">
        </div>

        <div class="ops-form-group">
            <label for="opd_facebook_locale">Localization</label>
            <p><?php _e('Facebook elements used in OptimizePress 3 will be automatically translated to this language.', 'opdash'); ?></p>
            <?php
            // List of languagues supported by Facebook Web SDK
            // https://developers.facebook.com/docs/internationalization/
            $json = '{"en_US":"English","en_GB":"English (United Kingdom)","af_ZA":"Afrikaans (South Africa)","ar_AR":"Arabic","bn_IN":"Bengali","my_MM":"Burmese","zh_CN":"Chinese (China)","zh_HK":"Chinese (Hong Kong)","zh_TW":"Chinese (Taiwan)","hr_HR":"Croatian","cs_CZ":"Czech","da_DK":"Danish","nl_NL":"Dutch","fi_FI":"Finnish","fr_FR":"French","de_DE":"German","el_GR":"Greek","gu_IN":"Gujarati","he_IL":"Hebrew","hi_IN":"Hindi","hu_HU":"Hungarian","id_ID":"Indonesian","it_IT":"Italian","ja_JP":"Japanese","ko_KR":"Korean","cb_IQ":"Kurdish","ms_MY":"Malay","ml_IN":"Malayalam","mr_IN":"Marathi","nb_NO":"Norwegian","pl_PL":"Polish","pt_BR":"Portuguese (Brazil)","pt_PT":"Portuguese","pa_IN":"Punjabi","ro_RO":"Romanian","ru_RU":"Russian","sk_SK":"Slovak","es_LA":"Spanish (Latin America)","es_ES":"Spanish","sw_KE":"Swahili","sv_SE":"Swedish","tl_PH":"Tagalog","ta_IN":"Tamil","te_IN":"Telugu","th_TH":"Thai","tr_TR":"Turkish","ur_PK":"Urdu","vi_VN":"Vietnamese"}';
            $array = json_decode($json, true);
            $value = get_option('opd_facebook_locale');
            $value = $value ? $value : get_locale();
            ?>
            <select placeholder="Select your prefered locale" name="opd_facebook_locale" class="ops-form-control ops-form-control-facebook-select">
                <?php
                foreach ($array as $key => $label) {
                    $selected = $key === $value ? 'selected="selected"' : '';
                    echo '<option value="' . $key . '"' . $selected . '>' . $label . '</option>';
                }
                ?>
            </select>
        </div>

        <?php /*
        <div class="ops-form-group">
            <label for="">Facebook Admins</label>
            <input type="text" placeholder="Enter your admin email here" name="opd_facebook_admin_email" value="<?php echo get_option('opd_facebook_admin_email') ?>" value="" class="ops-form-control">
        </div>

        <div class="ops-form-group">
            <label for="">Facebook Secret Key</label>
            <input type="text" placeholder="Enter your Facebook secret key" name="opd_facebook_secret_key" value="<?php echo get_option('opd_facebook_secret_key') ?>" value="" class="ops-form-control">
        </div>
        */ ?>
        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>

</div>
