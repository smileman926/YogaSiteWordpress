<?php

namespace OPDashboard\SL\Traits;

use OPDashboard\Funnels\Funnel;
use OPDashboard\Funnels\FunnelCategory;
use OPDashboard\Funnels\FunnelPage;
use OPDashboard\Funnels\FunnelStyle;
use OPDashboard\Services\Cache;
use OptimizePress\Support\Collection;


trait FunnelsTrait
{
    /**
     * Return all funnel styles (can filter by categories)
     *
     * @param  string $categoryUid
     * @return Collection
     */
    public static function getFunnels($categoryUid = null)
    {
        $cacheKey = $categoryUid ? 'opd_funnels_in_category__' . $categoryUid : 'opd_all_funnels';
        $path     = $categoryUid ? 'api/customer/funnel-categories/' . $categoryUid . '/funnels' : 'api/customer/funnels';

        return Cache::remember($cacheKey, OPD_CACHE_TTL_FUNNELS, function() use ($categoryUid, $path) {
            $response  = self::client()->request('GET', $path);
            $data      = $response->data();
            $funnels   = new Collection;

            if ($data) {
                foreach ($data as $dataFunnel) {
                    $funnels->push(new Funnel($dataFunnel));
                }
            }

            return $funnels->count() ? $funnels : null;
        });
    }

    /**
     * Get funnel details
     *
     * @param string $uid
     * @return mixed
     */
    public static function getFunnelByUid($uid)
    {
        $cacheKey = 'opd_funnel_details_for__' . $uid;

        return Cache::remember($cacheKey, OPD_CACHE_TTL_FUNNELS, function() use ($uid) {
            $response  = self::client()->request('GET', 'api/customer/funnels/' . $uid);
            $data      = $response->data();

            if ($data) {
                return new Funnel($data);
            }
        });
    }

    /**
     * Return all funnel categories
     *
     * @return Collection
     */
    public static function getFunnelCategories()
    {
        return Cache::remember('opd_funnel_categories', OPD_CACHE_TTL_FUNNEL_CATEGORIES, function() {
            $response   = self::client()->request('GET', 'api/customer/funnel-categories');
            $data       = $response->data();
            $categories = new Collection;

            if ($data) {
                foreach ($data as $dataCategory) {
                    $categories->push(new FunnelCategory($dataCategory));
                }
            }

            return $categories->count() ? $categories : null;
        });
    }

    /**
     * Return funnel category details
     *
     * @param  string $uid
     * @return FunnelCategory
     */
    public static function getFunnelCategory($uid)
    {
        return Cache::remember('opd_funnel_category__' . $uid, OPD_CACHE_TTL_FUNNEL_CATEGORIES, function() use ($uid) {
            $response   = self::client()->request('GET', 'api/customer/funnel-categories/' . $uid);
            $data       = $response->data();

            if ($data) {
                return new FunnelCategory($data);
            }
        });
    }

    /**
     * Return all funnel categories
     *
     * @return Collection
     */
    public static function getFunnelStyles($funnelUid)
    {
        return Cache::remember('opd_funnel_styles_' . $funnelUid, OPD_CACHE_TTL_FUNNELS, function() use ($funnelUid) {
            $response   = self::client()->request('GET', 'api/customer/funnels/' . $funnelUid . '/styles');
            $data       = $response->data();
            $styles     = new Collection;

            if ($data) {
                foreach ($data as $dataStyle) {
                    $styles->push(new FunnelStyle($dataStyle));
                }
            }

            return $styles->count() ? $styles : null;
        });
    }

    /**
     * Return all funnel categories
     *
     * @param  string $funnelUid
     * @param  string $styleUid
     * @return Collection
     */
    public static function getFunnelStyle($funnelUid, $styleUid)
    {
        return Cache::remember('opd_funnel_style__'.$funnelUid.'__'.$styleUid, OPD_CACHE_TTL_FUNNELS, function() use ($funnelUid, $styleUid) {
            $response   = self::client()->request('GET', 'api/customer/funnels/' . $funnelUid . '/styles/' . $styleUid);
            $data       = $response->data();

            if ($data) {
                return new FunnelStyle($data);
            }
        });
    }
}
