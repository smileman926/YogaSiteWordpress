<?php
if (!class_exists('WT_UserImport_Uninstall_Feedback')) :

    /**
     * Class for catch Feedback on uninstall
     */
    class WT_UserImport_Uninstall_Feedback {

        public function __construct() {
            add_action('admin_footer', array($this, 'deactivate_scripts'));
            add_action('wp_ajax_userimport_submit_uninstall_reason', array($this, "send_uninstall_reason"));
        }

        private function get_uninstall_reasons() {

            $reasons = array(
                  array(
                        'id' => 'used-it',
                        'text' => __('Used it successfully. Don\'t need anymore.', 'users-customers-import-export-for-wp-woocommerce'),
                        'type' => 'reviewhtml',
                        'placeholder' => __('Have used it successfully and aint in need of it anymore', 'users-customers-import-export-for-wp-woocommerce')
                    ),
                array(
                    'id' => 'could-not-understand',
                    'text' => __('I couldn\'t understand how to make it work', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => __('Would you like us to assist you?', 'users-customers-import-export-for-wp-woocommerce')
                ),
                array(
                    'id' => 'found-better-plugin',
                    'text' => __('I found a better plugin', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'text',
                    'placeholder' => __('Which plugin?', 'users-customers-import-export-for-wp-woocommerce')
                ),
                array(
                    'id' => 'not-have-that-feature',
                    'text' => __('The plugin is great, but I need specific feature that you don\'t support', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => __('Could you tell us more about that feature?', 'users-customers-import-export-for-wp-woocommerce')
                ),
                array(
                    'id' => 'is-not-working',
                    'text' => __('The plugin is not working', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => __('Could you tell us a bit more whats not working?', 'users-customers-import-export-for-wp-woocommerce')
                ),
                array(
                    'id' => 'looking-for-other',
                    'text' => __('It\'s not what I was looking for', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => 'Could you tell us a bit more?'
                ),
                array(
                    'id' => 'did-not-work-as-expected',
                    'text' => __('The plugin didn\'t work as expected', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => __('What did you expect?', 'users-customers-import-export-for-wp-woocommerce')
                ),
                array(
                    'id' => 'other',
                    'text' => __('Other', 'users-customers-import-export-for-wp-woocommerce'),
                    'type' => 'textarea',
                    'placeholder' => __('Could you tell us a bit more?', 'users-customers-import-export-for-wp-woocommerce')
                ),
            );

            return $reasons;
        }

        public function deactivate_scripts() {

            global $pagenow;
            if ('plugins.php' != $pagenow) {
                return;
            }
            $reasons = $this->get_uninstall_reasons();
            ?>
            <div class="userimport-modal" id="userimport-userimport-modal">
                <div class="userimport-modal-wrap">
                    <div class="userimport-modal-header">
                        <h3><?php _e('If you have a moment, please let us know why you are deactivating:', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
                    </div>
                    <div class="userimport-modal-body">
                        <ul class="reasons">
                            <?php foreach ($reasons as $reason) { ?>
                                <li data-type="<?php echo esc_attr($reason['type']); ?>" data-placeholder="<?php echo esc_attr($reason['placeholder']); ?>">
                                    <label><input type="radio" name="selected-reason" value="<?php echo $reason['id']; ?>"> <?php echo $reason['text']; ?></label>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                    <div class="userimport-modal-footer">
                        <a href="#" class="dont-bother-me"><?php _e('I rather wouldn\'t say', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                        <button class="button-primary userimport-model-submit"><?php _e('Submit & Deactivate', 'users-customers-import-export-for-wp-woocommerce'); ?></button>
                        <button class="button-secondary userimport-model-cancel"><?php _e('Cancel', 'users-customers-import-export-for-wp-woocommerce'); ?></button>
                    </div>
                </div>
            </div>

            <style type="text/css">
                .userimport-modal {
                    position: fixed;
                    z-index: 99999;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: rgba(0,0,0,0.5);
                    display: none;
                }
                .userimport-modal.modal-active {display: block;}
                .userimport-modal-wrap {
                    width: 50%;
                    position: relative;
                    margin: 10% auto;
                    background: #fff;
                }
                .userimport-modal-header {
                    border-bottom: 1px solid #eee;
                    padding: 8px 20px;
                }
                .userimport-modal-header h3 {
                    line-height: 150%;
                    margin: 0;
                }
                .userimport-modal-body {padding: 5px 20px 20px 20px;}
                .userimport-modal-body .input-text,.userimport-modal-body textarea {width:75%;}
                .userimport-modal-body .reason-input {
                    margin-top: 5px;
                    margin-left: 20px;
                }
                .userimport-modal-footer {
                    border-top: 1px solid #eee;
                    padding: 12px 20px;
                    text-align: right;
                }
                .reviewlink{
                        padding:10px 0px 0px 35px !important;
                        font-size: 15px;
                    }
                .review-and-deactivate{
                        padding:5px;
                    }
            </style>
            <script type="text/javascript">
                (function ($) {
                    $(function () {
                        var modal = $('#userimport-userimport-modal');
                        var deactivateLink = '';
                        $('#the-list').on('click', 'a.userimport-deactivate-link', function (e) {
                            e.preventDefault();
                            modal.addClass('modal-active');
                            deactivateLink = $(this).attr('href');
                            modal.find('a.dont-bother-me').attr('href', deactivateLink).css('float', 'left');
                        });
                        
                        $('#userimport-userimport-modal').on('click', 'a.review-and-deactivate', function (e) {
                                e.preventDefault();
                                window.open("https://wordpress.org/support/plugin/users-customers-import-export-for-wp-woocommerce/reviews/?filter=5#new-post");
                                window.location.href = deactivateLink;
                            });
                        
                        modal.on('click', 'button.userimport-model-cancel', function (e) {
                            e.preventDefault();
                            modal.removeClass('modal-active');
                        });
                        modal.on('click', 'input[type="radio"]', function () {
                            var parent = $(this).parents('li:first');
                            modal.find('.reason-input').remove();
                            var inputType = parent.data('type'),
                                    inputPlaceholder = parent.data('placeholder');
                                    
                                if ('reviewhtml' === inputType) {
                                    var reasonInputHtml = '<div class="reviewlink"><a href="#" target="_blank" class="review-and-deactivate"><?php _e('Deactivate and leave a review', 'users-customers-import-export-for-wp-woocommerce'); ?> <span class="wt-userimport-rating-link"> &#9733;&#9733;&#9733;&#9733;&#9733; </span></a></div>';
                                } else {
                                    var reasonInputHtml = '<div class="reason-input">' + (('text' === inputType) ? '<input type="text" class="input-text" size="40" />' : '<textarea rows="5" cols="45"></textarea>') + '</div>';
                                }
                            if (inputType !== '') {
                                parent.append($(reasonInputHtml));
                                parent.find('input, textarea').attr('placeholder', inputPlaceholder).focus();
                            }
                        });

                        modal.on('click', 'button.userimport-model-submit', function (e) {
                            e.preventDefault();
                            var button = $(this);
                            if (button.hasClass('disabled')) {
                                return;
                            }
                            var $radio = $('input[type="radio"]:checked', modal);
                            var $selected_reason = $radio.parents('li:first'),
                                    $input = $selected_reason.find('textarea, input[type="text"]');

                            $.ajax({
                                url: ajaxurl,
                                type: 'POST',
                                data: {
                                    action: 'userimport_submit_uninstall_reason',
                                    reason_id: (0 === $radio.length) ? 'none' : $radio.val(),
                                    reason_info: (0 !== $input.length) ? $input.val().trim() : ''
                                },
                                beforeSend: function () {
                                    button.addClass('disabled');
                                    button.text('Processing...');
                                },
                                complete: function () {
                                    window.location.href = deactivateLink;
                                }
                            });
                        });
                    });
                }(jQuery));
            </script>
            <?php
        }

        public function send_uninstall_reason() {

            global $wpdb;

            if (!isset($_POST['reason_id'])) {
                wp_send_json_error();
            }

            $data = array(
                'reason_id' => sanitize_text_field($_POST['reason_id']),
                'plugin' => "userimport",
                'auth' => 'userimport_uninstall_1234#',
                'date' => gmdate("M d, Y h:i:s A"),
                'url' => '',
                'user_email' => '',
                'reason_info' => isset($_REQUEST['reason_info']) ? trim(stripslashes($_REQUEST['reason_info'])) : '',
                'software' => $_SERVER['SERVER_SOFTWARE'],
                'php_version' => phpversion(),
                'mysql_version' => $wpdb->db_version(),
                'wp_version' => get_bloginfo('version'),
                'wc_version' => (!defined('WC_VERSION')) ? '' : WC_VERSION,
                'locale' => get_locale(),
                'multisite' => is_multisite() ? 'Yes' : 'No',
                'userimport_version' => WF_CUSTOMER_IMP_EXP_VERSION
            );
            // Write an action/hook here in webtoffe to recieve the data
            $resp = wp_remote_post('http://feedback.webtoffee.com/wp-json/userimport/v1/uninstall', array(
                'method' => 'POST',
                'timeout' => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => false,
                'body' => $data,
                'cookies' => array()
                    )
            );

            wp_send_json_success();
        }

    }
    new WT_UserImport_Uninstall_Feedback();

endif;