<?php

namespace OPBuilder\Editor\Page;

use stdClass;
use OPBuilder\Editor\Elements\OPElement;
use OptimizePress\Support\Collection;
use function OptimizePress\Support\object_get;

trait Elements
{
    /**
     * Build up the element object
     *
     * @param  array  $elementData
     * @return mixed
     */
    public function buildElement($elementData)
    {
        return $this->elementRepo->build($elementData, $this);
    }

    /**
     * Build up the root element of the page
     *
     * @return mixed
     */
    public function buildRootElement()
    {
        // Let's add page data if possible
        if ($this->pageData['data']) {
            $root = (object) $this->pageData['data'];
        } else {
            $root = new stdClass;
        }

        // Add additional properties
        $root->uuid        = 'op-root'; // #op3-designer-element
        $root->type        = 'section';
        // $root->children    = []; // @TODO: Investigate why we set the children data to empty
        $this->rootElement = $this->buildElement($root);

        // We also need to apply custom actions for the root element
        $this->applyCustomElementProperties($this->rootElement);
        $this->renderFunnelScripts();

        return $this->rootElement->render();
    }

    /**
     * Get list of all pages's element types
     *
     * @param  boolean $recursively
     * @param  array   &$source
     * @return array
     */
    public function getElementTypesList($recursively=false, &$source=array())
    {
        //$value = $this->type;
        //if ($value && ! in_array($value, $source)) {
        //    $source[] = $value;
        //}

        if ($recursively) {
            foreach ($this->children as $element) {
                $element->getElementTypesList($recursively, $source);
            }
        }

        sort($source);

        return $source;
    }

    /**
     * Get list of all element UUIDs
     *
     * @param  array  $elements
     * @return array
     */
    public function getAllElementUuids($elements = null)
    {
        $result = [];

        // Set root elements
        if (! $elements) {
            $elements = $this->getChildren();
        }

        // Loop through all elements and find UUIDs
        foreach ($elements as $element) {
            // Simply add the UUID to the result list
            $result[] = $element->uuid;

            // And check if we have child elements
            if ($element->getChildren()) {
                $childrenUuids = $this->getAllElementUuids($element->getChildren());

                // Add to results
                $result = array_merge($result, $childrenUuids);
            }
        }

        return $result;
    }

    /**
     * Get list of all element GIDs
     *
     * @param  array  $elements
     * @return array
     */
    public function getAllElementGids($elements = null)
    {
        $result = [];

        // Set root elements
        if (! $elements) {
            $elements = $this->getChildren();
        }

        // Loop through all elements and find GIDs
        foreach ($elements as $element) {
            // Simply add the GID to the result list
            if ( ! empty($element->gid)) {
                $result[] = $element->gid;
            }

            // And check if we have child elements
            if ($element->getChildren()) {
                $childrenGids = $this->getAllElementGids($element->getChildren());

                // Add to results
                $result = array_merge($result, $childrenGids);
            }
        }

        return $result;
    }

    /**
     * Parse element options and return in more readable way
     *
     * @param  string|array $element
     * @param  string       $section
     * @return array
     */
    public function getElementOptions($element, $section = 'all')
    {
        $options = [];

        // Fetch element
        if (is_string($element)) {
            $element = $this->findElementDataById($element, false);
        }

        // Loop through options and filter out values
        if ($element) {
            if (isset($element->options, $element->options->{$section}) && $elementOptions = $element->options->{$section}) {
                foreach ($elementOptions as $elementOptionKey => $elementOption) {
                    if (is_array($elementOption) || is_object($elementOption)) {
                        $values = array_values((array) $elementOption);
                        $options[$elementOptionKey] = array_shift($values);
                    } else {
                        $options[$elementOptionKey] = $elementOption;
                    }
                }
            }
        }

        return $options;
    }

    /**
     * Find specific page element by UUID
     *
     * @param  string            $uuid
     * @param  bool              $includeChildren
     * @param  array|Collection  $elements
     * @return OPElement|null
     */
    public function findElementByUuid($uuid, $includeChildren = false, $elements = null)
    {
        $found = null;

        // Default elements
        if (isset($this->pageData['data'], $this->pageData['data']->children) && ! $elements) {
            $elements = $this->pageData['data']->children;
        }

        // Loop through all elements
        foreach ($elements as $element) {
            // If we find the element simply return it
            if ($uuid === object_get($element, 'uuid')) {
                $found = $element;
            }

            // Otherwise we also need to check the elements children
            if (! $found and $elementChildren = object_get($element, 'children')) {
                $foundChild = $this->findElementByUuid($uuid, $includeChildren, $elementChildren);

                if ($foundChild) {
                    $found = $foundChild;
                }
            }
        }

        return $found;
    }

    /**
     * Find element in page and return data
     *
     * @param  string $uuid
     * @param  bool   $includeChildren
     * @param null    $elements
     * @return mixed
     */
    public function findElementDataById($uuid, $includeChildren = false, $elements = null)
    {
        $found = null;

        // Default elements
        if (isset($this->pageData['data'], $this->pageData['data']->children) && ! $elements) {
            $elements = $this->pageData['data']->children;
        }

        // Loop through all elements
        foreach ($elements as $element) {
            // If we find the element simply return it
            if ($uuid === object_get($element, 'uuid')) {
                $found = $element;
            }

            // Otherwise we also need to check the elements children
            if (! $found and $elementChildren = object_get($element, 'children')) {
                $foundChild = $this->findElementDataById($uuid, $includeChildren, $elementChildren);

                if ($foundChild) {
                    $found = $foundChild;
                }
            }
        }

        return $found;
    }

