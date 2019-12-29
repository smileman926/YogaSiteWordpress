<?php

namespace OPBuilder\Editor\Page;

use Exception;
use OPBuilder\Repositories\GlobalElementRepository;

trait GlobalElements
{
    /**
     * @var GlobalElementRepository
     */
    protected $globalElementRepo;

    /**
     * Initialize the global elements functionality
     *
     * @return void
     */
    public function initGlobalElements()
    {
        $this->globalElementRepo = new GlobalElementRepository;
    }

    /**
     * Check if page has any global elements
     *
     * @return bool
     */
    public function hasGlobalElements(): bool
    {
        return isset($this->pageData['summary']) && isset($this->pageData['summary']->gids) && count($this->pageData['summary']->gids);
    }

    /**
     * Get the latest changed global element on this page
     *
     * @return string|null
     */
    public function getLatestGlobalElementUpdatedAt()
    {
        if ($this->hasGlobalElements()) {
            global $wpdb;

            // Gel all IDs of global element on this page
            $globalElementIds = $this->pageData['summary']->gids;

            if ($globalElementIds && count($globalElementIds)) {
                // Then let's find the latest global element
                $latestGlobalElement = $wpdb->get_row("SELECT * FROM $wpdb->posts WHERE post_type = 'op_global_element' AND id IN (" . implode(',', $globalElementIds) .') ORDER BY post_modified_gmt DESC');

                // And return the updated timestamp
                if ($latestGlobalElement) {
                    return $latestGlobalElement->post_modified_gmt;
                }
            }
        }
    }

    /**
     * Check if any global element was changed after the page was saved
     *
     * @return bool
     */
    public function globalElementsNeedUpdating(): bool
    {
        if ($this->hasGlobalElements()) {
            // Check the global element timestamp and compare to page
            $latestGlobalElementUpdatedAt = $this->getLatestGlobalElementUpdatedAt();
            $pageChangedAt                = $this->updatedAt();

            return $latestGlobalElementUpdatedAt && $latestGlobalElementUpdatedAt > $pageChangedAt;
        }

        return false;
    }

    /**
     * Process and replace global elements
     *
     * @return array
     * @throws Exception
     */
    public function processGlobalElements($saveUpdates = false): array
    {
        // Process global elements if needed
        if ($this->hasGlobalElements() && $this->globalElementsNeedUpdating()) {
            $this->pageData['data']->children = $this->replaceGlobalElements($this->pageData['data']->children);

            // And save updates to DB
            if ($saveUpdates) {
                // Update all of the data and the summary
                $this->updateFromData();

                // Then we clear the cache of the page
                op3_clear_single_page_cache($this->pageData['id'], true);
            }
        }

        return (array) $this->pageData['data']->children;
    }

    /**
     * Process and replace global elements
     *
     * @param  array $elements
     * @return array
     */
    public function replaceGlobalElements(&$elements): array
    {
        if ($elements) {
            // Loop through all elements
            foreach ($elements as &$element) {
                if (isset($element->gid) && $element->gid && $globalElement = $this->globalElementRepo->find($element->gid)) {
                    op3_log()->debug('[GLOBAL ELEMENTS] Syncing global element: ' . $element->gid);

                    // Override entire element
                    $element = $globalElement->data();

                    // We also need a new UUID
                    $this->refreshElementUuids($element);

                    // Mark page to refresh data after rendering
                    $this->forceUpdateData = true;
                }

                // Also go through children
                if (is_object($element) && $element->children) {
                    $element->children = $this->replaceGlobalElements($element->children);
                }
            }
        }

        return (array) $elements;
    }
}
