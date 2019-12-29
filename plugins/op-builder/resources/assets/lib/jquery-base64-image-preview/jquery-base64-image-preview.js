;(function($, Color, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Extend objects (additional arguments) into
     * target respecting getters and setters
     *
     * @param  {Object} target
     * @return {Object}
     */
    var _extend = function(target) {
        Array.prototype.slice.call(arguments, 1).forEach(function(item) {
            for (var prop in item) {
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(item, prop));
            }
        });

        return target;
    }

    /**
     * Initialize Base64ImagePreview
     *
     * @param  {Node}   element HTML node
     * @param  {Object} options see Base64ImagePreview.prototype._defaults
     * @return {Void}
     */
    var Base64ImagePreview = function(element, options) {
        if (!(this instanceof Base64ImagePreview))
            throw "Base64ImagePreview: Base64ImagePreview is a constructor.";
        if (!($(element).get(0) instanceof Image))
            throw "Base64ImagePreview: element argument must be of type Image.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * Base64ImagePreview prototype
     *
     * @type {Object}
     */
    _extend(Base64ImagePreview.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            accept: "image/*",
            title: "Drop image file here or click to choose file",
            fallback: "data:image/png;base64,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",
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            this._element = $(this._element)
                .addClass("jquery-base64-image-preview-image")
                .data("jquery-base64-image-preview", this)
                .get(0);

            // extend options
            this._options = $.extend({}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            // wrap element
            $(this.element)
                .wrap("<div />");

            // user interface
            this.$ui = {};
            this.$ui.wrapper = $(this.element)
                .parent()
                .addClass("jquery-base64-image-preview-wrapper")
                .on("change", "input", this._handleFileChange.bind(this))
                .on("dragover", "input", this._handleFileDragOver.bind(this))
                .on("dragleave", "input", this._handleFileDragLeave.bind(this))
                .on("drop", "input", this._handleFileDrop.bind(this));
            this.$ui.file = $("<input />")
                .attr("type", "file")
                .attr("accept", this.options.accept)
                .attr("title", this.options.title)
                .addClass("jquery-base64-image-preview-file")
                .appendTo(this.$ui.wrapper);

            // set fallback image
            if (!$(this.element).attr("src"))
                $(this.element).attr("src", this.options.fallback);
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            $(this._element)
                .removeClass("jquery-base64-image-preview-image")
                .unwrap();

            this.$ui.file.remove();

            this.$ui = null;
            this._options = null;
            this._element = null;
        },

        /**
         * Element property getter
         *
         * @return {Node}
         */
        get element() {
            return this._element;
        },

        /**
         * Options property getter
         * (result is extended object to
         * prevent user changes)
         *
         * @return {Object}
         */
        get options() {
            return $.extend(true, {}, this._options);
        },

        /**
         * Remove current image
         * (set fallback)
         *
         * @return {Void}
         */
        clear: function() {
            this.value(this.options.fallback);
        },

        /**
         * Get/set preview image source
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        value: function(value) {
            if (typeof value === "undefined")
                return $(this.element).attr("src");
            else if (value === $(this.element).attr("src"))
                return;

            $(this.element)
                .attr("src", value)
                .trigger("base64imagepreviewchange");

            // if there is file selected in file element
            // then choosing the same file won't trigger
            // change (need to recreate element)
            this.$ui.file.remove();
            this.$ui.file = $("<input />")
                .attr("type", "file")
                .attr("accept", this.options.accept)
                .attr("title", this.options.title)
                .addClass("jquery-base64-image-preview-file")
                .appendTo(this.$ui.wrapper);
        },

        /**
         * Allow preview for type (is file
         * type in allowed content-type list)
         *
         * @param  {String}  fileType
         * @return {Boolean}
         */
        _allowPreviewForFileType: function(fileType) {
            var accept = this.options.accept;
            if (accept) {
                var pattern = accept
                    .replace(/\s*/g, "")
                    .replace(/,/g, "|");

                return (new RegExp(pattern)).test(fileType);
            }

            return true;
        },

        /**
         * Set image preview from file
         *
         * @param  {File} file
         * @return {Void}
         */
        _setPreviewForFile: function(file) {
            if (!this._allowPreviewForFileType(file.type))
                return;

            var reader = new FileReader();
            reader.onload = this._handleFileReaderLoad.bind(this);
            reader.onerror = this._handleFileReaderError.bind(this);

            reader.readAsDataURL(file);
        },

        /**
         * File change event handler:
         * set image file as preview image
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileChange: function(e) {
            if (!e.target.files || !e.target.files.length)
                return;

            this._setPreviewForFile(e.target.files[0]);
        },

        /**
         * File reader load event handler:
         * set preview image from file
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileReaderLoad: function(e) {
            this.value(e.target.result);
        },

        /**
         * File reader error event handler:
         * @todo
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileReaderError: function(e) {
            // pass
        },

        /**
         * File element dragover event handler:
         * add custom class and drop effect
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileDragOver: function(e) {
            e.preventDefault();

            var data = e.originalEvent.dataTransfer,
                allow = data.items && data.items.length === 1 && this._allowPreviewForFileType(data.items[0].type),
                effect = allow ? "copy" : "none",
                valid = allow ? "valid" : "invalid";

            data.dropEffect = effect;
            this.$ui.wrapper
                .addClass("jquery-base64-image-preview-wrapper-" + valid + "-dragover");
        },

        /**
         * File element dragleave event handler:
         * clear custom class
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileDragLeave: function(e) {
            this.$ui.wrapper
                .removeClass("jquery-base64-image-preview-wrapper-invalid-dragover")
                .removeClass("jquery-base64-image-preview-wrapper-valid-dragover");
        },

        /**
         * File element drop event handler:
         * set preview and clear custom class
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFileDrop: function(e) {
            var data = e.originalEvent.dataTransfer,
                allow = data.items && data.items.length === 1 && this._allowPreviewForFileType(data.items[0].type);
            if (!allow)
                e.preventDefault();

            this._handleFileDragLeave(e);
        },

    });


    // jQuery plugin
    $.fn.base64ImagePreview = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-base64-image-preview");

            // create new instance
            if (!lib)
                lib = new Base64ImagePreview(this, typeof options === "object" ? options : {});

            // global methods
            if (typeof options === "string") {
                if (options.substr(0,1) !== "_" && options in lib && typeof lib[options] === "function") {
                    // execute
                    var result = lib[options].apply(lib, args);

                    // result, exit loop
                    if (typeof result !== "undefined") {
                        $this = result;
                        return false;
                    }
                }
                else
                    throw "Base64ImagePreview: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window.Color, window, document);
