=== Plugin Name ===
Contributors: alekv
Donate link: http://www.wolfundbaer.ch/donations/
Tags: woocommerce, woocommerce conversion tracking, google adwords, adwords, conversion, conversion value, conversion tag, conversion pixel, conversion value tracking, conversion tracking, conversion tracking adwords, conversion tracking pixel, conversion tracking script, track conversions, tracking code manager, google ads
Requires at least: 3.7
Tested up to: 5.2
Stable tag: 1.5.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Track the dynamic order value in Google Ads from WooCommerce

== Description ==

This plugin <strong>tracks the value of WooCommerce orders in Google Ads</strong>. With this you can optimize all your Google Ads campaigns to achieve maximum efficiency.

<strong>Highlights</strong>

* The plugin has been updated with the newest Google Ads conversion tracking script that deals with the new Apple cookie tracking prevention. [Apple Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/) and [New Google Ads Conversion Tracking Tag](https://support.google.com/adwords/answer/7521212)
* Very precise by preventing duplicate reporting effectively, excluding admins and shop managers from tracking, and not counting failed payments.
* Very easy to install and maintain.

<strong>Requirements</strong>

* The payment gateway **must** support on-site payments. If you want to use an off-site payment solution like the free PayPal extension you need to make sure that the visitor is being redirected back to the WooCommerce thankyou page after the successful transaction. Only if the redirection is set up properly and the visitor doesn't stop the redirection, only then the conversion will be counted.
* As this is a free plugin we only support recent versions of WooCommerce, WordPress and PHP. We don't maintain backward compatibility.

<strong>Other plugins</strong>

If you like this plugin you might like that one too: [WooCommerce Google Ads Dynamic Remarketing](https://wordpress.org/plugins/woocommerce-google-dynamic-retargeting-tag/)
 
== Installation ==

1. Upload the plugin directory into your plugins directory `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Get the Google Ads conversion ID and the conversion label. You will find both values in the Google Ads conversion tracking code. [Get the conversion ID and the conversion label](https://www.youtube.com/watch?v=p9gY3JSrNHU)
4. In the WordPress admin panel go to WooCommerce and then into the 'Google Ads Conversion Tracking' menu. Please enter the conversion ID and the conversion label into their respective fields.

== Frequently Asked Questions ==

= How do I check if the plugin is working properly? =

1. Log out of the shop.
2. Search for one of your keywords and click on one of your ads.
3. Purchase an item from your shop.
4. Wait up to 48 hours until the conversion shows up in Google Ads.

With the Google Tag Assistant you will also be able to see the tag fired on the thankyou page.

= I get a fatal error and I am running old versions of WordPress and/or WooCommerce. What can I do? =

As this is a free plugin we don't support old versions of WordPress and WooCommerce. You will have to update your installation.

= I am using an offsite payment gateway and the conversions are not being tracked. What can I do? =

We don't support if an offsite payment gateway is in use. The reason is that those cases can be complex and time consuming to solve. We don't want to cover this for a free plugin. We do not recommend offsite payment gateways anyway. A visitor can stop the redirection manually which prevents at least some conversions to be tracked. Also offsite payment gateways are generally bad for the conversion rate.

= Where can I report a bug or suggest improvements? =

Please post your problem in the WGACT Support forum: http://wordpress.org/support/plugin/woocommerce-google-adwords-conversion-tracking-tag
You can send the link to the front page of your shop too if you think it would be of help.

== Screenshots ==
1. Settings page

== Changelog ==
= 1.5.5 =
* Tweak: Made the conversion ID and label validation code more robust
= 1.5.4 =
* Tweak: Updated function that inserts the settings link on the plugins overview page
= 1.5.3 =
* Info: Tested up to WP 5.2
= 1.5.2 =
* Fix: Correctly calculate the value when no filter is active
= 1.5.1 =
* Tweak: Re-enabled order value filter
= 1.4.17 =
* Info: Tested up to WP 5.1
= 1.4.16 =
* Info: Updated a few text strings
= 1.4.15 =
* Info: Changing name from AdWords to Google Ads
= 1.4.14 =
* Info: Tested up to WC 3.5.3
= 1.4.13 =
* Info: Tested up to WC 3.5.2
= 1.4.12 =
* Tweak: bumping up the WC version
= 1.4.11 =
* Tweak: remove some debug code
* fix: properly save the order_total_logic option
= 1.4.10 =
* Tweak: switched sanitization function to wp_strip_all_tags
= 1.4.9 =
* Tweak: Added input validation and sanitization
* Tweak: Added output escaping
= 1.4.8 =
* Tweak: Added discounts into order value calculation
= 1.4.7 =
* New: Switched over to the newest version of the AdWords conversion tracking pixel
= 1.4.6 =
* Tweak: Disabled minification through Autoptimize
= 1.4.5 =
* Tweak: Order ID back in apostrophes
= 1.4.4 =
* Tweak: Switched on JavaScript tracking with a fix for the CDATA bug http://core.trac.wordpress.org/ticket/3670
* Tweak: The correct function is being used to get the currency depending on the WooCommerce version
* Fix: Added missing </noscript> tag
= 1.4.3 =
* Tweak: Remove campaign URL parameter
= 1.4.2 =
* Fix: Backward compatibility for $order->get_currency()
= 1.4.1 =
* Tweak: Making the plugin PHP 5.4 backwards compatible
* Fix: Fixing double counting check logic
= 1.4 =
* New: Ask kindly for a rating of the plugin
* New: Add a radio button to use different styles of order total
* Tweak: Consolidate options into one array
* Tweak: Code cleanup
= 1.3.6 =
* New: WordPress 4.8 compatibility update
* Tweak: Minor text tweak.
= 1.3.5 =
* Fix: Fixed a syntax error that caused issues on some installations.
= 1.3.4 =
* Tweak: Added some text output to make debugging for users easier.
= 1.3.3 =
* Tweak: Refurbishment of the settings page
= 1.3.2 =
* New: Uninstall routine
= 1.3.1 =
* New: Keep old deduplication logic in the code as per recommendation by AdWords
= 1.3.0 =
* New: AdWords native order ID deduplication variable
= 1.2.2 =
* New: Filter for the conversion value
= 1.2.1 =
* Fix: wrong conversion value fix
= 1.2 =
* New: Filter for the conversion value
= 1.1 =
* Tweak: Code cleanup
* Tweak: To avoid over reporting only insert the retargeting code for visitors, not shop managers and admins
= 1.0.6 =
* Tweak: Switching single pixel function from transient to post meta
= 1.0.5 =
* Fix: Adding session handling to avoid duplications
= 1.0.4 =
* Fix: Skipping a tag version
= 1.0.3 =
* Fix: Implement different logic to exclude failed orders as the old one is too restrictive
= 1.0.2 =
* Fix: Exclude orders where the payment has failed
= 1.0.1 =
* New: Banner and icon
* Update: Name change
= 1.0 =
* New: Translation into Serbian by Adrijana Nikolic from http://webhostinggeeks.com
* Update: Release of version 1.0!
= 0.2.4 =
* Update: Minor update to the internationalization
= 0.2.3 =
* Update: Minor update to the internationalization
= 0.2.2 =
* New: The plugin is now translation ready
= 0.2.1 =
* Update: Improving plugin security
* Update: Moved the settings to the submenu of WooCommerce
= 0.2.0 =
* Update: Further improving cross browser compatibility
= 0.1.9 =
* Update: Implemented a much better workaround tor the CDATA issue
* Update: Implemented the new currency field
* Fix: Corrected the missing slash dot after the order value
= 0.1.8 =
* Fix: Corrected the plugin source to prevent an error during activation 
= 0.1.7 =
* Significantly improved the database access to evaluate the order value.
= 0.1.6 =
* Added some PHP code to the tracking tag as recommended by Google. 
= 0.1.5 =
* Added settings field to the plugin page.
* Visual improvements to the options page.
= 0.1.4 =
* Changed the woo_foot hook to wp_footer to avoid problems with some themes. This should be more compatible with most themes as long as they use the wp_footer hook. 
= 0.1.3 =
* Changed conversion language to 'en'. 
= 0.1.2 =
* Disabled the check if WooCommerce is running. The check doesn't work properly with multisite WP installations, though the plugin does work with the multisite feature turned on. 
* Added more description in the code to explain why I've build a workaround to not place the tracking code into the thankyou template of WC.
= 0.1.1 =
* Some minor changes to the code
= 0.1 =
* This is the initial release of the plugin. There are no known bugs so far.
