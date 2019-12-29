/**
 * OptimizePress3 live editor extension:
 * membership
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
    
    var OP3_Membership_Wizard = OP3.defineClass({

        Name: "OP3.Membership.Wizard",

        Extends: window.OP3.Wizard,

        Constructor: function () {
            window.OP3.Wizard.call(this, this._steps);

            this.$ui.element
                .addClass("op3-wizard-membership");
            //.addClass("op3-wizard-disable-nav-item-link-click");
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
                if (value && value.type() !== "membershipcontentlist")
                    throw "Membership Content List Wizard - element must be of membershipcontentlist type";

                this._element = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function () {
                window.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function () {
                window.OP3.Wizard.prototype.close.call(this);

                this.element = null;
            },

            _getProducts: function () {
                var that = this;
                OP3.Ajax.request({
                    url: "membership-pages",
                    success: function (response, textStatus, jqXHR) {
                        that._prepareStep1(response.data);
                    }
                });
            },

            _getCategories: function (data) {
                var that = this;
                OP3.Ajax.request({
                    url: "membership-pages/categories/",
                    data: "&sort=title:asc"
                        + "&pageId=" + OP3.Meta.pageId
                        + "&product=" + data.productId,
                    success: function (response, textStatus, jqXHR) {
                        var changed = that.element.getOption("membershipProduct", "all") !== data.productId;
                        that._appendCategories(response.data, changed);
                    }
                });
            },

            _appendCategories: function (data, changed) {
                var $selectCategories = this.$ui.fields
                    .filter('[name="categories"]')
                    .empty();
                var html = [{id: "", name: "(Please select)"}]
                    .concat(data.products || [])
                    .map(function (item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                var value = changed ? "" : this.element.getOption("membershipCategory", "all");

                $selectCategories
                    .append(html)
                    .val(value)
                    .trigger("change");
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Membership Content Listing",
                    navIcon: "op3-icon-share-66-1",
                    title: "Membership Options",
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
            _preEventHandlerStep: function (data) {
                var method = "_loadStep" + data.step;
                if (typeof this[method] === "function")
                    this[method](data);
            },

            /**
             * Render each step
             *
             * @return {Void}
             */
            _renderSteps: function () {
                window.OP3.Wizard.prototype._renderSteps.call(this);

                this._renderStep1();
                this._renderStep2();

                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.summary = this.$ui.steps.find(".op3-wizard-summary");
                this.$ui.summaryDirectPageChildren = this.$ui.summary.filter('[data-value-summary="directPageChildren"]');
                this.$ui.summaryProduct = this.$ui.summary.filter('[data-value-summary="product"]');
                this.$ui.summaryCategory = this.$ui.summary.filter('[data-value-summary="category"]');
                this.$ui.summarySort = this.$ui.summary.filter('[data-value-summary="sort"]');
                this.$ui.message = this.$ui.steps.find(".op3-wizard-message");

                // disable drop on wizard element
                this.$ui.element
                    .on("dragover", function (e) {
                        e.preventDefault();
                        e.originalEvent.dataTransfer.dropEffect = "none";
                    });
            },

            _renderStep1: function () {
                var step = 1,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p class="description">The Membership Content Listing element is designed to list a collection of pages which are set as children of this page, or set as children of another page in the WordPress hierarchy.  To find out more, <a href="https://docs.optimizepress.com/article/2332-membership-content-listing" target="_blank">see this help article</a></p>'
                        + '<label data-field="show_children" class="show-children-toggle label-group">'
                        + '<span class="field-label">' + OP3._("Direct page children?") + "</span>"
                        + '<input type="hidden" name="show_children" value="1" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="show_children_checkbox" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="sort" class="label-group">'
                        + '<span class="field-label">' + OP3._("Sort") + '</span>'
                        + '<div class="select2-container">'
                        + '<select name="sort">'
                        + '<option value="title:asc">' + OP3._("Alphabetically") + '</option>'
                        + '<option value="title:desc">' + OP3._("Alphabetically Reversed") + '</option>'
                        + '<option value="published_date:asc">' + OP3._("Published Date") + '</option>'
                        + '<option value="published_date:desc">' + OP3._("Published Date Reversed") + '</option>'
                        + '<option value="menu_order:asc">' + OP3._("WordPress Order") + '</option>'
                        + '</select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="products" class="label-group">'
                        + '<span class="field-label">' + OP3._("Show Content From Product") + '</span>'
                        + '<div class="select2-container">'
                        + '<select name="products"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="categories" class="label-group">'
                        + '<span class="field-label">' + OP3._("Show Content From Category") + '</span>'
                        + '<div class="select2-container">'
                        + '<select name="categories"></select>'
                        + '</div>'
                        + '</label>'
                ;


                $(html)
                    .appendTo($content)
                    .find("select")
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest('.op3-wizard')
                    });
            },

            _loadStep1: function (data) {
                this.$ui.element
                    .addClass("op3-wizard-loading")
                    .addClass("op3-wizard-disable-close");

                this.$ui.stepsItem
                    .eq(0)
                    .find(".op3-wizard-steps-item-content")
                    .scrollTop(0);

                // fetch stuff needed for rendering all the data
                this._getProducts();
            },

            _prepareStep1: function (data) {

                var title = OP3._("Membership Content Listing");

                this.$ui.stepsItem.eq(0)
                    .find(".op3-wizard-steps-item-header")
                    .find("h1,h2,h3,h4,h5,h6")
                    .first()
                    .text(title);

                var $showPageChildren = this.$ui.fields
                    .filter('input[type="checkbox"][name="show_children_checkbox"]')
                    .on("change", function () {
                        var $input = $(this)
                            .closest('[data-field="show_children"]')
                            .find('[name="show_children"]');
                        var value = $(this).prop("checked") ? "1" : "0";
                        $input.val(value);
                    });

                var valueShowPageChildren = this.element.getOption("membershipShowPageChildren", "all") ? this.element.getOption("membershipShowPageChildren", "all") : "1";

                $showPageChildren
                    .prop("checked", !!parseInt(valueShowPageChildren , 10))
                    .trigger("change");

                var $selectProducts = this.$ui.fields
                    .filter('[name="products"]')
                    .empty();
                var html = [{id: "", name: "(Please select)"}]
                    .concat(data.products || [])
                    .map(function (item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");

                var value = this.element.getOption("membershipProduct", "all") ? this.element.getOption("membershipProduct", "all") : "";

                var outer = this;
                $selectProducts.on("change", function () {
                    var data = {
                        "productId": $(this).val()
                    };

                    outer._getCategories(data);
                });

                $selectProducts
                    .append(html)
                    .val(value)
                    .trigger("change");

                var $selectCategories = this.$ui.fields
                    .filter('[name="categories"]');

                $showPageChildren.on("change", function () {
                    if (this.checked) {
                        $selectProducts.val("").trigger("change");
                        $selectProducts.parent().parent().hide();
                        $selectCategories.val("").trigger("change");
                        $selectCategories.parent().parent().hide();
                    } else {
                        $selectProducts.parent().parent().show();
                        $selectCategories.parent().parent().show();
                    }
                }).trigger("change");

                var $sort = this.$ui.fields
                    .filter('[name="sort"]');

                value = this.element.getOption("membershipSort", "all") ? this.element.getOption("membershipSort", "all") : "title:asc";

                $sort
                    .val(value)
                    .trigger("change");

                this.$ui.element
                    .removeClass("op3-wizard-disable-close")
                    .removeClass("op3-wizard-loading");
            },

            _renderStep2: function () {
                var step = 2,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $header = $stepItem.find(".op3-wizard-steps-item-header"),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p class="op3-wizard-message">' + OP3._("Element Options Saved") + '</p>';
                        /*+ '<div class="op3-wizard-summary">'
                        + '<article>'
                        + '<div class="op3-wizard-summary-desc">'
                        + '<dl data-field-summary="directPageChildren">'
                        + '<dt>' + OP3._("Direct Page Children?:") + '</dt>'
                        + '<dd data-value-summary="directPageChildren">' + OP3._("Yes/No") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="product">'
                        + '<dt>' + OP3._("Product:") + '</dt>'
                        + '<dd data-value-summary="product">' + OP3._("Product") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="category">'
                        + '<dt>' + OP3._("Category:") + '</dt>'
                        + '<dd data-value-summary="category">' + OP3._("Category") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="sort">'
                        + '<dt>' + OP3._("Sort:") + '</dt>'
                        + '<dd data-value-summary="sort">' + OP3._("Sort") + '</dd>'
                        + '</dl>'
                        + '</div>'
                        + '</article>'
                        + '</div>';*/

                $(html)
                    .appendTo($content);
            },

            _loadStep2: function (data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var serialize = this.serialize(),
                    element = this.element;

                this._resetElement(element, serialize);

                this._prepareStep2(serialize);
            },

            _resetElement: function (element, data) {
                // set parent element options
                OP3.$(element)
                    .setOption("membershipShowPageChildren", data.show_children, "all")
                    .setOption("membershipSort", data.sort, "all")
                    .setOption("membershipProduct", data.products, "all")
                    .setOption("membershipCategory", data.categories, "all");

                // get new data according to options
                OP3.Ajax.request({
                    url: "membership-pages-search",
                    data: "&sort=" + data.sort
                        + "&pageId=" + OP3.Meta.pageId
                        + "&showChildren=" + data.show_children
                        + "&product=" + data.products
                        + "&category=" + data.categories,
                    success: function (response, textStatus, jqXHR) {
                        // let's reset the element
                        var render = OP3.MembershipPages.renderTreeWithOuterData(response);

                        OP3.$(element).children().each(function () {
                            OP3.$(this).detach();
                        });

                        render.forEach(function (node) {
                            OP3.$(node).appendTo(element);
                        });
                    },
                    error: function (response) {
                        alert("Something went wrong, please check your parameters...")
                    }
                });
            },

            _prepareStep2: function (data) {
                this.$ui.summary
                this.$ui.message.eq(1).text(OP3._("Element Saved..."));
                this.$ui.summaryDirectPageChildren.text(data.products || "");
                this.$ui.summaryProduct.text(data.products || "");
                this.$ui.summaryCategory.text(data.categories);
                this.$ui.summarySort.text(data.sort);

                this.$ui.element
                    .removeClass("op3-wizard-loading");
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
         * Export wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_Membership_Wizard();

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

    }

    // globalize (live editor)
    window.OP3.Membership = that;


    // link designer
    OP3.bind("load::designer", function(e, o) {
        e.origin.Membership = that;
    });

    $(window.document)
        .on("click", ".op3-wizard-membership-trigger", function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
