<?php

namespace OPBuilder\Editor\Elements;

use OPBuilder\Editor\Page;
use OPBuilder\Editor\ElementCollection;
use OPBuilder\Editor\Parse\Css;
use OPBuilder\Editor\Parse\CssClasses;
use OPBuilder\Repositories\ElementRepository;
use OPBuilder\Repositories\GlobalElementRepository;
use OPDashboard\Services\GeoIp;
use OptimizePress\Support\Collection;
use OptimizePress\Support\Contracts\Jsonable;
use OptimizePress\Support\Contracts\Arrayable;

abstract class OPElement implements Arrayable, Jsonable
{
    /**
     * Unique ID for element
     *
     * @var string
     */
    public $uuid;

    /**
     * Global ID for element
     *
     * @var string
     */
    public $gid;

    /**
     * Type of the element (used to load the configuration)
     *
     * @param string
     */
    public $type;

    /**
     * The element style (fetched through the style ID)
     *
     * @param string
     */
    public $style;

    /**
     * @param string
     */
    public $styleId;

    /**
     * @param array
     */
    public $config;

    /**
     * @param
     */
    public $content;

    /**
     * @param array
     */
    protected $wrapHtml = '';

    /**
     * @param string
     */
    protected $class;

    /**
     * @param opelement
     */
    protected $parent;

    /**
     * @param Collection
     */
    protected $children;

    /**
     * @param string
     */
    protected $codeBeforeElement;

    /**
     * @param string
     */
    protected $codeAfterElement;

    /**
     * The root page for the element
     *
     * @param Page
     */
    public $page;

    /**
     * Selector changes:
     * For backward compatibility we can define
     * all changes in property selectors. If
     * user saves it's page and then updates plugin
     * (where we change some selector), property
     * getter on that element will no longer have
     * value as user saved it. So all property
     * selector changes go here as array of
     * arrays with property name, old selector
     * and new selector in it (see example below)...
     *
     * @var array
     */
    protected $selectorChanges = [
        // ['color', ' > a', 'color', ' .link'],
        // ['backgroundColor', ' > a > span', 'backgroundColor', ' .link-text'],
    ];

    /**
     * Init new element
     *
     * @param  array           $config
     * @param  Page            $page
     * @param  OPElement|null  $parent
     */
    public function __construct($config, Page $page, OPElement $parent = null)
    {
        $this->page     = $page;
        $this->config   = new OPElementConfig($config);
        $this->uuid     = $this->config->getUuid();
        $this->gid      = $this->config->getGid();
        $this->type     = $this->config->getType();
        $this->spec     = $this->config->getSpec();
        $this->styleId  = $this->config->getStyleId();
        $this->style    = $this->config->getStyle();
        $this->class    = $this->config->getClass();
        $this->content  = $this->config->getContent();
        $this->parent   = $parent;
        $this->children = $this->buildChildren();
        $this->options  = $this->config->options;
        $this->codeBeforeElement  = isset($this->options->all->codeBeforeElement) ? $this->options->all->codeBeforeElement : "";
        $this->codeAfterElement   = isset($this->options->all->codeAfterElement) ? $this->options->all->codeAfterElement : "";

        $this->fixSelectors();
    }

    /**
     * Backward compatibility selectors fix
     *
     * @return void
     */
    private function fixSelectors()
    {
        $hasChanges = false;

        foreach($this->options as $media => &$rules) {
            if (empty($rules)) {
                continue;
            }

            foreach($this->selectorChanges as $change) {
                $propertyNameOld = $change[0];
                $selectorOld = $change[1];
                $propertyNameNew = $change[2];
                $selectorNew = $change[3];

                // new selector not defined
                if (empty($propertyNameNew)) {
                    $propertyNameNew = $propertyNameOld;
                }

                // no changes, invalid entry, wtf???
                if ($propertyNameOld == $propertyNameNew && $selectorOld == $selectorNew) {
                    continue;
                }

                // PHP 7.0 or below has a "bug" where it adds "_empty_" for
                // empty array keys so we simply fix the CSS selector here
                if (isset($rules->{$propertyNameOld}) && is_object($rules->{$propertyNameOld}) && empty($selectorOld) && isset($rules->{$propertyNameOld}->{'_empty_'})) {
                    $selectorOld = '_empty_';
                }

                // get current value
                $value = null;
                if (isset($rules->{$propertyNameOld}) && empty($selectorOld) && is_string($rules->{$propertyNameOld})) {
                    $value = $rules->{$propertyNameOld};
                    unset($rules->{$propertyNameOld});
                } elseif (isset($rules->{$propertyNameOld}) && is_object($rules->{$propertyNameOld}) && isset($rules->{$propertyNameOld}->{$selectorOld})) {
                    $value = $rules->{$propertyNameOld}->{$selectorOld};
                    unset($rules->{$propertyNameOld}->{$selectorOld});

                    if (is_countable($rules->{$propertyNameOld}) && count($rules->{$propertyNameOld}) === 1) {
                        unset($rules->{$propertyNameOld});
                    }
                } else {
                    continue;
                }

                // set new value to new property/selector
                if ( ! isset($rules->{$propertyNameNew}) && empty($selectorNew)) {
                    $rules->{$propertyNameNew} = $value;
                } elseif ( ! isset($rules->{$propertyNameNew})) {
                    $rules->{$propertyNameNew} = [$selectorNew => $value];
                } elseif (is_object($rules->{$propertyNameNew})) {
                    $rules->{$propertyNameNew}->{$selectorNew} = $value;
                }
                else {
                    $rules->{$propertyNameNew} = ["" => $rules->{$propertyNameNew}];
                    $rules->{$propertyNameNew}->{$selectorNew} = $value;
                }

                // flag changes so we can force db update
                $hasChanges = true;
            }
        }

        // force db update
        if ($hasChanges) {
            $this->page->forceDataRefresh = true;
        }
    }

