# Various integrations for OptimizePress products 

The package used to integrate our products with various integrations.

## Requirements

PHP 5.6.4+ is required to run this package.

## Installation for Laravel

First you need to add the following line to your root composer.json filem under the repositories section, 
so it should look like this:

```json
"repositories": [
    { "type": "composer", "url": "https://satis.influendo.com/" }
],
```

Then you can install this package via composer using this command:

```bash
composer require optimizepress/integrations
```

If you're using Laravel 5.5, the package will register itself. And for older version you need to add the 
service provider to your **config/app.php** file:

```php
'providers' => [
    OptimizePress\Integrations\Bootstrap\LaravelServiceProvider::class,
]
```

After that you can run the migrations by calling:

```bash
php artisan migrate
```

To change how the package is setup you also need to publish the config file:

```bash
php artisan vendor:publish --provider="OptimizePress\Integrations\Bootstrap\LaravelServiceProvider" --tag="config"
```

You can then change any option you want in **config/optimizepress-integrations.php**.

### Example routes

You can also try out all the example routes and manage the providers by changing **enable_web_routes** in your config file.

## Installation for WordPress

In progress...

## Upgrading

See the [upgrade guide here](upgrade.md).

## Changelog

See the [changelog here](changelog.md).

## License

No license yet.
