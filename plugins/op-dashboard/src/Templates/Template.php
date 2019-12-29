<?php

namespace OPDashboard\Templates;

use OPDashboard\Services\DataObject;
use function OptimizePress\Support\array_get;

class Template extends DataObject
{
    /**
     * Type of the template
     *
     * @var string
     */
    protected $type = 'template';

    /**
     * Return JSON structure for template
     *
     * @return string
     */
    public function structure()
    {
        return stripslashes_deep(wp_slash(base64_decode($this->data['structure'])));
    }

    /**
     * Update template object structure
     *
     * @param mixed $structure
     */
    public function updateStructure($structure)
    {
        if (is_string($structure)) {
            $this->data['structure'] = base64_encode(stripslashes_deep(wp_slash($structure)));
        } elseif (is_object($structure)) {
            $this->data['structure'] = base64_encode(stripslashes_deep(wp_slash(json_encode($structure))));
        }
    }

    /**
     * Parse the template data structure
     *
     * @return array|mixed|object
     */
    public function parseStructure()
    {
        return @json_decode($this->structure());
    }

    /**
     * Find media item by ID
     *
     * @param  string $id
     * @return string
     */
    public function media($id)
    {
        return array_get($this->media, $id);
    }

    /**
     * Parse images from JSON data and import to WP media library
     *
     * @param int  $page
     */
    public function parseImages($page = null)
    {

    }

    /**
     * Return preview image
     *
     * @param  string $size
     * @return string
     */
    public function preview($size)
    {
        return array_get($this->preview, $size);
    }

    /**
     * Find elements in template and set specific options
     *
     * @param  string  $elementType
     * @param  string  $option
     * @param  mixed  $value
     * @param  array  $conditions
     */
    public function setElementOptionByType($elementType, $option, $value = null, $conditions = [])
    {
        // Get structure
        $structure = $this->parseStructure();

        // Loop through elements
        if ($structure->children) {
            foreach ($structure->children as $element) {
                // Add to list when found
                if ($element and $element->type === $elementType) {
                    // Change the stuff
                }

                // Also check element children (recursive magic)
                if ($element->children) {
                    $this->setChildOptionByType($element->children, $elementType, $option, $value, $conditions);
                }
            }
        }

        $this->updateStructure($structure);
    }

    /**
     * Change element option by type
     *
     * @param  array  $elements
     * @param  string  $elementType
     * @param  string  $option
     * @param  mixed  $value
     * @param  array  $conditions
     * @return mixed
     */
    public function setChildOptionByType($elements, $elementType, $option, $value = null, $conditions = [])
    {
        if ($elements) {
            foreach ($elements as &$element) {
                if ($element->type === $elementType) {
                    // Check the conditions
                    if ($conditions) {
                        foreach ($conditions as $conditionOptionName => $condition) {
                            // First let's get the value
                            $elementOptions     = isset($element->options->all->{$conditionOptionName}) ? array_values((array) $element->options->all->{$conditionOptionName}) : [];
                            $elementOptionValue = isset($elementOptions[0]) ? $elementOptions[0] : null;

                            // Flag to change the value
                            $canSet = true;

                            // Go through conditions
                            foreach ($condition as $conditionKey => $conditionOptions) {
                                $conditionTrigger   = isset($conditionOptions[0]) ? $conditionOptions[0] : null;
                                $conditionValue     = isset($conditionOptions[1]) ? $conditionOptions[1] : null;

                                if ($elementOptionValue && $conditionTrigger && $conditionValue) {
                                    if (($conditionTrigger === '==' || $conditionTrigger === '=') && $conditionValue != $elementOptionValue) {
                                        $canSet = false;
                                    } elseif ($conditionTrigger === '!=' && $conditionValue == $elementOptionValue) {
                                        $canSet = false;
                                    }
                                }
                            }

                            /*if ($elementOptionValue && $conditionTrigger && $conditionValue) {
                                if (($conditionTrigger === '==' || $conditionTrigger === '=') && $conditionValue === $elementOptionValue) {
                                    $element->options->all->{$option} = $value;
                                } elseif ($conditionTrigger === '!=' && $conditionValue != $elementOptionValue) {
                                    $element->options->all->{$option} = $value;
                                }
                            }*/

                            // Finally set the value if allowed
                            if ($canSet && $elementOptionValue) {
                                $element->options->all->{$option} = $value;
                            }
                        }
                    } else {
                        $element->options->all->{$option} = $value;
                    }
                }

                if ($element->children) {
                    $this->setChildOptionByType($element->children, $elementType, $option, $value, $conditions);
                }
            }
        }

        return $elements;
    }

    /**
     * Find template elements by type
     *
     * @param  string $type
     * @param  array  $elements
     * @return array
     */
    public function findElementsByType($type, $elements = null)
    {
        $elements      = $elements ?: $this->parseStructure()->children;
        $foundElements = [];

        foreach ($elements as $element) {
            // Add to list when found
            if ($element and $element->type === $type) {
                $foundElements[] = &$element;
            }

            // Also check element children
            if ($element->children) {
                $foundChildren = $this->findElementsByType($type, $element->children);

                if ($foundChildren) {
                    foreach ($foundChildren as $foundChild) {
                        $foundElements[] = &$foundChild;
                    }
                }
            }
        }

        return $foundElements;
    }
}
