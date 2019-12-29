<?php

namespace OPBuilder\Editor\Page;

use Exception;
use OPBuilder\Editor\Page;

trait Helpers
{
    /**
     * Get list of all pages's element options
     *
     * @param  boolean $recursively
     * @param  array   &$source
     * @return array
     */
    public function getOptionsList($recursively=false, &$source=array())
    {
        $options = $this->pageData['data']->options;
        foreach ($options as $media => $value) {
            foreach (array_keys((array) $value) as $key) {
                if (! in_array($key, $source)) {
                    $source[] = $key;
                }
            }
        }

        if ($recursively) {
            foreach ($this->children as $element) {
                $element->getOptionsList($recursively, $source);
            }
        }

        sort($source);

        return $source;
    }

    /**
     * Get list of all option values by
     * option key
     *
     * @param  string  $key
     * @param  boolean $recursively
     * @param  array   &$source
     * @return array
     */
    public function getOptionValuesByKey($key, $recursively=false, &$source=array())
    {
        $options = $this->pageData['data']->options;
        foreach ($options as $media => $mediaOptions) {
            foreach ($mediaOptions as $name => $property) {
                if ($name !== $key) {
                    continue;
                }

                if (is_string($property)) {
                    $property = array('' => $property);
                }

                foreach ($property as $selector => $value) {
                    if (! in_array($value, $source)) {
                        $source[] = $value;
                    }
                }
            }
        }

        if ($recursively) {
            foreach ($this->children as $element) {
                $element->getOptionValuesByKey($key, $recursively, $source);
            }
        }

        sort($source);

        return $source;
    }

    /**
     * Simply update post timestamps for cache busting
     *
     * @return void
     */
    public function touch()
    {
        wp_update_post(['ID' => $this->id]);
    }

    /**
     * Simply re-build the page object with new JSON data
     *
     * @param  mixed  $data
     * @param  bool   $save
     * @param  bool   $prerender
     * @return Page
     * @throws Exception
     */
    public function rebuild($data, $save = false, $prerender = false): Page
    {
        if ($save) {
            // @TODO: Save the new JSON page structure
        }

        return new Page($data, $prerender);
    }

    /**
     * Find all UUID's in page data
     *
     * @param $data
     * @return array
     */
    public function findAllPageUuids($data): array
    {
        $uuids = [];

        if (isset($data->children) && $data->children) {
            foreach ($data->children as &$element) {
                $uuids[] = $element->uuid;

                // And also check child elements
                if ($element->children) {
                    $childUuids = $this->findAllPageUuids($element);

                    // If any are found simply append them,
                    if ($childUuids) {
                        $uuids = array_merge($uuids, $childUuids);
                    }
                }
            }
        }

        return $uuids;
    }

    /**
     * Get timestamp when page was created
     *
     * @return string|null
     */
    public function createdAt()
    {
        return $this->wpPost ? $this->wpPost->post_date : null;
    }

    /**
     * Get timestamp when page was updated
     *
     * @return string|null
     */
    public function updatedAt()
    {
        return $this->wpPost ? $this->wpPost->post_modified_gmt : null;
    }

    /**
     * Array representation of the editor page
     *
     * @return array
     */
    public function toArray(): array
    {
        return $this->children->toArray();
    }

    /**
     * JSON representation of the complete page
     *
     * @param  integer $options
     * @return string
     */
    public function toJson($options = 0): string
    {
        return @json_encode($this->children->toArray());
    }
}
