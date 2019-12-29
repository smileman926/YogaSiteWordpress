/**
 * OptimizePress3 live editor extension:
 * create op3 page or element's screenshot
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-meta.js
 *     - dom-to-image.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Export object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Config
         *
         * @type {Object}
         */
        _config: {
            contentType: "image/png",
            iframeSize: [ 1200, 675 ],
            bgColor: "#fff",
            thumbPageWidth: 280,
            thumbPageHeight: null,
            thumbPageMargin: 0,
            thumbTemplateWidth: 270,
            thumbTemplateHeight: null,
            thumbTemplateMargin: 0,
            thumbElementWidth: 260,
            thumbElementHeight: null,
            thumbElementMargin: 12,
        },

        /**
         * Get page screenshot
         * (body)
         *
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        page: function(success, error) {
            that._initFrame("page", success, error);
        },

        /**
         * Get page thumbnail
         * (body)
         *
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        thumbPage: function(success, error) {
            var config = that._config,
                width = config.thumbPageWidth,
                height = config.thumbPageHeight,
                margin = config.thumbPageMargin;

            that.page(function(e) {
                var w1 = width ? width - 2*margin : null,
                    h1 = height ? height - 2*margin : null;

                that._imageResize(e, w1, h1, function(e) {
                    var w2 = e.width + 2*margin,
                        h2 = e.height + 2*margin;

                    that._imageCanvasResize(e, w2, h2, null, null, function(e) {
                        if (typeof success === "function")
                            success.call(that, e);
                    }, error);
                }, error);
            }, error);
        },

        /**
         * Get page screenshot (body)
         * with width and content-type
         * customization
         *
         * @param  {Number}   width
         * @param  {String}   contentType
         * @param  {Function} success
         * @param  {Function} error       (optional)
         * @return {Void}
         */
        customPage: function(width, contentType, success, error) {
            that.page(function(e) {
                that._imageResize(e, Math.min(width, e.width), null, function(e) {
                    that._imageConvert(e, contentType, success, error);
                }, error);
            }, error);
        },

        /**
         * Get template screenshot
         * (#op3-designer-element)
         *
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        template: function(success, error) {
            that._initFrame("template", success, error);
        },

        /**
         * Get template thumbnail
         * (#op3-designer-element)
         *
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        thumbTemplate: function(success, error) {
            var config = that._config,
                width = config.thumbTemplateWidth,
                height = config.thumbTemplateHeight,
                margin = config.thumbTemplateMargin;

            that.template(function(e) {
                var w1 = width ? width - 2*margin : null,
                    h1 = height ? height - 2*margin : null;

                that._imageResize(e, w1, h1, function(e) {
                    var w2 = e.width + 2*margin,
                        h2 = e.height + 2*margin;

                    that._imageCanvasResize(e, w2, h2, null, null, function(e) {
                        if (typeof success === "function")
                            success.call(that, e);
                    }, error);
                }, error);
            }, error);
        },

        /**
         * Get template screenshot (#op3-designer-element)
         * with width and content-type
         * customization
         *
         * @param  {Number}   width
         * @param  {String}   contentType
         * @param  {Function} success
         * @param  {Function} error       (optional)
         * @return {Void}
         */
        customTemplate: function(width, contentType, success, error) {
            that.template(function(e) {
                that._imageResize(e, Math.min(width, e.width), null, function(e) {
                    that._imageConvert(e, contentType, success, error);
                }, error);
            }, error);
        },

        /**
         * Get op3 element screenshot
         *
         * @param  {Mixed}    node
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Mixed}
         */
        element: function(node, success, error) {
            var method = OP3.$(node);
            if (!method.length)
                method = OP3.$.closest(node);
            if (!method.length)
                throw "OP3.Screenshot - invalid node argument for element method";

            that._initFrame(method.uuid(), success, error);
        },

        /**
         * Get op3 element thumbnail
         *
         * @param  {Mixed}    node
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Mixed}
         */
        thumbElement: function(node, success, error) {
            var config = that._config,
                width = config.thumbElementWidth,
                height = config.thumbElementHeight,
                margin = config.thumbElementMargin;

            that.element(node, function(e) {
                var w1 = width ? width - 2*margin : null,
                    h1 = height ? height - 2*margin : null;

                that._imageResize(e, w1, h1, function(e) {
                    var w2 = e.width + 2*margin,
                        h2 = e.height + 2*margin;

                    that._imageCanvasResize(e, w2, h2, null, null, function(e) {
                        if (typeof success === "function")
                            success.call(that, e);
                    }, error);
                }, error);
            }, error);
        },

        /**
         * Get op3 element screenshot
         * with width and content-type
         * customization
         *
         * @param  {Mixed}    node
         * @param  {Number}   width
         * @param  {String}   contentType
         * @param  {Function} success
         * @param  {Function} error       (optional)
         * @return {Void}
         */
        customElement: function(node, width, contentType, success, error) {
            that.element(node, function(e) {
                that._imageResize(e, Math.min(width, e.width), null, function(e) {
                    that._imageConvert(e, contentType, success, error);
                }, error);
            }, error);
        },

        /**
         * Create placeholder image
         *
         * @param  {Number}   width
         * @param  {String}   contentType
         * @param  {Function} success
         * @param  {Function} error       (optional)
         * @return {Void}
         */
        placeholder: function(width, contentType, success, error) {
            var xml = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"32\" height=\"32\"><g fill=\"none\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke=\"#999\"><rect x=\"1\" y=\"1\" width=\"30\" height=\"30\" /><polygon points=\"5,26 10,17 15,21 20,14 27,26\" /><circle cx=\"14\" cy=\"9\" r=\"3\" /></g></svg>",
                src = "data:image/svg+xml;base64," + btoa(xml);

            that._loadImage(src, function(e) {
                e.width = width;
                e.height = width;

                that._imageConvert(e, contentType, success, error);
            }, error);
        },

        /**
         * Document has changes
         *
         * @return {Boolean}
         */
        changed: function() {
            return (OP3.Designer && OP3.Designer.changed()) || _changed || false;
        },

        /**
         * Initialize dummy iframe element
         *
         * @param  {String}   method
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _initFrame: function(method, success, error) {
            var $wrapper = $("<div />")
                .addClass("op3-screenshot-wrapper")
                .css({
                    position: "absolute",
                    display: "block",
                    zIndex: "-1",
                    visibility: "hidden",
                    overflow: "hidden",
                    width: 0,
                    height: 0,
                })
                .appendTo(document.body);

            $("<iframe />")
                .addClass("op3-screenshot-frame")
                .css({
                    display: "block",
                    width: that._config.iframeSize[0],
                    height: that._config.iframeSize[1],
                    border: "0 none",
                })
                .data("op3-screenshot-method", method)
                .data("op3-screenshot-success", success)
                .data("op3-screenshot-error", error)
                .on("load", that._handleFrameLoad)
                .on("error", that._handleFrameError)
                .attr("src", OP3.Meta.pagePreviewUrl)
                .appendTo($wrapper);
        },

        /**
         * Get image object from source
         *
         * @param  {Mixed} src Image object or image data url
         * @return {Image}     Image object
         */
        _getImage: function(src) {
            if (typeof src === "string") {
                var img = new Image();
                img.src = src;

                return img;
            }
            else if (src instanceof(Image))
                return src;

            throw "OP3.Screenshot - invalid src argument (provide valid image data url or Image object with valid image data url as source).";
        },

        /**
         * Load image object from source
         *
         * @param  {Mixed}    src     Image object or image data url
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _loadImage: function(src, success, error) {
            var _load = function() {
                if (!this.naturalWidth && !this.naturalHeight) {
                    if (typeof error === "function")
                        error.call(that, "OP3.Screenshot - unable to load empty image.");

                    return;
                }

                if (typeof success === "function")
                    success.call(that, this);
            }

            var _error = function() {
                if (typeof error === "function")
                    error.call(that, "OP3.Screenshot - unable to load image.");
            }

            var re = /^data\:(.*?),(.*)/;
            if (src instanceof(Image) && src.src && src.src.match(re) && src.complete && src.naturalWidth && src.naturalHeight) {
                _load.call(src);
            }
            else if (src instanceof(Image) && src.src && src.src.match(re)) {
                src.onload = _load;
                img.onerror = _error;
            }
            else if (typeof src === "string" && src.match(re)) {
                var img = new Image();
                img.onload = _load;
                img.onerror = _error;
                img.src = src;
            }
            else
                throw "OP3.Screenshot - invalid src argument (provide valid image data url or Image object with valid image data url as source).";
        },

        /**
         * Open image in new bowser tab
         *
         * @param  {Mixed} src Image object or image data url
         * @return {Void}
         */
        _openImageInNewTab: function(src) {
            window.open(OP3.Screenshot._imageToBlobUrl(src), "_blank");
        },

        /**
         * Image data URL parser
         *
         * @param  {Mixed}  src Image object or image data url
         * @return {Object}
         */
        _imageDataUrlParse: function(src) {
            var img = that._getImage(src),
                dataUrl = img.src,
                re = /^data\:(.*?),(.*)/,
                match = dataUrl.match(re);

            if (!match)
                throw "OP3.Screenshot - invalid src argument (provide valid image data url or Image object with valid image data url as source).";

            return {
                dataUrl: dataUrl,
                contentType: match[1],
                contentData: match[2],
            }
        },

        /**
         * Convert image to blob object
         *
         * @param  {Mixed} src Image object or image data url
         * @return {Blob}      Blob object
         */
        _imageToBlob: function(src) {
            var parse = that._imageDataUrlParse(src),
                contentType = parse.contentType,
                contentData = parse.contentData,
                byteCharacters = contentData,
                sliceSize = 512,
                byteArrays = [];

            // encode/decode
            if (/;base64/.test(contentType))
                byteCharacters = atob(byteCharacters)
            else
                byteCharacters = byteCharacters
                    .replace(/%([0-9A-F]{2})/gi, function(match, group) {
                        return String.fromCharCode(parseInt(group, 16));
                    });

            // bytes to array
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            // create new blob object
            return new Blob(byteArrays, { type: contentType.replace(/;base64/, "") });
        },

        /**
         * Convert image to blob url
         *
         * @param  {Mixed}  src Image object or image data url
         * @return {String}     blob url
         */
        _imageToBlobUrl: function(src) {
            var blob = that._imageToBlob(src);
            var url = window.URL.createObjectURL(blob);

            return url;
        },

        /**
         * Resize image
         *
         * @param  {Mixed}    src     Image object or image data url
         * @param  {Number}   width   new image size (null for auto-size)
         * @param  {Number}   height  new image size (null for auto-size)
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _imageResize: function(src, width, height, success, error) {
            that._loadImage(src, function(srcImage) {
                // @todo: handle svg

                var ratio = srcImage.width / srcImage.height;
                if (!width)
                    width = height * ratio;
                if (!height)
                    height = width / ratio;

                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext("2d");
                ctx.fillStyle = that._config.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(srcImage, 0, 0, width, height);

                that._loadImage(canvas.toDataURL(that._config.contentType), success, error);
            }, error);
        },

        /**
         * Resize image canvas
         *
         * @param  {Mixed}    src     Image object or image data url
         * @param  {Number}   width   new image size
         * @param  {Number}   height  new image size
         * @param  {Number}   x       source image position (null for center)
         * @param  {Number}   y       source image position (null for center)
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _imageCanvasResize: function(src, width, height, x, y, success, error) {
            that._loadImage(src, function(srcImage) {
                // @todo: handle svg

                if (x === null)
                    x = (width - srcImage.width) / 2
                if (y === null)
                    y = (height - srcImage.height) / 2;

                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext("2d");
                ctx.fillStyle = that._config.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(srcImage, x, y, srcImage.width, srcImage.height);

                that._loadImage(canvas.toDataURL(that._config.contentType), success, error);
            }, error);
        },

        /**
         * Crop image
         *
         * @param  {Mixed}    src     Image object or image data url
         * @param  {Number}   x1      crop position
         * @param  {Number}   y1      crop position
         * @param  {Number}   x2      crop position
         * @param  {Number}   y2      crop position
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _imageCrop: function(src, x1, y1, x2, y2, success, error) {
            that._loadImage(src, function(srcImage) {
                // @todo: handle svg

                x1 = Math.max(x1, 0);
                y1 = Math.max(y1, 0);
                x2 = Math.max(x2, 0);
                y2 = Math.max(y2, 0);
                x1 = Math.min(x1, srcImage.width);
                y1 = Math.min(y1, srcImage.height);
                x2 = Math.min(x2, srcImage.width);
                y2 = Math.min(y2, srcImage.height);

                if (x1 > x2)
                    [ x1, x2 ] = [ x2, x1 ];
                if (y1 > y2)
                    [ y1, y2 ] = [ y2, y1 ];

                var canvas = document.createElement("canvas");
                canvas.width = x2 - x1;
                canvas.height = y2 - y1;

                var ctx = canvas.getContext("2d");
                ctx.fillStyle = that._config.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(srcImage, x1*-1, y1*-1, srcImage.width, srcImage.height);

                that._loadImage(canvas.toDataURL(that._config.contentType), success, error);
            }, error);
        },

        /**
         * Apply css-like object-fit property
         * to image
         *
         * @param  {Mixed}    src     Image object or image data url
         * @param  {Number}   width   new image size
         * @param  {Number}   height  new image size
         * @param  {Boolean}  cover   object-fit:cover if true, object-fit:contain otherwise
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _imageObjectFit: function(src, width, height, cover, success, error) {
            that._loadImage(src, function(srcImage) {
                // @todo: handle svg

                var resizeWidth, resizeHeight;
                if (width / height > srcImage.width / srcImage.height)
                    resizeHeight = height;
                else
                    resizeWidth = width;

                if (cover) {
                    var tmp = resizeWidth;
                    resizeWidth = resizeHeight;
                    resizeHeight = tmp;
                }

                that._imageResize(srcImage, resizeWidth, resizeHeight, function(tmpImage) {
                    that._imageCanvasResize(tmpImage, width, height, null, null, success, error);
                }, error);
            }, error);
        },

        /**
         * Convert image to different content-type
         *
         * @param  {Mixed}    src         Image object or image data url
         * @param  {String}   contentType image/png, image/bmp, image/gif, image/jpeg, image/tiff
         * @param  {Function} success
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _imageConvert: function(src, contentType, success, error) {
            that._loadImage(src, function(srcImage) {
                var parse = that._imageDataUrlParse(srcImage.src);
                if (contentType === parse.contentType) {
                    if (typeof success === "function")
                        success.call(that, srcImage);

                    return;
                }

                var canvas = document.createElement("canvas");
                canvas.width = srcImage.width;
                canvas.height = srcImage.height;

                var ctx = canvas.getContext("2d");
                ctx.fillStyle = that._config.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);

                // @todo - <foreignObject> in <canvas> (in
                // safari browser) gets tainted, do some
                // fallback?
                that._loadImage(canvas.toDataURL(contentType), success, error);
            }, error);
        },

        /**
         * Temporary element iframe load
         * event handler:
         * append dom-to-image.js to dom
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameLoad: function(e) {
            var doc = this.contentWindow.document,
                win = doc.defaultView,
                frame = win.frameElement;

            // additional assets
            var base = OP3.Meta.assets,
                assets = [
                    '<link href="' + base + '/css/op3-screenshot.css" type="text/css" rel="stylesheet" />',
                    '<link href="' + base + '/css/op3-icons.css" type="text/css" rel="stylesheet" />',
                    '<script src="' + base + '/js/dom-to-image.js" type="text/javascript" />',
                ];
            $(frame).data("op3-screenshot-assets", assets);

            // since we allow screenshot of not-saved
            // document, we need to apply css of each
            // element type
            // @todo - let gulp merge all elements so
            // we have singe request here
            OP3.Designer.types().forEach(function(item) {
                if (item.type.substr(0, 1) !== "_")
                    assets.push('<link href="' + base + '/css/elements/' + item.type + '/op3-element.css" type="text/css" rel="stylesheet" />');
            });

            // sometimes rocketloader blocks jQuery
            // loading (it loads it async, after
            // iframe), so we're gonna add jQuery
            // to assets as well, making sure that
            // we don't get any exceptions
            if (!win.jQuery)
                assets.push('<script src="' + base + '/js/jquery.js" type="text/javascript" />');

            //
            // append assets to dom
            // (not using jquery here be cause it does
            // not work - synchronous xmlhttprequest
            // on the main thread is deprecated)
            assets.forEach(function(item) {
                var div = doc.createElement("div");
                div.innerHTML = item;

                // use temp element so we can add
                // attributes (src/href) after we
                // bind load event
                var temp = div.firstChild,
                    attrs = temp.attributes,
                    node = doc.createElement(temp.tagName);

                node.addEventListener("load", that._handleFrameAssetsLoad, false);
                node.addEventListener("error", that._handleFrameAssetsError, false);

                for (var i = 0; i < attrs.length; i++) {
                    node.setAttribute(attrs[i].name, attrs[i].value);
                }

                doc.head.appendChild(node);
            });
        },

        /**
         * Temporary element iframe error
         * event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameError: function(e) {
            var error = $(this).data("op3-screenshot-error");
            if (typeof error === "function")
                error.call(that, "OP3.Screenshot - unable to load iframe.")
        },

        /**
         * Iframe asset(s) load
         * event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameAssetsLoad: function(e) {
            var doc = this.ownerDocument,
                win = doc.defaultView,
                frame = win.frameElement;

            // no assets list, error occurred?
            var assets = $(frame).data("op3-screenshot-assets");
            if (!assets)
                return;

            // wait until all assets are loaded
            assets.shift();
            if (assets.length)
                return;

            // execute prepared handler
            that._handleFramePrepared.call(frame, e);

            // wait for all images to load
            that._handleFrameImagesLoad.call(frame, e);
        },

        /**
         * Iframe asset(s) error
         * event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameAssetsError: function(e) {
            var target = this,
                doc = target.ownerDocument,
                win = doc.defaultView,
                frame = win.frameElement;

            // error already occurred?
            if (!$(frame).data("op3-screenshot-assets"))
                return;

            // clear assets list, so success/error
            // handler won't trigger
            $(frame).data("op3-screenshot-assets", null);

            // error handler
            var callback = $(frame).data("op3-screenshot-error");
            if (typeof callback === "function")
                callback();
            else
                setTimeout(function() {
                    throw "OP3-Screenshot - unable to load asset " + ($(target).attr("href") || $(target).attr("src")) + ".";
                });
        },

        /**
         * Iframe ready event handler:
         * execute custom events
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared: function(e) {
            var keys = Object.keys(that);
            for (var i = 0; i < keys.length; i++) {
                if (!/^_handleFramePrepared_/.test(keys[i]))
                    continue;

                that[keys[i]].apply(this, arguments);
            }
        },

        /**
         * Iframe ready event handler:
         * add class to #op3-designer-element
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_designerElementClass: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            jq(doc.documentElement)
                .addClass("op3-screenshot");
        },

        /**
         * Iframe ready event handler:
         * if current element is changed and page
         * not saved we need to clone it to iframe
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_anElementRefresh: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                method = $(frame).data("op3-screenshot-method");

            // page not changed, nothing to do
            if (!that.changed())
                return;

            // element to replace
            var $replace = $(null);
            if (method === "page" || method === "template")
                $replace = OP3.Designer.$ui.parent;
            else
                $replace = OP3.Designer.$ui.parent.find('.op3-element[data-op3-uuid="' + method + '"]');

            // replace section on which element is on
            if ($replace.is(".op3-element")) {
                var $closest = $replace.parents(".op3-element").last();
                if ($closest.length)
                    $replace = $closest;
            }

            // clone element
            var jq = win.jQuery,
                $ref = jq("#" + $replace.attr("id")),
                html = $replace.get(0).outerHTML,
                $clone = jq(html);

            // remove old section and append new one
            if ($ref.length) {
                $clone.insertAfter($ref)
                $ref.remove();
            }
            else
                $clone.appendTo("#op3-designer-element > [data-op3-children]")

            // make sure new stylesheet is applied
            // (it would be nice if we could use style's
            // innerHTML property, but changing cssRules
            // does not trigger innerHTML change, so we
            // need to iterate rules and create our own
            // rules list...
            OP3.Designer.$ui.stylesheet.each(function() {
                var sheet = doc.createElement("style");
                for (var i = 0; i < this.attributes.length; i++) {
                    var attr = this.attributes[i],
                        name = attr.name,
                        value = attr.value;

                    sheet.setAttribute(name, value);
                }

                var rules = "";
                for (var i = 0; i < this.sheet.cssRules.length; i++) {
                    rules += this.sheet.cssRules[i].cssText + "\n";
                }

                jq(sheet)
                    .html(rules)
                    .appendTo('head');
            });
        },

        /**
         * Iframe ready event handler:
         * remove wordpress' adminbar
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_wpAdminBar: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            // use some kung-fu scripting
            var $style = jq(doc).find('style[type="text/css"][media="print"]').filter(function() {
                return /#wpadminbar/.test(jq(this).html());
            });
            jq("#wpadminbar")
                .add($style)
                .add($style.next())
                .remove();
        },

        /**
         * Iframe ready event handler:
         * make sure that screenshot element
         * has no display:none
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_displayBlock: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                method = $(frame).data("op3-screenshot-method");
            if (method === "page" || method === "template")
                return;

            var jq = win.jQuery,
                node = jq('.op3-element[data-op3-uuid="' + method + '"]').get(0);

            $(node)
                .parents(".op3-element")
                .add(node)
                .css("display", "block");
        },

        /**
         * Iframe ready event handler:
         * set element styling
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_styling: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                method = $(frame).data("op3-screenshot-method"),
                node = null;

            if (method === "page")
                node = doc.body;
            else if (method === "template")
                node = doc.getElementById("op3-designer-element");
            else
                node = doc.getElementById("op3-element-" + method);

            if (!node)
                return;

            node.style.setProperty("margin", "0", "important");
            node.style.setProperty("overflow", "hidden", "important");
        },

        /**
         * Iframe ready event handler:
         * dom-to-image renders the ::placeholder
         * pseudo-element with the same color as
         * input element, so we're gonna add
         * value to input and set color to
         * the one set in pseudo-element
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_inputPlaceholder: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            jq('input[value=""][placeholder]:not([placeholder=""]), textarea[value][placeholder]:not([placeholder=""])')
                .each(function() {
                    // getComputedStyle on ::placeholder
                    // pseudo-element is not working in
                    // all browsers
                    var pseudo = null;
                    if (/firefox/i.test(win.navigator.userAgent))
                        pseudo = "::placeholder";
                    //else if (/edge/i.test(win.navigator.userAgent))
                    //    pseudo = "::-ms-input-placeholder";

                    // since getComputedStyle on ::placeholder
                    // pseudo-element is not working on all
                    // browsers, we're gonna use current
                    // color and 0.5 opacity as fallback
                    var style = this.ownerDocument.defaultView.getComputedStyle(this, pseudo),
                        color = style.getPropertyValue("color"),
                        opacity = pseudo ? style.getPropertyValue("opacity") : "0.5";

                    // parse color
                    var match, r,g,b,a;
                    if (!match) {
                        match = color.match(/rgb\((.*?),\s*(.*?),\s*(.*?)\)/);
                        if (match) {
                            r = match[1];
                            g = match[2];
                            b = match[3];
                            a = 1;
                        }
                    }
                    if (!match) {
                        match = color.match(/rgba\((.*?),\s*(.*?),\s*(.*?),\s*(.*?)\)/);
                        if (match) {
                            r = match[1];
                            g = match[2];
                            b = match[3];
                            a = match[4];
                        }
                    }
                    if (!match)
                        return;

                    // set value with new color
                    var text = $(this).attr("placeholder"),
                        color = "rgba(" + r + ", " + g + ", " + b + ", " + (a * opacity) + ")";
                    jq(this)
                        .val(text)
                        .css("color", color)
                        .css("-webkit-text-fill-color", color);
                });
        },

        /**
         * Iframe ready event handler:
         * iframe with cross-origin src can not be
         * rendered with dom-to-image, so we're
         * gonna replace iframe with some
         * placeholders (op3 elements
         * thumbs)
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_iframePlaceholder: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            jq(".op3-element iframe")
                .each(function() {
                    jq("<div />")
                        .attr("class", "op3-element-iframe-placeholder")
                        .insertAfter(this);

                    jq(this)
                        .remove();
                });
        },

        /**
         * Iframe ready event handler:
         * remove elements that may cause errors
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_removeUnnecessary: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            jq(".op3-element .op3-screenshot-force-remove").remove();
        },

        /**
         * Iframe ready event handler:
         * load images by our proxy service
         * to prevent cors origin errors
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFramePrepared_proxyImages: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView,
                jq = win.jQuery;

            // set selector: images that src attribute
            // starts with http/https (but not on
            // current domain)
            var domain = window.location.hostname,
                selector = '';
            [ "//", "http://", "https://" ].forEach(function(protocol) {
                selector += (selector ? "," : "")
                    + 'img'
                    + '[src^="' + protocol + '"]'
                    + ':not([src^="' + protocol + domain + '"])';
            });

            // find all images on page and replace
            // src attribute
            jq(selector)
                .attr("src", function() {
                    var src = $(this).attr("src"),
                        url = OP3.Meta.resources + "/views/image?url=" + encodeURIComponent(src);

                    return url;
                });
        },

        /**
         * Iframe images load
         * event handler:
         * wait all images to load before
         * taking screenshot
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameImagesLoad: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView;

            // get image list
            var assets = $(frame).data("op3-screenshot-images");
            if (!assets) {
                assets = $(doc).find("img");

                $(frame).data("op3-screenshot-images", assets);
                $(frame).data("op3-screenshot-image-load-check", 0);
            }

            // filter not-loaded ones
            assets = assets.filter(function() {
                return !this.complete;
            });
            $(frame).data("op3-screenshot-images", assets);

            // not all images loaded, check again later
            // (use maxCheckTime for timeout)
            var delay = 250,
                maxCheckTime = 20;
            if (assets.length && $(frame).data("op3-screenshot-image-load-check") <= maxCheckTime)
                return setTimeout(function() {
                    that._handleFrameImagesLoad.call(this, e);
                }.bind(this), delay);

            // all images loaded (or timedout),
            // let's make screenshot
            that._handleFrameReady.call(this, e);
        },

        /**
         * Iframe ready event handler:
         * take screenshot
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFrameReady: function(e) {
            var frame = this,
                doc = frame.contentWindow.document,
                win = doc.defaultView;

            // get screenshot node
            var node, method = $(frame).data("op3-screenshot-method");
            if (method === "page")
                node = doc.body;
            else if (method === "template")
                node = doc.getElementById("op3-designer-element");
            else
                node = doc.getElementById("op3-element-" + method);

            // node not found, throw exception
            if (!node) {
                that._handleLibError.call(frame, e);
                throw "OP3.Screenshot - can not find element with " + node + " uuid";
            }

            // dom-to-image library options:
            // lib uses node's scrollWidth/scrollHeight as
            // svg size which, in our case, is not ok (it
            // displays column gutters). let's force size
            // to prevent this.
            // addition: disabling background color because
            // it messes with element background (background
            // color will be set on lib success callback with
            // _imageConvert method).
            var lib = win.domtoimage,
                options = {
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                    //bgcolor: that._config.bgColor,
                };

            lib.toSvg(node, options)
                .then(that._handleLibSuccess.bind(frame))
                .catch(that._handleLibError.bind(frame))
                .finally(that._handleLibClean.bind(frame));
        },

        /**
         * Library dom-to-image.js success
         * event handler (promise's then)
         *
         * @param  {String} dataUrl
         * @return {Void}
         */
        _handleLibSuccess: function(dataUrl) {
            var success = $(this).data("op3-screenshot-success"),
                error = $(this).data("op3-screenshot-error");
            if (typeof success !== "function")
                return;

            // @todo - do some svg fixes
            // rating element has style appended to defs
            // (which contains path/use) node
            //var parse = that._imageDataUrlParse(dataUrl);
            //var $element = $(parse.contentData)
            //$element
            //    .find('[data-op3-element-type="rating"]')
            //    .find("defs path, defs use")
            //    .attr("style", "");
            //dataUrl = "data:" + parse.contentType + "," + $element.get(0).outerHTML;
            //// NOTE: this is just a quickfix
            dataUrl = dataUrl
                .replace(/(<svg\s+[^>]*?class="rating-svg"[\s\S]*?<path\s+[^>]*?)style=".*?"/g, "$1")
                .replace(/(<svg\s+[^>]*?class="rating-svg"[\s\S]*?<use\s+[^>]*?)style=".*?"/g, "$1");

            that._loadImage(dataUrl, function(srcImage) {
                if (/image\/svg/.test(that._config.contentType))
                    return success.call(that, srcImage);

                that._imageConvert(srcImage, that._config.contentType, success, error);
            }, error);
        },

        /**
         * Library dom-to-image.js error
         * event handler (promise's catch)
         *
         * @param  {Mixed} e
         * @return {Void}
         */
        _handleLibError: function(e) {
            var callback = $(this).data("op3-screenshot-error");
            if (typeof callback === "function")
                callback();
            else
                setTimeout(function() {
                    throw "OP3.Screenshot - " + (typeof e === "string" ? e : "unknown error");
                });
        },

        /**
         * Library dom-to-image.js clean
         * event handler (promise's finally):
         * remove temporary iframe element
         *
         * @return {Void}
         */
        _handleLibClean: function() {
            $(this)
                .closest(".op3-screenshot-wrapper")
                .remove();
        },

    }

    // globalize
    window.OP3.Screenshot = that;

    // link designer
    OP3.bind("load::designer", function(e, o) {
        e.origin.Screenshot = that;
    });

    // add screenshot methods to op3 element/document
    OP3.bind("ready", function(e, o) {
        var op3 = OP3.Designer.ownerDocument.defaultView.OP3;
        op3.Elements._extension.type.Default.prototype.screenshot = function(success, error) {
            var elSuccess = success,
                elError = error;
            if (typeof elSuccess === "function")
                elSuccess = elSuccess.bind(this);
            if (typeof elError === "function")
                elError = elError.bind(this);

            if (this === OP3.Document)
                OP3.Screenshot.template(elSuccess, elError);
            else
                OP3.Screenshot.element(this, elSuccess, elError);
        }
        op3.Elements._extension.type.Default.prototype.thumbnail = function(success, error) {
            var elSuccess = success,
                elError = error;
            if (typeof elSuccess === "function")
                elSuccess = elSuccess.bind(this);
            if (typeof elError === "function")
                elError = elError.bind(this);

            if (this === OP3.Document)
                OP3.Screenshot.thumbTemplate(elSuccess, elError);
            else
                OP3.Screenshot.thumbElement(this, elSuccess, elError);
        }
    });

    /**
     * Document has changes
     *
     * We can not track OP3.Designer.changes()
     * because it records only changes in
     * history (and global elements edit mode
     * detaches the history). So we're using
     * our own flag here.
     *
     * @type {Boolean}
     */
    var _changed = false;

    OP3.bind("elementgidupdate", function(e, o) {
        _changed = true;
    });

    OP3.bind("saving", function(e, o) {
        _changed = false;
    });

})(jQuery, window, document);
