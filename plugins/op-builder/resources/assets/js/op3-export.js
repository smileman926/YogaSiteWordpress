/**
 * OptimizePress3 live editor extension:
 * export
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-meta.js
 *     - op3-lang.js
 *     - op3-ui.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_Export_Wizard = OP3.defineClass({

        Name: "OP3.Export.Wizard",

        Extends: window.OP3.Wizard,

        Constructor: function() {
            window.OP3.Wizard.call(this, this._steps);

            this.$ui.element
                .addClass("op3-wizard-export")
                .addClass("op3-wizard-disable-nav-item-link-click");
            this.attach(window.document.body);
        },

        Prototype: {

            /**
             * Current element getter
             *
             * @return {OP3.Element}
             */
            get element() {
                return this._element || null;
            },

            /**
             * Current element setter
             *
             * @param  {Mixed} value
             * @return {Void}
             */
            set element(value) {
                if (value !== OP3.Document) {
                    value = OP3.$(value).element();
                    if (value && value.type() !== "section")
                        value = null;
                }

                this._element = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function() {
                if (!this.element)
                    throw "OP3.Wizard.Export: element must be set before displaying wizard.";

                window.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function() {
                window.OP3.Wizard.prototype.close.call(this);

                this.element = null;

                this.$ui.element
                    .removeClass("op3-wizard-export-document")
                    .removeClass("op3-wizard-export-section");
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Export",
                    navIcon: "op3-icon-share-66-1",
                    title: "Export",
                    content: "",
                    buttons: [
                        {
                            label: "Submit",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Complete",
                    navIcon: "op3-icon-check-bold-1",
                    title: "Complete",
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
             * Pre step event handler:
             * execute _loadStep methods
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerStep: function(data) {
                var method = "_loadStep" + data.step;
                if (typeof this[method] === "function")
                    this[method](data);
            },

            /**
             * Render each step
             *
             * @return {Void}
             */
            _renderSteps: function() {
                window.OP3.Wizard.prototype._renderSteps.call(this);

                this._renderStep1();
                this._renderStep2();

                this.$ui.error = this.$ui.steps.find(".error-message");
                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.fieldTitle = this.$ui.fields.filter('[name="title"]');
                this.$ui.fieldDescription = this.$ui.fields.filter('[name="description"]');
                this.$ui.fieldStyleLight = this.$ui.fields.filter('[name="style"][value="light"]');
                this.$ui.fieldStyleDark = this.$ui.fields.filter('[name="style"][value="dark"]');
                this.$ui.fieldPreview = this.$ui.fields.filter('[name="preview"]');
                this.$ui.imagePreview = this.$ui.steps.find(".op3-wizard-preview img");
                this.$ui.message = this.$ui.steps.find(".op3-wizard-message");

                // set image preview library and link
                // it's source with preview field
                this.$ui.imagePreview
                    .on("base64imagepreviewchange", function(e) {
                        var value = $(e.target).attr("src");
                        if (value === this.$ui.fieldPreview.val())
                            return;

                        this.$ui.fieldPreview
                            .val(value)
                            .trigger("change");
                    }.bind(this))
                    .base64ImagePreview({
                        accept: "image/jpeg,image/png",
                        title: OP3._("Drop image file here or click to choose file"),
                    });

                this.$ui.fieldPreview
                    .on("change", function(e) {
                        this.$ui.imagePreview.base64ImagePreview("value", $(e.target).val());
                    }.bind(this));

                // disable drop on wizard element
                this.$ui.element
                    .on("dragover", function(e) {
                        if (/jquery-base64-image-preview/.test(e.target.className))
                            return;

                        e.preventDefault();
                        e.originalEvent.dataTransfer.dropEffect = "none";
                    });
            },

            _renderStep1: function() {
                var step = 1,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p class="error-message"></p>'
                        + '<label data-field="title" class="label-group">'
                        + '<span class="field-label">' + OP3._("Title") + '</span>'
                        + '<input type="text" name="title" class="input-text" value="" max-length="64" required />'
                        + '</label>'
                        + '<label data-field="description" class="label-group">'
                        + '<span class="field-label">' + OP3._("Description") + '</span>'
                        + '<input type="text" name="description" class="input-text" max-length="512" value="" />'
                        + '</label>'
                        + '<div data-field="style" class="label-group">'
                        + '<span class="field-label">' + OP3._("Style") + '</span>'
                        + '<div class="input-radio">'
                        + '<label>'
                        + '<input type="radio" name="style" value="light" />'
                        + '<span>' + OP3._("Light") + '</span>'
                        + '</label>'
                        + '</div>'
                        + '<div class="input-radio">'
                        + '<label>'
                        + '<input type="radio" name="style" value="dark" />'
                        + '<span>' + OP3._("Dark") + '</span>'
                        + '</label>'
                        + '</div>'
                        + '</div>'
                        + '<label data-field="preview" class="label-group">'
                        + '<span class="field-label">' + OP3._("Preview") + '</span>'
                        + '<input type="text" name="preview" class="input-text" value="" />'
                        + '<div class="op3-wizard-preview">'
                        + '<img src="" alt="" />'
                        + '</div>'
                        + '</label>';

                $(html)
                    .appendTo($content);
            },

            _loadStep1: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading")
                    .addClass("op3-wizard-disable-close");

                this.$ui.stepsItem
                    .eq(0)
                    .find(".op3-wizard-steps-item-content")
                    .scrollTop(0);

                try {
                    that._check(this.element);
                }
                catch(e) {
                    this._prepareStep1({ error: e });
                    return;
                }

                var element = this.element,
                    width = element === OP3.Document ? 800 : 400,
                    contentType = "image/jpeg",
                    success = function(img) {
                        this._renderExportImage(img, width, contentType, this._prepareStep1);
                    }.bind(this),
                    error = function(e) {
                        this._renderExportImage(null, width, contentType, this._prepareStep1);
                    }.bind(this);

                if (element === OP3.Document)
                    OP3.Screenshot.customTemplate(width, contentType, success, error);
                else
                    OP3.Screenshot.customElement(element, width, contentType, success, error);
            },

            _prepareStep1: function(data) {
                if (data) {
                    var title = OP3._("Export"),
                        element = this.element,
                        type = element ? element.type() : "",
                        uuid = element.uuid(),
                        error = data.error,
                        label = element.title(),
                        description = "",
                        preview = data.src;

                    if (type === "document")
                        title = OP3._("Export Template");
                    else if (type === "section")
                        title = OP3._("Export Section");

                    if (error) {
                        error = error.replace(/^OP3\.Export\s\-\s*/, "");
                        error = error.charAt(0).toUpperCase() + error.slice(1);
                    }

                    this.$ui.element
                        .removeClass("op3-wizard-export-document")
                        .removeClass("op3-wizard-export-section")
                        .removeClass("op3-wizard-export-error")
                        .addClass(type ? "op3-wizard-export-" + type : "_temp")
                        .addClass(error ? "op3-wizard-export-error" : "_temp")
                        .removeClass("_temp");

                    this.$ui.stepsItem.eq(0)
                        .find(".op3-wizard-steps-item-header")
                        .find("h1,h2,h3,h4,h5,h6")
                        .first()
                            .text(title);

                    this.$ui.error
                        .text(error);

                    this.$ui.fieldTitle
                        .val(label)
                        .trigger("change");
                    this.$ui.fieldDescription
                        .val(description)
                        .trigger("change");
                    this.$ui.fieldStyleLight
                        .prop("checked", true)
                        .trigger("change");
                    this.$ui.fieldPreview
                        .val(preview)
                        .trigger("change");
                }

                this.$ui.element
                    .removeClass("op3-wizard-disable-close")
                    .removeClass("op3-wizard-loading");
            },

            _renderStep2: function() {
                var step = 2,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $header = $stepItem.find(".op3-wizard-steps-item-header"),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p class="op3-wizard-message"></p>';

                $(html)
                    .appendTo($content);
            },

            _loadStep2: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var serialize = this.serialize(),
                    element = this.element,
                    callback = this._prepareStep2.bind(this);

                if (element === OP3.Document)
                    OP3.Export.template(serialize, callback);
                else
                    OP3.Export.block(element, serialize, callback);
            },

            _prepareStep2: function(data) {
                this.$ui.message
                    .text(data.message);

                if (data.redirect) {
                    setTimeout(function() {
                        if (data.target === "_parent" || data.target === "_top")
                            window.parent.open(data.redirect, "_self");
                        else
                            window.open(data.redirect, data.target || "_blank");
                    }, data.timeout || 0);
                }

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            /**
             * Render export image
             *
             * Create screenshot callback:
             * replace image with default placeholder
             * on fail (safari browser fallback)
             *
             * @param  {Image}    srcImage
             * @param  {Number}   size
             * @param  {String}   contentType
             * @param  {Function} callback
             * @return {Void}
             */
            _renderExportImage: function(srcImage, size, contentType, callback) {
                if (srcImage && srcImage.src && srcImage.width && srcImage.height)
                    callback.call(this, srcImage);
                else
                    OP3.Screenshot.placeholder(size, contentType, callback.bind(this));
            },

        },

    });

    /**
     * window.OP3.Export object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Post export data to api
         *
         * @param  {OP3_Element} element
         * @param  {Object}      data
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        _request: function(element, data, callback) {
            that._check();

            var json = {
                page_id: OP3.Meta.pageId,
                element_id: element.uuid() || null,
                title: data.title || "",
                description: data.description || "",
                style: data.style || "",
                preview: data.preview || null,
            };

            OP3.Ajax.request({
                url: "export",
                method: "post",
                data: JSON.stringify(json),
                success: function(response, textStatus, jqXHR) {
                    if (typeof callback === "function")
                        callback.call(that, response.data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // @todo
                    throw "OP3.Export - " + errorThrown;
                },
            });
        },

        /**
         * Check if element can be exported
         *
         * @param  {Mixed} element
         * @return {Void}
         */
        _check: function(element) {
            if (element && element !== OP3.Document) {
                if (!OP3.$.closest(element).closest("section").element())
                    throw "OP3.Export - element must be of type section";
            }

            //if (element && element !== OP3.Document) {
            //    OP3.$.closest(element).find("form").each(function() {
            //        if (OP3.$(this).getOption("optinIntegration", "all") !== "email")
            //            throw "OP3.Export - exporting form with non-email integration is not allowed";
            //    });
            //}

            //if (!element || element === OP3.Document) {
            //    OP3.$("form").each(function() {
            //        if (OP3.$(this).getOption("optinIntegration", "all") !== "email")
            //            throw "OP3.Export - exporting form with non-email integration is not allowed";
            //    });
            //}
        },

        /**
         * Export template
         *
         * @param  {Object}   data
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        template: function(data, callback) {
            that._request(OP3.Document, data, callback);
        },

        /**
         * Export block
         *
         * @param  {OP3_Element} element
         * @param  {Object}      data
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        block: function(element, data, callback) {
            element = OP3.$.closest(element).closest("section").element();
            that._request(element, data, callback);
        },

        /**
         * Export wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_Export_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            if (OP3.Designer.changed()) {
                var title = OP3._("Export");
                var message = OP3._("Your document has not been saved. Please make sure you save the page before exporting.");

                return OP3.UI.alert(title, message);
            }

            var wizard = that.wizard();
            wizard.element = OP3.Designer.activeElement();
            if (!wizard.element)
                return;

            wizard.step(0);
            wizard.step(1);
            wizard.show();
        },

    }

    // globalize
    window.OP3.Export = that;

    // link designer
    OP3.bind("load::designer", function(e, o) {
        e.origin.Export = that;
    });

    // show wizard on .op3-wizard-export-trigger click
    $(window.document)
        .on("click", '.op3-element-options-property[data-op3-element-options-property-id="export"] .op3-property-type-execute', function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
