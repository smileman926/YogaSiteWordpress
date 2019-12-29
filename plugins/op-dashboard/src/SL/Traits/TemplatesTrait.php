<?php

namespace OPDashboard\SL\Traits;

use OPDashboard\Services\Cache;
use OPDashboard\Templates\Block;
use OPDashboard\Templates\BlockCategory;
use OPDashboard\Templates\BlockCategoryCollection;
use OPDashboard\Templates\BlocksCollection;
use OPDashboard\Templates\CustomerTemplate;
use OPDashboard\Templates\Template;
use OPDashboard\Templates\TemplateCategory;
use OPDashboard\Templates\TemplateCategoryCollection;
use OPDashboard\Templates\TemplateCollection;
use OPDashboard\Templates\TemplateCollectionCollection;
use OPDashboard\Templates\TemplatesCollection;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;

trait TemplatesTrait
{
    /**
     * Fetch all template categories
     *
     * @return Collection
     */
    public static function getTemplateCategories()
    {
        return Cache::remember('opd_template_categories', OPD_CACHE_TTL_TEMPLATE_CATEGORIES, function() {
            $response   = self::client()->request('GET', 'api/customer/template-categories');
            $data       = $response->data();
            $categories = new TemplateCategoryCollection;

            if ($data) {
                foreach ($data as $dataCategory) {
                    $categories->push(new TemplateCategory($dataCategory));
                }
            }

            return $categories->count() ? $categories : null;
        });
    }

    /**
     * Fetch all block categories
     *
     * @return Collection
     */
    public static function getBlockCategories()
    {
        return Cache::remember('opd_block_categories', OPD_CACHE_TTL_BLOCK_CATEGORIES, function() {
            $response   = self::client()->request('GET', 'api/customer/block-categories');
            $data       = $response->data();
            $categories = new BlockCategoryCollection;

            if ($data) {
                foreach ($data as $dataCategory) {
                    $categories->push(new BlockCategory($dataCategory));
                }
            }

            return $categories->count() ? $categories : null;
        });
    }

    /**
     * Fetch all template categories
     *
     * @return Collection
     */
    public static function getTemplateCollections()
    {
        return Cache::remember('opd_template_collections', OPD_CACHE_TTL_TEMPLATE_COLLECTIONS, function() {
            $response   = self::client()->request('GET', 'api/customer/template-collections');
            $data       = $response->data();
            $categories = new TemplateCollectionCollection;

            if ($data) {
                foreach ($data as $dataCategory) {
                    $categories->push(new TemplateCollection($dataCategory));
                }
            }

            return $categories->count() ? $categories : null;
        });
    }

    /**
     * Fetch templates for a category
     *
     * @param string $category
     * @param string $type
     * @param string $style
     * @param bool $customer
     * @return Collection
     */
    public static function getTemplates($category, $type = 'template', $style = null, $customer = false)
    {
        // Endpoint type
        $typeString  = ($type ?: 'template').'s';
        if ($customer) {
            $cacheKey = 'opd_' . $typeString . '_in_category__my-' . $category . '__with_style__' . $style;
        } else {
            $cacheKey = 'opd_' . $typeString . '_in_category__' . $category . '__with_style__' . $style;
        }
        $typeEndpoint = ($type == 'template') ? 'template-categories' : 'block-categories';

        return Cache::remember($cacheKey, OPD_CACHE_TTL_TEMPLATES, function() use ($category, $type, $typeString, $typeEndpoint, $style, $customer) {
            $endpoint = 'api/customer/' . $typeEndpoint . '/' . $category . '/' . $typeString . '?style=' . $style;
            $response  = self::client()->request('GET', $endpoint);
            $data      = $response->data();
            $templates = new TemplatesCollection;

            if ($data) {
                foreach ($data as $dataTemplate) {
                    if ($customer)
                        $dataTemplate['category'] = 'customer-templates';
                    $templates->push(new Template($dataTemplate));
                }
            }

            return $templates->count() ? $templates : null;
        });
    }

