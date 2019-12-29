import OPBCreateNewPage from "./OP3Builder/Pages/OPBCreateNewPage";

/**
 * @todo Boris & Davor - this file should be inside OP Builder - with all files inside /OP3Builder/ folder
 */
class OP3Builder {
    constructor() {
        // this.secondaryMenu = window.OP3General.createMovingBorderMenu('.opb-template-category-menu');
        this.secondaryMenu = window.OP3General.createCollapsibleMenu('.opb-template-category-menu');
        this.createPageSlider = null;
        this.movingImage = null;

        window.OP3General.pages.createNewPage = new OPBCreateNewPage();

        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;
        let $ = jQuery;

        $(document).ready(() => {
            _this.createPageSlider = window.OP3General.createWallopAjaxSlider('.opb_create-new-page-slider', $);

            _this['combineMenuAndSlider']($);
            _this['disableFormsFromSubmittingTwice']($);
        });
    }

    /**
     * Don't let some forms be submitted by clicking multiple times
     * @param $
     */
    ['disableFormsFromSubmittingTwice']($) {
        $('body').on('submit', '.ops-form-single-submit', function() {
            let $form = $(this);
            let $button = $form.find('input[type=submit], button[type=submit]');
            let submitText = $button.data('submit-text');

            // Check if already submitting
            if ($form.data('submitting')) {
                return false;
            }

            // Fade the button slightly and change the text
            $button.fadeTo(100, .5).css('cursor', 'not-allowed');
            if (submitText) $button.text(submitText);

            // Mark the form as submitting
            $form.data('submitting', true);
        });
    }

    /**
     * Changing menu and slides together when moved over menu item or slider swipe
     */
    ['combineMenuAndSlider']($) {
        let _this = this;

        _this.movingImage = window.OP3General.createMovingImage('.opb-template-preview', $);

        _this.secondaryMenu.on('movingBorderMenu:change', ($menuLI) => {
            _this.createPageSlider.changeSlide($menuLI.index());
            _this.movingImage.destroy();
            _this.movingImage = window.OP3General.createMovingImage('.opb-template-preview', $);
        });
        _this.secondaryMenu.on('collapsibleMenu:change', ($menuLI) => {
            _this.createPageSlider.changeSlide($menuLI.index());
            _this.movingImage.destroy();
            _this.movingImage = window.OP3General.createMovingImage('.opb-template-preview', $);
        });

        _this.secondaryMenu.triggerInitialEvents();
        _this.createPageSlider.on('wallopSlider:change', (event) => {
            _this.secondaryMenu.changeMenu(event.detail.currentItemIndex);
        });
    }
}

export default OP3Builder;

/** @todo - Uncomment when moving JS to OP Builder */
//window.OP3General.pages.builder = new OP3Builder();
