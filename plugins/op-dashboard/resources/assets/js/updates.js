import Integrations from "./integrations";

export default class Updates {
    /**
     * Add all required DOM events
     */
    init() {
        this.addEvents();
    }

    /**
     * Run plugin/theme install
     *
     * @param {String} slug
     */
    installProduct(slug) {
        let $btn        = jQuery(".opd-product-button-" + slug);
        let productType = $btn.data("type");
        let version     = $btn.data("version");
        let isUpdating = $btn.hasClass("opd-product-button-updating");

        // Credential
        window.wp.updates.maybeRequestFilesystemCredentials();

        // Notify on update start
        $btn.addClass("opd-product-button-updating").fadeTo(100, 0.7).attr("disabled", "disabled").text("Installing...");

        // Return the user to the input box of the plugin's table row after closing the modal.
        let args = {
            slug:    slug,
            version: version,
            success: function(e) {
                $btn.removeClass("opd-product-button-updating").text("Installed").removeAttr("disabled");

                // Notify
                if (productType === "theme") {
                    window.OPDashboard.Helpers.notify("Theme installed.", "success");
                } else {
                    window.OPDashboard.Helpers.notify("Plugin installed.", "success");
                }

                jQuery(window).off('beforeunload');
                document.location = document.location;
            },
            error:   function(e) {
                $btn.removeClass("opd-product-button-updating").text("Error").removeAttr("disabled");
                window.OPDashboard.Helpers.notify("Install error.", "error");
            }
        };

        if (! isUpdating) {
            window.wp.updates.ajax('opd_install_' + productType, args);
        }
    }

    /**
     * Run plugin/theme update
     *
     * @param {String}  file
     * @param {String}  slug
     * @param updateNext
     */
    updateProduct(file, slug, updateNext) {
        let self        = this;
        let $btn        = jQuery(".opd-product-button-" + slug);
        let productType = $btn.data("type");
        let version     = $btn.data("version");

        // Credential
        window.wp.updates.maybeRequestFilesystemCredentials();

        // Notify on update start
        $btn.addClass("opd-product-button-updating").attr("disabled", "disabled").text("Updating...");

        // Return the user to the input box of the plugin's table row after closing the modal.
        let args = {
            plugin:  file,
            slug:    slug,
            version: version,
            success: function(e) {
                $btn.removeClass("opd-product-button-updating").text("Updated").removeAttr("disabled");

                // Notify
                if (productType === "theme") {
                    window.OPDashboard.Helpers.notify("Theme '" + slug + "' updated.", "success");
                } else {
                    window.OPDashboard.Helpers.notify("Plugin '" + slug + "' updated.", "success");
                }

                if (updateNext) {
                    window.wp.updates.ajaxLocked = false;
                    self.updateProducts();
                }
            },
            error: function(e) {
                $btn.removeClass("opd-product-button-updating").text("Error").removeAttr("disabled");

                if (e.message) {
                    window.OPDashboard.Helpers.notify(e.message, "error");
                } else {
                    window.OPDashboard.Helpers.notify("Update error.", "error");
                }

                if (updateNext) {
                    window.wp.updates.ajaxLocked = false;
                    self.updateProducts();
                }
            }
        };

        // Trigger update and WP event
        // jQuery(document).trigger('wp-plugin-updating', args);
        // window.wp.updates.ajax('update-plugin', args);
        let request = window.wp.updates.ajax('opd_update_' + productType, args);
    }

    /**
     * Update multiple products
     */
    updateProducts() {
        let self       = this;
        let $btn       = jQuery(".update-op-suite-link");
        let $container = jQuery(".op-product-update-list");
        let $products  = $container.find(".op-product-update-item.op-product-update-pending");

        if ($products.length) {
            // Notify on update start
            $btn.addClass("opd-product-button-updating").attr("disabled", "disabled").text("Updating all OptimizePress products ...");

            let $product = $products.first();
            let file     = $product.data("file");
            let slug     = $product.data("slug");

            // Set classes
            $product.removeClass("op-product-update-pending").addClass("op-product-update-updating");

            // Run the update and pass the callback
            self.updateProduct(file, slug, window.OPDashboard.Updates.updateProducts);
        } else {
            $(window).off('beforeunload');
            window.location = window.location;
        }

        // Add products to list
        // jQuery(products).each(function(index, product) {
        //     checked.push(product.file);
        // });
        // console.log(checked);
    }

    /**
     * Clear the cache and check for updates
     * The method clears the transients and reloads the page
     *
     * @return {void}
     */
    checkUpdates() {
        let $el    = jQuery(".js-trigger-update-check");
        let url    = $el.data("action");
        let data   = {  };

        jQuery.ajax({
            method: "POST",
            url:    url,
            data:   data
        }).done(function( result ) {
            window.location.reload(false)
        });
    }

    /**
     * Change the release channel for theme/plugin
     *
     * @param channel
     */
    changeReleaseChannel(product, channel) {
        let $container = jQuery(".opd-product-item-" + product);

        $container.find(".opd-product-info-for-channel").hide();
        $container.find(".opd-product-info-for-channel-" + channel).show();
        $container.find(".opd-product-buttons-for-channel").hide();
        $container.find(".opd-product-buttons-for-channel-" + channel).show();
    }

    /**
     * Add event listeners
     */
    addEvents() {
        let that  = this;
        let $root = jQuery("body");

        // Pick release channel
        $root.on('change', '.js-release-channel-picker', function(event) {
            that.changeReleaseChannel(jQuery(this).data("product"), jQuery(this).val());
        });

        // Install OP plugin
        $root.on('click', '.install-op-product-link', function(event) {
            let confirmMessage = jQuery(this).data("confirm");

            if (! confirmMessage || (confirmMessage && confirm(confirmMessage))) {
                that.installProduct(jQuery(this).data("slug"));
            }

            event.preventDefault();
        });

        // Update OP plugin
        $root.on('click', '.update-op-product-link', function(event) {
            let confirmMessage = jQuery(this).data("confirm");

            if (! confirmMessage || (confirmMessage && confirm(confirmMessage))) {
                that.updateProduct(jQuery(this).data("plugin"), jQuery(this).data("slug"));
            }

            event.preventDefault();
        });

        // Update multiple OP products
        $root.on('click', '.update-op-suite-link', function(event) {
            let confirmMessage = jQuery(this).data("confirm");

            if (! confirmMessage || (confirmMessage && confirm(confirmMessage))) {
                that.updateProducts();
            }

            event.preventDefault();
        });

        jQuery(".js-trigger-update-check").click(function() {
            that.checkUpdates();

            return false;
        });
    }
}

window.OPDashboard.Updates = new Updates;
jQuery(function() { window.OPDashboard.Updates.init(); });
