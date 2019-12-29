<?php

/**
 * @author Oleksandr Torosh <webtorua@gmail.com>
 */
namespace Demio\Http;

use Demio\Injectable;
use Demio\Results;

class Request extends Injectable
{
    protected $base_uri = 'https://my.demio.com/api/v1/';

    /**
     * @param $endpoint
     * @param array $params
     * @param string $method
     * @return \Demio\Results
     */
    public function call($endpoint, array $params = [], $method = 'GET')
    {
        $client = new \GuzzleHttp\Client([
            'exceptions' => false,
            'verify'     => false
        ]);
        $response = $client->request($method, $this->base_uri . $endpoint, [
            'headers' => [
                'Api-Key'    => $this->getApiKey(),
                'Api-Secret' => $this->getApiSecret(),
                'Accept'     => 'application/json',
            ],
            'body'    => json_encode($params)
        ]);
        return new Results($response);
    }

    /**
     * @param $endpoint
     * @return \Demio\Results
     */
    public function get($endpoint)
    {
        return $this->call($endpoint, [], 'GET');
    }

    /**
     * @param $endpoint
     * @param $params
     * @return \Demio\Results
     */
    public function post($endpoint, $params)
    {
        return $this->call($endpoint, $params, 'POST');
    }

    /**
     * @param $endpoint
     * @param $params
     * @return \Demio\Results
     */
    public function put($endpoint, $params)
    {
        return $this->call($endpoint, $params, 'PUT');
    }

    /**
     * @param $endpoint
     * @param $params
     * @return \Demio\Results
     */
    public function delete($endpoint, $params)
    {
        return $this->call($endpoint, $params, 'DELETE');
    }

}