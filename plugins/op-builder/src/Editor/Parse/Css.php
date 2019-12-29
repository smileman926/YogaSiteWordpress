<?php

namespace OPBuilder\Editor\Parse;

use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Elements\Options\BaseCssOption;
use OptimizePress\Support\Debug\Log;
use ReflectionClass;

/**
 * Handles parsing OP3 editor custom CSS
 */
class Css
{
    /**
     * Parse OP3 styles set in the element editor
     *
     * @param  OPElement $element
     * @return array
     * @throws \ReflectionException
     */
    static public function parse(OpElement $element)
    {
        $rules = [];

        if ($element->options) {
            foreach ($element->options as $mediaQuery => $options) {
                if ($options) {
                    $rules[$mediaQuery] = [];

                    foreach ($options as $optionKey => $optionValue) {
                        $class = preg_replace('/[^a-zA-Z\d]/', '', $optionKey);
                        $class = ucwords($class);
                        $class = "OPBuilder\Editor\Elements\Options\\".$class."Option";

                        if ($optionValue !== null and class_exists($class)) {
                            $reflect = new ReflectionClass($class);

                            // Check if it's a CSS option through reflection
                            if ($reflect->isSubclassOf(BaseCssOption::class)) {
                                $option  = new $class($optionValue, $element);
                                $rules[$mediaQuery][] = $option->cssRule();
                            }
                        } else {
                            // Log::error("Element option css not found: " . $class);
                        }
                    }
                }
            }
        }

        return $rules;
    }
}
