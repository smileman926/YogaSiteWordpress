<?php

namespace OPBuilder\Editor\Elements;

use function OPFunnel\get_next_page_in_funnel;
use function OPFunnel\get_prev_page_in_funnel;
use function OPFunnel\get_step_page_in_funnel;

class Image extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'popoverlayTrigger', ' a', 'popOverlayTrigger', ' a' ],
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

        // Get element action
        $action = $this->getFirstOptionValue('action', 'all');

        // Get the href property
        $href = isset($this->options->all->hrefFull) ? $this->options->all->hrefFull : '';
        if (is_array($href)) {
            $href = array_values($href)[0];
        }

        // When no href property is set we simply return the element html
        if (! empty($href) && ! in_array($action, ['popoverlay', 'nextFunnelStep', 'prevFunnelStep', 'goToFunnelStep'])) {
            return $html;
        }

        // Handle popoverlay action
        if ($action === 'popoverlay') {
            $html = preg_replace('/(<a\s)/', '<a href="#" ', $html);
            return $html;
        }

        // Handle funnel actions
        if (op3_is_funnel_builder_active()) {
            if ($action === 'nextFunnelStep' || $action === 'prevFunnelStep') {
                $html       = preg_replace('/(<a\s)/', '<a href="#" ', $html);
                $targetPage = ($action === 'prevFunnelStep') ? get_prev_page_in_funnel($this->page->id) : get_next_page_in_funnel($this->page->id);

                if ($targetPage) {
                    // Find URL for next step
                    $url = get_permalink($targetPage->ID);

                    // Replace button URL
                    $pattern = "/href=[\"|']([^\"]*)['|\"]/";
                    $html    = preg_replace($pattern, 'href="' . $url . '"', $html);

                    return $html;
                }
            } elseif ($action === 'goToFunnelStep') {
                $html         = preg_replace('/(<a\s)/', '<a href="#" ', $html);
                $targetStepId = $this->getFirstOptionValue('selectFunnelStep', 'all');
                $targetPage   = get_step_page_in_funnel($targetStepId, $this->page->id);

                if ($targetPage) {
                    // Find URL for next step
                    $url = get_permalink($targetPage->ID);

                    // Replace button URL
                    $pattern = "/href=[\"|']([^\"]*)['|\"]/";
                    $html    = preg_replace($pattern, 'href="' . $url . '"', $html);

                    return $html;
                }
            }
        }

        // Handle other cases
        $html = preg_replace('/(<a\s[^>]*>)/', '', $html);
        $html = preg_replace('/(<\/a>)/', '', $html);

        return $html;
    }
}
