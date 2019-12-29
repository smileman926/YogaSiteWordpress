<?php

namespace OPBuilder\Services;

use OPBuilder\Support\Tools;

class Pages
{
    /**
     * Build up params for OP builder wrapper
     *
     * @param  int $pageId
     * @return array
     */
    public static function buildParams($pageId)
    {
        return [
            'data-op3-page-id'         => $pageId,
            'data-op3-page-status'     => get_post_status($pageId),
            'data-op3-page-has-data'   => (bool) get_post_meta($pageId, '_op3_summary', true),
            'data-op3-api-base-url'    => get_rest_url(null, 'op3/v1'),
            'data-op3-api-page-url'    => get_rest_url(null, 'op3/v1/pages/' . $pageId),
            'data-op3-edit-url'        => op3_edit_page_url($pageId),
            'data-op3-live-editor-url' => site_url('op-builder/'.$pageId),
            'data-op3-editor-mode'     => Tools::isOPPage($pageId),
        ];
    }

    /**
     * Build up HTML attributes from page data params
     *
     * @param  int $pageId
     * @return string
     */
    public static function builtHtmlDataParams($pageId)
    {
        $dataParams = "";
        $params     = self::buildParams($pageId);

        // Build up HTML attributes
        foreach ($params as $name => $value) {
            $dataParams .= ' ' . $name . '="' . $value . '"';
        }

        return $dataParams;
    }
}
