<?php

namespace OPBuilder\Templates;

use OPBuilder\Editor\Page;
use OPDashboard\Templates\Template;
use OptimizePress\Support\DataObject;
use function OptimizePress\Support\object_get;

class BlockConfig extends DataObject
{
    /**
     * The template object
     *
     * @var Template|null
     */
    protected $template;

    /**
     * Init new block config
     *
     * @param Template|null $template
     */
    public function __construct(Template $template = null)
    {
        parent::__construct($template->toArray());
        $this->template = $template;
    }

    /**
     * We need a custom structure
     *
     * @return array
     */
    public function toArray()
    {
        if ($this->template) {
            $template = Templates::replaceImagePlaceholders($this->template);
        } else {
            $template = base64_decode(object_get($this, 'structure'));
        }

        $template = $this->fixBlockSelectors(json_decode($template));

        return [
            'type'          => 'section',
            'id'            => object_get($this, 'uid'),
            'category'      => object_get($this, 'category'),
            'order'         => 0,
            'title'         => object_get($this, 'title'),
            'thumb'         => object_get($this, 'preview_thumb'),
            'parent'        => null,
            'dropWrap'      => false,
            'removeIfEmpty' => false,
            'assets'        => [],
            'options'       => [],
            'markup'        => '',
            'template'      => $template,
            'styles'        => null,
            'thumbSize'     => 'small',
        ];
    }

    public function fixBlockSelectors($template)
    {
        // dealing with section first
        $elementConfig = op3_element_config($template->type);
        $elementClass = "OPBuilder\Editor\Elements\\" . $elementConfig["objectClass"];

        $tempChild = new $elementClass($elementConfig, new Page(['data' => []], false));

        $selectorChanges = $tempChild->getSelectorChanges();

        $newOptions = $this->fixSelectors($template->options, $selectorChanges);

        $template->options = $newOptions;

        // now recursively deal with children
        foreach ($template->children as &$child) {
            $elementConfig = op3_element_config($child->type);
            $elementClass = "OPBuilder\Editor\Elements\\" . $elementConfig["objectClass"];

            $tempChild = new $elementClass($elementConfig, new Page(['data' => []], false));

            $selectorChanges = $tempChild->getSelectorChanges();

            $newOptions = $this->fixSelectors($child->options, $selectorChanges);

            $child->options = $newOptions;

            if (! empty($child->children)) {
                $this->fixBlockSelectors($child);
            }
        }

        return json_encode($template);
    }

    /**
     * Backward compatibility selectors fix
     *
     * @param $options
     * @param $selectorChanges
     * @return array
     */
    private function fixSelectors($options, $selectorChanges)
    {
        foreach ($options as $media => &$rules) {
            if (empty($rules)) {
                continue;
            }

            foreach($selectorChanges as $change) {
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
                } elseif (isset($rules->{$propertyNameOld}) && is_object($rules->{$propertyNameOld} && ! isset($rules->{$propertyNameOld}->{$selectorOld}))) {
                    $value = $rules->{$propertyNameOld};
                    unset($rules->{$propertyNameOld});
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
            }
        }

        return $options;

    }
}
