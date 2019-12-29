<?php

namespace OPBuilder\Http;

use OPDashboard\SL\SL;
use OptimizePress\Support\Collection;

class TemplatesController extends Controller
{
    /**
     * Display template list by category/collection
     */
    public static function index()
    {
        $templates   = self::getTemplates($_GET);
        $categoryUid = isset($_GET['category'])   ? $_GET['category'] : null;

        if ($templates && count($templates)) {
            op3_view('pages/partials/templates', ['templates' => $templates, 'categoryUid' => $categoryUid]);
        } else {
            op3_view('pages/partials/templates_empty', ['categoryUid' => $categoryUid]);
        }

        wp_die();
    }

    /**
     * Load templates from category/collection
     *
     * @param  array $params
     * @return bool|Collection
     */
    protected static function getTemplates($params)
    {
        $collectionUid = isset($params['collection']) ? $params['collection'] : null;
        $categoryUid   = isset($params['category'])   ? $params['category'] : null;
        $styleUid      = isset($params['style'])      ? $params['style'] : null;
        $templates     = false;

        if ($categoryUid) {
            $templates = SL::getTemplates($categoryUid, 'template', $styleUid);
        } elseif ($collectionUid) {
            $templates = SL::getCollectionTemplates($collectionUid);
        }

        return $templates;
    }
}
