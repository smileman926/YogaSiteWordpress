<?php

namespace OPBuilder\Editor\Elements;

use function OPFunnel\get_next_page_in_funnel;
use function OPFunnel\get_prev_page_in_funnel;
use function OPFunnel\get_step_page_in_funnel;
use function OptimizePress\Support\array_get;

class Button extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'popoverlayTrigger', ' > a', 'popOverlayTrigger', ' > a' ],
    ];

    /**
     * Triggers after the element has been rendered and receives the rendered HTML
     * The raw HTML code can be manipulated here
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        // Simply return the rendered HTML for the editor
        if (op3_is_admin() or ! op3_is_funnel_builder_active()) {
            return $html;
        }

        // Only if funnel plugin is active
        if (op3_is_funnel_builder_active()) {
            // Get button action
            $buttonAction  = $this->getFirstOptionValue('action', 'all');

            // Check if current page is part of funnel and find the next step
            if ($buttonAction === 'nextFunnelStep' || $buttonAction === 'prevFunnelStep') {
                $targetPage = ($buttonAction === 'prevFunnelStep') ? get_prev_page_in_funnel($this->page->id) : get_next_page_in_funnel($this->page->id);

                if ($targetPage) {
                    // Find URL for next step
                    // $url = get_permalink($targetPage->ID);
                    $url = (($buttonAction === 'prevFunnelStep') ? home_url('op-funnel-prev-step/' . $this->page->id) : home_url('op-funnel-next-step/' . $this->page->id));

                    // Replace button URL
                    // $pattern = "/(?<=href=(\"|'))[^\"']+(?=(\"|'))/";
                    $pattern = "/href=[\"|']([^\"]*)['|\"]/";
                    $html    = preg_replace($pattern, 'href="' . $url . '"', $html);
                }
            } elseif ($buttonAction === 'goToFunnelStep') {
                $targetStepId = $this->getFirstOptionValue('selectFunnelStep', 'all');
                $targetPage = get_step_page_in_funnel($targetStepId, $this->page->id);

                if ($targetPage) {
                    // Find URL for next step
                    // $url = get_permalink($targetPage->ID);
                    $url = home_url('op-funnel-step/' . $this->page->id . '/' . $targetStepId);

                    // Replace button URL
                    // $pattern = "/(?<=href=(\"|'))[^\"']+(?=(\"|'))/";
                    $pattern = "/href=[\"|']([^\"]*)['|\"]/";
                    $html    = preg_replace($pattern, 'href="' . $url . '"', $html);
                }
            }
        }

        return $html;
    }
}