    /**
     * Get list of all element's types
     *
     * @param  boolean $recursively
     * @param  array   &$source
     * @return array
     */
    public function getElementTypesList($recursively=false, &$source=array())
    {
        if (! in_array($this->type, $source)) {
            $source[] = $this->type;
        }

        if ($recursively) {
            foreach ($this->children as $element) {
                $element->getElementTypesList($recursively, $source);
            }
        }

        sort($source);

        return $source;
    }

    /**
     * Get list of all element's options
     *
     * @param  boolean $recursively
     * @param  array   &$source
     * @return array
     */
    public function getOptionsList($recursively=false, &$source=array())
    {
        foreach ($this->getOptionKeys() as $key) {
            if (! in_array($key, $source)) {
                $source[] = $key;
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
        foreach ($this->getMediaList() as $media) {
            $property = $this->getOption($key, $media);
            if (empty($property)) {
                continue;
            }

            if (is_string($property)) {
                $property = array('' => $property);
            }

            foreach ($property as $selector => $value) {
                if (! empty($value) && ! in_array($value, $source)) {
                    $source[] = $value;
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
     * Get list of all children fontFamily options
     *
     * @return array
     */
    public function getChildrenOptionsFontFamily()
    {
        $result = array();

        foreach ($this->children as $element) {
            foreach($element->getMediaList() as $mediaQuery) {
                $key = $element->getOption('fontFamily', $mediaQuery);

                if ($key && (is_object($key) || is_array($key))) {
                    $arrayKey = (array) $key;
                    $key = reset($arrayKey);
                }

                if ($key && ! in_array($key, $result)) {
                    $result[] = $key;
                }
            }

            foreach ($element->getChildrenOptionsFontFamily(true) as $key) {
                if (! in_array($key, $result)) {
                    $result[] = $key;
                }
            }
        }

        return $result;
    }

    /**
     * Render the element
     *
     * @return string
     */
    public function render(): string
    {
        // Get configuration markup
        $markup = $this->configMarkup();

        // And render children elements
        $childrenMarkup = $this->renderChildren();
        $options = [];

        // Lets assume that all options which key is not defined
        // in namespace OPBuilder\Editor\Elements\Options
        // is a keyword that needs to be replaced in markup
        // (for example <op3 html>).
        if (isset($this->options->all)) {
            $pageData = $this->page->getData();

            foreach ($this->options->all as $optionKey => $optionValue) {
                $class = preg_replace('/[^a-zA-Z\d]/', '', $optionKey);
                $class = ucwords($class);
                $class = "OptimizePress\Editor\Elements\Options\\" . $class . 'Option';

                if ($optionValue !== null && ! class_exists($class)) {
                    // Ignore selector (use value, key not needed)
                    $value = $optionValue;

                    // Handle array and object structure (simply get first value)
                    if (is_array($value) || is_object($value)) {
                        $value = reset($value);
                    }

                    // Make it a string
                    $value = is_string($value) ? $value : '';

                    // commented out as not used currently
                    // Replace color with scheme in html attributes
                    /*if (! op3_is_admin()) {
                        $settings = $pageData ? $pageData['data']->options->all : [];

                        // replace node attributes (content between <...>)
                        if ($settings) {
                            $value = preg_replace_callback(
                                "/(<[^>]*)var\(--op3-color-scheme-(\d)\)([^>]*>)/",
                                function($match) use ($settings) {
                                    if (isset($settings['--op3-color-scheme-' . $match[2]])) {
                                        return $match[1] . $settings['--op3-color-scheme-' . $match[2]] . $match[3];
                                    }

                                    return $match[0];
                                },
                                $value);
                        }
                    }*/

                    // replace op3 tag from markup
                    $markup = str_replace('<op3 ' . $optionKey . '>', $value, $markup);
                }
            }
        }

        // Changing the markup and adding new <op3> options
        // may leave <op3> string inside markup, let's set
        // it to it's default option (or with "" if no
        // default defined)
        $config = op3_element_config($this->type);
        $defaults = array_key_exists('options', $config) ? $config['options'] : array();
        $markup = preg_replace_callback(
            '/<op3 (.*?)>/',
            function($match) use ($defaults) {
                return array_key_exists($match[1], $defaults) ? $defaults[$match[1]] : '';
            },
            $markup
        );

        // Render the data:
        // append children markup to [data-op3-children] wrapper,
        // set data-op3-children attribute with children count
        $markup = preg_replace('/(<div\s[^>]*)(data-op3-children)([^>]*>)(<\/div>)/', '$1$2' . '="' . count($this->children) . '"$3' . preg_escape_backreference($childrenMarkup) . '$4', $markup);
        $wrapper = $this->afterRender($markup);

        return $this->wrapElement($wrapper);
    }

    /**
     * Triggers after the element has been rendered and receives the rendered HTML
     * The raw HTML code can be manipulated here
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        return $html;
    }

    /**
     * Build up children object
     *
     * @return Collection
     */
    public function buildChildren()
    {
        $elements       = new ElementRepository;
        $children       = new ElementCollection;
        $configChildren = $this->config->getChildren();

        if ($configChildren) {
            foreach ($configChildren as $configChild) {
                $child = $elements->build($configChild, $this->page, $this);
                $children->push($child);
            }
        }

        return $children;
    }

    /**
     * Return element parent
     *
     * @return opelement|null
     */
    public function getParent()
    {
        return $this->parent;
    }


    /**
     * Return element children
     *
     * @return Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Render all children elements
     *
     * @return string
     */
    public function renderChildren()
    {
        $html = '';

        if ($this->children) {
            // Render each element
            foreach ($this->children as $element) {
                if ($element) {
                    $html .= $element->render();
                } else {
                    $html .= '<div>Error with element.</div>';
                }
            }
        }

        return $html;
    }

    /**
     * Wrap element into a HTML wrapper object
     *
     * @return string
     */
    public function wrapElement($elementHtml)
    {
        $html = '';

        // rendering code before element if present (only on frontend)
        if (! op3_is_admin() && !empty($this->codeBeforeElement)) {
            $html .= html_entity_decode($this->codeBeforeElement);
        }
        // Build up element wrapper for JS
        $html .= '<div';
        $html .= ' id="op3-element-'.$this->uuid.'"';
        $html .= ' class="op3-element {{inline_class}}"';
        $html .= ' data-op3-uuid="'.$this->uuid.'"';
        $html .= ' data-op3-gid="'.$this->gid.'"';
        $html .= ' data-op3-element-type="'.$this->type.'"';
        $html .= ' data-op3-element-spec="'.$this->spec.'"';
        $html .= ' data-op3-code-before="'.$this->codeBeforeElement.'"';
        $html .= ' data-op3-code-after="'.$this->codeAfterElement.'"';

        // flag option for each media query (depricated)
        //foreach($this->getMediaList() as $mediaQuery) {
        //    $alphaNumMediaQuery = CssClasses::alphaNumMediaQuery($mediaQuery);
        //    $optionKeys = $this->getOptionKeys($mediaQuery);
        //    $optionKeys = implode(',', $optionKeys);
        //
        //    $html .= ' data-op3-element-options-media-' . $alphaNumMediaQuery . '="' . $optionKeys . '"';
        //}

        $html .= ' data-op3-style-id="'.$this->styleId.'"';
        $html .= ' data-op3-has-children="' . (count($this->children) ? 1 : 0) . '"';
        $html .= '>';
        $html .= $elementHtml;
        $html .= '</div>';
        // rendering code before element if present (only on frontend)
        if (! op3_is_admin() && !empty($this->codeAfterElement)) {
            $html .= html_entity_decode($this->codeAfterElement);
        }

        // Parse element stylesheet
        $html = $this->parseElementStyle($html);

        return $html;
    }

    /**
     * Parse the element styles (inline and style tags above markup)
     * @TODO: Refactor
     *
     * @param  string $html
     * @return string
     */
    public function parseElementStyle($html)
    {
        // Custom classes
        $classAttr = CssClasses::getClassAttr($this);
        $classAttr = implode(' ', $classAttr);

        // Property class from options
        $option = $this->getOption('class', 'all', '');
        $classAttr .= (($classAttr && $option) ? ' ' : '') . $option;

        // Stylesheet
        $this->parseStylesheet();

        // Generate inline classes
        $html = str_replace('{{inline_class}}', $classAttr, $html);

        return $html;
    }

    /**
     * Parse custom CSS rules by media query
     *
     * @return void
     * @throws \ReflectionException
     */
    public function parseStylesheet()
    {
        $mediaRules = Css::parse($this);

        if ($mediaRules) {
            foreach ($mediaRules as $mediaQuery => $rules) {
                if ($rules) {
                    foreach ($rules as $rule) {
                        $this->page->stylesheet->element($this)->addRule($rule['name'], $rule['value'], $mediaQuery);
                    }
                }
            }
        }
    }

    /**
     * Get HTML markup from element resource config
     *
     * @return string
     */
    public function configMarkup()
    {
        $markup = null;
        if ($markup === null && $this->style && $this->style['markup'] !== null)
            $markup = $this->style['markup'];
        if ($markup === null && $this->config->markup !== null)
            $markup = $this->config->markup;

        // make markup id attributes unique (svg templates)
        if ($markup) {
            preg_match_all('/\sid="(.+?)"/', $markup, $matches);
            if (count($matches[1])) {
                // id="pattern" => id="pattern---a4fajh4h"
                $markup = preg_replace('/\sid="(.+?)"/', ' id="\1---' . $this->uuid . '"', $markup);
                // ="url(#pattern)" => ="url(#pattern---a4fajh4h)"
                $markup = preg_replace('/="url\\(#(' . implode('|', $matches[1]) . ')\\)"/', '="url(#\1---' . $this->uuid . ')"', $markup);
                // ="#pattern" => "#pattern----a4fajh4h"
                $markup = preg_replace('/="#(.+?)"/', '="#\1---' . $this->uuid . '"', $markup);
            }
        }

        return $markup;
    }

    /**
     * Check if element has option
     *
     * @param  string $media
     * @param  string $key
     * @return bool
     */
    public function hasOption($key, $media)
    {
        return isset($this->options->{$media}, $this->options->{$media}->{$key});
    }

    /**
     * Get element option
     *
     * @param  string $key
     * @param  string $media
     * @param  mixed  $default
     * @return mixed
     */
    public function getOption($key, $media, $default = null)
    {
        return $this->hasOption($key, $media) ? $this->options->{$media}->{$key} : $default;
    }

    /**
     * Get element option value
     *
     * @param  string $key
     * @param  string $media
     * @param  mixed  $default
     * @return mixed
     */
    public function getFirstOptionValue($key, $media = 'all', $default = null)
    {
        if ($this->hasOption($key, $media)) {
            // Find first selector
            $options = array_values((array) $this->options->all->{$key});

            return isset($options[0]) ? $options[0] : $default;
        }

        return $default;
    }

    /**
     * Get element option value
     *
     * @param  string $key
     * @param  string $selector
     * @param  string $media
     * @param  mixed  $default
     * @return mixed
     */
    public function getOptionValue($key, $selector, $media, $default = null)
    {
        return ($this->hasOption($key, $media) and isset($this->options->{$media}->{$key}[$selector])) ? $this->options->{$media}->{$key}[$selector] : $default;
    }

    /**
     * Get element option keys
     * @TODO: Please review this and refactor if necessary (by fffilo)
     *
     * @param  mixed $media
     * @return array
     */
    public function getOptionKeys($media = null)
    {
        $mediaList = $media ? array($media) : $this->getMediaList();
        $result = [];

        foreach($mediaList as $mediaQuery) {
            if (isset($this->options->{$mediaQuery})) {
                foreach ($this->options->{$mediaQuery} as $key => $value) {
                    if (! in_array($key, $result, true)) {
                        $result[] = $key;
                    }
                }
            }
        }

        return $result;
    }

    /**
     * Get element media queries list
     *
     * @return array
     */
    public function getMediaList()
    {
        return array_keys((array) $this->options);
    }

    /**
     * Some elements can write specific data to a wp_options fields
     * so the data can be retrieved later through an API call
     *
     * @return bool|array
     */
    public function saveToElementStorage()
    {
        return false;
    }

    /**
     * Element representation as an array
     *
     * @return array
     */
    public function toArray()
    {
        return array(
            'uuid'     => $this->uuid,
            'type'     => $this->type,
            'content'  => $this->content,
            'children' => $this->children->toArray(),
            // 'config' => $this->config->toArray(),
        );
    }

    /**
     * Element representation as JSON
     *
     * @param  integer $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }

    /**
     * Check if element have parent
     *
     * @param sting $type parent type
     * @return bool
     */
    public function haveParent($type) {
        $parent = $this->getParent();
        if ($parent) {
            if ($parent->type === $type)
                return true;

            return $parent->haveParent($type);
        }

        return false;
    }

    /**
     * Check if it's a global element
     *
     * @return bool
     */
    public function isGlobal(): bool
    {
        if (isset($this->gid) && $this->gid) {
            return true;
        }

        return false;


    }

    public function getSelectorChanges()
    {
        return $this->selectorChanges;
    }
}
