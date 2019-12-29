/**
 * OptimizePress3 element type:
 * op3 element type boxmodel manipulation.
 *
 * !!! IMPORTANT !!!
 * When using boxmodel property, include margin/padding properties
 * after boxmodel property in the code, and marginTop sure you use
 * all margin / padding properties (marginTop, marginBottom,
 * marginLeft, marginRight, paddingTop, paddingBottom,
 * paddingLeft, paddingRight)
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="boxModel"]';

    /**
     * UI elements
     *
     * @type {Object}
     */
    var _ui = {};

    /**
     * Helper object to store some data
     * accross this module
     *
     * @type {Array}
     */
    var _data = [];

    /**
     * Initialize the boxmodel
     * for an $input field
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _refresh = function(e, o) {
        var $inputs = $(o.parent).find(_selector);

        $inputs.each(function() {
            if (!$(this).attr("id"))
                $(this).attr("id", $(this).closest("[data-op3-element-options-type]").attr("data-op3-element-options-type") + "-" + $(this).attr("data-op3-element-options-property-id"));

            // General elements
            var $this = $(this);
            var id = $(this).attr("id");

            _data[id] = {};
            _data[id].id = $(this).attr("data-op3-element-options-property-id");

            _init_boxmodel(id, $this);
        });
    }

    /**
     * @param  {String} id
     * @param  {Object} $this
     * @return {Void}
     */
    var _init_boxmodel = function(id, $this) {
        // If this input is already initialized,
        // continue to the next item in each
        if ($this.attr("data-property-type-initialized"))
            return true;

        // UI elements
        _data[id].$boxModel = $this
            .closest('.op3-element-options-property[data-op3-element-options-property-name="boxModel"]')
            .hide();

        _data[id].$boxModelFields = _data[id]
            .$boxModel
            .nextAll('.op3-element-options-property:lt(8)');

        /**
        * Current active margin / padding handle
        *
        * @type {String}
        */
        _data[id].handler = null;

        /**
         * We mark the positions of the cursor here
         * to know how much it has been dragged
         *
         * @type {Number}
         */
        _data[id].startX = null;
        _data[id].startY = null;

        /**
         * Keep track of the $input / value when
         * drag event starts (on mousedown)
         *
         * @type {Mixed}
         */
        _data[id].initialValue = null;
        _data[id].$currentInput = null;

        /**
         * Keep track of the state of
         * Link-Handlers button
         *
         * @type {Boolean}
         */
        _data[id].handlersLinked = false;

        // Boxmodel fields (blocks that contain real inputs for margin/padding,
        // not the input fields on visual representation of the boxmodel)
        _data[id].$boxMargin = _data[id].$boxModelFields
            .filter('[data-op3-element-options-property-name*="margin"]')
            .hide()
            .find('.op3-element-options-property-input');

        _data[id].$boxPadding = _data[id].$boxModelFields
            .filter('[data-op3-element-options-property-name*="padding"]')
            .hide()
            .find('.op3-element-options-property-input');

        _data[id].$boxFields = _data[id].$boxMargin.add(_data[id].$boxPadding);

        // Prevent data type initialization since those are hidden
        // fields in boxModel
        _data[id].$boxFields
            .removeAttr("data-property-type");

        // Build the visual representation of the boxmodel
        _data[id].$container = $("<div />")
            .addClass("op3-boxmodel")
            .addClass("op3-element-options-property")
            .attr("data-op3-element-options-property-name", "boxModel")
            .attr("data-boxmodel-id", id);

        $("<div />")
            .addClass("op3-element-options-label-group")
            .html('<label>Margin & Padding</label>')
            .appendTo(_data[id].$container);

        _data[id].$margin = $("<div />")
            .addClass("op3-boxmodel-margin")
            .html('<span class="op3-boxmodel-label">Margin</span>')
            .appendTo(_data[id].$container);

        _data[id].$padding = $("<div />")
            .addClass("op3-boxmodel-padding")
            .html('<span class="op3-boxmodel-label">Padding</span>')
            .appendTo(_data[id].$margin);

        // Real input names are camelCase, so this variable
        // is intentionally duplicated because I don't
        // want to do something like this the loop:
        // "".charAt(0).toUpperCase() + "".slice(1)
        var positions = ["left", "top", "right", "bottom"];
        var Positions = ["Left", "Top", "Right", "Bottom"];
        var $input;

        for (var i = 0; i < positions.length; i += 1) {
            $input = $("<input />")
                .addClass("op3-boxmodel-input")
                .addClass("op3-boxmodel-input-" + positions[i])
                .addClass("op3-boxmodel-padding-" + positions[i])
                .addClass("padding" + Positions[i])
                .attr("data-name", "padding" + Positions[i])
                .appendTo(_data[id].$padding);

            $("<span />")
                .addClass("op3-boxmodel-handler")
                .addClass("op3-boxmodel-handler-padding")
                .addClass("op3-boxmodel-handler-" + positions[i])
                .attr("data-target", "padding" + Positions[i])
                .appendTo(_data[id].$padding);

            $input = $("<input />")
                .addClass("op3-boxmodel-input")
                .addClass("op3-boxmodel-input-" + positions[i])
                .addClass("op3-boxmodel-margin-" + positions[i])
                .addClass("margin" + Positions[i])
                .attr("data-name", "margin" + Positions[i])
                .appendTo(_data[id].$margin);

            $("<span />")
                .addClass("op3-boxmodel-handler")
                .addClass("op3-boxmodel-handler-margin")
                .addClass("op3-boxmodel-handler-" + positions[i])
                .attr("data-target", "margin" + Positions[i])
                .appendTo(_data[id].$margin);
        }

        _data[id].$button = $("<button />")
            .attr("type", "button")
            .addClass("op3-boxmodel-button")
            .append('<span class="op3-icon op3-icon-link-69-1 icon-active"></span>')
            .append('<span class="op3-icon op3-icon-link-broken-70-1 icon-inactive"></span>')
            .append('<span class="visually-hidden">Link Values</span>')
            .appendTo(_data[id].$padding);

        _data[id].$marginInput = _data[id].$margin.find('input[class*="op3-boxmodel-margin"]');
        _data[id].$paddingInput = _data[id].$padding.find("input");
        _data[id].$allInputs = _data[id].$marginInput.add(_data[id].$paddingInput);

        _data[id].$boxModel.before(_data[id].$container);

        /**
         * Helper for development.
         * Uncomment to shows all hidden boxmodel fields
         */
        // _data[id].$boxModel.show();
        // _data[id].$boxFields.each(function() {
            // $(this).closest(".op3-element-options-property").show();
        // });

        // Flag to indicate that a property
        // is initialized on this input
        $this.attr("data-property-type-initialized", "boxModel");

        // Initialize all boxmodel elements
        _get_values(id);

        // Attach events to visual representation
        _data[id].$container
            .on("click", ".op3-boxmodel-button", _link)
            .on("mousedown", ".op3-boxmodel-handler", _init_drag)
            .on("change", ".op3-boxmodel-input", _trigger_input_change);

        // Attach change event to real fields
        _data[id].$boxFields.each(function() {
            $(this).on("change", _real_field_change);
        });

    }

    /**
     * When real input field is changed,
     * we set the visual fields
     * to correct values
     *
     * @param {Object} e
     * @return {Void}
     */
    var _real_field_change = function(e) {
        var $this = $(this);
        var value = $this.val();
        var prop = $this.attr("data-op3-element-options-property-name");

        var $box = $this
            .closest(".op3-element-options-property")
            .prevUntil('.op3-boxmodel')
            .prev();

        $box
            .find("input." + prop)
            .val(value);
    }

    /**
     * Gets all values from boxmodel visual
     * representation boxes and sets the
     * actual (hidden) input fields
     *
     * @return {Void}
     */
    var _get_values = function(id) {
        var element = OP3.Designer.activeElement();
        if (!element)
            return;

        var property = element.findProperty(_data[id].id);
        if (!property)
            return;

        _data[id].$boxFields.each(function () {
            var $input = $(this);
            var value;

            // We need to convert the actual unit to px,
            // since representation fields are settgn
            value = property._parseValueUnit($input.val());

            // If keyword is found, use it as is,
            // otherwise convert to px
            if (value[1] !== undefined)
                value = property._convert("px", value[1], value[0]);
            else
                value = value[0];

            _data[id].$container
                .find("." + $input.attr("data-op3-element-options-property-name"))
                .val(value);
        });
    }

    /**
     * Set values to the real (hidden) input fields.
     * It either sets all input fields,
     * or the one passed into it.
     *
     * @param  {String} id
     * @param  {Object} $fields optional
     * @return {Mixed} False or Void
     */
    var _set_values = function(id, $fields) {
        $fields = $fields || _data[id].$boxFields;

        $fields.each(function () {
            _set_value(id, $(this));
        });
    }

    /**
     * Sets the value of the real input field
     * and triggers the cahnge event so
     * that property is applied in
     * the LiveEditor
     *
     * @param  {Object} $input
     * @return {Void}
     */
    var _set_value = function(id, $input) {
        var value = $input.val();

        // If value is empty, we set it to auto,
        // and if value is just a number
        // (without a unit), we append
        // px as a default unit
        value = value.trim().length > 0 ? value : "auto";
        value = isNaN(value) ? value : value + "px";

        var $field = _data[id].$boxFields
            .filter('input[data-op3-element-options-property-name="' + $input.attr("data-name") + '"]');

        $field
            .val(value)
            .trigger("change");
    }

    /**
     * Initialize drag event handlers
     *
     * @param  {Object} e
     * @return {Boolean} False
     */
    var _init_drag = function(e) {
        var $el = $(this);
        var $boxModel = $el.closest('.op3-element-options-property[data-op3-element-options-property-name="boxModel"]');
        var id = $boxModel.attr("data-boxmodel-id");

        _ui.$body
            .addClass("op3-live-editor-pointer-events-off")
            .addClass("op3-live-editor-user-select-off")
            .trigger("boxmodeldragstart");

        _data[id].startX = e.pageX;
        _data[id].startY = e.pageY;
        _data[id].handler = $el.attr("data-target");
        _data[id].$currentInput = _data[id].$container.find("." + _data[id].handler);
        _data[id].initialValue = parseInt(_data[id].$currentInput.val(), 10);

        if (isNaN(_data[id].initialValue))
            _data[id].initialValue = 0;

        if (_data[id].handler.indexOf("Right") > -1 || _data[id].handler.indexOf("Left") > -1)
            _ui.$body.addClass("op3-cursor-override-col-resize");
        else
            _ui.$body.addClass("op3-cursor-override-row-resize");

        // Bind events to document (current LE iframe)
        // and parent window to ensure that events
        // work outside of the browser window
        // (as per JIRA task OP3-157)
        //
        // Note that this doesn't work if the selectors
        // are combined as $(document, window.parent)
        $(document)
            .on("mousemove", { id: id }, _mousemove)
            .one("mouseup", _mouseup);

        $(window.parent)
            .on("mousemove", { id: id }, _mousemove)
            .one("mouseup", _mouseup);

        return false;
    }

    /**
     * Mouse move when dragging a
     * margin / padding handle
     *
     * @param  {Object} e
     * @return {Boolean} False
     */
    var _mousemove = function(e) {

        // Difference between mouse start
        // position and mouse
        // end position
        var distance;

        var id = e.data.id;
        var isPadding = _data[id].handler.indexOf("padding") > -1;
        var $fields = isPadding ? _data[id].$paddingInput : _data[id].$marginInput;

        if (_data[id].handler.indexOf("Right") > -1)
            distance = e.pageX - _data[id].startX;

        if (_data[id].handler.indexOf("Left") > -1)
            distance = _data[id].startX - e.pageX;

        if (_data[id].handler.indexOf("Bottom") > -1)
            distance = e.pageY - _data[id].startY;

        if (_data[id].handler.indexOf("Top") > -1)
            distance = _data[id].startY - e.pageY;

        // Calculate new position
        distance = _data[id].initialValue + distance;

        // Padding can't be less then zero
        if (isPadding && distance < 0)
            distance = 0;

        if (_data[id].handlersLinked) {
            $fields
                .val(distance);

            _set_values(id, $fields);
        } else {
            _data[id].$currentInput.val(distance);
            _set_values(id, $fields.filter("." + _data[id].handler));
        }

        return false;
    }

    /**
     * Mouseup, when user stops dragging
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _mouseup = function(e) {
        _ui.$body
            .removeClass("op3-live-editor-pointer-events-off")
            .removeClass("op3-live-editor-user-select-off")
            .removeClass("op3-cursor-override-row-resize")
            .removeClass("op3-cursor-override-col-resize")
            .trigger("boxmodeldragend");

        // Unbind all events
        $(window.parent)
            .off("mousemove", _mousemove)
            .off("mouseup", _mouseup);

        $(document)
            .off("mousemove", _mousemove)
            .off("mouseup", _mouseup);
    }

    /**
     * If input field in the visual representation is
     * directly changed, we immediately set the
     * the new value to the real input field
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _trigger_input_change = function(e) {
        var $this = $(this);
        var id = $this.closest(".op3-element-options-property").attr("data-boxmodel-id");

        // If handlers aren't linked, just
        // set the current input value
        if (!_data[id].handlersLinked) {
            _set_value(id, $this);
            return false;
        }

        // If handlers are linked, we're changing
        // all related fields at once
        if ($this.attr("data-name").indexOf("margin") > -1) {

            // Change all margin fields
            _data[id].$marginInput.val($this.val());
            _set_values(id, _data[id].$marginInput);

        } else {

            // Change all padding fields
            _data[id].$paddingInput.val($this.val());
            _set_values(id, _data[id].$paddingInput);

        }

        _set_value(id, $this);
    }

    /**
     * Handles the Linked Values State
     *
     * @param  {Object} e
     * @return {Boolean} False
     */
    var _link = function(e) {
        var id = $(this).closest(".op3-element-options-property").attr("data-boxmodel-id");

        if (_data[id].handlersLinked === false) {
            _data[id].$button.addClass("op3-boxmodel-button--active");
            _data[id].handlersLinked = true;
        } else {
            _data[id].$button.removeClass("op3-boxmodel-button--active");
            _data[id].handlersLinked = false;
        }

        return false;
    }

    // init
    _ui.$body = $("body");
    OP3.bind("elementoptionsformprerender", _refresh);

})(jQuery, window, document);
