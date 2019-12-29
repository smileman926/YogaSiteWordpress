<?php

namespace OPBuilder\Editor\Page;

trait Fonts
{
    /**
     * Get all external fonts used on this page
     *
     * Element can have multiple selectors targeting
     * different dom elements and each of them can
     * have different family/weight/style combination.
     * Is really hard to determine with PHP which
     * selectors are using the same properties, so
     * we're (for now?) gonna use combination of
     * each of them
     *
     * @return array
     */
    public function getAllExternalFonts() {
        $fontFamilies = $this->getOptionValuesByKey('fontFamily', true);
        $fontWeights = $this->getOptionValuesByKey('fontWeight', true);
        $fontStyles = $this->getOptionValuesByKey('fontStyle', true);

        // Include defaults
        foreach ($this->getOptionValuesByKey('fontFamilyDefaultHead') as $value) {
            if (! in_array($value, $fontFamilies)) {
                $fontFamilies[] = $value;
            }
        }
        foreach ($this->getOptionValuesByKey('fontFamilyDefaultBody') as $value) {
            if (! in_array($value, $fontFamilies)) {
                $fontFamilies[] = $value;
            }
        }
        foreach ($this->getOptionValuesByKey('fontWeightDefaultHead') as $value) {
            if (! in_array($value, $fontWeights)) {
                $fontWeights[] = $value;
            }
        }
        foreach ($this->getOptionValuesByKey('fontWeightDefaultBody') as $value) {
            if (! in_array($value, $fontWeights)) {
                $fontWeights[] = $value;
            }
        }
        foreach ($this->getOptionValuesByKey('fontStyleDefaultHead') as $value) {
            if (! in_array($value, $fontStyles)) {
                $fontStyles[] = $value;
            }
        }
        foreach ($this->getOptionValuesByKey('fontStyleDefaultBody') as $value) {
            if (! in_array($value, $fontStyles)) {
                $fontStyles[] = $value;
            }
        }

        // Font weight+style combo
        $fontDecours = array();
        foreach ($fontWeights as $weight) {
            if (in_array('normal', $fontStyles)) {
                $fontDecours[] = $weight;
            }

            if (in_array('italic', $fontStyles)) {
                $fontDecours[] = $weight . 'i';
            }

        }

        // Fonts summary
        $result = array();
        foreach (op3_config('fonts') as $item) {
            $url = $item['url'];
            $title = $item['title'];
            $family = $item['family'];

            if (! in_array($family, $fontFamilies) || empty($url)) {
                continue;
            }

            if (! isset($result[$title])) {
                $result[$title] = array();
            }

            foreach ($fontDecours as $decour) {
                $pattern = '/(:|,)' . $decour . '(,|$)/';
                if (preg_match($pattern, $url) && ! in_array($decour, $result[$title])) {
                    $result[$title][] = $decour;
                }
            }

            sort($result[$title]);
        }

        return $result;
    }

    /**
     * Get list of all font families
     *
     * @return array
     */
    public function getChildrenOptionsFontFamily()
    {
        $result = array();

        // Loop through all page root elements and find font families
        foreach ($this->children as $element) {
            foreach($element->getMediaList() as $mediaQuery) {
                $key = $element->getOption('fontFamily', $mediaQuery);

                if ($key && (is_object($key) || is_array($key))) {
                    $arrayKey = (array) $key;
                    $key = reset($arrayKey);
                }

                if ($key && ! in_array($key, (array) $result)) {
                    $result[] = $key;
                }
            }

            // We also need to find fonts in element children
            foreach ($element->getChildrenOptionsFontFamily(true) as $key) {
                if (! in_array($key, (array) $result)) {
                    $result[] = $key;
                }
            }
        }

        return $result;
    }
}
