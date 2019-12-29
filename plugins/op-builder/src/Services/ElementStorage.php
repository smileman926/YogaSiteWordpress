<?php

namespace OPBuilder\Services;

use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Page;
use OptimizePress\Support\Collection;

class ElementStorage
{
    /**
     * @var array
     */
    protected $pages = [];

    /**
     * @var string
     */
    protected $optionKey = 'opb_element_storage';

    /**
     * Update the element storage with new data
     *
     * @param array $data
     * @return bool
     */
    public function update(array $data)
    {
        // First get existing data
        $storageData = $this->get();

        // The update the array
        $data = array_merge($storageData, $data);

        // We also need to remove empty pages (clean it up)
        $data = $this->cleanupData($data);

        // And update the data inside the storage
        return update_option($this->optionKey, @json_encode($data, true));
    }

    /**
     * @param  array $data
     * @return array
     */
    public function cleanupData(array $data)
    {
        if ($data) {
            // Clean up empty elements
            foreach ($data as $pageKey => $page) {
                if (! $page['elements']) {
                    unset($data[$pageKey]);
                }
            }

            // Order by page ID
            if ($data) {
                ksort($data);
            }
        }

        return $data;
    }

    /**
     * Update element data for a page
     *
     * @param  Page  $page
     * @return bool
     */
    public function updatePage(Page $page)
    {
        // Fetch the WordPress post object
        $wpPage = get_post($page->id);

        // Create initial storage
        $this->pages["page__{$page->id}"] = [
            'id'       => $page->id,
            'title'    => $wpPage->post_title,
            'elements' => [],
        ];

        // Run through all elements on the page
        // and find the method: saveToElementStorage
        if ($page->getChildren()) {
            foreach ($page->getChildren() as $element) {
                $data = $this->getDataForElement($element);

                // And add it to the storage container
                if ($data) {
                    $this->pages["page__{$page->id}"]['elements'] = array_merge($this->pages["page__{$page->id}"]['elements'], $data);
                }
            }
        }

        return $this->update($this->pages);
    }

    /**
     * Get data from element to store in the element storage
     *
     * @param  OPElement  $element
     * @return array
     */
    public function getDataForElement(OPElement $element)
    {
        $data = [];

        if ($element) {
            // Fetch data for the element storage
            $elementData = $element->saveToElementStorage();

            // Add to main container
            if ($elementData) {
                // Add some data for elements that is always added
                $elementDefaultData = [
                    'uuid' => $element->uuid,
                    'type' => $element->type,
                ];

                // Sometimes the value from the element is a boolean, so handle this here
                if ($elementData === true) {
                    $elementData = [];
                }

                // And merge the data
                $data[$element->uuid] = array_merge($elementDefaultData, $elementData);
            }

            // Also get data from child elements
            if ($element->getChildren()) {
                foreach ($element->getChildren() as $child) {
                    $elementData = $this->getDataForElement($child);

                    // Add to main container
                    if ($elementData) {
                        // Sometimes the value from the element is a boolean, so handle this here
                        if ($elementData === true) {
                            $elementData = [];
                        }

                        // Merge it
                        $data = array_merge($data, $elementData);
                    }
                }
            }
        }

        return $data;
    }

    /**
     * Get data for specific page
     *
     * @param $pageId
     * @return bool|array
     */
    public function getPage($pageId)
    {
        $data = $this->get();

        return isset($data["page__$pageId"]) ? $data["page__$pageId"] : false;
    }

    /**
     * Get existing element storage data
     *
     * @return array
     */
    public function get()
    {
        return (array) @json_decode(get_option($this->optionKey), true);
    }
}
