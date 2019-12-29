<?php

return [

    /**
     * This file contains a list of aff integration providers and includes tha actual configurations
     *
     * Default:
     * ActiveCampaign, Demio, Emma, iContact, Mailchimp API Key, Ontraport, Sendlane, Sendreach
     *
     * OAuth:
     * Aweber, Drip, GetResponse, GoToWebinar, InfusionSoft, Mailchimp
     *
     * Tags available in:
     * Drip, InfusionSoft
     *
     */

    // Simple empty integration without any provider
    'empty' => include(__DIR__.'/providers/empty.php'),

    // Default, no tags
    'activecampaign' => include(__DIR__.'/providers/activecampaign.php'),

    // OAuth
    'aweber' => include(__DIR__.'/providers/aweber.php'),

    // Default
    'campaignrefinery' => include(__DIR__.'/providers/campaignrefinery.php'),

    // OAuth
    'constantcontact' => include(__DIR__.'/providers/constantcontact.php'),

    // ConvertKit
    'convertkit' => include(__DIR__.'/providers/convertkit.php'),

    // OAuth, tags, required list or tag
    'drip' => include(__DIR__.'/providers/drip.php'),

    // Default
    'demio' => include(__DIR__.'/providers/demio.php'),

    // E-Mail
    'email' => include(__DIR__.'/providers/email.php'),

    // Default
    'egoi' => include(__DIR__.'/providers/egoi.php'),

    // Default
    'emma' => include(__DIR__.'/providers/emma.php'),

    // OAuth
    'getresponse' => include(__DIR__.'/providers/getresponse.php'),

    // OAuth
    'gotowebinar' => include(__DIR__.'/providers/gotowebinar.php'),

    // Default
    'icontact' => include(__DIR__.'/providers/icontact.php'),

    // OAuth, tags, required list or tag
    'infusionsoft' => include(__DIR__.'/providers/infusionsoft.php'),

    // Default, tags
    'klicktipp' => include(__DIR__.'/providers/klicktipp.php'),

    // OAuth
    'mailchimp' => include(__DIR__.'/providers/mailchimp.php'),

    // Default
    'mailchimp_apikey' => include(__DIR__.'/providers/mailchimp_apikey.php'),

    // MailerLite
    'mailerlite' => include(__DIR__.'/providers/mailerlite.php'),

    // Default
    'ontraport' => include(__DIR__.'/providers/ontraport.php'),

    // OAuth, SL connection
    'optimizepress' => include(__DIR__.'/providers/optimizepress.php'),

    // Default
    'sendlane' => include(__DIR__.'/providers/sendlane.php'),

    // Default
    'sendreach' => include(__DIR__.'/providers/sendreach.php'),

    // Webhook
    'webhook' => include(__DIR__.'/providers/webhook.php'),

    // Webhook
    'zapier' => include(__DIR__.'/providers/zapier.php'),

    // OAuth
    'zoom' => include(__DIR__.'/providers/zoom.php'),
];
