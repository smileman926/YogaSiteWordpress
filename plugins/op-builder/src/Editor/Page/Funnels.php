<?php

namespace OPBuilder\Editor\Page;

use OPBuilder\Hooks\HookRegistry;

trait Funnels
{
    /**
     * Check if page is part of a funnel
     *
     * @return bool
     */
    public function isPartOfFunnel(): bool
    {
        return ($this->wpPost && isset($this->wpPost->post_type) && $this->wpPost->post_type === 'opf_funnel');
    }

    /**
     * Add some funnel scripts if needed
     */
    public function renderFunnelScripts()
    {
        if ($this->wpPost && $this->isPartOfFunnel()) {
            // Header script
            $headerScript  = get_post_meta($this->wpPost->post_parent, '_op3_funnel_head_script', true);
            $hookSignature = md5($this->wpPost->ID . '_opf_' . 'headerScript');
            if ($headerScript && ! HookRegistry::isRegistered($hookSignature)) {
                add_action('wp_head', function() use ($headerScript) { echo $headerScript; }, 10);
                HookRegistry::register($hookSignature);
            }

            // Body script
            $bodyScript    = get_post_meta($this->wpPost->post_parent, '_op3_funnel_body_script', true);
            $hookSignature = md5($this->wpPost->ID . '_opf_' . 'bodyScript');
            if ($bodyScript && ! HookRegistry::isRegistered($hookSignature)) {
                add_action('op_body',   function() use ($bodyScript)   { echo $bodyScript; },   10);
                HookRegistry::register($hookSignature);
            }

            // Footer script
            $footerScript  = get_post_meta($this->wpPost->post_parent, '_op3_funnel_footer_script', true);
            $hookSignature = md5($this->wpPost->ID . '_opf_' . 'footerScript');
            if ($footerScript && ! HookRegistry::isRegistered($hookSignature)) {
                add_action('wp_footer', function() use ($footerScript) { echo $footerScript; }, 10);
                HookRegistry::register($hookSignature);
            }
        }
    }
}
