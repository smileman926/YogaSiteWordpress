;(function() {

    "use strict";

    var OP3_GlobalElements_Wizard = OP3.defineClass({

        Name: "OP3.GlobalElements.Wizard",

        Extends: window.parent.OP3.Wizard,

        Constructor: function() {
            window.parent.OP3.Wizard.call(this, this._steps);

            this.$ui.element
                .addClass("op3-wizard-global-elements")
                .addClass("op3-wizard-disable-nav-item-link-click");
            this.attach(window.parent.document.body);
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
                value = OP3.$(value).element();
                if (!value)
                    return;

                this._element = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function() {
                if (!this.element)
                    throw "OP3.Wizard.GlobalElements: element must be set before displaying wizard.";

                window.parent.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function() {
                window.parent.OP3.Wizard.prototype.close.call(this);

                this.element = null;
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Global Element",
                    navIcon: "op3-icon-globe-1",
                    title: "Global Element",
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
             * Pre change event handler:
             * store some form data to data attributes
             * to enable/disable show/hide form
             * elements with css
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerChange: function(data) {
                if (data.key !== "title")
                    return;

                this.$ui.steps.attr("data-title", data.value || "");
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

                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.fieldTitle = this.$ui.fields.filter('[name="title"]');
                this.$ui.fieldDescription = this.$ui.fields.filter('[name="description"]');
                //this.$ui.fieldCategory = this.$ui.fields.filter('[name="category"]');
                this.$ui.fieldPreview = this.$ui.fields.filter('[name="preview"]');
                this.$ui.imagePreview = this.$ui.steps.find(".op3-wizard-preview img");
                this.$ui.summary = this.$ui.steps.find("[data-value-summary]");
                this.$ui.summaryTitle = this.$ui.summary.filter('[data-value-summary="title"]');
                this.$ui.summaryDescription = this.$ui.summary.filter('[data-value-summary="description"]');
                //this.$ui.summaryCategory = this.$ui.summary.filter('[data-value-summary="category"]');
                this.$ui.summaryThumb = this.$ui.summary.filter('[data-value-summary="thumb"]');
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
                        + '<p class="op3-wizard-message"></p>'
                        + '<label data-field="title" class="label-group">'
                        + '<span class="field-label">' + OP3._("Title") + '</span>'
                        + '<input type="text" name="title" class="input-text" value="" max-length="64" required />'
                        + '</label>'
                        + '<label data-field="description" class="label-group">'
                        + '<span class="field-label">' + OP3._("Description") + '</span>'
                        + '<input type="text" name="description" class="input-text" max-length="512" value="" />'
                        + '</label>'
                        //+ '<label data-field="category" class="label-group">'
                        //+ '<span class="field-label">' + OP3._("Category") + '</span>'
                        //+ '<input type="text" name="category" class="input-text" value="" max-length="64" required />'
                        //+ '</label>'
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

                // can element be global?
                var element = OP3.$(this.element),
                    error = "";
                if (!error && element.parent().closest("*[gid]").length)
                    error = "Can not set element as global (is global element child)";
                if (!error && element.find("*[gid]").length)
                    error = "Can not set element as global (has global element child)";
                if (error)
                    return this._prepareStep1(error);

                var width = 400,
                    contentType = "image/jpeg",
                    success = function(img) {
                        this._renderExportImage(img, width, contentType, this._prepareStep1);
                    }.bind(this),
                    error = function(e) {
                        this._renderExportImage(null, width, contentType, this._prepareStep1);
                    }.bind(this);

                OP3.Screenshot.customElement(this.element, width, contentType, success, error);
            },

            _prepareStep1: function(data) {
                var message = "",
                    label = "",
                    description = "",
                    //category = "",
                    preview = "";

                if (data && typeof data === "object") {
                    label = this.element.title(),
                    preview = data.src;
                }
                else if (data)
                    message = data;
                else
                    message = OP3._("Unknown error");

                var gid = this.element.gid();
                if (gid) {
                    var o = OP3.GlobalElements.data(gid);
                    if (o) {
                        label = o.title || "";
                        description = o.description || "";
                        //category = o.category || "";
                    }
                }

                this.$ui.message
                    .eq(0)
                    .text(message);
                this.$ui.fieldTitle
                    .val(label)
                    .trigger("change");
                this.$ui.fieldDescription
                    .val(description)
                    .trigger("change");
                //this.$ui.fieldCategory
                //    .val(category)
                //    .trigger("change");
                this.$ui.fieldPreview
                    .val(preview)
                    .trigger("change");

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
                        + '<p class="op3-wizard-message">' + OP3._("Element saved as global") + '</p>'
                        + '<div class="op3-wizard-summary">'
                        + '<aside>'
                        + '<div class="op3-wizard-thumb">'
                        + '<figure>'
                        + '<img data-value-summary="thumb" src="" alt="" />'
                        + '</figure>'
                        + '</div>'
                        + '</aside>'
                        + '<article>'
                        + '<div class="op3-wizard-summary-desc">'
                        + '<dl data-field-summary="title">'
                        + '<dt>' + OP3._("Title:") + '</dt>'
                        + '<dd data-value-summary="title">' + OP3._("Title") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="description">'
                        + '<dt>' + OP3._("Description:") + '</dt>'
                        + '<dd data-value-summary="description">' + OP3._("Description") + '</dd>'
                        + '</dl>'
                        //+ '<dl data-field-summary="category">'
                        //+ '<dt>' + OP3._("Category:") + '</dt>'
                        //+ '<dd data-value-summary="category">' + OP3._("Category") + '</dd>'
                        //+ '</dl>'
                        + '</div>'
                        + '</article>'
                        + '</div>';

                $(html)
                    .appendTo($content);
            },

            _loadStep2: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var serialize = this.serialize(),
                    element = this.element,
                    gid = element.gid(),
                    method = gid ? "editAsGlobal" : "markAsGlobal",
                    callback = this._prepareStep2.bind(this);

                OP3.GlobalElements[method](element, serialize, null, callback);
            },

            _prepareStep2: function(data) {
                var element = this.element,
                    type = element.type(),
                    uuid = element.uuid(),
                    gid = element.gid();

                if (data) {
                    this.$ui.message.eq(1)
                        .removeClass("op3-wizard-message-error")
                        .addClass("op3-wizard-message-success")
                        .text(OP3._("Element saved as global"));
                    this.$ui.summaryTitle
                        .text(data.title || "");
                    this.$ui.summaryDescription
                        .text(data.description || "");
                    //this.$ui.summaryCategory
                    //    .text(data.category);
                    this.$ui.summaryThumb
                        .attr("src", data.thumb);
                }
                else
                    this.$ui.message.eq(1)
                        .removeClass("op3-wizard-message-success")
                        .addClass("op3-wizard-message-error")
                        .text(OP3._("Unable to mark element as global. Unknown error occurred."));

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

    var OP3_GlobalElements_Editor = OP3.defineClass({

        Name: "OP3.GlobalElements.Editor",

        Constructor: function() {
            this._element = null;
            this._observer = null;
            this.$ui = null;

            this._init();
        },

        Prototype: {

            /**
             * Constructor
             *
             * @return {Void}
             */
            _init: function() {
                var $target = OP3.Designer.$ui.body;
                this.$ui = {};
                [ "top", "right", "bottom", "left" ].forEach(function(position) {
                    this.$ui[position] = $('<div class="op3-global-element-overlay op3-global-element-overlay-' + position + '" />')
                        .on("mousedown", this._handleOverlayMousedown.bind(this))
                        .appendTo($target);
                }.bind(this));

                OP3.bind("elementchange.globalelementseditor", this._handleElementChange.bind(this));
                this._observer = new ResizeObserver(this._handleElementResize.bind(this));
            },

            /**
             * Destructor
             *
             * @return {Void}
             */
            destroy: function() {
                OP3.unbind("elementchange.globalelementseditor");

                this.element = null;

                Object.keys(this.$ui).forEach(function(position) {
                    this.$ui[position].remove();
                }.bind(this));

                delete this.$ui;
                delete this._observer;
                delete this._element;
            },

            /**
             * Reposition overlay
             *
             * @return {Void}
             */
            _reposition: function() {
                if (!this.element)
                    return;

                var node = this.element.node(),
                    rect = node.getBoundingClientRect();

                // method getBoundingClientRect returns the
                // size of an element and its position
                // relative to the viewport, we need
                // size/position relative to document
                var scrollX = window.pageXOffset,
                    scrollY = window.pageYOffset;
                rect = {
                    top: rect.top + scrollY,
                    right: rect.right + scrollX,
                    bottom: rect.bottom + scrollY,
                    left: rect.left + scrollX,
                    width: rect.width,
                    height: rect.height,
                };

                // get element parent's position
                var offset = {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                    rel = this.$ui.top.get(0);
                while (rel = rel.parentElement) {
                    if ($(rel).css("position") !== "relative")
                        continue;

                    var margin = $(rel).css([ "marginTop", "marginRight", "marginBottom", "marginLeft" ]);
                    offset.top += parseInt(margin.marginTop) || 0;
                    offset.right += parseInt(margin.marginRight) || 0;
                    offset.bottom += parseInt(margin.marginBottom) || 0;
                    offset.left += parseInt(margin.marginLeft) || 0;
                }

                // set overlay size and position
                this.$ui.top.css({
                    top: 0 - offset.top,
                    right: 0 - offset.right,
                    bottom: "auto",
                    left: 0 - offset.left,
                    width: "auto",
                    height: rect.top,
                });
                this.$ui.right.css({
                    top: 0 - offset.top + rect.top,
                    right: 0 - offset.right,
                    bottom: "auto",
                    left: 0 - offset.left + rect.left + rect.width,
                    width: "auto",
                    height: rect.height,
                });
                this.$ui.bottom.css({
                    top: rect.bottom - offset.top,
                    right: 0 - offset.right,
                    bottom: 0 - offset.bottom,
                    left: 0 - offset.left,
                    width: "auto",
                    height: "auto",
                });
                this.$ui.left.css({
                    top: 0 - offset.top + rect.top,
                    right: "auto",
                    bottom: "auto",
                    left: 0 - offset.left,
                    width: rect.left,
                    height: rect.height,
                });
            },

            /**
             * Element getter
             *
             * @return {OP3_Element}
             */
            get element() {
                return this._element;
            },

            /**
             * Element setter
             *
             * @param  {OP3_Element} value
             * @return {Void}
             */
            set element(value) {
                // value is empty and no current element set, nothing to do
                if (!value && !this.element)
                    return;

                // value is current element, nothing to do also
                else if (value && this.element && OP3.$(this.element).is(value))
                    return;

                // changing current element, make sure you
                // reset it before continuing
                if (value && this.element)
                    this.element = null;

                // validate value
                if (value) {
                    value = OP3.$(value).element();
                    if (!value)
                        throw "OP3.GlobalElements.Editor: not an op3 element.";
                    if (!value.gid())
                        throw "OP3.GlobalElements.Editor: element is not global.";
                }
                else
                    value = null;

                // deactivate, store, reposition and activate
                this._active(false);
                this._element = value;
                this._reposition();
                this._active(!!value);

                // emit event
                OP3.transmit("globalelementeditor", {
                    node: this._element ? this._element.node() : null,
                });
            },

            /**
             * Cancel editor
             *
             * @return {Void}
             */
            cancel: function() {
                if (!this.element)
                    return;

                var element = this.element,
                    node = element.node(),
                    gid = element.gid(),
                    data = that.data(gid);

                // display progressbar
                OP3.Loadinfo.message(OP3._("Canceling"));
                OP3.Loadinfo.start(0.01);
                OP3.Loadinfo.status(0);
                OP3.Loadinfo.stop(1);
                OP3.Loadinfo.display(true);

                // revert old data
                OP3.$.unserializeAsync(
                    data.data,
                    function(e) {
                        OP3.Loadinfo.status(e.progress);
                    },
                    function(e) {
                        // replace element
                        element._replaceElement(e.element);

                        // set null element
                        this.element = null;

                        // clean and hide progressbar
                        OP3.Loadinfo.clean();
                        OP3.Loadinfo.display(false);

                        OP3.$(e.element)
                            .focus();
                    }.bind(this)
                );
            },

            /**
             * Save editor
             *
             * @return {Void}
             */
            save: function() {
                if (!this.element)
                    return;

                var element = this.element,
                    gid = element.gid(),
                    replace = OP3.$('*[gid="' + gid + '"]').not(element).toArray(),
                    message = OP3._("Saving element data"),
                    start = 0.01,
                    stop = 0.5,
                    status = 0;

                // display progressbar
                OP3.Loadinfo.message(message);
                OP3.Loadinfo.start(start);
                OP3.Loadinfo.stop(stop);
                OP3.Loadinfo.status(status);
                OP3.Loadinfo.display(true);

                // do not autosave after editAsGlobal,
                // do it manually with progress
                var autosave = that.AUTOSAVE;
                that.AUTOSAVE = false;

                // send api request (save element data)
                that.editAsGlobal(
                    element,
                    null,
                    function(e) {
                        OP3.Loadinfo.status(e.progress);
                    },
                    function(data) {
                        var count = replace.length,
                            index = 0;

                        message = OP3._("Building elements");
                        start = stop,
                        status = 0;
                        stop = 1;

                        OP3.Loadinfo.message(message);
                        OP3.Loadinfo.start(start);
                        OP3.Loadinfo.stop(stop);
                        OP3.Loadinfo.status(status);

                        // reset element and close loadinfo
                        var _clean = function() {
                            OP3.Loadinfo.message(OP3._("Saving page"));

                            this.element = null;

                            that.AUTOSAVE = autosave;
                            that._callAutoSave(function() {
                                OP3.Loadinfo.clean();
                                OP3.Loadinfo.display(false);

                                element.focus();
                            }.bind(this), data);
                        }.bind(this);

                        // replace all elements on page that
                        // have same gid as current element
                        var _build = function() {
                            var node = replace.pop();
                            if (!node)
                                return _clean();

                            OP3.$.unserializeAsync(
                                data.data,
                                function(e) {
                                    OP3.Loadinfo.status((1 / count) * index + e.progress / count);
                                },
                                function(e) {
                                    index++;

                                    // replace element
                                    OP3.$(node).element()._replaceElement(e.element);

                                    // clean or continue building
                                    if (!replace.length) {
                                        _clean();
                                    }
                                    else
                                        _build();
                                }.bind(this)
                            );
                        }.bind(this);

                        _build();
                    }.bind(this)
                );
            },

            /**
             * Activate/deactivate editor
             *
             * @param  {Boolean} status
             * @return {Void}
             */
            _active: function(status) {
                if (!this.element)
                    return;

                var element = this.element,
                    node = element.node(),
                    uuid = element.uuid(),
                    doc = node.ownerDocument,
                    win = doc.defaultView,
                    html = doc.documentElement;

                if (status) {
                    $(node).addClass("op3-global-element-unlocked");
                    $(html).attr("data-op3-global-element-edit", "#" + uuid);
                    OP3.LiveEditor.$ui.html.attr("data-op3-global-element-edit", "#" + uuid);
                }
                else {
                    $(node).removeClass("op3-global-element-unlocked");
                    $(html).removeAttr("data-op3-global-element-edit");
                    OP3.LiveEditor.$ui.html.removeAttr("data-op3-global-element-edit", "#" + uuid);
                }

                this._observer.disconnect();

                if (status) {
                    element.unfocus();
                    element.focus();

                    this._observer.observe(node);
                    this._observer.observe(html);
                }
            },

            /**
             * Elementchange event handler
             *
             * @param  {Event}  e
             * @param  {Object} o
             * @return {Void}
             */
            _handleElementChange: function(e, o) {
                if (!this.element || this.element.uuid() !== o.uuid)
                    return;

                var listen = [ "marginTop", "marginRight", "marginBottom", "marginLeft", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft" ];
                if (listen.indexOf(o.name) === -1)
                    return;

                this._reposition();
            },

            /**
             * Element resize event handler
             *
             * @param  {Array} e
             * @return {Void}
             */
            _handleElementResize: function(e) {
                this._reposition();
            },

            /**
             * Overlay mousedown event handler
             *
             * @param  {Event} e
             * @return {Void}
             */
            _handleOverlayMousedown: function(e) {
                e.preventDefault();

                var $element = this.$ui.top,
                    transitIn = "op3-global-element-overlay-mousedown",
                    transitOut = "op3-global-element-overlay-mousedown-out";

                //if (!parseFloat($element.css("transition-duration")))
                //    return;
                if ($element.hasClass(transitIn) || $element.hasClass(transitOut))
                    return;

                $element
                    .on("transitionend.globalelementeditor", function(e) {
                        if ($element.hasClass(transitIn))
                            $element
                                .removeClass(transitIn)
                                .addClass(transitOut);
                        else if ($element.hasClass(transitOut))
                            $element
                                .off("transitionend.globalelementeditor")
                                .removeClass(transitOut);
                    });

                $element
                    .addClass(transitIn);
            },

        },

    });

    /**
     * OP3.GlobalElements object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Autosave page on markAsGlobal
         * or editAsGlobal
         *
         * Warning: history object will have
         * some side effects if this is not
         * set to TRUE
         *
         * @type {Boolean}
         */
        AUTOSAVE: true,

        /**
         * List of all available global
         * elements
         *
         * @type {Array}
         */
        _data: [],

        _init: function() {
            OP3.bind("elementfocusing", that._handleElementFocusing);
        },

        /**
         * Call callback function
         * (you can pass additional arguments
         * after callback)
         *
         * @param  {Mixed} callback (optional)
         * @return {Void}
         */
        _call: function(callback) {
            if (typeof callback !== "function")
                return;

            var args = Array.prototype.slice.call(arguments, 1);
            callback.apply(this, args);
        },

        /**
         * Save page (if autosave option is
         * on) and call callback function
         * (you can pass additional arguments
         * after callback)
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _callAutoSave: function(callback) {
            var args = Array.prototype.slice.call(arguments, 1),
                cb = function() {
                    if (typeof callback === "function")
                        callback.apply(that, args);
                }

            if (that.AUTOSAVE) {
                OP3.once("save", cb);
                OP3.LiveEditor.save();
            }
            else
                cb();
        },

        /**
         * Get index (in this._data) of
         * global element id
         *
         * @param  {String} gid
         * @param  {Array}  data (optional)
         * @return {Number}
         */
        _indexOfGid: function(gid, data) {
            if (gid) {
                data = data || that._data;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].gid == gid)
                        return i;
                }
            }

            return -1;
        },

        /**
         * Get global element(s) data
         *
         * @param  {String} gid
         * @return {Mixed}
         */
        data: function(gid) {
            if (typeof(gid) === "undefined")
                return that._data;

            var index = that._indexOfGid(gid);
            if (index === -1)
                return null;

            return that._data[index];
        },

        /**
         * GlobalElements wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_GlobalElements_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            var wizard = that.wizard();
            wizard.element = OP3.Designer.activeElement();
            if (!wizard.element)
                return;

            wizard.step(0);
            wizard.step(1);
            wizard.show();
        },

        /**
         * GlobalElements editor object
         *
         * @return {Object}
         */
        editor: function() {
            if (!that._editor)
                that._editor = new OP3_GlobalElements_Editor();

            return that._editor;
        },

        /**
         * Refresh data
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "global-elements",
                success: that._handleAjax,
            });
        },

        /**
         * Get global element detail (async)
         *
         * @param  {String}   gid
         * @param  {Function} progress (optional)
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        getDetail: function(gid, progress, callback) {
            if (typeof progress === "function" && typeof callback !== "function") {
                callback = progress;
                progress = null;
            }

            var index = that._indexOfGid(gid);
            if (index !== -1 && that._data[index].data)
                return that._call(callback, that._data[index]);

            OP3.Ajax.request({
                url: "global-elements/" + gid,
                progress: function(e) {
                    that._call(progress, e);
                },
                success: function(data, textStatus, jqXHR) {
                    if (index === -1)
                        index = that._data.length;

                    that._data[index] = data.data;
                    that._call(callback, that._data[index]);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    that._call(error, null);
                },
            });
        },

        /**
         * Get global element data detail (async)
         *
         * @param  {String}   gid
         * @param  {Function} progress (optional)
         * @param  {Function} callback (optional)
         * @param  {Function} error    (optional)
         * @return {Void}
         */
        template: function(gid, progress, callback, error) {
            if (typeof progress === "function" && typeof callback !== "function") {
                callback = progress;
                progress = null;
            }

            var decorator = function(e) {
                that._call(callback, e ? e.data : e);
            }

            that.getDetail(gid, progress, decorator, error);
        },

        /**
         * Mark element as global
         *
         * @param  {Mixed}    node     DOM node, jQuery element, string selector, op3query object, op3element object
         * @param  {Object}   config   name|description|category|preview
         * @param  {Function} progress (optional)
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        markAsGlobal: function(node, config, progress, callback) {
            if (typeof progress === "function" && typeof callback !== "function") {
                callback = progress;
                progress = null;
            }

            var element = OP3.$(node).element();
            if (!element)
                throw "OP3.GlobalElements: invalid node argument.";

            var gid = element.gid();
            if (gid)
                return that.editAsGlobal(node, config, progress, callback);

            var uuid = element.uuid(),
                serialize = OP3.Map.toJSON(uuid),
                json = $.extend({}, config, { type: element.type(), data: serialize });
            OP3.Ajax.request({
                method: "POST",
                url: "global-elements",
                data: JSON.stringify(json),
                progress: function(e) {
                    that._call(progress, e.progress);
                },
                success: function(data, textStatus, jqXHR) {
                    json = data.data;
                    json.data = serialize;
                    json.data.gid = json.gid;

                    that._data.unshift(json);

                    element.gid(json.gid);

                    that._callAutoSave(callback, json);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    that._call(callback, null);
                },
            });
        },

        /**
         * Unmark element as global
         *
         * @param  {Mixed} node DOM node, jQuery element, string selector, op3query object, op3element object
         * @return {Void}
         */
        unmarkAsGlobal: function(node) {
            var element = OP3.$(node).element();
            if (!element)
                throw "OP3.GlobalElements: invalid node argument.";

            element.gid("");
        },

        /**
         * Edit global element
         *
         * @param  {Mixed}    node     DOM node, jQuery element, string selector, op3query object, op3element object
         * @param  {Object}   config   name|description|category|preview
         * @param  {Function} progress (optional)
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        editAsGlobal: function(node, config, progress, callback) {
            if (typeof progress === "function" && typeof callback !== "function") {
                callback = progress;
                progress = null;
            }

            var element = OP3.$(node).element();
            if (!element)
                throw "OP3.GlobalElements: invalid node argument.";

            var gid = element.gid();
            if (!gid)
                return that.markAsGlobal(node, config, progress, callback);

            var node = element.node(),
                uuid = element.uuid(),
                type = element.type(),
                serialize = OP3.Map.toJSON(uuid),
                json = $.extend({}, config, { type: type, data: serialize });
            OP3.Ajax.request({
                method: "PUT",
                url: "global-elements/" + gid,
                data: JSON.stringify(json),
                progress: function(e) {
                    that._call(progress, e.progress);
                },
                success: function(data, textStatus, jqXHR) {
                    json = data.data;
                    json.data = serialize;

                    var index = that._indexOfGid(gid);
                    that._data[index] = json;

                    var emit = {
                        node: node,
                        uuid: uuid,
                        type: type,
                        historyPending: OP3.History && OP3.History.isPending(),
                    }
                    OP3.transmit("elementgidupdate", emit);
                    OP3.transmit("elementgidupdate::" + emit.type, emit);

                    that._callAutoSave(callback, json);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    that._call(callback, null);
                },
            });
        },

        /**
         * Get/set global element edit mode
         *
         * @param  {Boolean} state
         * @return {Mixed}
         */
        editMode: function(state) {
            var editor = that.editor();
            if (typeof state === "undefined")
                return !!editor.element;

            // cancel edit mode
            if (!state) {
                editor.element = null;
                return;
            }

            // already in edit mode
            if (editor.element)
                throw "OP3.GlobalElements: edit mode not possible, already in edit mode.";

            // set edit mode with new element
            var element = OP3.Designer.activeElement();
            if (!element || element === OP3.Document)
                throw "OP3.GlobalElements: edit mode not possible, element not selected.";
            if (!element.gid())
                throw "OP3.GlobalElements: edit mode not possible, element is not global.";

            editor.element = element;
        },

        /**
         * Global element edit mode cancel
         *
         * @return {Void}
         */
        editCancel: function() {
            that.editor().cancel();
        },

        /**
         * Global element edit mode save
         *
         * @return {Void}
         */
        editSave: function() {
            that.editor().save();
        },

        /**
         * Global elements iteration
         *
         * @param  {Function} callback
         * @return {Void}
         */
        forEach: function(callback) {
            that.data().forEach(function(item) {
                that._call(callback, item);
            });
        },

        /**
         * Elementfocusing event handler
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocusing: function(e, o) {
            var element = that.editor().element;
            if (element && !OP3.$(o.node).jq().closest(element.node()).length)
                return false;
        },

        /**
         * Ajax request success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(data, textStatus, jqXHR, callback) {
            if (!data || !data.data)
                return;

            that._data = data.data;

            OP3.transmit("loadglobalelement");
        },

    }

    // globalize (designer)
    window.OP3.GlobalElements = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.GlobalElements = that;
    });

    // autoinit
    $(function() {
        that._init();
    });

    // import global elements from initial
    // ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        var data = o.global_elements;

        // add details to data from list of all
        // global elements on current page
        (o.global_elements_on_page || []).forEach(function(item) {
            var index = that._indexOfGid(item.gid, data);
            if (index === -1)
                return;

            data[index].data = item;
        });

        that._handleAjax({ data: data });
    });

})();
