<?php

/**
 * @author Oleksandr Torosh <oleksandr@demio.com>
 */
namespace Demio;

use Demio\Events\Events;
use Demio\Http\Request;

/**
 * Class Client
 * @package Demio
 * @property $events \Demio\Events\Events
 */
class Client extends Injectable
{
    public $events;

    public function __construct($api_key, $api_secret)
    {
        $builder = new \DI\ContainerBuilder();
        $di = $builder->build();

        $di->set('api_key', $api_key);
        $di->set('api_secret', $api_secret);
        $di->set('request', new Request());

        self::setDi($di);

        $this->initProperties();
    }

    public function call($endpoint, array $params = [], $method = 'GET')
    {
        return $this->getRequest()->call($endpoint, $params, $method);
    }

    public function ping()
    {
        return $this->getRequest()->get('ping');
    }

    private function initProperties()
    {
        $this->events = new Events();
    }

}