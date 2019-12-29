<?php

/**
 * @author Oleksandr Torosh <webtorua@gmail.com>
 */
namespace Demio;

class Results extends Injectable
{
    private $response;
    private $contents;

    public function __construct($response)
    {
        $this->response = $response;
        $this->contents = $response->getBody()->getContents();
    }

    public function isSuccess()
    {
        return (count($this->messages()) > 0) ? false : true;
    }

    public function results(array $params = [])
    {
        $assoc = (isset($params['assoc'])) ? $params['assoc'] : false;
        return $this->contentsObject($assoc);
    }

    public function count()
    {
        $contents = $this->contentsObject(true);
        return (is_array($contents)) ? count($contents) : 0;
    }

    public function messages()
    {
        $contents = $this->contentsObject();
        if ($contents) {
            if (isset($contents->messages)) {
                return $contents->messages;
            }
        }
        return [];
    }

    public function implodeMessages($glue = '<br>')
    {
        return implode($glue, $this->messages());
    }

    public function statusCode()
    {
        return $this->response->getStatusCode();
    }

    public function getResponse()
    {
        return $this->response;
    }

    private function contentsObject($assoc = false)
    {
        return json_decode($this->contents, $assoc);
    }

}