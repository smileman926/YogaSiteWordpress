<?php

namespace OPBuilder\Editor\Parse;

use OPBuilder;
use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Elements\Options\BaseCssClassOption;
use OptimizePress\Support\Debug\Log;
use ReflectionClass;

/**
 * Handles parsing OP3 editor CSS classes
 */
class CssClasses
{
    /**
     * Parse OP3 classes set in the element editor
     *
     * @param  OPElement $element
     * @return array
     * @throws \ReflectionException
     */
    static public function parse(OpElement $element)
    {
        $classes = [];

        if ($element->options) {
            foreach ($element->options as $mediaQuery => $options) {
                if ($options) {
                    $classes[$mediaQuery] = [];

                    foreach ($options as $optionKey => $optionValue) {
                        $class = preg_replace('/[^a-zA-Z\d]/', '', $optionKey);
                        $class = ucwords($class);
                        $class = "OPBuilder\Editor\Elements\Options\\".$class."Option";

                        if ($optionValue !== null and class_exists($class)) {
                            $reflect = new ReflectionClass($class);

                            // Check if it's a CSS class option through reflection
                            if ($reflect->isSubclassOf(BaseCssClassOption::class)) {
                                // Get the string representation of the option (CSS class name)
                                $option    = new $class($optionValue, $element);
                                $classes[$mediaQuery][] = (string) $option;
                            }
                        } else {
                            // Log::debug("Element option class not found: " . $class);
                        }
                    }
                }
            }
        }

        return $classes;
    }

    /**
     * Parse OP3 classes as array
     *
     * @param  OPElement $element
     * @return array
     * @throws \ReflectionException
     */
    static public function getClassAttr(OpElement $element)
    {
        $parse = self::parse($element);
        $result = [];

        foreach($parse as $mediaQuery => $classList) {
            $alphaNumMediaQuery = self::alphaNumMediaQuery($mediaQuery);

            foreach($classList as $class) {
                $result[] = $class . '-media-' . $alphaNumMediaQuery;
            }
        }

        return $result;
    }

    /**
     * Convert media query to data attribute
     *
     * @var string
     */
    static public function alphaNumMediaQuery($mediaQuery)
    {
        $result = $mediaQuery;
        $result = preg_replace('/[^A-Za-z0-9]+/', '-', $result);    // replace non-aplhanum characters with dash
        $result = preg_replace('/-+/', '-', $result);               // replace multiple dashes with single dash
        $result = preg_replace('/^-+|-+$/', '', $result);           // trim dash

        return $result;
    }
}
