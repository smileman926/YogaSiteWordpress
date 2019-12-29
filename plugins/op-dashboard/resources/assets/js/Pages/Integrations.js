import OP3Dialog from "../General/Dialog";
import OP3Form from "../General/Form";

class OPDIntegrations {
    constructor() {
        /**
         * Button that triggers adding new service
         *
         * @type {jQuery}
         */
        this.$addNewServiceIntegrationBtn = null;

        /**
         * Service jquery-confirm dialog
         *
         * @type {$.confirm}
         */
        this.addNewServiceIntegrationConfirm = null;

        /**
         * Button that triggers editing integration
         *
         * @type {jQuery}
         */
        this.$editIntegrationBtn = null;

        /**
         * Edit integration jquery-confirm dialog
         *
         * @type {$.confirm}
         */
        this.editIntegrationConfirm = null;

        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;

        (function ($) {

            $(document).ready(() => {
                _this.$addNewServiceIntegrationBtn = $('.opd-add-new-service-integration-btn');
                _this.$editIntegrationBtn = $('.opd-edit-integration-btn');

                _this['appInit']($);
            });

        })(jQuery);
    }

    /**
     * Functionality after $ is ready
     *
     * @param {jQuery} $
     */
    ['appInit']($) {
        let _this = this;

        _this['addNewServiceIntegration']($);
        _this['editIntegration']($);
    }

    /**
     * Opening Dialog once user wants to add new integration
     *
     * @param {jQuery} $
     */
    ['addNewServiceIntegration']($) {
        let _this = this;

        _this.$addNewServiceIntegrationBtn
            .click((e) => {
                e.preventDefault();

                let confirmTitle = _this.$addNewServiceIntegrationBtn.data('title');

                _this.addNewServiceIntegrationConfirm = $.dialog(Object.assign(OP3Dialog.dialogOptions, {
                    title: OP3Dialog.headerWithFilter(confirmTitle),
                    content: () => {
                        return $.post(
                            OpsScriptData.ajax_url,
                            {
                                'action': 'opd_addIntegration',
                            },
                            (response) => {
                                _this.addNewServiceIntegrationConfirm.setContent(response);
                            }
                        )
                    },
                    onContentReady: () => {
                        _this['filterContent']($, '.op3-input-filter', '.opd-dashboard-integrations-list-item', 'h4');
                        _this['openEnterCredentials']($);
                        _this['openEnterOAuthCredentials']($);
                    }
                }));
            })
        ;
    }

    /**
     * Opening Dialog once user wants to add new integration
     *
     * @param {jQuery} $
     */
    ['editIntegration']($) {
        let _this = this;

        _this.$editIntegrationBtn
            .click((e) => {
                e.preventDefault();

                let $this = $(e.currentTarget);
                let $connectedIntegrationItem = $this.closest('.opd-connected-integration-item');

                _this.editIntegrationConfirm = $.dialog(Object.assign(OP3Dialog.dialogOptions, {
                    theme: 'optimizepress,optimizepress-mini',
                    title: `${$this.text()} - ${$connectedIntegrationItem.find('h4').text()}`,
                    content: () => {
                        return $.post(
                            OpsScriptData.ajax_url,
                            {
                                'action': 'opd_editIntegration',
                                'provider': $this.data('provider')
                            },
                            (response) => {
                                _this.editIntegrationConfirm.setContent(response);
                            }
                        )
                    },
                    onContentReady: () => {
                        let $content = _this.editIntegrationConfirm.$content;
                        $content.find('.opd-integration-enter-credentials-form-submit-btn').text($this.text());
                        $content.find('.opd-integration-enter-oauth-credentials-form-submit-btn').text($this.text());
                        _this['submitEnterCredentials']($);
                        _this['submitEnterOAuthCredentials']($);
                    }
                }));
            })
        ;
    }

    /**
     * Filtering content based on input, search element and search string
     *
     * @param {jQuery} $
     * @param {string} input
     * @param {string} searchHaystack
     * @param {string} searchNeedle
     */
    ['filterContent']($, input, searchHaystack, searchNeedle) {
        let _this = this;

        let $jconfirmTitle = $('.jconfirm-title');
        let $jconfirmContent = $('.jconfirm-content');

        $jconfirmTitle.find(input)
            .keyup((e) => {
                let $input = $(e.currentTarget);
                let searchText = String($input.val()).toLocaleLowerCase();
                $jconfirmContent.find(searchHaystack).each((index, element) => {
                    let $element = $(element);
                    let elementText = String($element.find(searchNeedle).html()).toLocaleLowerCase();

                    (elementText.indexOf(searchText) !== -1) ? $element.removeClass('opd-hide') : $element.addClass('opd-hide');
                });
            })
            .focus();
        ;
    }

