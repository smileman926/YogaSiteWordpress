<?php

return [

    // Define which integrations are enabled
    'available' => [

        // OAuth
        'aweber',
        'constantcontact',
        'drip',
        'getresponse',
        'gotowebinar',
        'infusionsoft',
        'mailchimp',
        //'zoom',

        // Default
        'activecampaign',
        'campaignrefinery',
        'convertkit',
        'demio',
        'emma',
        'email',
        'icontact',
        'klicktipp',
        'mailchimp_apikey',
        'mailerlite',
        'ontraport',
        'sendlane',
        'sendreach',
        'egoi',

        // Webhook
        'webhook',
        'zapier',
    ],

    // Which OAuth integration are being authenticated without the SL middleman
    'direct_oauth' => [
        'gotowebinar',
    ],

];
