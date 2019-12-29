<?php

namespace OPBuilder\Editor\Elements;

class BulletList  extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'popoverlayTrigger', ' > a', 'popOverlayTrigger', ' > a' ],
    ];

    /**
     * Remove inactive a tags
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        if (op3_is_admin()) {
            return $html;
        }

        $href = isset($this->options->all->hrefFull) ? $this->options->all->hrefFull : '';
        if (is_array($href)) {
            $href = array_values($href)[0];
        }

        $action = isset($this->options->all->action) ? $this->options->all->action : '';
        if (is_array($action)) {
            $action = array_values($action)[0];
        }

        if (!empty($href)) {
            return $html;
        }

        if ($action === 'popoverlay') {
            $html = preg_replace('/(<a\s)/', '<a href="#" ', $html);
            return $html;
        }

        // a tags are needed for self aligning, so I am putting them back to frontend rendering
        // of maybe some frontend guy can make the self align not depend on a tag
        //$html = preg_replace('/(<a\s[^>]*>)/', '', $html);
        //$html = preg_replace('/(<\/a>)/', '', $html);

        return $html;
    }
}
