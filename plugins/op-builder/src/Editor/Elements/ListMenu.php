<?php

namespace OPBuilder\Editor\Elements;

class ListMenu extends OPElement implements OPElementInterface
{
    /**
     * This element uses no markup. The markup is
     * generated by JS library, so we need to
     * rewrite it's logic to PHP.
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        $html = preg_replace('/<nav data-op3-element-data><\/nav>/', $this->jsGetHtml(), $html);
        if ( ! op3_is_admin()) {
            $html = preg_replace('/<nav data-op3-element-dummy-data>.*?<\/nav>/', '', $html);
        }

        return $html;
    }

    /**
     * Get nav template
     * (from render@op3-menus.js)
     *
     * @return string
     */
    private function jsGetHtml()
    {
        $option = array_values((array) $this->options->all->menuName)[0];
        $tree = op3_get_menu($option);
        $result = '';

        $build = function($data) use (&$build, &$result) {
            if ($data->children && count($data->children)) {
                $result .= '<ul>';
                foreach($data->children as $child) {
                    $result .= '<li>';
                    $result .= '<a href="' . $child->url . '">' . htmlspecialchars($child->title) . '</a>';
                    $build($child);
                    $result .= '</li>';
                }
                $result .= '</ul>';
            }

            return $result;
        };

        $result .= '<nav data-op3-element-data>';
        if ($tree) {
            $result .= '<span class="op3-list-menu-title">' . htmlspecialchars($tree->name) . '</span>';
            $build($tree);
        }
        $result .= '</nav>';

        return $result;
    }
}
