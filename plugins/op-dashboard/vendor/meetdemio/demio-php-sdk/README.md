# Demio API PHP SDK

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/oleksandr-torosh/demio-php-sdk/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/oleksandr-torosh/demio-php-sdk/?branch=master)

This PHP SDK are built for easier working with existing Demio REST API inside PHP projects.

## Requirements

- php >= 5.5  
- composer  
- ext-curl  

## Installation via Composer

The recommended way to install Demio API PHP SDK is with [Composer](http://getcomposer.org)

    curl -sS https://getcomposer.org/installer | php

You can add Demio API PHP SDK as a dependency using the composer.phar CLI:

    php composer.phar require oleksandr-torosh/demio-php-sdk:~1.0

Alternatively, you can specify demio-php-sdk as a dependency in your project's existing **composer.json** file:

    {  
        "require": {  
            "oleksandr-torosh/demio-php-sdk": "~1.0"  
        }  
    }  

After installing, you need to require Composer's autoloader:

```php
require 'vendor/autoload.php'; 
```

## Initialization

```php
require 'vendor/autoload.php';
    
$api_key = 'IG8a1PUHxa49rn3q250LVVkF84p5w03L';
$api_secret = '1Wf20cConSV1zFiw';
    
$client = new \Demio\Client($api_key, $api_secret);
```

## Actions

After Client initialization you are ready to work with existing methods.  
Every action returns `\Demio\Results` object with next methods:
- `isSuccess()` - boolean, check if response hasn't error messages  
- `results($params)` - object, Returns response contents object  
- `count()` - integer, if response contents is array returns it elements count  
- `messages()` - array, error messages  
- `implodeMessages($glue)` - string, concat errors messages array in one string with defined glue
- `statusCode()` - integer, response HTTP status code  
- `getResponse()` - GuzzleHttp Response object  

### Ping

```php
$response = $client->ping();
echo $response->results()->pong;
```
    
### Events list

Work with Events is carried out through property **events**

```php
$events = $client->events->getList();
if ($events->isSuccess()) {
    if ($events->count() > 0) {
        foreach ($events->results() as $event) {
            echo "{$event->name} ({$event->id}) is {$event->status}<br>";
        }
    } else {
        echo "Events not found<br>";
    }
} else {
    echo "Errors: {$events->implodeMessages()}<br>";
}
```
    
### Register

```php
$register = $client->events->register([
    'id'    => 86, // Event ID
    'name'  => 'John Doe',
    'email' => 'john.doe.29@mailforspam.com'
]);

if ($register->isSuccess()) {
    $results = $register->results();
    $webinar_join_link = $results->join_link;
} else {
    echo $register->statusCode(), "<br>";
    echo "Errors: ", $register->implodeMessages('<br>');
}
```
    
### Register for specified Date

```php
$register = $client->events->register([
    'id'      => 86, // Event ID
    'date_id' => 1575, // Date ID
    'name'    => 'John Doe',
    'email'   => 'john.doe.29@mailforspam.com'
]);
```
    
### Register via Registration page link

```php
$register = $client->events->register([
    'ref_url' => 'https://my.demio.com/ref/nI7XKRaVfZdj9CyQ',
    'name'    => 'John Doe',
    'email'   => 'john.doe.29@mailforspam.com'
]);
```
    
### Single Event details

```php
$event = $client->events->getEvent(86);
```
    
### Getting results as associative array
    
```php
$events->results(['assoc' => true]);
```

## Examples

You can find more examples inside **examples** directory