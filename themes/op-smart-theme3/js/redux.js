jQuery(document).ready(function($) {

    var providerRequest,
        gtwEnabledRequest,
        gtwRequest,
        lists = {},
        tags = {},
        listRequest = {},
        providersUsingInputFieldsInsteadOfTags = ['aweber', 'email', 'custom'],
        providersUsingCustomFieldsInsteadOfTags = ['mailchimp', 'campaignmonitor', 'emma', 'icontact', 'mailpoet'],
        providersUsingCustomFieldsForNotes = ['campaignmonitor', 'egoi', 'emma', 'icontact', 'infusionsoft', 'mailpoet', 'getresponse', 'ontraport', 'campaignrefinery'];

    /**
     * Optin Form object.
     *
     * @param {string} prefix
     */
    function OptinForm(prefix, nr) {

        this.prefix             = prefix + '_';
        this.nr                 = nr;
        this.lists              = {};
        this.tags               = {};
        // this.$integrationType   = $('#' + this.prefix + 'integration_type-select');
        // this.$integrationType   = $('select.op-integration-type');
        this.$integrationType   = $('#' + this.prefix + 'integration_type_' + this.nr + '-select');
        this.$providerList      = $('#' + this.prefix + 'list_' + this.nr + '-select');
        this.$providerFields      = $('#' + this.prefix + 'field_' + this.nr + '-select');
        this.$gtwIntegration    = $('#' + this.prefix + 'gotowebinar_' + this.nr);
        this.$gtwList           = $('#' + this.prefix + 'gotowebinar_list_' + this.nr + '-select');
        this.tmpObject          = $('<div />');
        this.elSelector         = '#accordion-table-op3_integration_settings_accordion_start_' + this.nr;
        this.$content           = $(this.elSelector);

        var that = this;

        /**
         * Fetches list of providers/integrations via AJAX.
         */
        this.fetchProviderList = function () {
            if (typeof providerRequest == 'undefined') {
                providerRequest = // Fire our ajax request!
                    $.ajax({
                        url: op3_rest_object.api_url + 'optin/integrations/connected',
                        beforeSend: function ( xhr ) {
                            xhr.setRequestHeader( 'X-WP-Nonce', op3_rest_object.api_nonce );
                        }
                    });
            } else {
                that.$integrationType.val(redux.options[that.prefix + 'integration_type_' + that.nr]).trigger('change');
            }

            providerRequest.done(function(response) {
                $.each(response.data, function (key, value) {
                    if (value.provider !== 'email') {
                        that.$integrationType.append(
                            $('<option value=""></option>')
                                .attr('value', value.provider)
                                .text(value.title)
                        );
                    }
                });

                that.$integrationType.val(redux.options[that.prefix + 'integration_type_' + that.nr]).trigger('change');
            });
        };


        /**
         * Fetches providers list via AJAX.
         *
         * @param  {string} provider
         */
        this.fetchProviderItems = function (provider) {
            if (provider !== 'email' &&
                provider !== 'custom' &&
                provider !== 'oneshoppingcart' &&
                provider !== 'arpreach'
            ) {

                if (typeof listRequest[provider] == 'undefined') {
                    listRequest[provider] = $.ajax({
                        url: op3_rest_object.api_url + 'optin/integrations/' + provider + '/lists',
                        beforeSend: function ( xhr ) {
                            xhr.setRequestHeader( 'X-WP-Nonce', op3_rest_object.api_nonce );
                        }
                    });
                }

                listRequest[provider].done(function(response) {
                    if (!response) {
                        // updateIntegrationOptions();
                        return false;
                    }

                    var listsProper = [];
                    response.data.forEach(function(element){
                       listsProper[element.id] = [element.name];
                    });

                    that.lists[provider] = listsProper;
                    that.$providerList.find('option').remove();
                    that.$providerList.append('<option value=""></option>');

                    $.each(response.data, function (key, value) {
                        that.$providerList.append(
                            $('<option></option>')
                                .attr('value', value.id)
                                .text(value.name)
                            );
                    });

                    that.$providerList.val(redux.options[that.prefix + 'list_' + that.nr]).trigger('change');
                    // updateIntegrationOptions();
                });

                that.$providerList.val(redux.options[that.prefix + 'list_' + that.nr]).trigger('change');
                // that.$providerList.trigger('change');

            } else {

                this.$providerList.val(redux.options[this.prefix + 'list_' + this.nr]).trigger('change');

            }
        };

        /**
         * Fetches list/provider fields via AJAX.
         *
         * @param  {string} provider
         * @param  {string} list
         */
        this.fetchProviderFields = function (provider, list) {
            if (provider === 'arpreach') {
                list = 'arpreach';
            }

            // First lets check if we already have this list saved
            if (this.lists !== null
                && typeof this.lists[provider] !== 'undefined'
                && typeof this.lists[provider][list] !== 'undefined'
            ) {

                // Unfortunately we can't merge this two IF's due to undefined nature of it
                if (typeof this.lists[provider][list].fields === 'undefined') {
                    // Fetch via AJAX
                    $.ajax({
                        url: op3_rest_object.api_url + 'optin/integrations/' + provider + '/fields/' + list,
                        beforeSend: function ( xhr ) {
                            xhr.setRequestHeader( 'X-WP-Nonce', op3_rest_object.api_nonce );
                        }
                    }).done(function(response) {
                        // Lets save the fields if there are any
                        if (typeof response.data !== 'undefined') {
                            that.lists[provider][list]['fields'] = response.data;
                        }

                        if (typeof response.action !== 'undefined') {
                            that.lists[provider][list]['action'] = response.action;
                        }

                        if (typeof response.hidden !== 'undefined') {
                            that.lists[provider][list]['hidden'] = response.hidden;
                        }

                        // Fill fields and action and hidden fields if applicable
                        that.handleListSwitching(provider, list);

                    });
                } else {
                    // Fill fields and action and hidden fields if applicable
                    this.handleListSwitching(provider, list);
                }
            }
        };

        /**
         * Fetch tags for given provider.
         *
         * @param  {Array} provider
         * @return {void}
         */
        this.fetchProviderTags = function (provider) {
             // First lets check if we already have this tags saved
            if (typeof this.tags[provider] === 'undefined'
            ) {
                $.ajax({
                    url: op3_rest_object.api_url + 'optin/integrations/' + provider + '/tags',
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'X-WP-Nonce', op3_rest_object.api_nonce );
                    }
                }).done(function(response) {
                    that.tags[provider] = response.data;

                    that.handleTagsSwitching(provider);
                });
            } else {
                this.handleTagsSwitching(provider);
            }
        }

        /**
         * Switches provider list and fills custom fields dropdowns and hidden fields as well.
         *
         * @param  {string} provider
         * @param  {string} list
         */
        this.handleListSwitching = function (provider, list) {
            // Fill fields
            this.fillProviderCustomFields(this.lists[provider][list].fields);

            // Fill tags with custom fields
            if (providersUsingCustomFieldsInsteadOfTags.indexOf(provider) >= 0) {
                this.fillProviderGdprDropdownFields(this.lists[provider][list].fields);
            }

            // Fill consent note field
            if (providersUsingCustomFieldsForNotes.indexOf(provider) >= 0) {
                this.fillProviderConsentNoteField(this.lists[provider][list].fields);
            }

            // Fill action param if needed
            if (typeof this.lists[provider][list].action !== 'undefined') {
                $('#op3_integration_settings_action_page_' + this.nr).val(this.lists[provider][list].action);
                // $('#action_page').val(lists[provider][list].action);
            }

            // Handle hidden fields
            if (typeof this.lists[provider][list].hidden !== 'undefined') {
                this.fillHiddenFields(this.lists[provider][list].hidden);
            }
        };

        /**
         * Switches providers tags.
         *
         * @param  {string} provider
         * @return {void}
         */
        this.handleTagsSwitching = function (provider) {
            if (typeof this.tags[provider] !== 'undefined') {
                this.fillProviderGdprDropdownFields(this.tags[provider]);
            }
        }

        /**
         * Parses HTML and identifies input fields, form action and method. Fills custom fields in dropdowns and hidden fields.
         *
         * @param  {string} html
         */
        this.parseHtml = function (html) {

            var emailName;
            var nameName;
            var property;

            try {
                this.tmpObject.html(html.replace(/<!--.*-->/g, "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'').replace(/<script.*/gi, ''));
            } catch (error) {
                // Should we catch this error in console?
            }

            var form = this.tmpObject.find('form[action]');

            if (form.length > 0) {
                $('#' + prefix + '_action_' + this.nr).val(form.attr('action'));
                $('#' + prefix + '_method_' + this.nr + '-select').val(form.attr('method')).trigger('change');

                var fields = {},
                    hiddenFields = {};

                $(':input[name]:not(:button,:submit)', form).each(function() {
                    field = $(this).attr('name');
                    fields[field] = field;
                });

                this.fillProviderCustomFields(fields);

                var currentIntegrationEmail = redux.options['op3_integration_settings_email_' + this.nr];
                var currentIntegrationName = redux.options['op3_integration_settings_name_' + this.nr];
                var $emailSelect = $('#' + prefix + '_email_' + this.nr + '-select');
                var $nameSelect = $('#' + prefix + '_name_' + this.nr + '-select');

                if (typeof currentIntegrationEmail !== 'undefined' && currentIntegrationEmail !== '') {
                    $emailSelect.val(currentIntegrationEmail).trigger('change');
                    emailName = currentIntegrationEmail;
                } else {
                    $emailSelect.val('email').trigger('change');
                }

                if (typeof currentIntegrationName !== 'undefined' && currentIntegrationName !== '') {
                    $nameSelect.val(currentIntegrationName).trigger('change');
                    nameName = currentIntegrationName;
                } else {
                    $nameSelect.val('name').trigger('change');
                }

                $(':input', this.tmpObject).each(function() {
                    var field = $(this).attr('name');

                    if (typeof field !== 'undefined') {
                        hiddenFields[field] = $(this).val();
                    }
                });

                // We don't want identical fields to be
                // duplicated in hidden inputs and
                // standard form inputs
                for (property in fields) {
                    if (fields.hasOwnProperty(property)
                        && typeof hiddenFields[property] !== 'undefined'
                        && (property === emailName || property === nameName)
                    ) {
                        delete hiddenFields[property];
                    }
                }

                this.fillHiddenFields(hiddenFields);
            }
        };

        /**
         * Creates hidden fields markup based on recived array.
         *
         * @param  {array} fields
         */
        this.fillHiddenFields = function (fields) {
            var hiddenFields = '';
            $.each(fields, function (key, value) {
                hiddenFields += '<input type="hidden" name="' + key + '" value="' + value + '" />';
            });

            // $('#hidden').val(hiddenFields);
            $('input#' + prefix + '_hidden_' + this.nr).val(hiddenFields);
        };

        /**
         * Initialize GoToWebinar integration fields.
         */
        this.initGtwIntegrationFields = function () {
            if (typeof gtwEnabledRequest == 'undefined') {
                gtwEnabledRequest = $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action': OptimizePress.SN + '-email-provider-enabled',
                        'provider': 'gotowebinar'
                    },
                    dataType: 'json'
                });
            }

            gtwEnabledRequest.done(function(response) {
                if (response == 1) {
                    that.$gtwIntegration.trigger('change');
                } else {
                    that.$gtwIntegration.closest('tr').addClass('hidden');
                }
            });
        };

        /**
         * Fill GDPR tags dropdowns with custom fields/tags.
         *
         * @param  {Array} fields
         * @return {void}
         */
        this.fillProviderGdprDropdownFields = function (fields) {
            var $dropdowns = $('.op-gdpr-provider-tags-dropdown-' + this.nr + ' select');

            $dropdowns.find('option:gt(0)').remove();

            $.each($dropdowns, function(i, item) {
                $(item).append(
                    $('<option></option>')
                        .attr('value', '-')
                        .text('Do not apply a tag')
                    );

                $.each(fields, function (id, value) {
                    $(item).append(
                        $('<option></option>')
                            .attr('value', value.id)
                            .text(value.name)
                        );
                });

                var optionName = $(item).attr('id').replace('-select', '');

                if (redux.options[optionName] !== 'undefined' || redux.options[optionName] !== '') {
                    $(item).val(redux.options[optionName]);
                }
            });
        }

        /**
         * Fill GDPR consent note field with lists custom fields.
         *
         * @param  {Array} fields
         * @return {void}
         */
        this.fillProviderConsentNoteField = function (fields) {
            var $dropdown = $('#op3_integration_settings_consent_notes_field_' + this.nr + '-select');

            $.each(fields, function (id, value) {
                $dropdown.append(
                    $('<option></option>')
                        .attr('value', value.id)
                        .text(value.name)
                    );
            });

            var optionName = $dropdown.attr('id').replace('-select', '');

            if (redux.options[optionName] !== 'undefined' || redux.options[optionName] !== '') {
                $dropdown.val(redux.options[optionName]);
            }
        }

        /**
         * Fill custom fields for list/provider.
         *
         * @param  {array} fields
         */
        this.fillProviderCustomFields = function (fields) {
            // Lets fetch regular selects (that must be one of given fields)
            var $regular = $('select.op-form-regular-field-selector');

            // Extra selects are the ones that can add new field
            var $extra = $('select.op-form-extra-field-selector');

            // Lets clear current options
            $regular.find('option:gt(0)').remove();
            $extra.find('option:gt(1)').remove();

            // Lets fill this options then
            $.each($regular, function(i, item) {
                $.each(fields, function (id, value) {
                    $(item).append(
                        $('<option></option>')
                            .attr('value', value.id)
                            .text(value.label)
                        );
                });

                var field = $(item).parent().attr('data-id');
                var nameValue = '';

                if (typeof redux.options[field] != 'undefined') {

                    $(item).val(redux.options[field]).trigger('change');

                } else if ($(item).attr('id') === that.prefix + 'name_' + that.nr + '-select')  {

                    switch(that.$integrationType.val()) {
                        case 'activecampaign':
                        case 'arpreach':
                        case 'constantcontact':
                        case 'egoi':
                        case 'emma':
                        case 'maropost':
                            nameValue = 'first_name';
                            break;
                        case 'campaignmonitor':
                            nameValue = 'Name';
                            break;
                        case 'aweber':
                        case 'convertkit':
                        case 'getresponse':
                        case 'icontact':
                            nameValue = 'name';
                            break;
                        case 'officeautopilot':
                        case 'ontraport':
                            nameValue = 'First-Name';
                            break;
                        case 'infusionsoft':
                            nameValue = 'inf_field_FirstName';
                            break;
                        case 'mailchimp':
                            nameValue = 'FNAME';
                            break;
                        case 'mailpoet':
                            nameValue = 'firstname';
                            break;
                        case 'sendlane':
                            nameValue = 'sender_name';
                            break;
                        case 'oneshoppingcart':
                            break;
                    }

                    $(item).val(nameValue).trigger('change');

                }
            });

            // And once more for extra fields
            $.each($extra, function(i, item) {
                $.each(fields, function (id, value) {
                    $(item).append(
                        $('<option></option>')
                            .attr('value', value.id)
                            .text(value.name)
                        );
                });

                var field = $(item).parent().attr('data-id').split('-');
                var index = field.pop();
                if (typeof redux.options[that.prefix + extra_fields] != "string" && typeof redux.options[that.prefix + extra_fields][field.join('-')][index] != 'undefined') {
                    $(item).val(redux.options[that.prefix + extra_fields][field.join('-')][index]).trigger('change');
                }
            });
        };

        // Init events
        this.$integrationType.on('change', function() {
            that.fetchProviderItems(this.value);

            if (providersUsingInputFieldsInsteadOfTags.concat(providersUsingCustomFieldsInsteadOfTags).indexOf(that.$integrationType.val()) < 0) {
                that.fetchProviderTags(that.$integrationType.val());
            }
        });

        this.$providerList.on('change', function(e) {
            that.fetchProviderFields(that.$integrationType.val(), this.value);
        });

        /*$('body').on('keyup blur', this.elSelector + ' textarea.op-integration-form-html', function() {
            that.parseHtml($(this).val());
        });

        $(this.elSelector + ' textarea.op-integration-form-html').trigger('keyup');

        this.$gtwIntegration.on('change', function() {
            if (this.value === 1) {

                // Loading lists
                if (typeof gtwRequest == 'undefined') {
                    gtwRequest = $.ajax({
                        type: 'POST',
                        url: ajaxurl,
                        data: {
                            'action': OptimizePress.SN + '-email-provider-items',
                            'provider': 'gotowebinar'
                        },
                        dataType: 'json'
                    });
                }

                gtwRequest.done(function(response) {
                    that.$gtwList.find('option').remove();
                    $.each(response.lists, function (key, value) {
                        that.$gtwList.append(
                            $('<option></option>')
                                .attr('value', key)
                                .text(value.name)
                            );
                    });

                    that.$gtwList.val(redux.options[that.prefix + 'gotowebinar_list_' + that.nr]).closest('tr').removeClass('hidden');
                });
            } else {
                that.$gtwList.closest('tr').addClass('hidden');
            }
        });*/
    }

    // We can use this only if OptimizePress plugin is active
    if (typeof OptimizePress === 'undefined') {
        //return false;
    }

    // 'div' is used intentionally, because redux adds
    // the class two elements (to both tr and div)
    $('div.op-optin-accordion').each(function (index) {
        var $content = $(this).next();
        var nr = $content.find('input.op-optin-integration-id').val();

        if (nr) {
            var prefix = 'op3_integration_settings'; // -select
            var form = new OptinForm(prefix, nr);
            form.fetchProviderList();
            //form.initGtwIntegrationFields();
        }
    });

    /**
     * Sync Integrations Select with Integrations in Optins
     */
    $('body').on('blur', 'input.op-integration-name', function () {
        var value = $(this).val();
        var className = $(this).attr('class');
        var integrationId = className.split(/op-integration-name-(\d+)/i);
        var integrationId = integrationId[1];

        $('.op-integration-select').each(function() {
            var $option = $(this).find('option[value="' + integrationId + '"]');
            $option.text(value).trigger('change');
        });
    });

    isIntegrationChanged = false;

    /**
     * Update the integration name in Select Integration to Edit dropdown to the correct value
     */
    var updateIntegrationTitle = function ($el) {
        var value = $el.val();
        var className = $el.attr('class');
        var integrationId = className.split(/op-integration-name-(\d+)/i);
        var integrationId = integrationId[1];

        // $('#integration_current-select').find('option[value="' + integrationId + '"]').text(value);
        // $('#op_options-integration_current .select2-chosen').text(value);
        $('.op-optin-accordion-' + integrationId).find('.control h3').text(value);
    }

    $('body').on('keyup', 'input.op-integration-name', function () {
        var $el = $(this);
        updateIntegrationTitle($el);
    });

    $('input.op-integration-name').each(function() {
        var $el = $(this);
        updateIntegrationTitle($el);
    });

    /**
     * Save and reload the page when integrations number is changed
     */
    var currentIntegrationsNumber = $('input.op-integrations-number').val();
    $('body').on('change', '.redux-slider-container.op-integrations-number', function (e) {
        if ($(this).val() !== currentIntegrationsNumber) {
            $('#redux_ajax_overlay').css({
                display: 'block'
            });
            redux.args.ajax_save = false;
            $('#redux_save').trigger('click');
        }
    });

    /**
     * Clear transient cache after save to ensure
     * all OP elements are rerendered
     */
    /*$('body').on('click', '.redux-action_bar', function () {
        $('#redux_ajax_overlay').css({
            display: 'block'
        });
        OptimizePress.ajax.clearElementsCache().then(function(response) {
            $('#redux_ajax_overlay').css({
                display: 'none'
            });
        });
    });*/

    /**
     * Manually clear WP object cache
     */
    /*$('#op-clear-optin-form-cache').on('click', function () {
        if (window.confirm("Are you sure that you want to clear Optin Forms Cache?\nYour changes will not be saved.")) {
            $('#redux_ajax_overlay').css({
                display: 'block'
            });
            OptimizePress.ajax.clearElementsCache().then(function(response) {
                window.location.reload();
            });
        }
        return false;
    });*/

});
