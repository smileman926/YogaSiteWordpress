 /**
 * Wizard:
 *
 *  OP3 software wizard (setup assistant)
 *  user interface
 */
;(function($, window, document) {

    "use strict";

    OP3.Wizard = OP3.defineClass({

        Name: "OP3.Wizard",

        Constructor: function(options) {
            this._options = $.extend(true, [], options || this._defaults);
            this._init();
        },

        Prototype: {

            _defaults: [
                {
                    navTitle: "Step 1",
                    navIcon: "op3-icon-preferences-2",
                    title: "Step 1 - The First Step",
                    content: "loading...",
                    buttons: [
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Step 2",
                    navIcon: "op3-icon-preferences-2",
                    title: "Step 2 - The Second Step",
                    content: "loading...",
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
                    navTitle: "Step 3",
                    navIcon: "op3-icon-preferences-2",
                    title: "Step 3 - The Last Step",
                    content: "loading...",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Complete",
                            className: "op3-wizard-button-complete",
                        },
                    ],
                },
            ],

            _init: function() {
                this.$ui = {
                    element: $('<div class="op3-wizard" />'),
                    wrapper: $('<div class="op3-wizard-wrapper" />'),
                    close: $('<a class="op3-wizard-close" href="#" />'),
                    nav: $('<nav class="op3-wizard-nav" />'),
                    navItem: $(null),
                    steps: $('<form class="op3-wizard-steps" />'),
                    stepsItem: $(null),
                };

                this.$ui.wrapper
                    .appendTo(this.$ui.element);
                this.$ui.close
                    .on("click.op3-wizard", this._handleCloseClick.bind(this))
                    .appendTo(this.$ui.wrapper);
                this.$ui.nav
                    .on("click.op3-wizard", ".op3-wizard-nav-item-link", this._handleNavItemClick.bind(this))
                    .appendTo(this.$ui.wrapper);
                this.$ui.steps
                    .on("change.op3-wizard", this._handleFormChange.bind(this))
                    .appendTo(this.$ui.wrapper);

                this._renderSteps();
            },

            destroy: function() {
                this.$ui.element
                    .unbind()
                    .remove();

                delete this.$ui;
            },

            _renderSteps: function() {
                if (!this._options)
                    return;

                var $wrapper = $('<div class="op3-wizard-steps-wrapper" />')
                    .appendTo(this.$ui.steps);
                var $scroller = $('<div class="op3-wizard-steps-scroller" />')
                    .appendTo($wrapper);
                var $navUl = $("<ul />")
                    .appendTo(this.$ui.nav);
                var html, $step, $footer, $navLi;

                this._options.forEach(function(step) {
                    html = ""
                        + '<li class="op3-wizard-nav-item" title="' + step.navTitle + '">'
                        + '<a href="#" class="op3-wizard-nav-item-link">'
                        + '<i class="op3-icon ' + step.navIcon + '"></i>'
                        + "<span>" + step.navTitle + "</span>"
                        + "</a>"
                        + '</li>';
                    $navLi = $(html)
                        .appendTo($navUl);
                    this.$ui.navItem = this.$ui.navItem.add($navLi);

                    html = ""
                        + '<section class="op3-wizard-steps-item">'
                        + '<header class="op3-wizard-steps-item-header"><h2>' + step.title + '</h2></header>'
                        + '<fieldset class="op3-wizard-steps-item-content">' + step.content + '</fieldset>'
                        + '<footer class="op3-wizard-steps-item-footer"></footer>'
                        + '</section>'
                    $step = $(html)
                        .appendTo($scroller);
                    this.$ui.stepsItem = this.$ui.stepsItem.add($step);
                    $footer = $step.find(".op3-wizard-steps-item-footer")

                    step.buttons.forEach(function(button) {
                        var $button = $('<button type="button" />')
                            .addClass("op3-wizard-button")
                            .addClass(button.className)
                            .removeClass("_temp")
                            .attr((button.disabled ? "" : "data-") + "disabled", "disabled")
                            .removeAttr("data-disabled")
                            .text(button.label)
                            .on("click", this._handleButtonClick.bind(this))
                            .data("op3-wizard-button", button)
                            .appendTo($footer);
                    }.bind(this));
                }.bind(this));
            },

            _preEventHandlerButton: function(data) {
                // pass
            },

            _preEventHandlerChange: function(data) {
                // pass
            },

            _preEventHandlerShowing: function(data) {
                // pass
            },

            _preEventHandlerShow: function(data) {
                // pass
            },

            _preEventHandlerHiding:function(data) {
                // pass
            },

            _preEventHandlerHide: function(data) {
                // pass
            },

            _preEventHandlerStepping: function(data) {
                // pass
            },

            _preEventHandlerStep: function(data) {
                // pass
            },

            _handleCloseClick: function(e) {
                e.preventDefault();

                this.close();
            },

            _handleNavItemClick: function(e) {
                e.preventDefault();

                var $link = $(e.currentTarget);
                var $item = $link.closest(".op3-wizard-nav-item");
                var index = this.$ui.navItem.index($item);

                this.step(index + 1);
            },

            _handleButtonClick: function(e) {
                var data = {
                    originalEvent: e,
                    step: this.step(),
                    $content: $(e.target).closest(".op3-wizard-steps-item"),
                };
                if (this._preEventHandlerButton(data) === false)
                    return;

                var event = this.trigger("button", data);
                if (event.isDefaultPrevented())
                    return;

                var button = $(e.target).data("op3-wizard-button");
                if (typeof button.method === "function")
                    button.method.call(this, e);
                else if (typeof button.method === "string" && typeof this[button.method] === "function")
                    this[button.method].call(this, e);
            },

            _handleFormChange: function(e) {
                var $target = $(e.target);
                var name = $target.attr("name");
                var value = $target.val();
                if ($target.is(":checkbox") && !$target.is(":checked")) {
                    value = this.$ui.steps.find('[name="' + name + '"]:not(:disabled):not(:checkbox)').val();
                    if (typeof value === "undefined")
                        value = null;
                }

                var data = {
                    originalEvent: e,
                    key: name,
                    value: value,
                    invalid: $target.is(":invalid"),
                    disabled: $target.is(":disabled"),
                    step: this.step(),
                    $content: $target.closest(".op3-wizard-steps-item"),
                };
                if (this._preEventHandlerChange(data) === false)
                    return;

                this.trigger("change", data);
            },

            trigger: function(eventName, data) {
                var prefix = "op3wizard";
                var event = jQuery.Event(prefix + eventName);
                this.$ui.element.trigger(event, data);

                return event;
            },

            bind: function(eventName, callback) {
                if (typeof callback !== "function")
                    return;

                // @todo - multiple events
                var prefix = "op3wizard";
                this.$ui.element.on(prefix + eventName, callback.bind(this));
            },

            //unbind: function(eventName, callback) {
            //      // won't work cuz callback.bind
            //    var prefix = "op3wizard";
            //    this.$ui.element.off(prefix + eventName, callback);
            //},

            detach: function() {
                this.$ui.element
                    .detach();
            },

            attach: function(node) {
                node = node || "body";
                if (this.$ui.element.parent().is(node))
                    return;

                this.$ui.element
                    .appendTo(node);
            },

            show: function() {
                if (this.$ui.element.is(".op3-wizard-active"))
                    return;

                if (this._preEventHandlerShowing() === false)
                    return;

                var event = this.trigger("showing");
                if (event.isDefaultPrevented())
                    return;

                if (this._preEventHandlerShow() === false)
                    return;

                this.$ui.element
                    .addClass("op3-wizard-active");

                this.trigger("show");
            },

            hide: function() {
                if (!this.$ui.element.is(".op3-wizard-active"))
                    return;

                if (this._preEventHandlerHiding() === false)
                    return;

                var event = this.trigger("hiding");
                if (event.isDefaultPrevented())
                    return;

                if (this._preEventHandlerHide() === false)
                    return;

                this.$ui.element
                    .removeClass("op3-wizard-active");

                this.trigger("hide");
            },

            close: function() {
                this.hide();
            },

            step: function(value) {
                if (typeof value === "undefined")
                    return this.$ui.element.attr("data-wizard-step")*1 || 0;

                value = value*1;
                if (isNaN(value) || value < 0 || value > this.$ui.navItem.length)
                    return;

                var oldValue = this.step();
                if (value === oldValue)
                    return;

                var data = {
                    stepBefore: oldValue,
                    step: value,
                    $content: this.$ui.stepsItem.eq(value - 1),
                };
                if (this._preEventHandlerStepping(data) === false)
                    return;

                var event = this.trigger("stepping", data);
                if (event.isDefaultPrevented())
                    return;

                if (this._preEventHandlerStep(data) === false)
                    return;

                this.$ui.element
                    .attr("data-wizard-step", value)
                    // this will prevent animation on hidden wizard
                    .get(0)
                        .offsetHeight;

                this.trigger("step", data);
            },

            next: function() {
                var step = this.step();
                var offset = 1;

                this.step(step + offset);
            },

            prev: function() {
                var step = this.step();
                var offset = -1;

                this.step(step + offset);
            },

            serialize: function(step) {
                var $target;
                if (step === null || step === false || typeof step === "undefined")
                    $target = this.$ui.steps;
                else
                    $target = this.$ui.stepsItem.eq(step);
                if (!$target.length)
                    return null;

                var result = {}
                $target.find("[name]:not(:disabled)").each(function() {
                    var $this = $(this);
                    if ($this.is(":checkbox") && !$this.is(":checked"))
                        return;
                    if ($this.is(":radio") && !$this.is(":checked"))
                        return;

                    var key = $this.attr("name");
                    var value = $this.val();

                    result[key] = value;
                });

                return result;
            },
        },
    });

})(jQuery, window, document);
