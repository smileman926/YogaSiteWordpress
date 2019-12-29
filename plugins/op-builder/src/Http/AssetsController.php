<?php

namespace OPBuilder\Http;

use OPBuilder\Editor\Page;
use OPBuilder\Repositories\PageRepository;

class AssetsController
{
    /**
     * Return page styles (including fonts)
     *
     * @param int  $pageId
     * @param null $ts
     */
    public static function styles($pageId, $ts = null)
    {
        static::generatePageHeaders($ts, 'text/css');

        // Find the page
        $page = static::findPage((int) $pageId);

        // Now generate the stylesheet
        $page->generateStylesheet();

        die();
    }

    /**
     * Add page scripts (not used for now)
     *
     * @param int  $pageId
     * @param null $ts
     */
    public static function scripts($pageId, $ts = null)
    {
        static::generatePageHeaders($ts, 'application/javascript');

        // Find the page
        $page = static::findPage((int) $pageId);

        // Now generate the scripts
        $page->generateScripts();

        die();
    }

    /**
     * Find a page object by the ID
     *
     * @param $id
     * @return array|Page
     */
    protected static function findPage($id)
    {
        $pages = new PageRepository;
        $page  = $pages->findOrFail($id);

        return $page;
    }

    /**
     * Generate page headers for caching
     *
     * @param string $timestamp
     * @param string $contentType
     */
    protected static function generatePageHeaders($timestamp, $contentType = "text/css")
    {
        // Init and define expiration
        $s       = $_SERVER;
        $maxAge  = 60*60*24; // 24 hours
        $expires = gmdate('D, d M Y H:i:s', (time() + $maxAge)) . 'GMT';

        if (is_int($timestamp)) {
            $lastModified = gmdate('D, d M Y H:i:s', $timestamp).'GMT';
        } else {
            $lastModified = gmdate('D, d M Y H:i:s', time()).'GMT';
        }

        // Now generate ETag
        $eTag = md5($lastModified);

        // Set required headers
        if (isset($s['HTTP_IF_MODIFIED_SINCE']) and isset($s['HTTP_IF_NONE_MATCH']) and (strtotime($s['HTTP_IF_MODIFIED_SINCE']) >= strtotime($lastModified) || $s['HTTP_IF_NONE_MATCH'] == $eTag)) {
            header('HTTP/1.1 304 Not Modified');
        } else {
            header('HTTP/1.1 200 Ok');
            header("Expires: " .$expires);
            header("Cache-Control: max-age={$maxAge}, public, must-revalidate");
            header("Last-Modified: {$lastModified}");
            header("ETag: {$eTag}");
            header('Content-type: '.$contentType);
        }
    }
}
