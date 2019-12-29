<?php

namespace OPDashboard\SL;

use OPDashboard\Services\Log;

/**
 * Handle response formatting for the SL API
 *
 * @package OPDashboard\SL
 */
class Response
{
    /**
     * @var int|string
     */
    protected $code;

    /**
     * @var mixed
     */
    protected $error;

    /**
     * @var mixed|null
     */
    protected $data;

    /**
     * @var array
     */
    protected $payload;

    /**
     * Build up new SL response
     *
     * @param $payload
     * @throws \Exception
     */
    public function __construct($payload = null)
    {
        if ($payload and is_array($payload)) {
            // Parse the response body
            $body        = (is_array($payload) and isset($payload['body'])) ? $payload['body'] : '';
            $payloadData = @json_decode($body, true);

            // Set properties
            $this->payload = $payload;
            $this->data    = isset($payloadData['data']) ? $payloadData['data'] : null;
            $this->code    = wp_remote_retrieve_response_code($payload);

            // Set error
            if (isset($payload['error']) and $payload['error']) {
                $this->error = $payload['error'];
            } elseif ($this->code === 401) {
                $this->error = true;
                $this->data = ['message' => 'Unauthenticated'];
            } elseif ($this->code === 503) {
                $this->error = true;
                $this->data = ['message' => 'Forbidden'];
            } elseif ($this->code !== 200) {
                $this->error = true;
                $this->data = ['message' => 'Something went wrong'];
            }

            // Log the errors
            if ($this->isError()) {
                Log::debug('[SL] Response error. ' . @json_encode($payload));
            }
        }
    }

    /**
     * Return response code
     *
     * @return int|string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Check for errors
     *
     * @return bool
     */
    public function isError()
    {
        return is_wp_error($this->payload) or $this->error;
    }

    /**
     * The response data
     *
     * @return mixed|null
     */
    public function data()
    {
        return $this->data;
    }

    /**
     * Response data as an array
     *
     * @return mixed|null
     */
    public function toArray()
    {
        return $this->data();
    }
}
