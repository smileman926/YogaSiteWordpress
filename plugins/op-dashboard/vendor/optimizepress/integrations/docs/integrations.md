# Integrations

This package enables us to connect to various integrations and is used across multiple OptimizePress products.
It supports fetching lists, tags and forms, fetching form fields, subscribing users to lists, tagging users, etc.
It all depends on the features each provider offers. 

## Providers

The package currently has 2 type of providers, **OAuth** and **default**. 
The OAuth providers all need specific web endpoints tp follow the OAuth flow for fetching the tokens,
while the **default** providers simply require to enter the required credentials into the integration model.

Some of the providers that are supported:

### OAuth

- Aweber
- Drip (supports tags)
- GetResponse 
- GoToWebinar 
- InfusionSoft (supports tags)
- Mailchimp

### Default

- ActiveCampaign 
- Demio
- Emma 
- iContact 
- Mailchimp API Key 
- Ontraport
- Sendlane 
- Sendreach

## Authentication

@TODO

## Usage

To create a new integration object we can use this:

    $integration = new OptimizePress\Integrations\Integration('mailchimp', $integrationModel);

Where the **$integrationModel** variable is an instance of a storage model (Laravel or WP).
The model holds the connection, and it's up to you to store it accordingly.
To fetch the model in Laravel simply call the method in the storage repository:

    $integrationRepository = app(OptimizePress\Integrations\Storage\IntegrationEloquentRepository::class);
    $integrationModel = $integrationRepository->findByProvider('mailchimp');

## Optin

Once we have an integration provider object setup, we can setup out optin process:

    $optinData = new OptimizePress\Integrations\OptinData;
    $optinData->setEmail('example@domain.com');
    $optinData->setListId('43ghj43');
    $optinData->setTags(['tag1', 'tag2']);
    $optinData->setFormData([
        'first_name' => 'Chuck',
        'last_name'  => 'Norris',
    ]);
    
When the optin data is setup we can also setup the lead options object. This enables us to use the provider options like double optin, welcome email etc.
It all depends on the features the provider supports, and the lead options are optional. 
A quick example for MailChimp would be:

    $leadOptions = new OptimizePress\Integrations\LeadOptions;
    $leadOptions->setDoubleOptin(true);
    $leadOptions->setWelcomeEmail(true);

When we have our optin data and lead options setup we can run the optin process by calling:

    $result = $integration->optin($optinData, $leadOptions);