    /**
     * Fetch blocks and filter if needed
     *
     * @param array $filters
     * @return Collection
     */
    public static function getBlocks($filters = [])
    {
        // Endpoint type
        $category    = array_get($filters, 'category');
        $style       = array_get($filters, 'style');
        $cacheKey    = 'opd_blocks'.($category ? '__in_category__'.$category : '').($style ? '__with_style__'.$style : '');

        return Cache::remember($cacheKey, OPD_CACHE_TTL_TEMPLATES, function() use ($category, $style) {
            // Build up filters
            $filters = [];
            if ($category) $filters['category'] = $category;
            if ($style)    $filters['style'] = $style;

            // Now build the query string
            $queryString = http_build_query($filters);

            // And run the request
            $response  = self::client()->request('GET', 'api/customer/blocks?'.$queryString);
            $data      = $response->data();
            $templates = new BlocksCollection;

            if ($data) {
                foreach ($data as $dataTemplate) {
                    $templates->push(new Block($dataTemplate));
                }
            }

            return $templates->count() ? $templates : null;
        });
    }

    /**
     * Fetch templates for a collection
     *
     * @param  string  $collection
     * @return Collection
     */
    public static function getCollectionTemplates($collection)
    {
        return Cache::remember('opd_templates_in_collection__'.$collection, OPD_CACHE_TTL_TEMPLATES, function() use ($collection) {
            $response  = self::client()->request('GET', 'api/customer/template-collections/' . $collection . '/templates');
            $data      = $response->data();
            $templates = new TemplatesCollection;

            if ($data) {
                foreach ($data as $dataTemplate) {
                    $templates->push(new Template($dataTemplate));
                }
            }

            return $templates->count() ? $templates : null;
        });
    }

    /**
     * Fetch template data
     *
     * @param  string  $template
     * @param  string  $type
     * @return Template
     */
    public static function getTemplate($template, $type = 'template')
    {
        // Endpoint type
        $typeString = ($type ?: 'template').'s';

        return Cache::remember('opd_'.$typeString.'__'.$template, OPD_CACHE_TTL_TEMPLATES, function() use ($template, $typeString) {
            $response  = self::client()->request('GET', 'api/customer/' . $typeString . '/' . $template);
            $data      = $response->data();
            $template  = new Template($data);

            return $template;
        });
    }

    /**
     * Fetch customer template data
     *
     * @param  string  $template
     * @param  string  $type
     * @return Template
     */
    public static function getCustomerTemplate($template, $type = 'template')
    {
        // Endpoint type
        $typeString = ($type ?: 'template').'s';

        return Cache::remember('opd_'.$typeString.'__my_'.$template, OPD_CACHE_TTL_TEMPLATES, function() use ($template, $typeString) {
            $response  = self::client()->request('GET', 'api/customer/my-' . $typeString . '/' . $template);
            $data      = $response->data();
            $template  = new CustomerTemplate($data);

            return $template;
        });
    }

    /**
     * Import a template to SL
     *
     * @param mixed  $data
     * @return bool|string
     * @throws \Exception
     */
    public static function importTemplate($data)
    {
        $response  = self::client()->request('POST', 'api/customer/templates/builder-import', $data);
        $data      = $response->data();

        if ($data and isset($data['template_id'])) {
            return $data['template_id'];
        }

        return false;
    }

    /**
     * Import a block to SL
     *
     * @param  mixed  $data
     * @return bool|string
     * @throws \Exception
     */
    public static function importBlock($data)
    {
        $response  = self::client()->request('POST', 'api/customer/blocks/builder-import', $data);
        $data      = $response->data();

        if ($data and isset($data['block_id'])) {
            return $data['block_id'];
        }

        return false;
    }

    /**
     * New Import to SL
     * SL contains logic for customers and admins
     * as well as template or block import
     *
     * @param  mixed  $data
     * @return bool|string
     * @throws \Exception
     */
    public static function import($data)
    {
        $response  = self::client()->request('POST', 'api/customer/builder-import', $data);
        $data      = $response->data();

        if ($data) {
            return $data;
        }

        return false;
    }
}
