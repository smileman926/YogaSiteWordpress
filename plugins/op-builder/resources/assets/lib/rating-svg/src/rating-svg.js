;(function(window, document) {

    // strict mode
    "use strict";

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
     * Initialize RatingSVG
     *
     * @param  {Object} options see RatingSVG.prototype._defaults
     * @return {Void}
     */
    var RatingSVG = function(options) {
        if (!(this instanceof RatingSVG))
            throw "RatingSVG: RatingSVG is a constructor.";

        this._options = options;
        this._ui = null;

        this._init();
    }

    /**
     * Initialize RatingSVG instance from
     * SVG Node
     *
     * @param  {Node}  node
     * @return {Mixed}
     */
    RatingSVG.fromNode = function(node) {
        if (!(node instanceof Node))
            return null;
        if (node.tagName.toLowerCase() !== "svg")
            return null;
        if (node._ratingSVG instanceof RatingSVG)
            return node._ratingSVG;

        // create new
        var result = new RatingSVG();

        // get ui from svg node and
        // options from ui
        try {
            result._ui = {
                parent: node,
                patternBase: node.querySelector('[id^="pattern-base"]'),
                patternFilled: node.querySelector('[id^="pattern-filled"]'),
                patternFilledChild: node.querySelector('[id^="pattern-filled"] use'),
                patternEmpty: node.querySelector('[id^="pattern-empty"]'),
                patternEmptyChild: node.querySelector('[id^="pattern-empty"] use'),
                canvasFilled: node.querySelector('[id^="canvas-filled"]'),
                canvasEmpty: node.querySelector('[id^="canvas-empty"]'),
            }
            for (var el in result._ui) {
                if (!el)
                    throw "";
            }

            result._options = result._parseOptions();
        }
        catch(e) {
            return null;
        }

        result._element = node;
        node._ratingSVG = result;

        return result;
    }

    /**
     * RatingSVG prototype
     *
     * @type {Object}
     */
    _extend(RatingSVG.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            idSuffix: null,
            patternId: "star",
            patternUrl: "rating-svg.svg",
            fillColor: "#ff0",
            fillColor2: "#eee",
            strokeColor: "#ffa500",
            strokeWidth: 2,
            count: 5,
            rate: 2.5,
            padding: 0,
            offset: 0,
            preserveAspectRatio: "xMidYMid meet",
        },

        /**
         * Config
         *
         * @type {Object}
         */
        _config: {
            baseWidth: 32,
            paddingValue: 3,
            offsetValue: 3,
            minStrokeWidth: 0,
            maxStrokeWidth: 3,
            stepStrokeWidth: 1,
            minCount: 1,
            maxCount: 10,
            stepCount: 1,
            minRate: 0,
            maxRate: 10,
            stepRate: 0.5,
            minPadding: 0,
            maxPadding: 10,
            stepPadding: 1,
            minOffset: 0,
            maxOffset: 10,
            stepOffset: 1,
        },

        /**
         * SVG namespace
         *
         * @type {Object}
         */
        _ns: {
            xlink: "http://www.w3.org/1999/xlink",
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            this._options = _extend({}, this._defaults, this._options);

            // @todo - validate options
            if (this._options.idSuffix === null)
                this._options.idSuffix = this._getRandom();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            if (this._ui && this._ui.parent && this._ui.parent.parentNode)
                this._ui.parent.parentNode.removeChild(this._ui.parent);
            if (this._ui && this._ui.parent)
                delete this._ui.parent._ratingSVG;

            this._options = null;
            this._ui = null;
        },

        /**
         * Convert value to color
         * (null on fail)
         *
         * @param  {String} value
         * @return {Mixed}
         */
        _toColor: function(value) {
            var div = document.createElement("div");
            div.style.display = "none";
            document.body.appendChild(div);

            // 1st validate
            div.style.color = "red";
            div.style.color = value;
            var valid1 = window.getComputedStyle(div, null).getPropertyValue("color");

            // 2nd validate
            div.style.color = "green";
            div.style.color = value;
            var valid2 = window.getComputedStyle(div, null).getPropertyValue("color");

            // clear
            document.body.removeChild(div);

            // valid color
            if (valid1 === valid2)
                return valid1;

            // invalid color
            return null;
        },

        /**
         * Get random string
         *
         * @return {String}
         */
        _getRandom: function() {
            return Math.random().toString(36).substring(5);
        },

        /**
         * Get SVG nodes position/size
         * from options/config
         *
         * @return {String}
         */
        _getRect: function() {
            var padding = this.getOption("padding"),
                offset = this.getOption("offset"),
                count = this.getOption("count"),
                rate = this.getOption("rate"),
                strokeWidth = this.getOption("strokeWidth"),
                strokeHalf = strokeWidth/2,
                baseWidth = this._config.baseWidth,
                paddingValue = this._config.paddingValue,
                paddingReal = padding * paddingValue,
                offsetValue = this._config.offsetValue,
                offsetReal = offset * offsetValue,
                parentWidth = (paddingReal + strokeWidth + baseWidth)*count + offsetReal*(count - 1) + paddingReal,
                parentHeight = paddingReal + strokeWidth + baseWidth + paddingReal,
                patternXY = paddingReal + strokeHalf,
                patternWidth = paddingReal + strokeWidth + baseWidth + offsetReal,
                filledWidth = (strokeWidth + baseWidth)*rate + Math.ceil(rate)*paddingReal + Math.floor(rate)*offsetReal,
                emptyWidth = Math.max(0, parentWidth - filledWidth);

            return {
                parent: {
                    left: 0,
                    top: 0,
                    width: parentWidth,
                    height: parentHeight,
                },
                patternBase: {
                    left: patternXY,
                    top: patternXY,
                    width: null,
                    height: null,
                },
                patternFilled: {
                    left: null,
                    top: null,
                    width: patternWidth,
                    height: parentHeight,
                },
                patternEmpty: {
                    left: null,
                    top: null,
                    width: patternWidth,
                    height: parentHeight,
                },
                canvasFilled: {
                    left: 0,
                    top: 0,
                    width: filledWidth,
                    height: parentHeight,
                },
                canvasEmpty: {
                    left: filledWidth,
                    top: 0,
                    width: emptyWidth,
                    height: parentHeight,
                },
            }
        },

        /**
         * Get options from SVG nodes
         * position/size
         *
         * @return {Object}
         */
        _parseOptions: function() {
            var idSuffix = this._ui.patternBase.getAttribute("id").replace(/^pattern-base/, ""),
                patternHref = this._ui.patternBase.getAttribute("xlink:href").split("#"),
                patternUrl = patternHref[0],
                patternId = patternHref[1],
                fillColor = this._ui.patternFilledChild.getAttribute("fill"),
                fillColor2 = this._ui.patternEmptyChild.getAttribute("fill"),
                strokeColor = this._ui.patternBase.getAttribute("stroke"),
                strokeWidth = this._ui.patternBase.getAttribute("stroke-width")*1,
                baseWidth = this._config.baseWidth,
                paddingValue = this._config.paddingValue,
                offsetValue = this._config.offsetValue,
                parentWidth = this._ui.parent.getAttribute("width")*1,
                parentHeight = this._ui.parent.getAttribute("height")*1,
                patternWidth = this._ui.patternFilled.getAttribute("width")*1,
                filledWidth = this._ui.canvasFilled.getAttribute("width")*1,
                padding = (strokeWidth + baseWidth - parentHeight) / (-2 * paddingValue),
                paddingReal = padding * paddingValue,
                offset = (patternWidth - paddingReal - strokeWidth - baseWidth) / offsetValue,
                offsetReal = offset * offsetValue,
                count = null,
                rate = null,
                preserveAspectRatio = this._ui.parent.getAttribute("preserveAspectRatio"); 

            // @todo - use math to solve this,
            // don't play guessing game
            for (var i = this._config.minCount; i <= this._config.maxCount; i = i + this._config.stepCount) {
                if (parentWidth === (paddingReal + strokeWidth + baseWidth)*i + offsetReal*(i - 1) + paddingReal) {
                    count = i;
                    break;
                }
            }
            for (var i = this._config.minRate; i <= this._config.maxRate; i = i + this._config.stepRate) {
                if (filledWidth === (strokeWidth + baseWidth)*i + Math.ceil(i)*paddingReal + Math.floor(i)*offsetReal) {
                    rate = i;
                    break;
                }
            }

            // i suck at math
            if (count === null)
                count = this._defaults.count;
            if (rate === null)
                rate = this._defaults.rate;

            return {
                idSuffix: idSuffix,
                patternUrl: patternUrl,
                patternId: patternId,
                fillColor: fillColor,
                fillColor2: fillColor2,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                count: count,
                rate: rate,
                padding: padding,
                offset: offset,
                preserveAspectRatio: preserveAspectRatio,
            }
        },

        /**
         * Element getter
         *
         * @return {Node}
         */
        get element() {
            if (!this._ui || !this._ui.parent) {
                // create element from template
                var div = document.createElement("div");
                div.innerHTML = this.html();

                // store this to node's _ratingSVG property
                var element = div.firstChild;
                element._ratingSVG = this;

                // child nodes
                this._ui = {
                    parent: element,
                    patternBase: element.querySelector('[id^="pattern-base"]'),
                    patternFilled: element.querySelector('[id^="pattern-filled"]'),
                    patternFilledChild: element.querySelector('[id^="pattern-filled"] use'),
                    patternEmpty: element.querySelector('[id^="pattern-empty"]'),
                    patternEmptyChild: element.querySelector('[id^="pattern-empty"] use'),
                    canvasFilled: element.querySelector('[id^="canvas-filled"]'),
                    canvasEmpty: element.querySelector('[id^="canvas-empty"]'),
                }

                // detach
                element.parentNode.removeChild(element);
            }

            return this._ui.parent;
        },

        /**
         * Get SVG template
         *
         * @return {String}
         */
        html: function() {
            var replace = {
                rect: this._getRect(),
                ns: {
                    xlink: this._ns.xlink,
                },
                option: {
                    patternId: this.getOption("patternId"),
                    patternUrl: this.getOption("patternUrl"),
                    idSuffix: this.getOption("idSuffix") || "",
                    fillColor: this.getOption("fillColor"),
                    fillColor2: this.getOption("fillColor2"),
                    strokeColor: this.getOption("strokeColor"),
                    strokeWidth: this.getOption("strokeWidth"),
                    preserveAspectRatio: this.getOption("preserveAspectRatio"),
                },
            };

            var template = ''
                + '<svg class="rating-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="{{ns.xlink}}" width="{{rect.parent.width}}" height="{{rect.parent.height}}" viewBox="{{rect.parent.left}} {{rect.parent.top}} {{rect.parent.width}} {{rect.parent.height}}" preserveAspectRatio="{{option.preserveAspectRatio}}">'
                + '<defs>'
                + '<use id="pattern-base{{option.idSuffix}}" xlink:href="{{option.patternUrl}}#{{option.patternId}}" x="{{rect.patternBase.left}}" y="{{rect.patternBase.top}}" stroke="{{option.strokeColor}}" stroke-width="{{option.strokeWidth}}" />'
                + '<pattern id="pattern-filled{{option.idSuffix}}" width="{{rect.patternFilled.width}}" height="{{rect.patternFilled.height}}" patternUnits="userSpaceOnUse">'
                + '<use xlink:href="#pattern-base{{option.idSuffix}}" fill="{{option.fillColor}}" />'
                + '</pattern>'
                + '<pattern id="pattern-empty{{option.idSuffix}}" width="{{rect.patternEmpty.width}}" height="{{rect.patternEmpty.height}}" patternUnits="userSpaceOnUse">'
                + '<use xlink:href="#pattern-base{{option.idSuffix}}" fill="{{option.fillColor2}}" />'
                + '</pattern>'
                + '</defs>'
                + '<rect id="canvas-filled{{option.idSuffix}}" x="{{rect.canvasFilled.left}}" y="{{rect.canvasFilled.top}}" width="{{rect.canvasFilled.width}}" height="{{rect.canvasFilled.height}}" fill="url(#pattern-filled{{option.idSuffix}})" />'
                + '<rect id="canvas-empty{{option.idSuffix}}" x="{{rect.canvasEmpty.left}}" y="{{rect.canvasEmpty.top}}" width="{{rect.canvasEmpty.width}}" height="{{rect.canvasEmpty.height}}" fill="url(#pattern-empty{{option.idSuffix}})" />'
                + '</svg>';

            return template
                .replace(/{{(.*?)}}/g, function(match, group) {
                    var result = replace;
                    group.split(".").forEach(function(item) {
                        result = result[item];
                    });

                    return result;
                });
        },

        /**
         * Get option
         *
         * @param  {String} key
         * @return {Mixed}
         */
        getOption: function(key) {
            if (!key || !(key in this._options))
                return null;

            return this._options[key];
        },

        /**
         * Set option
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Void}
         */
        setOption: function(key, value) {
            if (!key || !(key in this._options))
                return;

            // validation
            var cckey = key.charAt(0).toUpperCase() + key.slice(1);
            if (key.indexOf("Color") !== -1) {
                value = this._toColor(value);
                if (!value)
                    return;
            }
            if (("min" + cckey) in this._config) {
                var config = this._config["min" + cckey];
                value = value*1 || 0;
                value = Math.max(value, config);
            }
            if (("max" + cckey) in this._config) {
                var config = this._config["max" + cckey];
                value = value*1 || 0;
                value = Math.min(value, config);
            }
            if (("step" + cckey) in this._config) {
                var config = this._config["step" + cckey],
                    inv = 1.0/config;
                value = value*1 || 0;
                value = Math.round(value * inv) / inv;
            }
            if (key === "idSuffix") {
                if (value === null)
                    value = this._getRandom();
                value = value.toString().replace(/[^a-zA-Z0-9_-]/, "");
            }
            if (key === "patternId" && !value)
                return;
            if (key === "rate") {
                var config = this.getOption("count");
                value = value*1 || 0;
                if (value > config)
                    value = config;
            }
            if (key === "count") {
                var config = this.getOption("rate");
                value = value*1 || 0;
                if (value < config)
                    this.setOption("rate", value);
            }

            // no change
            if (this._options[key] === value)
                return;

            // set
            this._options[key] = value;

            // trigger change
            this._handleOptionChange(key, value);
        },

        /**
         * Recreate SVG node
         *
         * @return {Void}
         */
        refresh: function() {
            if (!this._ui || !this._ui.parent || !this._ui.parent.parentNode)
                return;

            var target = this._ui.parent;
            this._ui.parent = null;

            target.parentNode.insertBefore(this.element, target);
            target.parentNode.removeChild(target);
        },

        /**
         * Handle option change
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Void}
         */
        _handleOptionChange: function(key, value) {
            if (!this._ui.parent)
                return;

            var cckey = key.charAt(0).toUpperCase() + key.slice(1);
            if (typeof this["_handleOptionChange" + cckey] === "function")
                this["_handleOptionChange" + cckey](value);

            // there are some problems on chrome with
            // html5+svg with dynamic options, so we
            // have gonna replace entire node to
            // force repaint
            this.refresh();
        },

        /**
         * Handle option change for property
         * idSuffix
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangeIdSuffix: function(value) {
            this._ui.patternBase.setAttribute("id", "pattern-base" + value);
            this._ui.patternFilled.setAttribute("id", "pattern-filled" + value);
            this._ui.patternFilledChild.setAttributeNS(this._ns.xlink, "href", "#pattern-base" + value);
            this._ui.patternEmpty.setAttribute("id", "pattern-empty" + value);
            this._ui.patternEmptyChild.setAttributeNS(this._ns.xlink, "href", "#pattern-base" + value);
            this._ui.canvasFilled.setAttribute("id", "canvas-filled" + value);
            this._ui.canvasFilled.setAttribute("fill", "url(#pattern-filled" + value + ")");
            this._ui.canvasEmpty.setAttribute("id", "canvas-empty" + value);
            this._ui.canvasEmpty.setAttribute("fill", "url(#pattern-empty" + value + ")");
        },

        /**
         * Handle option change for property
         * patternId
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangePatternId: function(value) {
            var patternUrl = this.getOption("patternUrl");
            this._ui.patternBase.setAttributeNS(this._ns.xlink, "href", patternUrl + "#" + value);
        },

        /**
         * Handle option change for property
         * patternUrl
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangePatternUrl: function(value) {
            var patternId = this.getOption("patternId");
            this._ui.patternBase.setAttributeNS(this._ns.xlink, "href", value + "#" + patternId);
        },

        /**
         * Handle option change for property
         * fillColor
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangeFillColor: function(value) {
            this._ui.patternFilledChild.setAttribute("fill", value);
        },

        /**
         * Handle option change for property
         * fillColor2
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangeFillColor2: function(value) {
            this._ui.patternEmptyChild.setAttribute("fill", value);
        },

        /**
         * Handle option change for property
         * strokeColor
         *
         * @param  {String} value
         * @return {Void}
         * /
        _handleOptionChangeStrokeColor: function(value) {
            this._ui.patternBase.setAttribute("stroke", value);
        },

        /**
         * Handle option change for property
         * strokeWidth
         *
         * @param  {Number} value
         * @return {Void}
         * /
        _handleOptionChangeStrokeWidth: function(value) {
            var rect = this._getRect();
            this._ui.parent.setAttribute("width", rect.parent.width);
            this._ui.parent.setAttribute("height", rect.parent.height);
            this._ui.parent.setAttribute("viewBox", rect.parent.left + " " + rect.parent.top + " " + rect.parent.width + " " + rect.parent.height);
            this._ui.patternBase.setAttribute("x", rect.patternBase.left);
            this._ui.patternBase.setAttribute("y", rect.patternBase.top);
            this._ui.patternBase.setAttribute("stroke-width", value);
            this._ui.patternFilled.setAttribute("width", rect.patternFilled.width);
            this._ui.patternFilled.setAttribute("height", rect.patternFilled.height);
            this._ui.patternEmpty.setAttribute("width", rect.patternEmpty.width);
            this._ui.patternEmpty.setAttribute("height", rect.patternEmpty.height);
            this._ui.canvasFilled.setAttribute("x", rect.canvasFilled.left);
            this._ui.canvasFilled.setAttribute("y", rect.canvasFilled.top);
            this._ui.canvasFilled.setAttribute("width", rect.canvasFilled.width);
            this._ui.canvasFilled.setAttribute("height", rect.canvasFilled.height);
            this._ui.canvasEmpty.setAttribute("x", rect.canvasEmpty.left);
            this._ui.canvasEmpty.setAttribute("y", rect.canvasEmpty.top);
            this._ui.canvasEmpty.setAttribute("width", rect.canvasEmpty.width);
            this._ui.canvasEmpty.setAttribute("height", rect.canvasEmpty.height);
        },

        /**
         * Handle option change for property
         * count
         *
         * @param  {Number} value
         * @return {Void}
         * /
        _handleOptionChangeCount: function(value) {
            var rect = this._getRect();
            this._ui.parent.setAttribute("width", rect.parent.width);
            this._ui.parent.setAttribute("viewBox", rect.parent.left + " " + rect.parent.top + " " + rect.parent.width + " " + rect.parent.height);
            this._ui.canvasFilled.setAttribute("width", rect.canvasFilled.width);
            this._ui.canvasEmpty.setAttribute("width", rect.canvasEmpty.width);
        },

        /**
         * Handle option change for property
         * rate
         *
         * @param  {Number} value
         * @return {Void}
         * /
        _handleOptionChangeRate: function(value) {
            var rect = this._getRect();
            this._ui.canvasFilled.setAttribute("x", rect.canvasFilled.left);
            this._ui.canvasFilled.setAttribute("width", rect.canvasFilled.width);
            this._ui.canvasEmpty.setAttribute("x", rect.canvasEmpty.left);
            this._ui.canvasEmpty.setAttribute("width", rect.canvasEmpty.width);
        },

        /**
         * Handle option change for property
         * padding
         *
         * @param  {Number} value
         * @return {Void}
         * /
        _handleOptionChangePadding: function(value) {
            var rect = this._getRect();
            this._ui.parent.setAttribute("width", rect.parent.width);
            this._ui.parent.setAttribute("height", rect.parent.height);
            this._ui.parent.setAttribute("viewBox", rect.parent.left + " " + rect.parent.top + " " + rect.parent.width + " " + rect.parent.height);
            this._ui.patternBase.setAttribute("x", rect.patternBase.left);
            this._ui.patternBase.setAttribute("y", rect.patternBase.top);
            this._ui.patternFilled.setAttribute("width", rect.patternFilled.width);
            this._ui.patternFilled.setAttribute("height", rect.patternFilled.height);
            this._ui.patternEmpty.setAttribute("width", rect.patternEmpty.width);
            this._ui.patternEmpty.setAttribute("height", rect.patternEmpty.height);
            this._ui.canvasFilled.setAttribute("x", rect.canvasFilled.left);
            this._ui.canvasFilled.setAttribute("y", rect.canvasFilled.top);
            this._ui.canvasFilled.setAttribute("width", rect.canvasFilled.width);
            this._ui.canvasFilled.setAttribute("height", rect.canvasFilled.height);
            this._ui.canvasEmpty.setAttribute("x", rect.canvasEmpty.left);
            this._ui.canvasEmpty.setAttribute("y", rect.canvasEmpty.top);
            this._ui.canvasEmpty.setAttribute("width", rect.canvasEmpty.width);
            this._ui.canvasEmpty.setAttribute("height", rect.canvasEmpty.height);
        },

        /**
         * Handle option change for property
         * offset
         *
         * @param  {Number} value
         * @return {Void}
         * /
        _handleOptionChangeOffset: function(value) {
            var rect = this._getRect();
            this._ui.parent.setAttribute("width", rect.parent.width);
            this._ui.parent.setAttribute("viewBox", rect.parent.left + " " + rect.parent.top + " " + rect.parent.width + " " + rect.parent.height);
            this._ui.patternBase.setAttribute("x", rect.patternBase.left);
            this._ui.patternFilled.setAttribute("width", rect.patternFilled.width);
            this._ui.patternEmpty.setAttribute("width", rect.patternEmpty.width);
            this._ui.canvasFilled.setAttribute("x", rect.canvasFilled.left);
            this._ui.canvasFilled.setAttribute("width", rect.canvasFilled.width);
            this._ui.canvasEmpty.setAttribute("x", rect.canvasEmpty.left);
            this._ui.canvasEmpty.setAttribute("width", rect.canvasEmpty.width);
        },

        /* --- */

    });

    // globalize
    window.RatingSVG = RatingSVG;

})(window, document);
