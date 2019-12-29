<?php

namespace OPBuilder\Editor\Elements;

use OPBuilder\Editor\ElementCollection;
use OptimizePress\Support\Contracts\Jsonable;
use OptimizePress\Support\Contracts\Arrayable;

class OPElementConfig implements Arrayable, Jsonable
{
    /**
     * Store the array config here
     *
     * @param array $config
     */
    protected $config;

    /**
     * Init the element configuration
     *
     * @param array $config
     */
    public function __construct($config)
    {
        $this->config = $config;

        // In the beggining there were styles (which were
        // poorly implemented into system). After the
        // styles were split to styles/presets. This
        // is fix for pages saved before that split.
        if (!isset($this->config['styles']) || !$this->config['styles']) {
            $this->style = '';
        }
    }

    /**
     * Contents of the element
     *
     * @return array
     */
    public function getUuid()
    {
        return $this->uuid;
    }

    /**
     * Contents of the element
     *
     * @return array
     */
    public function getGid()
    {
        return (string) $this->gid;
    }

    /**
     * Return element type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Return element spec
     *
     * @return string
     */
    public function getSpec()
    {
        return $this->spec;
    }

    /**
     * Return element style ID
     *
     * @return string
     */
    public function getStyleId()
    {
        return $this->style;
    }

    /**
     * Return element style
     *
     * @return array
     */
    public function getStyle()
    {
        if (isset($this->config['styles']) and $this->config['styles']) {
            foreach ($this->config['styles'] as $style) {
                if ($style['id'] == $this->style) {
                    return $style;
                }
            }
        }
    }

    /**
     * Return element children
     *
     * @return ElementCollection
     */
    public function getChildren()
    {
        $configChildren = isset($this->config['children']) ? $this->config['children'] : [];

        return $configChildren;
    }

    /**
     * Get the PHP class that handles the element render process
     *
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * Contents of the element
     *
     * @return array
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Get a config value
     *
     * @param  string  $key
     * @return mixed
     */
    public function __get($key)
    {
        return (isset($this->{$key}) ? $this->{$key} : (isset($this->config[$key]) ? $this->config[$key] : null));
    }

    /**
     * Array format of config
     *
     * @return array
     */
    public function toArray()
    {
        return $this->config;
    }

    /**
     * JSON format of configuration
     *
     * @param  integer $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }
}
