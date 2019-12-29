<?php

namespace OPBuilder\Editor\Page;

use Exception;
use OPBuilder\Editor\Menus;

trait Cache
{
    /**
     * Check if page is cached for frontend
     *
     * @return string|null
     * @throws Exception
     */
    public function cached()
    {
        if (op3_is_public() && ! op3_is_admin()) {
            if (! $this->cacheNeedsToUpdate()) {
                $cached = get_post_meta($this->id, '_op3_cache', true);

                if ($cached) {
                    return $cached;
                }
            }
        }
    }

    /**
     * Update page cache
     *
     * @param $html
     */
    public function updateCache($html)
    {
        if (op3_is_public() && ! op3_is_admin()) {
            update_post_meta($this->id, '_op3_cache', $html);
            update_post_meta($this->id, '_op3_cache_timestamp', time());
        }
    }

    /**
     * Check if we need to update the cache
     *
     * @return bool
     */
    public function cacheNeedsToUpdate(): bool
    {
        $needsToUpdate = false;

        // Get timestamp when page was last updated
        $pageTimestamp = $this->summary ? $this->summary->timestamp : 0;

        // And then we need to check the cached timestamp
        $cacheTimestamp = (int) get_post_meta($this->id, '_op3_cache_timestamp', true);

        // Compare the timestamps
        if ($pageTimestamp > $cacheTimestamp) {
            $needsToUpdate = true;
        } else {
            // We also need to check menus
            if (Menus::anyMenuWasUpdatedAfter(date('Y-m-d H:i:s', $cacheTimestamp))) {
                $needsToUpdate = true;
            }
        }

        return $needsToUpdate;
    }
}
