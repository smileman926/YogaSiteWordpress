<?php
    global $op_options;

    use OPDashboard\Services\GeoIp;

    $prefix = op3_get_var($content, 'prefix');
    $position = op3_get_var($content, 'position');
    $theme = op3_get_var($content, 'theme');
    $id = op3_get_var($content, 'id');
    $specific_prefix = '';

    // Check if optin is overriden on post or page
    if ((is_page() || is_single()) && $position !== 'widget') {
        $specific_prefix = str_replace('page_', 'specific_', $prefix);
        $specific_prefix = str_replace('single_', 'specific_', $specific_prefix);
        $specific_prefix = rtrim($specific_prefix, '_') . '_';

        if (isset($op_options[$specific_prefix . 'form_behaviour']) && (int) $op_options[$specific_prefix . 'form_behaviour'] === 0) {
            $prefix = $specific_prefix;
        }
    }

    $class = "optin-box-optimizetheme optin-box-optimizetheme-$position optin-box-optimizetheme-$theme";
    $btn_color = $op_options[$prefix . 'submit_button_text_color'];
    $btn_bg_color = $op_options[$prefix . 'submit_button_background_color'];
    $btn_hover_bg_color = $op_options[$prefix . 'submit_button_hover_background_color'];

    if ((int) $op_options[$prefix . 'form_in_popup'] === 1) {
        $btn_color = $op_options[$prefix . 'lightbox_submit_button_text_color'];
        $btn_bg_color = $op_options[$prefix . 'lightbox_submit_button_background_color'];
        $btn_hover_bg_color = $op_options[$prefix . 'lightbox_submit_button_hover_background_color'];
    }

    $custom_style = "#op-optin-$id .default-button { color: $btn_color; background-color: $btn_bg_color; }";
    $custom_style .= "#op-optin-$id .default-button:hover { background-color: $btn_hover_bg_color; }";

    $img_wrap_start = '';
    $img_wrap_end = '';
    if (isset($op_options[$prefix . 'image'])
        && !empty($op_options[$prefix . 'image']['url'])
        && (int) $op_options[$prefix . 'form_in_popup'] !== 1) {

        $img = $op_options[$prefix . 'image'];
        $width = isset($img['width']) ? $img['width'] : 150;
        $height = isset($img['height']) ? $img['height'] : 212;
        $additional_class = '';

        if ($width > $height) {
            $additional_class = ' optin-box-optimizetheme-img-container-landscape';
        }

        $img_html = '';
        $img_html .= '<div class="optin-box-optimizetheme-column optin-box-optimizetheme-img-container' . $additional_class . '">';
            $img_html .= '<img class="optin-box-optimizetheme-img" src="' . $img['url'] . '" alt="" width="' . $width . '" height="' . $height . '" />';
        $img_html .= '</div>';

        $img_wrap_start .= '<div class="optin-box-optimizetheme-row">';
            $img_wrap_start .= $img_html;
            $img_wrap_start .= '<div class="optin-box-optimizetheme-column">';
            $img_wrap_end .= '</div>';
        $img_wrap_end .= '</div>';
    }

    // genrating output
    $output = '';
    $output .= '<div class="op_optin_' . $prefix . 'container op_optin_style_' . $op_options[$prefix . 'style'] . '">';
    $output .= '<aside id="op-optin-' . $id . '" class="optin-box ' . $class . '">';
    $output .= '<div class="container op-container optin-box-content optin-box-optimizetheme-content">';
    $output .= $img_wrap_start;
    $output .= '<div class="optin-box-optimizetheme-headline-container">';
    $output .= op3_get_var($content, 'headline', '', '<h2 class="optin-box-optimizetheme-headline">%1$s</h2>');
    $output .= op3_get_var($content, 'subheadline', '', '<p class="optin-box-optimizetheme-subheadline">%1$s</p>');
    $output .= '</div>';
    $output .= '<div class="optin-box-optimizetheme-form-container">';
    $output .= '<form data-op3-form="op3-smart-form" class="cf op3-form" action="/wp-json/op3/v1/optin/submit/smart" method="POST">';
    // HIDDEN
    $output .= '<div style="display: none;">';
    if (isset($hidden)) {
        foreach ($hidden as $key => $value) {
            $output .= '<input type="hidden"name="'.$key.'" value="'.$value.'" />';
        }
        //$output .= '<input type="submit" style="display:none; "name="submit" />';
    }
    $output .= '</div>';
    // FIELDS
    $output .= '<div class="optin-box-optimizetheme-text-boxes">';
    if (isset($fields)) {
        foreach ($fields as $field) {
            $output .= '<div class="text-box name">';
            $output .= $field;
            $output .= '</div>';
        }
    }
    // SUBMIT BUTTON
    $output .= '<button data-op3-type="op3-smart-submit-button" class="default-button" type="submit"><span>' . op3_get_var($content, 'submit_button_text') . '</span></button>';
    $output .= '</div>';
    // GDPR
    $showGdpr = true;
    $isFromEu = GeoIp::isFromEu();
    if ($hidden['optinGdprActivate'] === 'eu' && class_exists('OPDashboard\Services\GeoIp') && ! $isFromEu) {
        $showGdpr = false;
    }
    $output .= '<div class="optin-box-after-submit-button">';
    $output .= '<input type="hidden" name="optin-gdpr-consent-1" value="0">';
    if ($hidden['optinGdprActivate'] !== 'off' && !empty(gio('consent_1_enabled')) && gio('consent_1_enabled') == 'yes') {
        if ($showGdpr) {
            $output .= '
               <p class="op-form-privacy-checkbox op-gdpr-consent-item">
                                <label>
                                    <input type="checkbox" name="optin-gdpr-consent-1" class="op-form-privacy-gdpr-consent-checkbox op-form-privacy-gdpr-consent-checkbox-1" value="1">
                                    <span class="privacy-text">' . $hidden['optin-gdpr-message-1'] . '</span>
                                </label>
                            </p> 
            ';
        }
    }

    $output .= '<input type="hidden" name="optin-gdpr-consent-2" value="0">';
    if ($hidden['optinGdprActivate'] !== 'off' && !empty(gio('consent_2_enabled')) && gio('consent_2_enabled') == 'yes') {
        if ($showGdpr) {
            $output .= '
                   <p class="op-form-privacy-checkbox op-gdpr-consent-item">
                                    <label>
                                        <input type="checkbox" name="optin-gdpr-consent-2" class="op-form-privacy-gdpr-consent-checkbox op-form-privacy-gdpr-consent-checkbox-2" value="1">
                                        <span class="privacy-text">' . $hidden['optin-gdpr-message-2'] . '</span>
                                    </label>
                                </p> 
            ';
        }
    }

    //closing
    $output .= '</div>';
    $output .= '</form>';
    $output .= '</div>';
    $output .= op3_get_var($content, 'privacy_text', '', '<div class="optin-box-optimizetheme-privacy">%1$s</div>');
    $output .= $img_wrap_end;
    $output .= '</div>';
    $output .= '<style>' . $custom_style . '</style>';
    $output .= '</aside>';
    $output .= '</div>';


    return $output;