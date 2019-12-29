/**
 * OptimizePress3 designer:
 * integrations.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 *     - op3-ajax.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_Integration = OP3.defineClass({

        Name: "OP3.Integration",

        Constructor: function(index) {
            this._index = index;
        },

        Prototype: {

            /**
             * Property exists getter
             *
             * @return {Mixed}
             */
            get exists() {
                return this._index !== -1;
            },

            /**
             * Property connected getter
             *
             * @return {Boolean}
             */
            get connected() {
                return that._data && that._data[this._index] ? that._data[this._index].connected : null;
            },

            /**
             * Property connect url getter
             *
             * @return {Boolean}
             */
            get connectURL() {
                return that._data && that._data[this._index] ? that._data[this._index].connect_url : null;
            },

            /**
             * Connect integration
             *
             * @return {Void}
             */
            connect: function() {
                that.connect(this.provider);
            },

            /**
             * Property uid getter
             *
             * @return {String}
             */
            get uid() {
                return that._data && that._data[this._index] ? that._data[this._index].uid : null;
            },

            /**
             * Property provider getter
             *
             * @return {String}
             */
            get provider() {
                return that._data && that._data[this._index] ? that._data[this._index].provider : null;
            },

            /**
             * Property title getter
             *
             * @return {String}
             */
            get title() {
                return that._data && that._data[this._index] ? that._data[this._index].title : null;
            },

            /**
             * Property list_copy getter
             *
             * @return {String}
             */
            get description() {
                return (that._data && that._data[this._index] ? that._data[this._index].list_copy : null) || null;
            },

            /**
             * Property image getter
             *
             * @return {String}
             */
            get image() {
                return that._data && that._data[this._index] ? that._data[this._index].image : null;
            },

            /**
             * Property has_tags getter
             *
             * @return {Boolean}
             */
            get hasTags() {
                return that._data && that._data[this._index] ? that._data[this._index].has_tags : null;
            },

            /**
             * Property has_lists getter
             *
             * @return {Boolean}
             */
            get hasLists() {
                return that._data && that._data[this._index] ? that._data[this._index].has_lists : null;
            },

            /**
             * Property has_webhook_url getter
             *
             * @return {Boolean}
             */
            get hasWebhookUrl() {
                return that._data && that._data[this._index] ? that._data[this._index].has_webhook_url : null;
            },

            /**
             * Property has_admin_email getter
             *
             * @return {Boolean}
             */
            get hasAdminEmail() {
                return that._data && that._data[this._index] ? that._data[this._index].has_admin_email : null;
            },

            /**
             * Property has_lead_options getter
             * (special integration options, not
             * implemented yet)
             *
             * @return {Boolean}
             */
            get hasLeadOptions() {
                return that._data && that._data[this._index] ? that._data[this._index].has_lead_options : null;
            },

            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasGdpr() {
                return that._data && that._data[this._index] ? that._data[this._index].has_gdpr : null;
            },

            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasGoals() {
                return that._data && that._data[this._index] ? that._data[this._index].has_goals : null;
            },

            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasFormId() {
                return that._data && that._data[this._index] ? that._data[this._index].has_form_id : null;
            },

            /**
             * Property has_double_optin_checkbox getter
             *
             * @return {Boolean}
             */
            get hasDoubleOptin() {
                return that._data && that._data[this._index] ? that._data[this._index].has_double_optin_checkbox : null;
            },

            /**
             * Property connection_requirements getter
             * (list, list_or_tag, none)
             *
             * @return {Mixed}
             */
            get connectionRequirements() {
                return that._data && that._data[this._index] ? (that._data[this._index].connection_requirements || "none") : null;
            },

            /**
             * Property gdpr_notes getter
             *
             * @return {String}
             */
            get gdprNotes() {
                var result = null;
                var valid = [ "fields" ];
                if (that._data && that._data[this._index] && that._data[this._index].gdpr_notes && valid.indexOf(that._data[this._index].gdpr_notes !== -1))
                    result = that._data[this._index].gdpr_notes;

                return result;
            },

            /**
             * Property gdpr_tag_source getter
             *
             * @return {String}
             */
            get gdprTagSource() {
                var result = null;
                var valid = [ "tags", "fields", "none", "text_input" ];
                if (that._data && that._data[this._index] && that._data[this._index].gdpr_tag_source) {
                    if (valid.indexOf(that._data[this._index].gdpr_tag_source !== -1))
                        result = that._data[this._index].gdpr_tag_source;
                    else
                        result = "none";
                }

                return result;
            },

            /**
             * Property admin_email_label getter
             *
             * @return {String}
             */
            get labelAdminEmail() {
                return (that._data && that._data[this._index] ? that._data[this._index].admin_email_label : null) || null;
            },

            /**
             * Property list_label getter
             *
             * @return {String}
             */
            get labelList() {
                return (that._data && that._data[this._index] ? that._data[this._index].list_label : null) || null;
            },

            /**
             * Property tag_label getter
             *
             * @return {String}
             */
            get labelTag() {
                return (that._data && that._data[this._index] ? that._data[this._index].tag_label : null) || null;
            },

            /**
             * Property goal_label getter
             *
             * @return {String}
             */
            get labelGoal() {
                return (that._data && that._data[this._index] ? that._data[this._index].goal_label : null) || null;
            },

            /**
             * Property form_id_label getter
             *
             * @return {String}
             */
            get labelFormId() {
                return (that._data && that._data[this._index] ? that._data[this._index].form_id_label : null) || null;
            },

            /**
             * Property webhook_url_label getter
             *
             * @return {String}
             */
            get labelWebhookUrl() {
                return (that._data && that._data[this._index] ? that._data[this._index].webhook_url_label : null) || null;
            },

            /**
             * Property double_optin_label getter
             *
             * @return {String}
             */
            get labelDoubleOptin() {
                return (that._data && that._data[this._index] ? that._data[this._index].double_optin_label : null) || null;
            },

            /**
             * Property gdpr_label getter
             *
             * @return {String}
             */
            get labelGdpr() {
                return (that._data && that._data[this._index] ? that._data[this._index].gdpr_label : null) || null;
            },

            /**
             * Get integration details
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getDetails: function(callback) {
                that.getDetails(this.provider, callback);
            },

            /**
             * Get integration lists
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getLists: function(callback) {
                that.getLists(this.provider, callback);
            },

            /**
             * Get integration tags
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getTags: function(callback) {
                that.getTags(this.provider, callback);
            },

            /**
             * Get integration fields for
             * selected list and tag
             *
             * @param  {String}   list
             * @param  {String}   tag
             * @param  {Function} callback
             * @return {Void}
             */
            getFields: function(list, tag, callback) {
                that.getFields(this.provider, list, tag, callback);
            },

            /**
             * Get integration goals
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getGoals: function(callback) {
                that.getGoals(this.provider, callback);
            },

            /**
             * Get integration list detail
             *
             * @param  {String}   list
             * @param  {Function} callback
             * @return {Void}
             */
            getListDetails: function(list, callback) {
                return that.getListDetails(this.provider, list, callback);

                that.getLists(this.provider, function(data) {
                    for (var i = 0; i < (data || []).length; i++) {
                        if (list == data[i].id)
                            return that._callback(callback, [ data[i] ]);
                    }

                    return that._callback(callback, [ null ]);
                });
            },

            /**
             * Get integration tag detail
             *
             * @param  {String}   tag
             * @param  {Function} callback
             * @return {Void}
             */
            getTagDetails: function(tag, callback) {
                return that.getTagDetails(this.provider, tag, callback);

                that.getTags(this.provider, function(data) {
                    for (var i = 0; i < (data || []).length; i++) {
                        if (tag == data[i].id)
                            return that._callback(callback, [ data[i] ]);
                    }

                    return that._callback(callback, [ null ]);
                });
            },

            /**
             * Get integration field detail
             *
             * @param  {String}   list
             * @param  {String}   tag
             * @param  {String}   field
             * @param  {Function} callback
             * @return {Void}
             */
            getFieldDetails: function(list, tag, field, callback) {
                return that.getFieldDetails(this.provider, list, tag, field, callback);
            },

            /**
             * Get integration goal detail
             *
             * @param  {String}   goal
             * @param  {Function} callback
             * @return {Void}
             */
            getGoalDetails: function(goal, callback) {
                return that.getGoalDetails(this.provider, goal, callback);
            },

        },

    });

    var OP3_Integrations_Wizard = OP3.defineClass({

        Name: "OP3.Integrations.Wizard",

        Extends: window.parent.OP3.Wizard,

        Constructor: function() {
            window.parent.OP3.Wizard.call(this, this._steps);

            this.$ui.element.addClass("op3-wizard-integration");
            this.$ui.steps.attr("data-is-funnel-page", OP3.Funnels && OP3.Funnels.pluginActive && OP3.Funnels.funnelId ? "1" : "0");
            this.attach(window.parent.document.body);
        },

        Prototype: {

            /**
             * Current form getter
             *
             * @return {Object}
             */
            get form() {
                return this._form || null;
            },

            /**
             * Current form setter
             *
             * @param  {Object} value
             * @return {Void}
             */
            set form(value) {
                try {
                    value = OP3.$(value).element();
                    if (value.type() !== "form")
                        throw "";
                }
                catch(e) {
                    value = null;
                }

                this._form = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function() {
                if (!this.form)
                    throw "OP3.Wizard.Integration: form element must be set before displaying wizard.";

                window.parent.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function() {
                window.parent.OP3.Wizard.prototype.close.call(this);
                this.form = null;
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Integration",
                    navIcon: "op3-icon-link-2-1",
                    title: "Select Integration",
                    content: "",
                    buttons: [
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "List/Tag/Webhook",
                    navIcon: "op3-icon-tag-1",
                    title: "List, Tag and Webhook Settings",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Form Fields",
                    navIcon: "op3-icon-edit-75-1",
                    title: "Form Fields",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "GDPR",
                    navIcon: "op3-icon-security-1",
                    title: "GDPR Settings",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Post Action",
                    navIcon: "op3-icon-goal-65-1",
                    title: "Optin Post Action",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Complete",
                    navIcon: "op3-icon-check-bold-1",
                    title: "Configuration Complete",
                    content: "",
                    buttons: [
                        {
                            label: "Close",
                            className: "op3-wizard-button-complete",
                            method: "close",
                        },
                    ],
                },
            ],

            /**
             * Filed aliases:
             * used for saving and restoring field
             * properties on integration change
             *
             * @type {Object}
             */
            _fieldAliases: {
                email: [ "inf_field_email" ],
                firstname: [ "first_name", "fname", "inf_field_firstname" ],
                lastname: [ "last_name", "lname", "inf_field_lastname" ],
            },

            /**
             * Default icon for each field
             *
             * @type {Object}
             */
            _fieldIcons: {
                email: "op3-icon-email-83-1",
                firstname: "op3-icon-single-01-1",
                lastname: "op3-icon-multiple-19-1",
                phone: "op3-icon-phone-call-1",
            },

            /**
             * Get field name by alias
             *
             * @param  {String} fieldName
             * @return {String}
             */
            _getFieldNameByAlias: function(fieldName) {
                var result = fieldName.toString();
                for (var alias in this._fieldAliases) {
                    if (alias.toLowerCase() === result.toLowerCase()) {
                        result = alias;
                        break;
                    }

                    var aliasList = this._fieldAliases[alias]
                        .map(function(item) {
                            return item.toLowerCase();
                        });

                    if (aliasList.indexOf(result.toLowerCase()) !== -1) {
                        result = alias;
                        break;
                    }
                }

                return result;
            },

            /**
             * Get the icon based on the field type
             *
             * Tested integrations:
             *     - email
             *     - activecampaign
             *     - aweber
             *     - convertkit
             *     - demio
             *     - drip
             *     - emma
             *     - infusionsoft
             *     - mailchimp
             *     - ontraport
             *     - sendreach
             *     - sendlane
             *
             * @param  {String} fieldName
             * @return {String}
             */
            _getFieldIcon: function(fieldName) {
                fieldName = this._getFieldNameByAlias(fieldName);
                if (fieldName in this._fieldIcons)
                    return this._fieldIcons[fieldName];

                return "";
            },

            /**
             * Load form field element data
             * previously set (before the
             * integratoin was changed)
             *
             * @param  {Node} node
             * @return {Void}
             */
            _loadFieldData: function(node) {
                var $form = OP3.$(this._form).jq();
                var data = $form.data("op3-field-data");
                if (!data)
                    return;

                var element = OP3.$(node).element();
                var name = this._getFieldNameByAlias(element.getOption("name", "all"));
                var visibleLock = !!(element.getOption("visibleLock", "all")*1);
                data = data[name];

                for (var media in data) {
                    for (var prop in data[media]) {
                        if (visibleLock && prop === "visible")
                            continue;

                        element.setOption(prop, data[media][prop], media);
                    }
                }
            },

            /**
             * Store form field element data so we
             * can reapply it again on another
             * integration
             *
             * @param  {Node} node
             * @return {Void}
             */
            _saveFieldData: function(node) {
                var $form = OP3.$(this._form).jq();
                var data = $form.data("op3-field-data");
                if (!data) {
                    data = {};
                    $form.data("op3-field-data", data);
                }

                var element = OP3.$(node).element();
                var name = this._getFieldNameByAlias(element.getOption("name"));
                var props = [ "visible", "html", "placeholder", "op3Icon", "iconDisplay", "value", "urlMapping", "inputValidationMessage" ];

                data[name] = {};
                OP3.LiveEditor.forEachDevice(function(device, media) {
                    props.forEach(function(key) {
                        var prop = element.findProperty(key);
                        if (!prop || (prop._forceComputed && media !== "all"))
                            return;

                        data[name][media] = data[name][media] || {};
                        data[name][media][key] = prop.getter(media);
                    });
                });
            },

            /**
             * Render each step
             *
             * @return {Void}
             */
            _renderSteps: function() {
                window.parent.OP3.Wizard.prototype._renderSteps.call(this);

                this._renderStep1();
                this._renderStep2();
                this._renderStep3();
                this._renderStep4();
                this._renderStep5();
                this._renderStep6();

                this.$ui.desc = this.$ui.element.find(".description");
                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.fieldSummary = this.$ui.steps.find("[data-field-summary]");
                this.$ui.valueSummary = this.$ui.steps.find("[data-value-summary]");
            },

            /**
             * Render step 1
             *
             * @return {Void}
             */
            _renderStep1: function() {
                var jq = window.parent.jQuery,
                    step = 1,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $header = $stepItem.find(".op3-wizard-steps-item-header"),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Select autoresponder or email service provider you want to send your form data to") + "</p>"
                        + '<select name="integration"></select>';

                jq(html)
                    .appendTo($content);

                jq("<a />")
                    .attr("href", OP3.Meta.adminUrl + "?page=op-dashboard-integrations")
                    .attr("target", "_blank")
                    .attr("class", "op3-wizard-integration-add-new")
                    .text(OP3._("Add New Integration"))
                    .on("click", this._handleAddNewIntegrationClick.bind(this))
                    .appendTo($header)
            },

            /**
             * Render step 2
             *
             * @return {Void}
             */
            _renderStep2: function() {
                var jq = window.parent.jQuery,
                    step = 2,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),

                    html = ''
                        + '<p class="description"></p>'
                        + '<input type="hidden" name="connection_requirements" value="" />'
                        + '<input type="hidden" name="has_admin_email" value="" />'
                        + '<input type="hidden" name="has_lists" value="" />'
                        + '<input type="hidden" name="has_tags" value="" />'
                        + '<input type="hidden" name="has_goals" value="" />'
                        + '<input type="hidden" name="has_form_id" value="" />'
                        + '<input type="hidden" name="has_webhook_url" value="" />'
                        + '<input type="hidden" name="has_double_optin_checkbox" value="" />'
                        + '<input type="hidden" name="has_gdpr" value="" />'
                        + '<input type="hidden" name="gdpr_notes" value="" />'
                        + '<input type="hidden" name="gdpr_tag_source" value="" />'
                        + '<div class="label-group">'
                        + '<label data-field="list">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using List/Form") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="list"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="tag">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="tag"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="goal">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Goal") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="goal"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="form_id">'
                        + '<span class="field-label" data-label-default="' + OP3._("Use Form ID") + '"></span>'
                        + '<input class="input-text" type="text" name="form_id" value="" autocomplete="off" />'
                        + '</label>'
                        + '<label data-field="webhook_url">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Webhook URL") + '"></span>'
                        + '<input class="input-text" type="url" name="webhook_url" value="" autocomplete="off" />'
                        + '</label>'
                        + '<label data-field="double_optin" class="double-optin-toggle">'
                        + '<span class="field-label">' + OP3._("Double Optin") + "</span>"
                        + '<input type="hidden" name="double_optin" value="1" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="double_optin_checkbox" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="admin_email">'
                        + '<span class="field-label" data-label-default="' + OP3._("Admin Email") + '"></span>'
                        + '<input class="input-text" type="email" name="admin_email" value="" />'
                        + '</label>'
                        + '</div>';

                jq(html)
                    .appendTo($content)
                    .find("select")
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest('.op3-wizard')
                    });
            },

            /**
             * Render step 3
             *
             * @return {Void}
             */
            _renderStep3: function() {
                var jq = window.parent.jQuery,
                    step = 3,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Choose your form fields") + "</p>"
                        + '<select name="fields" multiple></select>'
                        + '<div class="op3-wizard-legend">'
                        +     '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-lock-circle-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields are required for this integration to work.") + "</span></div>"
                        +     '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-eye-ban-18-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields will not be shown.") + "</span></div>"
                        + '</div>';

                jq(html)
                    .appendTo($content);
            },

            /**
             * Render step 4
             *
             * @return {Void}
             */
            _renderStep4: function() {
                var jq = window.parent.jQuery,
                    step = 4,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Form Consent Features") + "</p>"
                        + '<select name="gdpr_activate">'
                        + '<option value="off" data-icon="op3-icon-ban-2">' + OP3._("Off") + "</option>"
                        + '<option value="eu" data-icon="op3-icon-currency-euro-1">' + OP3._("Show to EU visitors only") + "</option>"
                        + '<option value="all" data-icon="op3-icon-globe-2-1">' + OP3._("Show to all visitors") + "</option>"
                        + '</select>'
                        + '<div class="label-group label-group-column">'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_consent1_visible" class="consent-toggle">'
                        + '<span class="field-label">' + OP3._("Consent 1") + "</span>"
                        + '<input type="hidden" name="gdpr_consent1_visible" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="gdpr_consent1_visible" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_confirmed">'
                        + '<span class="field-label" data-label-default="' + OP3._("Confirmed Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_confirmed">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_confirmed" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_declined">'
                        + '<span class="field-label" data-label-default="' + OP3._("Declined Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_declined">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_declined" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_not_shown">'
                        + '<span class="field-label" data-label-default="' + OP3._("Not Shown Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_not_shown">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_not_shown" value="" />'
                        + '</label>'
                        + '</div>'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_consent2_visible" class="consent-toggle">'
                        + '<span class="field-label">' + OP3._("Consent 2") + "</span>"
                        + '<input type="hidden" name="gdpr_consent2_visible" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="gdpr_consent2_visible" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_confirmed">'
                        + '<span class="field-label" data-label-default="' + OP3._("Confirmed Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_confirmed">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_confirmed" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_declined">'
                        + '<span class="field-label" data-label-default="' + OP3._("Declined Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_declined">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_declined" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_not_shown">'
                        + '<span class="field-label" data-label-default="' + OP3._("Not Shown Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_not_shown">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_not_shown" value="" />'
                        + '</label>'
                        + '</div>'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_field_note">'
                        + '<span class="field-label">' + OP3._("Field for GDPR note") + "</span>"
                        + '<div class="select2-container">'
                        + '<select name="gdpr_field_note">'
                        + '</select>'
                        + '</div>'
                        + '</label>'
                        + '</div>'
                        + '</div>';

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="gdpr_activate"]')
                        .gridPicker({
                            render: function(node) {
                                var $node = jq(node),
                                    label = $node.text(),
                                    icon = $node.attr("data-icon");

                                return ""
                                    + '<a class="op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                    + '<figure>'
                                    + '<i class="op3-icon ' + icon + '"></i>'
                                    + '</figure>'
                                    + '<span>' + label + '</span>'
                                    + '</a>';
                            },
                        });
                $content
                    .find('select:not([name="gdpr_activate"])')
                        .select2({
                            width: "100%",
                            dropdownParent: $content.closest(".op3-wizard"),
                        });
            },

            /**
             * Render step 5
             *
             * @return {Void}
             */
            _renderStep5: function() {
                var jq = window.parent.jQuery,
                    step = 5,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Set the action when form is submitted") + "</p>"
                        + '<select name="post_action">'
                        + '<option value="notification" data-icon="op3-icon-chat-1">' + OP3._("Notification") + "</option>"
                        + '<option value="redirect" data-icon="op3-icon-link-69-2">' + OP3._("Redirect to URL") + "</option>"
                        + '<option value="popoverlay" data-icon="op3-icon-select-1">' + OP3._("Show Pop Overlay") + "</option>"
                        + '<option value="hidePopoverlay" data-icon="op3-icon-select-1 op3-icon-rotate-270">' + OP3._("Hide Pop Overlay") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="nextFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Next Funnel Step") + "</option>" : '')
                        // + '<option value="prevFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Go to Previous Funnel Step") + "</option>"
                        + '<option value="goToFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Specific Funnel Step") + "</option>"
                        + '</select>'
                        + '<label data-field="post_action_notification_text" class="label-group">'
                        + '<span class="field-label">' + OP3._("Notification Text") + "</span>"
                        + '<input type="text" name="post_action_notification_text" class="input-text" value="' + OP3._("Thanks. You will receive email from us soon!") + '" required />'
                        + '</label>'
                        + '<label data-field="post_action_redirect_url" class="label-group">'
                        + '<span class="field-label">' + OP3._("URL") + "</span>"
                        + '<input type="url" name="post_action_redirect_url" class="input-text" value="" required />'
                        + '</label>'
                        + '<label data-field="post_action_redirect_autofill" class="label-group">'
                        + '<span class="field-label">' + OP3._("Autofill Form Fields") + "</span>"
                        + '<input type="hidden" name="post_action_redirect_autofill" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="post_action_redirect_autofill" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="post_action_popoverlay_trigger" class="label-group">'
                        + '<span class="field-label">' + OP3._("Pop Overlay Trigger") + "</span>"
                        + '<select name="post_action_popoverlay_trigger" required>'
                        + '</select>'
                        + '</label>'
                        + '<label data-field="post_action_funnel_step" class="label-group">'
                        + '<span class="field-label">' + OP3._("Select Specific Funnel Page") + "</span>"
                        + '<select name="post_action_funnel_step" required>'
                        + '</select>'
                        + '</label>'

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="post_action"]')
                        .gridPicker({
                            render: function(node) {
                                var $node = jq(node),
                                    label = $node.text(),
                                    icon = $node.attr("data-icon");

                                return ""
                                    + '<a class="op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                    + '<figure>'
                                    + '<i class="op3-icon ' + icon + '"></i>'
                                    + '</figure>'
                                    + '<span>' + label + '</span>'
                                    + '</a>';
                            },
                        });
                $content
                    .find('select:not([name="post_action"])')
                        .select2({
                            width: "100%",
                            dropdownParent: $content.closest(".op3-wizard"),
                        });
            },

            /**
             * Render step 6
             *
             * @return {Void}
             */
            _renderStep6: function() {
                var jq = window.parent.jQuery,
                    step = 6,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Here's your form setup") + '</p>'
                        + '<div class="op3-wizard-summary">'
                        + '<aside>'
                        // @todo - OP3.Integration.createThumb()???
                        + '<div class="op3-wizard-integration-thumb">'
                        + '<figure>'
                        + '<img data-value-summary="thumb" src="" alt="" />'
                        + '</figure>'
                        + '<span data-value-summary="integration">' + OP3._("My Integration") + '</span>'
                        + '</div>'
                        + '</aside>'
                        + '<article>'
                        + '<div class="op3-wizard-summary-desc">'
                        + '<dl data-field-summary="provider">'
                        + '<dt>' + OP3._("Provider:") + '</dt>'
                        + '<dd data-value-summary="provider">' + OP3._("My Provider") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="admin_email">'
                        + '<dt>' + OP3._("Admin Email:") + '</dt>'
                        + '<dd data-value-summary="admin_email">' + OP3._("My Admin Email") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="list">'
                        + '<dt>' + OP3._("Submit to form:") + '</dt>'
                        + '<dd data-value-summary="list">' + OP3._("My List") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="tag">'
                        + '<dt>' + OP3._("Tags to add:") + '</dt>'
                        + '<dd data-value-summary="tag">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="goal">'
                        + '<dt>' + OP3._("Goal") + ':</dt>'
                        + '<dd data-value-summary="goal">' + OP3._("My Goal") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="form_id">'
                        + '<dt>' + OP3._("Submit to form id:") + '</dt>'
                        + '<dd data-value-summary="form_id">' + OP3._("My Form Id") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="webhook_url">'
                        + '<dt>' + OP3._("Submit to webhook:") + '</dt>'
                        + '<dd data-value-summary="webhook_url">' + OP3._("My Webhook URL") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="double_optin">'
                        + '<dt>' + OP3._("Double Optin:") + '</dt>'
                        + '<dd data-value-summary="double_optin">' + OP3._("My Double Optin") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="fields">'
                        + '<dt>' + OP3._("Fields:") + '</dt>'
                        + '<dd data-value-summary="fields">' + OP3._("My Fields") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_activate">'
                        + '<dt>' + OP3._("Activate GDPR Features:") + '</dt>'
                        + '<dd data-value-summary="gdpr_activate">' + OP3._("My GDPR") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_visible">'
                        + '<dt>' + OP3._("Consent 1:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_visible">' + OP3._("On/Off") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_confirmed">'
                        + '<dt>' + OP3._("Consent 1 Confirmed Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_confirmed">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_declined">'
                        + '<dt>' + OP3._("Consent 1 Declined Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_declined">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_not_shown">'
                        + '<dt>' + OP3._("Consent 1 Not Shown Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_not_shown">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_visible">'
                        + '<dt>' + OP3._("Consent 2:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_visible">' + OP3._("On/Off") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_confirmed">'
                        + '<dt>' + OP3._("Consent 2 Confirmed Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_confirmed">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_declined">'
                        + '<dt>' + OP3._("Consent 2 Declined Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_declined">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_not_shown">'
                        + '<dt>' + OP3._("Consent 2 Not Shown Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_not_shown">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_field_note">'
                        + '<dt>' + OP3._("Field for GDPR note:") + '</dt>'
                        + '<dd data-value-summary="gdpr_field_note">' + OP3._("My Field") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action">'
                        + '<dt>' + OP3._("Optin Form Post Action:") + '</dt>'
                        + '<dd data-value-summary="post_action">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_notification_text">'
                        + '<dt>' + OP3._("Notification Text:") + '</dt>'
                        + '<dd data-value-summary="post_action_notification_text">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_redirect_url">'
                        + '<dt>' + OP3._("Redirect to URL:") + '</dt>'
                        + '<dd data-value-summary="post_action_redirect_url">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_redirect_autofill">'
                        + '<dt>' + OP3._("Autofill Form Fields:") + '</dt>'
                        + '<dd data-value-summary="post_action_redirect_autofill">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_popoverlay_trigger">'
                        + '<dt>' + OP3._("Pop Overlay Trigger:") + '</dt>'
                        + '<dd data-value-summary="post_action_popoverlay_trigger">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_funnel_step">'
                        + '<dt>' + OP3._("Specific Funnel Page:") + '</dt>'
                        + '<dd data-value-summary="post_action_funnel_step">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '</div>'
                        + '</article>'
                        + '</div>';

                jq(html)
                    .appendTo($content);
            },

            /**
             * Pre change event handler:
             * store some form data to data attributes
             * to enable/disable show/hide form
             * elements with css
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerChange: function(data) {
                if (data.disabled)
                    return;

                var props = [
                    "integration",
                    "connection_requirements",
                    "has_lists",
                    "has_webhook_url",
                    "has_tags",
                    "has_goals",
                    "has_gdpr",
                    "has_form_id",
                    "has_double_optin_checkbox",
                    "has_admin_email",
                    "gdpr_notes",
                    "gdpr_tag_source",
                    "list",
                    "webhook_url",
                    "form_id",
                    "double_optin",
                    "admin_email",
                    "tag",
                    "goal",
                    "gdpr_activate",
                    "gdpr_consent1_visible",
                    "gdpr_consent1_tag_confirmed",
                    "gdpr_consent1_tag_declined",
                    "gdpr_consent1_tag_not_shown",
                    "gdpr_consent2_visible",
                    "gdpr_consent2_tag_confirmed",
                    "gdpr_consent2_tag_declined",
                    "gdpr_consent2_tag_not_shown",
                    "gdpr_field_note",
                    "post_action",
                    "post_action_notification_text",
                    "post_action_redirect_url",
                    "post_action_redirect_autofill",
                    "post_action_popoverlay_trigger",
                    "post_action_funnel_step",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-"), data.value || "");

                props = [
                    "fields",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-") + "-count", data.value.length || 0);

                props = [
                    "webhook_url",
                    "admin_email",
                    "post_action_notification_text",
                    "post_action_redirect_url",
                    "post_action_popoverlay_trigger",
                    "post_action_funnel_step",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-") + "-invalid", data.invalid ? "1" : "0");
            },

            /**
             * Pre stepping event handler:
             * skip some steps
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerStepping: function(data) {
                var provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider);

                if (data.step === 2 && data.stepBefore < data.step && integration.connectionRequirements === "none") {
                    this._prepareStep2();
                    return !!this.step(3);
                }
                if (data.step === 2 && data.stepBefore > data.step && integration.connectionRequirements === "none")
                    return !!this.step(1);
                if (data.step === 4 && data.stepBefore < data.step && !integration.hasGdpr) {
                    this._prepareStep4();
                    return !!this.step(5);
                }
                if (data.step === 4 && data.stepBefore > data.step && !integration.hasGdpr)
                    return !!this.step(3);
            },

            /**
             * Pre step event handler:
             * execute _loadStep methods
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerStep: function(data) {
                if (data.stepBefore >= data.step)
                    return;

                var method = "_loadStep" + data.step;
                if (typeof this[method] === "function")
                    this[method](data);
            },

            _loadStep1: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._resetForm();
                this._prepareStep1();
            },

            _prepareStep1: function() {
                var jq = window.parent.jQuery,
                    $input = this.$ui.fields
                        .filter('[name="integration"]')
                            .gridPicker("destroy")
                            .empty(),
                    html = that.data()
                        .filter(function(item) {
                            return item.connected;
                        })
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.provider + '" data-thumb="' + item.image + '">'
                                + item.title
                                + '</option>';
                        })
                        .join(""),
                    value = null
                        || this.$ui.steps.attr("data-integration")
                        || this.form.getOption("optinIntegration", "all")
                        || "";

                $input
                    .append(html)
                    .val(value)
                    .trigger("change")
                    .gridPicker({
                        unselect: true,
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                thumb = $node.attr("data-thumb");

                            return ""
                                + '<a class="op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<img src="' + thumb + '" alt="" />'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep2: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider);

                integration.getDetails(this._prepareStep2.bind(this));
            },

            _prepareStep2: function() {
                var jq = window.parent.jQuery,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider),
                    changed = provider !== this.form.getOption("optinIntegration", "all"),
                    lists = null,
                    tags = null,
                    goals = null;

                this.$ui.fields
                    .filter('[name="admin_email"],[name="list"],[name="tag"],[name="goal"],[name="form_id"],[name="webhook_url"],[name="double_optin"]')
                    .each(function() {
                        var $field = $(this).closest("[data-field]"),
                            field = $field.attr("data-field"),
                            $label = $field.find(".field-label"),
                            label = $label.attr("data-label-default"),
                            prop = ("label_" + field).replace(/_[a-z]/, function(match) {
                                return match.substr(1).toUpperCase();
                            });

                        $label.text(integration[prop] || label);
                    });

                this.$ui.fields
                    .filter('[name="connection_requirements"]')
                        .val(integration.connectionRequirements)
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_admin_email"]')
                        .val(integration.hasAdminEmail ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_lists"]')
                        .val(integration.hasLists ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_tags"]')
                        .val(integration.hasTags ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_goals"]')
                        .val(integration.hasGoals ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_form_id"]')
                    .val(integration.hasFormId ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_webhook_url"]')
                    .val(integration.hasWebhookUrl ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_double_optin_checkbox"]')
                        .val(integration.hasDoubleOptin ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="has_gdpr"]')
                        .val(integration.hasGdpr ? "1" : "0")
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="gdpr_notes"]')
                        .val(integration.gdprNotes)
                        .trigger("change");
                this.$ui.fields
                    .filter('[name="gdpr_tag_source"]')
                        .val(integration.gdprTagSource)
                        .trigger("change");

                // we already fetched details so this won't
                // act as async function
                integration.getLists(function(data) {
                    lists = data;
                });
                integration.getTags(function(data) {
                    tags = data;
                });
                integration.getGoals(function(data) {
                    goals = data;
                });

                // Prepare labels and text
                var desc  = integration.description ? integration.description : OP3._("Depending on your integrated service, you can specify to which list, tag, campaign or webhook your data is sent to.");
                this.$ui.desc
                    .html(desc);

                // set select/input options and value - list
                var $input, html, value;
                $input = this.$ui.fields
                    .filter('[name="list"]')
                        .empty();
                html = [ { id: "", name: "(Please select)" } ]
                    .concat(lists || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinList", "all");
                $input
                    .append(html)
                    .val(value)
                    .trigger("change");

                // set select/input options and value - tag
                $input = this.$ui.fields
                    .filter('[name="tag"]')
                        .empty();
                html = [ { id: "", name: "(Please select)" } ]
                    .concat(tags || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinTag", "all");
                $input
                    .append(html)
                    .val(value)
                    .trigger("change");

                // set select/input options and value - goal
                $input = this.$ui.fields
                    .filter('[name="goal"]')
                        .empty();
                html = [ { id: "", name: "(Please select)" } ]
                    .concat(goals || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinGoal", "all");
                $input
                    .append(html)
                    .val(value)
                    .trigger("change");

                // set select/input options and value - webhookUrl
                $input = this.$ui.fields
                    .filter('[name="webhook_url"]')
                    .empty();
                value = changed ? "" : this.form.getOption("optinWebhookUrl", "all");
                $input
                    .val(value)
                    .trigger("change");

                $input= this.$ui.fields
                    .filter('[name="form_id"]')
                    .empty();
                value = changed ? "" : this.form.getOption("optinFormId", "all");
                $input
                    .val(value)
                    .trigger("change");

                // set select/input options and value - doubleOptin
                $input = this.$ui.fields
                    .filter('input[type="checkbox"][name="double_optin_checkbox"]')
                    .on("change", function() {
                        var $input = $(this)
                            .closest('[data-field="double_optin"]')
                            .find('[name="double_optin"]');
                        var checked = $(this).prop("checked") ? "1" : "0";

                        $input.val(checked);
                    });
                value = changed ? "0" : this.form.getOption("optinDoubleOptin", "all");
                $input
                    .prop("checked", !!parseInt(value, 10))
                    .trigger("change");

                // set select/input options and value - adminEmail
                $input= this.$ui.fields
                    .filter('[name="admin_email"]')
                    .empty();
                value = changed ? this.form.config().options.all.adminEmail : this.form.getOption("adminEmail", "all");
                $input
                    .val(value)
                    .trigger("change");

                // remove loading info
                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep3: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider);

                integration.getFields(list, tag, this._prepareStep3.bind(this));
            },

            _prepareStep3: function() {
                var jq = window.parent.jQuery,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider),
                    fields = null;

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getFields(list, tag, function(data) {
                    fields = data;
                });

                // get active element fields
                var oldFields = this.form.children()
                    .filter(function(item) {
                        var $item = OP3.$(item),
                            type = $item.type(),
                            spec = $item.spec(),
                            invalid = false
                                || type === "button"
                                || spec === "dummy"
                                || spec === "gdpr1"
                                || spec === "gdpr2";

                        return !invalid;
                    })
                    .map(function(item) {
                        var $item = OP3.$(item),
                            name = $item.getOption("name", "all"),
                            alias = this._getFieldNameByAlias(name);

                        return alias;
                    }.bind(this));

                var $input = this.$ui.fields
                    .filter('[name="fields"]')
                        .gridPicker("destroy")
                        .empty();
                var html = (fields || [])
                    .map(function(item) {
                        var selected = false
                            || item.required
                            || (!selected && oldFields.indexOf(this._getFieldNameByAlias(item.id)) !== -1);

                        return ''
                            + '<option value="' + item.id + '" data-required="' + (item.required ? "1" : "0") + '"' + (selected ? " selected" : "") + ' data-hidden="' + (item.type === "hidden" ? "1" : "0") + '">'
                            + (item.label || item.name)
                            + '</option>';
                    }.bind(this));
                $input
                    .append(html)
                    .trigger("change")
                    .gridPicker({
                        unselect: function(node) {
                            return !(jq(node).attr("data-required")*1);
                        },
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                required = $node.attr("data-required"),
                                hidden = $node.attr("data-hidden");

                            return ""
                                + '<a href="#" title="' + label + '" data-required="' + required + '" data-hidden="' + hidden + '">'
                                +     '<i class="op3-icon op3-icon-lock-circle-1 locked"></i>'
                                +     '<i class="op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                                +     '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep4: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._prepareStep4();
            },

            _prepareStep4: function() {
                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider),
                    tags = null,
                    fields = null;

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getTags( function(data) {
                    tags = data;
                });
                integration.getFields(list, tag, function(data) {
                    fields = data;
                });

                var html = "",
                    source = null;
                if (integration.gdprTagSource === "tags")
                    source = tags;
                else if (integration.gdprTagSource === "fields")
                    source = fields;
                if (source)
                    html = [ { id: "", name: "(Please select)" } ]
                        .concat(source)
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.id + '">'
                                + (item.label || item.name)
                                + '</option>';
                        })
                        .join("");
                // @todo - source filter current selected fields only???

                this.$ui.fields
                    .filter('select[name^="gdpr_consent1_tag_"],select[name^="gdpr_consent2_tag_"]')
                        .html(html);
                this.$ui.fields
                    .filter('[name^="gdpr_consent1_tag_"],[name^="gdpr_consent2_tag_"]')
                    .each(function() {
                        var $field = $(this).closest("[data-field]"),
                            $label = $field.find(".field-label"),
                            label = $label.attr("data-label-default"),
                            prop = "labelGdpr";

                        if (integration[prop]) {
                            var temp = label.split(" ");
                            label = temp[0] + " " + integration[prop];
                        }

                        $label.text(label);
                    });

                if (source !== fields)
                    html = [ { id: "", name: "(Please select)" } ]
                        .concat(fields)
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.id + '">'
                                + (item.label || item.name)
                                + '</option>';
                        })
                        .join("");
                this.$ui.fields
                    .filter('[name="gdpr_field_note"]')
                        .html(html);

                // gdpr consent tags from input or select
                this.$ui.fields
                    .filter('input[name^="gdpr_consent1_tag_"],input[name^="gdpr_consent2_tag_"]')
                        .removeAttr("disabled")
                        .attr(!source ? "data-disabled" : "disabled", "")
                        .removeAttr("data-disabled");

                // set default gdpr-activate property
                var value = null;
                if (integration.hasGdpr && !value)
                    value = this.$ui.steps.attr("data-gdpr-activate");
                if (integration.hasGdpr && !value)
                    value = this.form.getOption("optinGdprActivate", "all");
                if (!value)
                    value = "off";
                this.$ui.fields
                    .filter('[name="gdpr_activate"]')
                    .val(value)
                    .trigger("change");

                // set default field/tag properties
                if (value !== "off") {
                    var widget = this;

                    var props = [
                        "gdpr_consent1_visible",
                        "gdpr_consent2_visible",
                    ];
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('input[type="checkbox"][name="' + item + '"]')
                            .prop("checked", function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = null;
                                if (value === null)
                                    value = widget.$ui.steps.is("[" + keyData + "]") ? !!(widget.$ui.steps.attr(keyData)*1) : null;
                                if (value === null)
                                    value = !!
                                        OP3.$(widget.form)
                                            .children()
                                            .filter(function() {
                                                return OP3.$(this).spec() === "gdpr" + item.replace(/\D*/g, "");
                                            })
                                            .length;

                                return value || false;
                            })
                            .trigger("change");
                    });

                    props = [
                        "gdpr_consent1_tag_confirmed",
                        "gdpr_consent1_tag_declined",
                        "gdpr_consent1_tag_not_shown",
                        "gdpr_consent2_tag_confirmed",
                        "gdpr_consent2_tag_declined",
                        "gdpr_consent2_tag_not_shown",
                        "gdpr_field_note",
                    ]
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('select[name="' + item + '"]')
                            .val(function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = "";
                                if (!$(this).is(":disabled")) {
                                    if (!value)
                                        value = widget.$ui.steps.attr(keyData);
                                    if (value && !$(this).find('option[value="' + value + '"]').length)
                                        value = "";
                                    if (!value)
                                        value = widget.form.getOption(keyOption, "all");
                                    if (value && !$(this).find('option[value="' + value + '"]').length)
                                        value = "";
                                }

                                return value;
                            })
                            .trigger("change");
                    });
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('input[name="' + item + '"]')
                            .val(function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = "";
                                if (!$(this).is(":disabled")) {
                                    if (value === "")
                                        value = widget.$ui.steps.attr(keyData);
                                    if (value === "")
                                        value = widget.form.getOption(keyOption, "all");
                                }

                                return value;
                            })
                            .trigger("change");
                    });
                }
                else {
                    this.$ui.fields
                        .filter('input[type="checkbox"][name="gdpr_consent1_visible"],input[type="checkbox"][name="gdpr_consent2_visible"]')
                            .prop("checked", false)
                            .trigger("change");
                    this.$ui.fields
                        .filter('select[name^="gdpr_consent1_tag_"],select[name^="gdpr_consent2_tag_"]')
                            .val("")
                            .trigger("change");
                    this.$ui.fields
                        .filter('input[name^="gdpr_consent1_tag_"],input[name^="gdpr_consent2_tag_"]')
                            .val("")
                            .trigger("change");
                    this.$ui.fields
                        .filter('[name="gdpr_field_note"]')
                            .val("")
                            .trigger("change");
                }

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep5: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._prepareStep5();
            },

            _prepareStep5: function() {
                var $input, value, html,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    changed = provider !== this.form.getOption("optinIntegration", "all");

                $input = this.$ui.fields
                    .filter('[name="post_action"]');
                value = null
                    || this.$ui.steps.attr("data-post-action")
                    || this.form.getOption("optinPostAction", "all")
                    || "notification";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[name="post_action_notification_text"]');
                value = null
                    || this.$ui.steps.attr("data-post-action-notification-text")
                    || this.form.getOption("optinPostActionNotificationText", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[name="post_action_redirect_url"]');
                value = null
                    || this.$ui.steps.attr("data-post-action-redirect-url")
                    || this.form.getOption("optinPostActionRedirectURL", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[type="checkbox"][name="post_action_redirect_autofill"]');
                value = this.$ui.steps.is("[data-post-action-redirect-autofill]") ? !!(this.$ui.steps.attr("data-post-action-redirect-autofill")*1) : !!(this.form.getOption("optinPostActionRedirectAutofill", "all")*1);
                $input
                    .prop("checked", value)
                    .trigger("change");

                // set select/input options and value - post action redirect autofill
                $input = this.$ui.fields
                    .filter('input[type="checkbox"][name="post_action_redirect_autofill"]')
                    .on("change", function() {
                        var $input = $(this)
                            .closest('[data-field="post_action_redirect_autofill"]')
                            .find('[name="post_action_redirect_autofill"]');
                        var checked = $(this).prop("checked") ? "1" : "0";

                        $input.val(checked);
                    });
                value = changed ? "0" : this.form.getOption("optinPostActionRedirectAutofill", "all");
                $input
                    .prop("checked", !!parseInt(value, 10))
                    .trigger("change");

                // Fill popoverlay triggers
                $input = this.$ui.fields
                    .filter('[name="post_action_popoverlay_trigger"]')
                        .empty();
                html = [ { uuid: "", name: "(Please select)" } ]
                    // @todo - refactore OP3.LiveEditor._get_popoverlays()
                    .concat(OP3.LiveEditor._get_popoverlays())
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.uuid + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                $input
                    .append(html);
                value = null
                    || this.$ui.steps.attr("data-post-action-popoverlay-trigger")
                    || this.form.getOption("optinPostActionPopOverlayTrigger", "all")
                    || "";
                if (value && !$input.find('option[value="' + value + '"]').length)
                    value = "";
                $input
                    .val(value)
                    .trigger("change");

                // Fill funnel pages
                if (OP3.Funnels && OP3.Funnels.pages) {
                    $input = this.$ui.fields
                        .filter('[name="post_action_funnel_step"]')
                        .empty();
                    html = [{id: "", title: "(Please select)"}]
                        .concat(OP3.Funnels.pages)
                        .map(function (item, index) {
                            return ''
                                + '<option value="' + (item.id ? index : '') + '">'
                                + (item.title)
                                + '</option>';
                        })
                        .join("");
                    $input
                        .append(html);
                    value = null
                        || this.$ui.steps.attr("data-post-action-funnel-step")
                        || this.form.getOption("optinPostActionFunnelStep", "all")
                        || "";
                    if (value && !$input.find('option[value="' + value + '"]').length)
                        value = "";
                    $input
                        .val(value)
                        .trigger("change");
                }

                // Show "Hide Pop Overlay" option if form is in pop overlay
                if (this.form.path().match(/^\/popoverlay/))
                    this.$ui.element
                        .addClass("op3-wizard-hide-popoverlay-action");
                else
                    this.$ui.element
                        .removeClass("op3-wizard-hide-popoverlay-action");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep6: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                // for better user experience we gonna wait for
                // scroller element to finish transition (start
                // on step 6, not between steps 5 and 6) and
                // add little timeout before start rendering
                // form
                var callback = function() {
                    setTimeout(function() {
                        this._setForm();
                        this._prepareStep6();
                    }.bind(this), 400);
                }.bind(this);

                // wait step to finish transition
                var step = 6,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $scroller = $stepItem.closest(".op3-wizard-steps-scroller"),
                    hasTransition = !!parseFloat($scroller.css("transition-duration"));
                if (hasTransition)
                    $scroller.one("transitionend", callback);
                else
                    callback();
            },

            _prepareStep6: function() {
                var serialize = this.serialize(),
                    provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    goal = this.$ui.steps.attr("data-goal") || "",
                    fields = null,
                    integration = OP3.Integrations.find(provider),
                    thumb = integration.image,
                    webhookUrl = serialize.webhook_url,
                    formId = serialize.form_id,
                    doubleOptin = serialize.double_optin,
                    adminEmail = serialize.admin_email,
                    gdprActivate = serialize.gdpr_activate,
                    gdprConsent1Visible = serialize.gdpr_consent1_visible,
                    gdprConsent1TagConfirmed = serialize.gdpr_consent1_tag_confirmed,
                    gdprConsent1TagDeclined = serialize.gdpr_consent1_tag_declined,
                    gdprConsent1TagNotShown = serialize.gdpr_consent1_tag_not_shown,
                    gdprConsent2Visible = serialize.gdpr_consent2_visible,
                    gdprConsent2TagConfirmed = serialize.gdpr_consent2_tag_confirmed,
                    gdprConsent2TagDeclined = serialize.gdpr_consent2_tag_declined,
                    gdprConsent2TagNotShown = serialize.gdpr_consent2_tag_not_shown,
                    gdprFieldNote = serialize.gdpr_field_note,
                    postAction = serialize.post_action,
                    postActionNotificationText = serialize.post_action_notification_text,
                    postActionRedirectUrl = serialize.post_action_redirect_url,
                    postActionRedirectAutofill = serialize.post_action_redirect_autofill,
                    postActionPopOverlayTrigger = serialize.post_action_popoverlay_trigger,
                    postActionFunnelStep = serialize.post_action_funnel_step;

                // get data from integration (convert id to name)
                provider = integration.title;
                integration.getFields(list, tag, function(data) {
                    fields = data;
                });
                integration.getListDetails(list, function(data) {
                    list = (data ? data.name : null) || "";
                });
                integration.getTagDetails(tag, function(data) {
                    tag = (data ? data.name : null) || "";
                });
                integration.getGoalDetails(goal, function(data) {
                    goal = (data ? data.name : null) || "";
                });

                gdprActivate = this.$ui.fields.filter('[name="gdpr_activate"]').find('option[value="' + gdprActivate + '"]').text();
                gdprConsent1Visible = gdprConsent1Visible*1 ? "On" : "Off";
                if (gdprConsent1TagConfirmed && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagConfirmed, function(data) {
                        gdprConsent1TagConfirmed = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagConfirmed && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagConfirmed, function(data) {
                        gdprConsent1TagConfirmed = (data ? data.label : null) || "";
                    });
                if (gdprConsent1TagDeclined && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagDeclined, function(data) {
                        gdprConsent1TagDeclined = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagDeclined && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagDeclined, function(data) {
                        gdprConsent1TagDeclined = (data ? data.label : null) || "";
                    });
                if (gdprConsent1TagNotShown && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagNotShown, function(data) {
                        gdprConsent1TagNotShown = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagNotShown && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagNotShown, function(data) {
                        gdprConsent1TagNotShown = (data ? data.label : null) || "";
                    });
                gdprConsent2Visible = gdprConsent2Visible*1 ? "On" : "Off";
                if (gdprConsent2TagConfirmed && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagConfirmed, function(data) {
                        gdprConsent2TagConfirmed = (data ? data.name : null) || "";
                    });
                if (gdprConsent2TagDeclined && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagDeclined, function(data) {
                        gdprConsent2TagDeclined = (data ? data.name : null) || "";
                    });
                if (gdprConsent2TagNotShown && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagNotShown, function(data) {
                        gdprConsent2TagNotShown = (data ? data.name : null) || "";
                    });
                if (gdprFieldNote)
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprFieldNote, function(data) {
                        gdprFieldNote = (data ? data.label : null) || "";
                    });
                postAction = this.$ui.fields.filter('[name="post_action"]').find('option[value="' + postAction + '"]').text();
                if (postActionRedirectUrl)
                    postActionRedirectUrl = '<a target="_blank" href="' + postActionRedirectUrl + '">' + postActionRedirectUrl + '</a>';
                postActionRedirectAutofill = postActionRedirectAutofill*1 ? "On" : "Off";
                if (postActionPopOverlayTrigger)
                    postActionPopOverlayTrigger = this.$ui.fields.filter('[name="post_action_popoverlay_trigger"]').find('option[value="' + postActionPopOverlayTrigger + '"]').text();
                if (postActionFunnelStep)
                    postActionFunnelStep = this.$ui.fields.filter('[name="post_action_funnel_step"]').find('option[value="' + postActionFunnelStep + '"]').text();

                this.$ui.valueSummary
                    .filter('[data-value-summary="thumb"]')
                        .attr("src", thumb);
                this.$ui.valueSummary
                    .filter('[data-value-summary="integration"],[data-value-summary="provider"]')
                        .text(provider);
                this.$ui.valueSummary
                    .filter('[data-value-summary="list"]')
                        .text(list);
                this.$ui.valueSummary
                    .filter('[data-value-summary="tag"]')
                        .text(tag);
                this.$ui.valueSummary
                    .filter('[data-value-summary="goal"]')
                        .text(goal);
                this.$ui.valueSummary
                    .filter('[data-value-summary="webhook_url"]')
                    .html('<a href="' + webhookUrl + '" target="_blank">' + webhookUrl + '</a>');
                this.$ui.valueSummary
                    .filter('[data-value-summary="form_id"]')
                    .text(formId);
                this.$ui.valueSummary
                    .filter('[data-value-summary="double_optin"]')
                    .text(doubleOptin === "1" ? OP3._("On") : OP3._("Off"));
                this.$ui.valueSummary
                    .filter('[data-value-summary="admin_email"]')
                    .html('<a href="mailto:' + adminEmail + '">' + adminEmail + '</a>');
                this.$ui.valueSummary
                    .filter('[data-value-summary="fields"]')
                        .html(function() {
                            var result = "";
                            fields
                                .filter(function(item) {
                                    return serialize.fields.indexOf(item.id) !== -1;
                                })
                                .forEach(function(item) {
                                    result += ""
                                        + '<li data-required="' + (item.required ? "1" : "0") + '" data-hidden="' + (item.type === "hidden" ? "1" : "0") + '">'
                                        +     '<span>' + (item.label || item.name) + '</span>'
                                        +     '<i class="op3-icon op3-icon-lock-circle-1 locked"></i>'
                                        +     '<i class="op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                                        + '</li>'
                                });
                            if (result)
                                result = "<ul>" + result + "</ul>";

                            return result;
                        });
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_activate"]')
                        .text(gdprActivate);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_visible"]')
                        .text(gdprConsent1Visible);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_confirmed"]')
                        .text(gdprConsent1TagConfirmed);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_declined"]')
                        .text(gdprConsent1TagDeclined);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_not_shown"]')
                        .text(gdprConsent1TagNotShown);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_visible"]')
                        .text(gdprConsent2Visible);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_confirmed"]')
                        .text(gdprConsent2TagConfirmed);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_declined"]')
                        .text(gdprConsent2TagDeclined);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_not_shown"]')
                        .text(gdprConsent2TagNotShown);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_field_note"]')
                        .text(gdprFieldNote);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action"]')
                        .text(postAction);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_notification_text"]')
                        .text(postActionNotificationText);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_redirect_url"]')
                        .html(postActionRedirectUrl);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_redirect_autofill"]')
                        .text(postActionRedirectAutofill);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_popoverlay_trigger"]')
                        .text(postActionPopOverlayTrigger);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_funnel_step"]')
                    .text(postActionFunnelStep);

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _renderError: function(data) {
                throw data;
            },

            _resetForm: function() {
                var element = this.form,
                    data = {
                        integration: element.getOption("optinIntegration", "all"),
                        admin_email: element.getOption("adminEmail", "all"),
                        list: element.getOption("optinList", "all"),
                        tag: element.getOption("optinTag", "all"),
                        goal: element.getOption("optinGoal", "all"),
                        webhook_url: element.getOption("optinWebhookUrl", "all"),
                        form_id: element.getOption("optinFormId", "all"),
                        double_optin: element.getOption("optinDoubleOptin", "all"),
                        post_action: element.getOption("optinPostAction", "all"),
                        post_action_notification_text: element.getOption("optinPostActionNotificationText", "all"),
                        post_action_redirect_url: element.getOption("optinPostActionRedirectURL", "all"),
                        post_action_redirect_autofill: element.getOption("optinPostActionRedirectAutofill", "all"),
                        post_action_popoverlay_trigger: element.getOption("optinPostActionPopOverlayTrigger", "all"),
                        post_action_funnel_step: element.getOption("optinPostActionFunnelStep", "all"),
                        gdpr_activate: element.getOption("optinGdprActivate", "all"),
                        gdpr_consent1_tag_confirmed: element.getOption("optinGdprConsent1TagConfirmed", "all"),
                        gdpr_consent1_tag_declined: element.getOption("optinGdprConsent1TagDeclined", "all"),
                        gdpr_consent1_tag_not_shown: element.getOption("optinGdprConsent1TagNotShown", "all"),
                        gdpr_consent2_tag_confirmed: element.getOption("optinGdprConsent2TagConfirmed", "all"),
                        gdpr_consent2_tag_declined: element.getOption("optinGdprConsent2TagDeclined", "all"),
                        gdpr_consent2_tag_not_shown: element.getOption("optinGdprConsent2TagNotShown", "all"),
                        gdpr_field_note: element.getOption("optinGdprFieldNote", "all"),
                    };

                // set fields to initial values
                for (var prop in data) {
                    this.$ui.fields
                        .filter('[name="' + prop + '"]')
                        .val(data[prop])
                        .trigger("change");
                }
            },

            _setForm: function() {
                var element = this.form,
                    data = this.serialize(),
                    provider = data.integration,
                    integration = that.find(provider),
                    fields = null;

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getFields(data.list || "", data.tag || "", function(data) {
                    fields = data;
                });

                // set form element properties
                OP3.$(element)
                    .setOption("optinIntegration", data.integration, "all")
                    .setOption("adminEmail", data.admin_email, "all")
                    .setOption("optinList", data.list, "all")
                    .setOption("optinTag", data.tag, "all")
                    .setOption("optinGoal", data.goal, "all")
                    .setOption("optinWebhookUrl", data.webhook_url, "all")
                    .setOption("optinFormId", data.form_id, "all")
                    .setOption("optinDoubleOptin", data.double_optin, "all")
                    .setOption("optinPostAction", data.post_action, "all")
                    .setOption("optinPostActionNotificationText", data.post_action_notification_text, "all")
                    .setOption("optinPostActionRedirectURL", data.post_action_redirect_url, "all")
                    .setOption("optinPostActionRedirectAutofill", data.post_action_redirect_autofill, "all")
                    .setOption("optinPostActionPopOverlayTrigger", data.post_action_popoverlay_trigger || "", "all")
                    .setOption("optinPostActionFunnelStep", data.post_action_funnel_step || "", "all")
                    .setOption("optinGdprActivate", data.gdpr_activate, "all")
                    .setOption("optinGdprConsent1TagConfirmed", data.gdpr_consent1_tag_confirmed, "all")
                    .setOption("optinGdprConsent1TagDeclined", data.gdpr_consent1_tag_declined, "all")
                    .setOption("optinGdprConsent1TagNotShown", data.gdpr_consent1_tag_not_shown, "all")
                    .setOption("optinGdprConsent2TagConfirmed", data.gdpr_consent2_tag_confirmed, "all")
                    .setOption("optinGdprConsent2TagDeclined", data.gdpr_consent2_tag_declined, "all")
                    .setOption("optinGdprConsent2TagNotShown", data.gdpr_consent2_tag_not_shown, "all")
                    .setOption("optinGdprFieldNote", data.gdpr_field_note, "all");

                // empty form (leave button)
                OP3.$(element)
                    .children()
                        .each(function(index, node) {
                            var $item = OP3.$(node);
                            if ($item.type() === "button" || $item.spec() === "dummy")
                                return;

                            this._saveFieldData(node);
                            $item.detach();
                        }.bind(this));

                // prepend gdpr fields
                if (data.gdpr_activate !== "off") {
                    if (!!(data.gdpr_consent2_visible*1)) {
                        var field = OP3.$('<checkbox spec="gdpr2" />')
                            .prependTo(element)
                            .setOption("typeAttr", "checkbox", "all")
                            .setOption("visible", "1", "all")
                            .setOption("visibleLock", "1", "all")
                            .setOption("required", "0", "all")
                            //.setOption("requiredLock", "1", "all")
                            .setOption("name", "optin-gdpr-consent-2", "all")
                            .setOption("html", "<div>GDPR Consent 2 Message</div>", "all")
                            .setOption("value", "1", "all");

                        this._loadFieldData(field);
                    }
                    if (!!(data.gdpr_consent1_visible*1)) {
                        var field = OP3.$('<checkbox spec="gdpr1" />')
                            .prependTo(element)
                            .setOption("typeAttr", "checkbox", "all")
                            .setOption("visible", "1", "all")
                            .setOption("visibleLock", "1", "all")
                            .setOption("required", "0", "all")
                            //.setOption("requiredLock", "1", "all")
                            .setOption("name", "optin-gdpr-consent-1", "all")
                            .setOption("html", "<div>GDPR Consent 1 Message</div>", "all")
                            .setOption("value", "1", "all");

                        this._loadFieldData(field);
                    }
                }

                // filter selected, sort, reverse, iterate
                // and prepend fields to form
                fields
                    .filter(function(item) {
                        return data.fields.indexOf(item.id) !== -1;
                    })
                    .sort(function(a, b) {
                        return a.order - b.order;
                    })
                    .reverse()
                    .forEach(function(item) {
                        // @todo - child type
                        // (only input and checkbox for now)
                        var selector = null;
                        var type = "text";
                        if (item.type === "hidden")
                            selector = 'input spec="hidden"';
                        else if (item.type === "text")
                            selector = "input";
                        else if (item.type === "email") {
                            selector = "input";
                            type = "email";
                        }
                        else if (item.type === "checkbox") {
                            selector = "checkbox";
                            type = "checkbox";
                        }
                        if (!selector)
                            return;

                        // prepend new field and set properties
                        var field = OP3.$("<" + selector + " />")
                            .prependTo(element)
                            .setOption("typeAttr", type, "all")
                            .setOption("visible", item.type !== "hidden" ? "1" : "0", "all")
                            .setOption("visibleLock", item.required ? "1" : "0", "all")
                            .setOption("required", item.required ? "1" : "0", "all")
                            .setOption("requiredLock", item.required ? "1" : "0", "all")
                            .setOption("name", (item.id || ""), "all")
                            .setOption("html", "<div>" + (item.label || "<br />") + "</div>", "all")
                            .setOption("placeholder", ("Enter your " + (item.label ? item.label.toLowerCase() : "")), "all")
                            .setOption("op3Icon", this._getFieldIcon(item.id), "all")
                            .setOption("value", (item.value || ""), "all");

                        this._loadFieldData(field);
                    }.bind(this));

                OP3.transmit("elementoptionsrefreshrequest", { property: [ "children" ] });
                OP3.transmit("integrationformreset", { node: element.node() });
            },

            _handleAddNewIntegrationClick: function(e) {
                var node = this.$ui.element.get(0),
                    doc = node.ownerDocument,
                    jq = doc.defaultView.jQuery;

                // the link click will open new tab with integrations
                // to edit. we will reload our integrations when our
                // tab gets focus back. we need a little timeout to
                // make sure new tab is opened. not the ideal way
                // to handle integration changes, but...
                setTimeout(function(wizard) {
                    if (doc.hidden)
                        jq(doc).one("visibilitychange", function(e) {
                            wizard.$ui.element
                                .addClass("op3-wizard-loading");

                            that.refresh(wizard._prepareStep1.bind(wizard));
                        });
                }, 500, this);
            },
        },
    });

    /**
     * window.OP3.Integrations object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Integration data
         *
         * @type {Object}
         */
        _data: null,

        /**
         * Pending flag
         *
         * @type {Boolean}
         */
        _pending: false,

        /**
         * Query jobs
         *
         * @type {Array}
         */
        _queue: [],

        _appendToQueue: function(method, args, callback) {
            var queue = [ method, args, callback ];
            that._queue.push(queue);

            that._startQueueJob();
        },

        _startQueueJob: function() {
            if (!that._queue.length || that._pending)
                return;

            that._pending = true;

            var queue = that._queue.shift(),
                method = queue[0],
                args = queue[1],
                callback = queue[2],
                decorator = function() {
                    that._pending = false;
                    that._startQueueJob();

                    that._callback(callback, arguments);
                };

            args.push(decorator);
            if (typeof that[method] === "function")
                that[method].apply(that, args);
            else
                that._callback(callback);
        },

        _callback: function(callback, args) {
            if (typeof callback !== "function")
                return;

            callback.apply(that, args || []);
        },

        _requestInitial: function(callback) {
            that._data = [];

            return OP3.Ajax.request({
                url: "optin/integrations/all/" + OP3.Meta.pageId,
                success: function(response, textStatus, jqXHR) {
                    that._data = response.data;
                    that._callback(callback, [ that.data() ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestConnected: function(callback) {
            return OP3.Ajax.request({
                url: "optin/integrations/connected",
                success: function(response, textStatus, jqXHR) {
                    var providers = response.data
                        .filter(function(item) {
                            return item.connected;
                        })
                        .map(function(item) {
                            return item.provider;
                        });

                    // iterate integration and find connected status changes
                    that._data.forEach(function(item, index) {
                        var newIndex = providers.indexOf(item.provider);

                        // integration disconnected
                        if (newIndex === -1 && item.connected)
                            that._data[index].connected = false;

                        // integration connected
                        else if (newIndex !== -1 && !item.connected)
                            that._data[index].connected = true;
                    });

                    that._callback(callback, [ that.data() ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestRefresh: function(callback) {
            if (that._data)
                return that._requestConnected(callback)
            else
                return that._requestInitial(callback)
        },

        _requestDetails: function(provider, callback) {
            var integration = that.find(provider);
            if (!integration.exists)
                return that._callback(callback, [ null ]);

            var data = that._data[integration._index],
                request = false
                    || ((data.connection_requirements || "none") === "none" && !data.fields)
                    || ((data.connection_requirements || "none") === "admin_email" && !data.fields)
                    || (data.has_lists && !data.lists)
                    || (data.has_tags && !data.tags)
                    || (data.has_goals && !data.goals)
                    || (data.has_webhhok_url);

            if (!request)
                return that._callback(callback, [ integration ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider,
                success: function(response, textStatus, jqXHR) {
                    that._data[integration._index] = response.data;
                    that._callback(callback, [ integration ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestListDetails: function(provider, list, callback) {
            var index = this.index(provider, list);
            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index[0]].lists[index[1]].fields;
            if (data)
                return that._callback(callback, [ data ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/fields/" + list,
                success: function(response, textStatus, jqXHR) {
                    that._data[index[0]].lists[index[1]].fields = response.data;
                    that._callback(callback, [ that._data[index[0]].lists[index[1]].fields ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestAllFields: function(provider, callback) {
            var index = this.index(provider);

            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index].fields;
            if (data)
                return that._callback(callback, [ data ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/fields/all",
                success: function(response, textStatus, jqXHR) {
                    that._data[index].fields = response.data;
                    that._callback(callback, [ that._data[index].fields ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestFields: function(provider, list, tag, callback) {
            that._requestDetails(provider, function(item) {
                if (item.connectionRequirements === "none")
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "admin_email")
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "list" && list)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "list_or_tag" && list)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "list_or_tag" && !list && tag)
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "tag" && tag)
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "webhook_url") {
                    return that._requestAllFields(provider, callback);
                }
                else
                    return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get list of OP3_Integration objects
         *
         * @return {Array}
         */
        data: function() {
            if (!that._data)
                return that._data;

            return that._data.map(function(item, index) {
                return new OP3_Integration(index);
            });
        },

        /**
         * Search for integration (from config)
         * by it's uid/provider/title and return it's
         * _config index
         *
         * Addition: list argument (result is array
         * of integration/list indexes)
         *
         * @param  {String} provider (optional)
         * @param  {String} list        (optional)
         * @return {Number}
         */
        index: function(provider, list) {
            var re = /[\W_]+/g;
            var id = provider ? provider.toString().replace(re, "_").toLowerCase() : null;
            var result = -1;

            if (that._data && provider) {
                for (var i = 0; i < that._data.length; i++) {
                    if (that._data[i].uid !== null && that._data[i].uid.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                    if (that._data[i].provider !== null && that._data[i].provider.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                    if (that._data[i].title !== null && that._data[i].title.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                }
            }
            if (that._data && provider && list) {
                result = [ result, -1 ];
                if (that._data[result[0]].lists)
                    for (var i = 0; i < that._data[result[0]].lists.length; i++) {
                        if (that._data[result[0]].lists[i].id == list) {
                            result[1] = i;
                            break;
                        }
                    }
            }

            return result;
        },

        /**
         * Search for integration (from
         * that._data) by it's id/title
         * and return  OP3_Integration
         * object
         *
         * @param  {String} provider
         * @return {Object}
         */
        find: function(provider) {
            return new OP3_Integration(that.index(provider));
        },

        /**
         * Get integration list
         *
         * @param  {Function} callback
         * @return {Void}
         */
        refresh: function(callback) {
            that._appendToQueue("_requestRefresh", [], callback);
        },

        /**
         * Get integration details
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getDetails: function(provider, callback) {
            that._appendToQueue("_requestDetails", [ provider ], callback);
        },

        /**
         * Get integration lists
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getLists: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].lists || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration tags
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getTags: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].tags || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration goals
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getGoals: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].goals || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration fields for
         * selected list and tag
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   tag
         * @param  {Function} callback
         * @return {Void}
         */
        getFields: function(provider, list, tag, callback) {
            that._appendToQueue("_requestFields", [ provider, list, tag ], callback);
        },

        /**
         * Get integration list detail
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {Function} callback
         * @return {Void}
         */
        getListDetails: function(provider, list, callback) {
            that.getLists(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (list == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration tag detail
         *
         * @param  {String}   provider
         * @param  {String}   tag
         * @param  {Function} callback
         * @return {Void}
         */
        getTagDetails: function(provider, tag, callback) {
            that.getTags(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (tag == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration field detail
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   tag
         * @param  {String}   field
         * @param  {Function} callback
         * @return {Void}
         */
        getFieldDetails: function(provider, list, tag, field, callback) {
            that.getFields(provider, list, tag, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (field == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration goal detail
         *
         * @param  {String}   provider
         * @param  {String}   goal
         * @param  {Function} callback
         * @return {Void}
         */
        getGoalDetails: function(provider, goal, callback) {
            that.getGoals(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (goal == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Ajax request error event handler:
         * emit error
         *
         * @param  {Object} jqXHR
         * @param  {String} textStatus
         * @param  {String} errorThrown
         * @return {Void}
         */
        _handleAjaxError: function(jqXHR, textStatus, errorThrown) {
            // @todo???
        },

        /**
         * Integration wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_Integrations_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            var wizard = that.wizard();
            wizard.form = OP3.Designer.activeElement();
            if (!wizard.form)
                return;

            wizard.step(0);
            wizard.step(1);
            wizard.show();
        },

    }

    // globalize (designer)
    window.OP3.Integrations = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Integrations = that;
    });

    // import integrations from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._data = o.integrations;
    });

    // show wizard on .op3-wizard-integration-trigger click
    $(window.parent.document)
        .on("click", ".op3-wizard-integration-trigger", function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
