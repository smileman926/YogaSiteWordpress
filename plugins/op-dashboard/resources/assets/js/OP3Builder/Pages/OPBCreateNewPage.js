class OPBCreateNewPage {

    constructor() {
        this.useTemplateConfirm = null;
        this.previewTemplateConfirm = null;
        this.viewCollectionConfirm = null;

        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;
        let $ = jQuery;

        $(document).ready(() => {
            // _this.$useTemplateBtn = $('.opb-use-template-btn');

            _this['appInit']($);
        });
    }

    /**
     * Functionality after $ is ready
     *
     * @param {jQuery} $
     */
    ['appInit']($) {
        let _this = this;

        _this['newPageTemplate']($);
        _this['previewPageTemplate']($);
        _this['viewCollection']($);
    }

    /**
     * Open dialog with form that creates new page
     *
     * @param {jQuery} $
     */
    ['newPageTemplate']($) {
        let _this = this;

        jQuery('.opb-template-list').on('click', '.opb-use-template-btn', (e) => {
            _this['useTemplateClick']($, e);
        });
    }

    /**
     * Opens dialog when click on Use Template Button
     *
     * @param {jQuery} $
     * @param e
     */
    ['useTemplateClick']($, e) {
        let _this = this;

        e.preventDefault();

        let $btn = $(e.currentTarget);
        let $templateList = $btn.closest('.opb-template-list');
        let $templateListItem = $btn.closest('.opb-template-list-item');

        let dialogOptions = window.OP3General.dialogOptions;
        let link = $btn.attr('href');
        let nonceValue = $templateList.find('#nonce-create-new-page').val();
        let templateUid = $templateListItem.data('template-uid');
        let categoryUid = $templateListItem.data('category-uid');

        _this.useTemplateConfirm = $.dialog(Object.assign(dialogOptions, {
            theme: 'optimizepress,optimizepress-mini',
            title: 'Create New OptimizePress Page',
            content: () => {
                return _this.getCreateNewPageForm(link, nonceValue, templateUid, 'Page Title', 'Enter Page Title', 'Create Page', 'Creating Page...', categoryUid);
            }
        }));
    }

    /**
     * Open dialog with form that creates new page
     *
     * @param {jQuery} $
     */
    ['previewPageTemplate']($) {
        let _this = this;

        jQuery('.opb-template-list').on('click', '.opb-preview-template-btn', (e) => {
            _this['previewTemplateClick']($, e);
        });
    }

    /**
     * Opens dialog when click on Preview Template Button
     *
     * @param e
     */
    ['previewTemplateClick']($, e) {
        let _this = this;

        e.preventDefault();

        let $btn = $(e.currentTarget);
        let $templateListItem = $btn.closest('.opb-template-list-item');

        let dialogOptions = window.OP3General.dialogOptions;
        let templateName = $templateListItem.find('h4').text();
        let bigImage = $templateListItem.data('big-image');

        _this.previewTemplateConfirm = $.dialog(Object.assign(dialogOptions, {
            title: templateName,
            content: () => {
                return `<img src="${bigImage}">`;
            }
        }));
    }

    /**
     * Open dialog with form that creates new page
     *
     * @param {jQuery} $
     */
    ['viewCollection']($) {
        let _this = this;

        jQuery('.opb-template-list').on('click', '.opb-view-collection-btn', (e) => {
            e.preventDefault();

            let $btn = $(e.currentTarget);
            let collectionTitle = $btn.data('collection-title');
            let collectionUid = $btn.data('collection-uid');

            let dialogOptions = window.OP3General.dialogOptions;

            _this.viewCollectionConfirm = $.dialog(Object.assign(dialogOptions, {
                title: collectionTitle,
                content: () => {
                    return $.get(
                        OpsScriptData.ajax_url,
                        {
                            'action': 'opb_templates',
                            'collection': collectionUid
                        },
                        (response) => {
                            _this.viewCollectionConfirm.setContent(response);
                        }
                    )
                },
                onContentReady: (e, a, b) => {
                    let $content = _this.viewCollectionConfirm.$content;

                    $content.find('.opb-preview-template-btn')
                        .click((e) => {
                            _this['previewTemplateClick']($, e);
                        })
                    ;

                    $content.find('.opb-use-template-btn')
                        .click((e) => {
                            _this.viewCollectionConfirm.close();
                            _this['useTemplateClick']($, e);
                        })
                    ;
                }
            }));
        });
    }

    /**
     * Form HTML that is submitted upon creating new OptimizePress page
     *
     * @todo Boris - Added nonce "nonce-create-new-page" that should be checked in backend file PagesController::store
     *
     * @param {string} adminUrl
     * @param {string} nonceValue
     * @param {string} templateUid
     * @param {string} fieldTitle
     * @param {string} fieldPlaceholder
     * @param {string} submitText
     * @param {string} submittingText
     * @return {string}
     */
    getCreateNewPageForm(adminUrl, nonceValue, templateUid, fieldTitle, fieldPlaceholder, submitText, submittingText, categoryUid) {
        return `
            <form class="ops-form ops-form-single-submit" method="post" action="${adminUrl}">
                <input type="hidden" id="nonce-create-new-page" name="nonce-create-new-page" value="${nonceValue}">
                <input type="hidden" name="action" value="op-builder-store-page">
                <input type="hidden" name="template_id" value="${templateUid}">
                <input type="hidden" name="category_uid" value="${categoryUid}">
            
                <div class="ops-form-group">
                    <label for="opb-pageTitle">${fieldTitle}</label>
                    <input id="opb-pageTitle" type="text" name="title" value="" placeholder="${fieldPlaceholder}" class="ops-form-control" required>
                </div>

                <button type="submit" class="ops-button" data-submit-text="${submittingText}">${submitText}</button>
            </form>
        `;
    }
}

export default OPBCreateNewPage;