    /**
     * Find element in page and return data
     *
     * @param  string|array $types
     * @param  bool         $includeChildren
     * @param null          $elements
     * @return mixed
     */
    public function findElementsByType($types, $includeChildren = false, $elements = null)
    {
        $found = new Collection;

        // Check if types is array
        if (! is_array($types)) {
            $types = [$types];
        }

        // Default elements
        if (isset($this->pageData['data'], $this->pageData['data']->children) && ! $elements) {
            $elements = $this->pageData['data']->children;
        }

        // Loop through all elements
        if (! empty($elements)) {
            foreach ($elements as $element) {
                // If we find the element simply return it
                if (in_array(object_get($element, 'type'), $types, true)) {
                    $found[object_get($element, 'uuid')] = $element;
                }

                // Otherwise we also need to check the elements children
                if ($elementChildren = object_get($element, 'children')) {
                    $foundChildren = $this->findElementsByType($types, $includeChildren, $elementChildren);

                    if ($foundChildren->count()) {
                        $found = $found->merge($foundChildren);
                    }
                }
            }
        }

        return $found;
    }

    /**
     * Regenerate UUID's for element and all of the children
     *
     * @param  mixed $element
     * @return mixed
     */
    public function refreshElementUuids(&$element)
    {
        $element->uuid = op3_element_uuid($this->uuids);

        // Also handle the children
        if ($element->children) {
            foreach ($element->children as &$child) {
                $child = $this->refreshElementUuids($child);
            }
        }

        return $element;
    }

    /**
     * Process a list of elements for exporting templates/sections to SL
     *
     * @param  array  $elements
     * @return array
     */
    public function processElementsForExport(&$elements): array
    {
        foreach ($elements as &$element) {
            if ($element->type === 'form') {
                // Find form integration provider
                $integrationTypeProperties = (array) (isset($element->options) && isset($element->options->all) && isset($element->options->all->optinIntegration)) ? $element->options->all->optinIntegration : [];
                $integrationType           = reset($integrationTypeProperties);

                // Loop through all child element in form, and remove some
                // This goes for non-email integrations
                if ($element->children && $integrationType !== 'email') {
                    foreach ($element->children as $index => &$formElement) {
                        // Remove all input elements
                        if ($formElement->type !== 'button') {
                            unset($element->children[$index]);
                        }
                    }

                    // Reset keys
                    $element->children = array_values($element->children);

                    // And then add a new default email field
                    array_unshift($element->children, (object) [
                        'uuid'    => op3_element_uuid(),
                        'gid'     => '',
                        'type'    => 'input',
                        'spec'    => '',
                        'style'   => '',
                        'options' => (object) [
                            'all' => (object) [
                                'typeAttr'               => (object) [' input' => 'email'],
                                'name'                   => (object) [' input' => 'email'],
                                'placeholder'            => (object) [' input' => 'Enter your e-mail'],
                                'visibleLock'            => (object) [' input' => 1],
                                'requiredFull'           => (object) [' input' => 'required="1"'],
                                'requiredLock'           => (object) [' input' => 1],
                                'value'                  => (object) [' input' => ''],
                                'urlMapping'             => (object) [' input' => ''],
                                'inputValidationMessage' => (object) [' input' => 'This field is required.'],
                                'op3Icon'                => (object) [' .op3-element-input-edit-icon' => 'op3-icon-email-83-1'],
                                'html'                   => (object) [' [data-op3-contenteditable]' => '<div>E-mail</div>'],
                                'class'                  => '',
                            ],
                            'screen and (max-width: 1023px)' => (object) [],
                            'screen and (max-width: 767px)'  => (object) [],
                        ],
                        'children' => [],
                    ]);
                }

                // Finally set form options
                $element->options->all->optinIntegration->{' [name="optin-integration"]'} = 'email';

                // And remove some options
                unset($element->options->all->adminEmail);
                unset($element->options->all->optinList);
                unset($element->options->all->optinTag);
                unset($element->options->all->optinGoal);
                unset($element->options->all->optinWebhookUrl);
                unset($element->options->all->opinFormId);
            }

            // Also process the child element
            if ($element->children && ! empty($element->children)) {
                $element->children = $this->processElementsForExport($element->children);
            }
        }

        return $elements;
    }

    /**
     * Go through all elements and children and set option to a specific value
     *
     * @param  array   $elements
     * @param  string  $optionName
     * @param  mixed   $newValue
     * @return array
     */
    public function setAllElementOptions(&$elements, $optionName, $newValue): array
    {
        foreach ($elements as &$element) {
            // Check if option exists
            if ($element->options && isset($element->options->all) && $element->options->all && isset($element->options->all->{$optionName})) {
                // And set the new value
                $element->options->all->{$optionName} = $newValue;
            }

            // Also process child elements
            if ($element->children) {
                $element->children = $this->setAllElementOptions($element->children, $optionName, $newValue);
            }
        }

        return $elements;
    }
}
