<?php

namespace OPBuilder\Editor;

use function OptimizePress\Support\array_get;
use OptimizePress\Support\DataObject;

class PageAssets
{
    /**
     * Enqueue page stylesheet
     *
     * @param int    $id
     * @param string $url
     * @param array  $options
     */
    public function enqueueStylesheet($id, $url, $options = [])
    {
        $assetOptions = $this->parseOptions($options);

        wp_enqueue_style($id, $url, $assetOptions->dependencies, $this->assetHash($assetOptions->timestamp));
    }

    /**
     * Enqueue page script
     *
     * @param  int     $id
     * @param  string  $url
     * @param  array   $options
     * @param  bool    $inFooter
     */
    public function enqueueScript($id, $url, $options = [], $inFooter = false)
    {
        $assetOptions = $this->parseOptions($options);

        wp_enqueue_script($id, $url, $assetOptions->dependencies, $this->assetHash($assetOptions->timestamp), $inFooter);
    }

    /**
     * Append custom HTML to page head
     * It is appended at the place where the wp_head hook is set
     *
     * @param $html
     */
    public function appendHtmlToHead($html)
    {
        add_action('wp_head', function() use ($html) {
            echo trim($html).PHP_EOL;
        });
    }

    /**
     * Append HTML to the end of the page body
     * It is appended at the place where the wp_footer hook is set
     *
     * @param $html
     */
    public function appendHtmlToBody($html)
    {
        add_action('wp_footer', function() use ($html) {
            echo trim($html).PHP_EOL;
        });
    }

    /**
     * Parse page options
     *
     * @TODO: For now we simply pass through the options
     *
     * @param  array  $options
     * @return DataObject
     */
    public function parseOptions($options = [])
    {
        // Setup options as object
        $data = new DataObject([
            'timestamp'    => array_get($options, 'timestamp'),
            'dependencies' => array_get($options, 'dependencies', []),
        ]);

        return $data;
    }

    /**
     * Build up assets hash
     *
     * @param  null  $timestamp
     * @return string
     */
    public function assetHash($timestamp = null)
    {
        $timestamp      = $timestamp ?: time();
        $builderVersion = defined('OP3_VERSION') ? OP3_VERSION : '0.0.0';
        $cacheHash      = $this->cacheHash();

        // Now build up the assets hash
        return md5($builderVersion . '__' . $timestamp . '__' . $cacheHash);
    }

    /**
     * Find current cache hash in transient options
     *
     * @return string
     */
    public function cacheHash()
    {
        $cacheHash = get_transient('op__opb_cache_hash');

        // Build up cache hash if it's missing
        if (! $cacheHash) {
            $cacheHash = time();

            set_transient('op__opb_cache_hash', $cacheHash);
        }

        return $cacheHash;
    }
}
