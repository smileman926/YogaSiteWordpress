import Emitter from 'es6-event-emitter'

class OP3Form extends Emitter {
    /**
     * Init OP3 forms
     *
     * @param $
     */
    constructor($) {
        super();

        this.$ = $;
    }

    /**
     * Make a form post request
     *
     * @param $form
     * @param url
     * @param data
     */
    postRequest($form, url, data) {
        let _this = this;

        _this.$.ajax({
            method: "POST",
            url: url,
            data: data
        }).done((result) => {
            _this.trigger('OP3Form:postRequest', result, $form, url, data);
        }).fail((jqXHR, textStatus) => {
            let result = {};
            result.success = false;
            result.jqXHR = jqXHR;
            result.textStatus = textStatus;

            _this.trigger('OP3Form:postRequest', result, $form, url, data);
        });
    }
}

export default OP3Form;
