<?php

namespace OPBuilder\Editor;

use OPBuilder\Editor\Elements\OPElement;
use OptimizePress\Support\Collection;

/**
 * OP3 page stylesheet
 */
class StylesheetElement
{
    /**
     * DOM ID of the element
     *
     * @var string
     */
    public $id;

    /**
     * The OP element object
     * @var OPElement
     */
    public $element;

    /**
     * Collection of rules for the element
     *
     * @var array $rules
     */
    public $rules = [];

    /**
     * Create new CSS element with an ID
     *
     * @param OPElement $element
     */
    public function __construct(OPElement $element)
    {
        if (! $element->uuid or $element->uuid === 'op-root') {
            $this->id = 'html';
        } else {
            $this->id = 'op3-element-' . $element->uuid;
        }

        $this->rules = new Collection([
            'all' => new Collection,
            'screen and (max-width: 1023px)' => new Collection,
            'screen and (max-width: 767px)' => new Collection,
        ]);
        $this->element = $element;
    }

    /**
     * Add a new CSS rule for an element
     *
     * @param string $key
     * @param string $value
     * @param string $mediaQuery
     */
    public function addRule($key, $value, $mediaQuery = 'all')
    {
        if ( ! isset($this->rules[$mediaQuery])) {
            $this->rules[$mediaQuery] = new Collection;
        }

        $this->rules[$mediaQuery][kebab_case($key)] = $value;
    }

    /**
     * Return all media query rules
     *
     * @return Collection
     */
    public function mediaRules()
    {
        return $this->rules;
    }

    /**
     * Return all the CSS rules for an element
     *
     * @param  string $mediaQuery
     * @return Collection
     */
    public function rules($mediaQuery = 'all')
    {
        return isset($this->rules[$mediaQuery]) ? $this->rules[$mediaQuery] : new Collection;
    }

    /**
     * Return the CSS rule value for an element
     *
     * @param  string $key
     * @param  string $mediaQuery
     * @return string
     */
    public function rule($key, $mediaQuery = 'all')
    {
        return isset($this->rules[$mediaQuery]) ? $this->rules[$mediaQuery][kebab_case($key)] : null;
    }

    /**
     * Shortcut for string stylesheet
     *
     * @param  string $mediaQuery
     * @return string
     */
    public function render($mediaQuery = 'all')
    {
        $html = '';

        // Parse element selectors
        $selectors = $this->parseStylesheetSelectors($mediaQuery);

        // And now render the html
        if ($selectors and count($selectors)) {
            foreach ($selectors as $selector => $rules) {
                $html .= $selector.' { ';

                foreach ($rules as $ruleKey => $ruleValue) {
                    /*
                    // op3 color scheme uses css variables, which are
                    // not supported for all browsers (ie), so we
                    // need to do reg replace scheme variable in
                    // ruleValue with color defined in scheme.
                    // we're doing this for frontend only,
                    // not live-editor!
                    if (! op3_is_admin()) {
                        $pageData = $this->element->page->getData();
                        $settings = (object) ($pageData ? $pageData['data']->options->all : new \StdClass());

                        // @todo - color scheme default values
                        if (! isset($settings->{'--op3-color-scheme-1'})) $settings->{'--op3-color-scheme-1'} = 'rgb(19, 57, 167)';
                        if (! isset($settings->{'--op3-color-scheme-2'})) $settings->{'--op3-color-scheme-2'} = 'rgb(27, 104, 251)';
                        if (! isset($settings->{'--op3-color-scheme-3'})) $settings->{'--op3-color-scheme-3'} = 'rgb(20, 155, 252)';
                        if (! isset($settings->{'--op3-color-scheme-4'})) $settings->{'--op3-color-scheme-4'} = 'rgb(48, 48, 48)';
                        if (! isset($settings->{'--op3-color-scheme-5'})) $settings->{'--op3-color-scheme-5'} = 'rgb(216, 216, 216)';

                        if ($settings) {
                            $ruleValue = preg_replace_callback(
                                "/var\(--op3-color-scheme-(\d)\)/",
                                function($match) use ($settings) {
                                    if (isset($settings->{'--op3-color-scheme-' . $match[1]})) {
                                        return $settings->{'--op3-color-scheme-' . $match[1]};
                                    }

                                    return $match[0];
                                },
                                $ruleValue);
                        }
                    }
                    */
                    // depricated color-scheme

                    $html .= $ruleKey . ": " . $ruleValue . "; ";
                }

                $html .= '}'.PHP_EOL;
            }
        }

        return $html;
    }

    /**
     * Get rule selector prepared for stylesheet
     *
     * @param  string $uuid
     * @param  string $selector
     * @return string
     */
    protected function ruleSelector($selector = '')
    {
        $result = '';

        if ($this->id !== 'html') {
            $prefix = '#op3-designer-element';

            // Multiply ids (make sure we have strong selector)
            $uuid = '#' . $this->id;
            for ($i = 1; $i < (int) $this->element->config->cssSelectorStrength; $i++) {
                $uuid .= '#' . $this->id;
            }

            // If selector has :hover pseudo we need to extend
            // prefix (to make sure we can disable it in
            // live-editor view)
            if ( ! empty($selector) && op3_is_admin() && strpos($selector, ':hover') !== false) {
                $prefix .= ':not(.op3-disable-hover)';
            }

            $result = $prefix . ' ' . $uuid;
        } else {
            $result = $this->id;
        }

        if ( ! empty($selector)) {
            // PHP 7.0 or below has a "bug" where it adds "_empty_" for
            // empty array keys so we simply fix the CSS selector here
            $selector = preg_replace('/_empty_$/', '', $selector);
            $selector = rtrim($selector);

            // Replace comma with #uuid + comma
            $selector = preg_replace('/,/', ', ' . $result, $selector);
            $selector = preg_replace('/\s+/', ' ', $selector);

            // ...and append #uuid before selector
            $result = $result . $selector;
        }

        return $result;
    }

    /**
     * Parse element stylesheet with all selectors
     *
     * @param  string $mediaQuery
     * @return Collection
     */
    public function parseStylesheetSelectors($mediaQuery = 'all')
    {
        $selectors = new Collection;

        if ($mediaRules = $this->rules($mediaQuery)) {
            foreach ($mediaRules as $ruleKey => $ruleProperties) {
                // Simple rule
                if (is_string($ruleProperties)) {
                    $ruleSelector = $this->ruleSelector();

                    if ( ! isset($selectors[$ruleSelector])) {
                        $selectors[$ruleSelector] = new Collection;
                    }
                    $selectors[$ruleSelector][$ruleKey] = $ruleProperties;

                // More complex rules with child selectors
                } elseif (is_array($ruleProperties) || is_object($ruleProperties)) {
                    foreach ($ruleProperties as $rulePropertyKey => $rulePropertyValue) {
                        $ruleSelector = $this->ruleSelector($rulePropertyKey);

                        if ( ! isset($selectors[$ruleSelector])) {
                            $selectors[$ruleSelector] = new Collection;
                        }
                        $selectors[$ruleSelector][$ruleKey] = $rulePropertyValue;
                    }
                }
            }
        }

        return $selectors;
    }
}