    /**
     * Open form for editing credentials and add actions
     *
     * @param {jQuery} $
     */
    ['openEnterCredentials']($) {
        let _this = this;
        let $integrationEnterCredentialsBtn = $('.opd-integration-enter-credentials-btn');
        $integrationEnterCredentialsBtn
            .click((e) => {
                e.preventDefault();

                // Close other open integrations
                $('.opd-dashboard-integrations-list-item').removeClass('opd-open');

                let $this = $(e.currentTarget);
                let $listItem = $this.closest('.opd-dashboard-integrations-list-item');

                $listItem.addClass('opd-open');

                _this['submitEnterCredentials']($);
            })
        ;
    }

    /**
     * Open form for editing OAuth credentials and add actions
     *
     * @param {jQuery} $
     */
    ['openEnterOAuthCredentials']($) {
        let _this = this;
        let $integrationEnterCredentialsBtn = $('.opd-integration-enter-oauth-credentials-btn');

        $integrationEnterCredentialsBtn
            .click((e) => {
                e.preventDefault();

                let $this = $(e.currentTarget);
                let $listItem = $this.closest('.opd-dashboard-integrations-list-item');

                $listItem.addClass('opd-open');

                _this['submitEnterOAuthCredentials']($);
            })
        ;
    }

    /**
     * Submit form
     *
     * @param {jQuery} $
     * @todo - Add action url and calls to AJAX for saving integrations
     */
    ['submitEnterCredentials']($) {
        let $integrationEnterCredentialsForm = $('.opd-integration-enter-credentials-form');
        let $integrationEnterCredentialsFormSubmitBtn = $('.opd-integration-enter-credentials-form-submit-btn');

        $integrationEnterCredentialsForm.unbind('submit').bind('submit', function(e) {
            let $form = $(this);
            let url   = $form.data("action-url");
            let data  = $form.find('input').serialize();

            // Make the request
            $.ajax({
                url: url,
                data: data,
                method: 'post',
                dataType: 'json',
            })
            .done(function(response) {
                window.OP3General.createSuccess(
                    $form.parent().find('h4').html(),
                    response.message,
                    window.location.href
                );
            })
            .fail(function(response) {
                window.OP3General.createAlert(
                    $form.parent().find('h4').html(),
                    response.responseJSON.message
                );
            });

            return false;
        });
    }

    /**
     * Save credential for OAuth connections
     *
     * @param $
     */
    ['submitEnterOAuthCredentials']($) {
        let $integrationEnterCredentialsFormSubmitBtn = $('.opd-integration-enter-oauth-credentials-form-submit-btn');
        $integrationEnterCredentialsFormSubmitBtn
            .click((e) => {
                e.preventDefault();

                let $this = $(e.currentTarget);
                let $integrationEnterCredentialsForm = $this.closest('.opd-integration-enter-oauth-credentials-form');
                let $saveButton = $('.opd-integration-enter-oauth-credentials-form-submit-btn');
                let saveText = $saveButton.html();
                let $oauthActionContainer = $('.oauth-connection-actions');
                let $connectButton = $oauthActionContainer.find('.opd-integration-connect-choose');

                let url = $integrationEnterCredentialsForm.data("action-url");
                let data = $integrationEnterCredentialsForm.find('input').serialize();

                $saveButton.stop().fadeTo(100, .5).attr('disabled', 'disabled').addClass('ops-disabled').text('Saving...');

                let formObject = new OP3Form($);
                formObject.on('OP3Form:postRequest', (result, $form, url, data) => {
                    $saveButton.stop().fadeTo(100, 1).removeAttr('disabled').removeClass('ops-disabled').html(saveText);

                    if (result.success) {
                        $oauthActionContainer.addClass('opd-connection-actions-for-connected');
                        $connectButton.attr('href', result.authorization_url);
                        window.OP3General.createSuccess(
                            $integrationEnterCredentialsForm.parent().find('h4').html(),
                            result.message
                        );
                    } else {
                        window.OP3General.createAlert(
                            $integrationEnterCredentialsForm.parent().find('h4').html(),
                            result.jqXHR.responseJSON.message
                        );
                    }
                });
                formObject.postRequest($integrationEnterCredentialsForm, url, data);
            })
        ;
    }
}

export default OPDIntegrations;
