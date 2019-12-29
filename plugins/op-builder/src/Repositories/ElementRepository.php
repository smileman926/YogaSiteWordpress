<?php

namespace OPBuilder\Repositories;

use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Page;

class ElementRepository extends WordpressRepository
{
    /**
     * Sort by order
     *
     * @param  array  $a
     * @param  array  $b
     * @return int
     */
    private static function cmp($a, $b)
    {
        if ($a['order'] == $b['order']) {
            return 0;
        }
        return ($a['order'] < $b['order']) ? -1 : 1;
    }

    /**
     * Find specific element configuration
     *
     * @param  string  $id
     * @return array
     */
    public function find($id)
    {
        $configFile = OP3_PATH . 'resources/elements/' . $id . '/config.php';

        if (file_exists($configFile)) {
            return include($configFile);
        }
    }

    /**
     * Get all elements from configs
     *
     * @param bool $includeStyles
     * @return array
     */
    public function all($includeStyles = false)
    {
        // Include all elements
        $result      = array();
        $baseDir     = OP3_PATH . 'resources/elements/';
        $elementDirs = scandir($baseDir, SCANDIR_SORT_NONE);

        foreach ($elementDirs as $elementDir) {
            $configFile = $baseDir.$elementDir.'/config.php';

            if ($elementDir !== '.' && $elementDir !== '..' && file_exists($configFile)) {
                $config = include $configFile;

                // Forget styles (not needed in list)
                if ( ! $includeStyles) {
                    unset($config['styles']);
                }

                // Show first only (append null after first
                // one so frontend will know there is more
                // styles to load)
                elseif ($includeStyles === 'first' && $config['styles'] && count($config['styles']) > 1) {
                    $config['styles'] = array(array_shift($config['styles']), null);
                }

                // Valid config?
                if (is_array($config)) {
                    $result[] = $config;
                }
            }
        }

        usort($result, [__CLASS__, 'cmp']);

        return $result;
    }

    /**
     * Build up an element object
     *
     * @param  array    $elementData
     * @param Page|null $page
     * @return OPElement
     */
    public function build($elementData, Page &$page = null, OPElement $parent = null)
    {
        $type          = isset($elementData->type) ? $elementData->type : null;
        $config        = op3_element_config($type);
        $class         = isset($config['objectClass']) ? $config['objectClass'] : null;
        $elementConfig = array_merge($config, (array) $elementData);

        if ($type and $class) {
            $class = '\OPBuilder\Editor\Elements\\'.$class;

            if (class_exists($class)) {
                $element = new $class($elementConfig, $page, $parent);

                return $element;
            }
        }

        return null;
    }
}
