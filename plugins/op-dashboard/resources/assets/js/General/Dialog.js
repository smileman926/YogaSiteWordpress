class OP3Dialog {
    /**
     * Default jquery-confirm options
     *
     * @return {object}
     */
    static get dialogOptions() {
        return {
            theme: 'optimizepress',
            useBootstrap: false,
            closeIcon: true,
            draggable: false,
            defaultButtons: {},
            smoothContent: false,
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            closeIconClass: 'ops-iconFont ops-close-fill-icon'
        };
    }

    /**
     * Get jquery-confirm dialog
     *
     * @return {$.dialog}
     */
    static get dialog() {
        let $ = jQuery;
        return $.dialog;
    }

    /**
     * Get jquery-confirm confirm
     *
     * @return {$.confirm}
     */
    static get confirm() {
        let $ = jQuery;
        return $.confirm;
    }

    /**
     * Get jquery-confirm alert
     *
     * @return {$.alert}
     */
    static get alert() {
        let $ = jQuery;
        return $.alert;
    }

    /**
     * Create dialog with alert display type
     *
     * @param {string} title
     * @param {string} content
     * @param {string} redirectUrl
     * @return {$.dialog}
     */
    static createAlert(title, content, redirectUrl = '') {
        return OP3Dialog.dialog(Object.assign(OP3Dialog.dialogOptions, {
            theme: 'optimizepress,optimizepress-mini,optimizepress-alert',
            title: title,
            content: () => {
                return content;
            },
            onContentReady: () => {
                if (redirectUrl !== '') {
                    console.log(redirectUrl);
                    window.location.replace(redirectUrl);
                }
            }
        }));
    }

    /**
     * Create dialog with alert display type
     *
     * @param {string} title
     * @param {string} content
     * @param {string} redirectUrl
     * @return {$.dialog}
     */
    static createSuccess(title, content, redirectUrl = '') {
        return OP3Dialog.dialog(Object.assign(OP3Dialog.dialogOptions, {
            theme: 'optimizepress,optimizepress-mini,optimizepress-success',
            title: title,
            content: () => {
                return content;
            },
            onContentReady: () => {
                if (redirectUrl !== '') {
                    console.log(redirectUrl);
                    window.location.replace(redirectUrl);
                }
            }
        }));
    }

    /**
     * HTML with input for filtering
     *
     * @param {string} confirmTitle
     * @return {string}
     */
    static headerWithFilter(confirmTitle) {
        return `
            <div class="d-flex justify-content-between align-items-center ops-form">
                <div>
                    <h4>${confirmTitle}</h4>
                </div>
                <div>
                    <input class="op3-input-filter" placeholder="Filter Integrations" type="text">
                </div>
            </div>
        `;
    }
}

export default OP3Dialog;
