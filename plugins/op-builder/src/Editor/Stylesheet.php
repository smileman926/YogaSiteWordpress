<?php

namespace OPBuilder\Editor;

use OPBuilder\Editor\Elements\OPElement;
use OptimizePress\Support\Collection;

/**
 * OP3 page stylesheet
 */
class Stylesheet
{
    /**
     * Class attribute of the stylesheet element
     *
     * @var string
     */
    public $class = 'op3-designer-stylesheet';

    /**
     * Collection of stylesheet elements
     *
     * @var Collection
     */
    protected $elements;

    /**
     * Create new page stylesheet
     */
    public function __construct()
    {
        $this->elements = new Collection;
    }

    /**
     * Return element collection
     *
     * @return Collection
     */
    public function elements()
    {
        return $this->elements;
    }

    /**
     * Return element from stylesheet
     *
     * @param  OPElement $element
     * @return StylesheetElement
     */
    public function element($element)
    {
        if ( ! isset($this->elements[$element->uuid])) {
            $this->elements[$element->uuid] = new StylesheetElement($element);
        }

        return $this->elements[$element->uuid];
    }

    /**
     * Go through media rules and render the stylesheet
     *
     * @return array
     */
    public function mediaRules()
    {
        $result = [];

        if ($this->elements()) {
            foreach ($this->elements() as $element) {
                foreach ($element->mediaRules() as $mediaQuery => $rules) {
                    if ( ! isset($result[$mediaQuery])) {
                        $result[$mediaQuery] = new Collection;
                    }

                    $result[$mediaQuery][] = $element->render($mediaQuery);
                }
            }
        }

        return $result;
    }

    /**
     * Shortcut for string stylesheet
     *
     * @return string
     */
    public function toString()
    {
        return (string) $this;
    }

    /**
     * Return stylesheet string
     *
     * @return string
     */
    public function __toString()
    {
        // Default font
        $html = '';
        if (op3_is_admin()) {
            // There is something wrong with this font. If we use
            // https in href attribute woff files will be downloaded
            // for every op3 element change (???). This problem is
            // present only with Montserrat font.
            // $html .= '<link href="//fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,700,700i" rel="stylesheet" />'.PHP_EOL;
        }

        // Defining default settings
        /*
        if (op3_is_admin()) {
            $html .= '<style class="op3-designer-settings-defaults" media="all">'.PHP_EOL;
            $html .= 'html {'.PHP_EOL;
            $html .= '--op3-color-scheme-1:rgb(19, 57, 167);'.PHP_EOL;
            $html .= '--op3-color-scheme-2:rgb(27, 104, 251);'.PHP_EOL;
            $html .= '--op3-color-scheme-3:rgb(20, 155, 252);'.PHP_EOL;
            $html .= '--op3-color-scheme-4:rgb(48, 48, 48);'.PHP_EOL;
            $html .= '--op3-color-scheme-5:rgb(216, 216, 216);'.PHP_EOL;
            $html .= '}'.PHP_EOL;
            $html .= '</style>'.PHP_EOL;
        }
        */
        // depricated color-scheme

        // Build up the media query collections
        // and put each set of rules in his own
        // style tag (admin only, frontend will
        // have his rules in it's own css file
        // -> Page\generateStylesheet method)
        if (op3_is_admin()) {
            $mediaRules = $this->mediaRules();
            if ($mediaRules and count($mediaRules)) {
                foreach ($mediaRules as $media => $elements) {
                    // Start stylesheet
                    $html .= '<style class="'.$this->class.'" media="'.$media.'">'.PHP_EOL;

                    // Add the elements
                    foreach ($elements as $element) {
                        $html .= $element;
                    }

                    // Close it out
                    $html .= '</style>'.PHP_EOL;
                }
            } else {
                $html .= '<style class="'.$this->class.'" media="all"></style>'.PHP_EOL;
            }

        }

        return $html;
    }
}
