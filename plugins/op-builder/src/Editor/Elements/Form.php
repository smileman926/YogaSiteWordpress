<?php

namespace OPBuilder\Editor\Elements;

use OPDashboard\Services\GeoIp;

class Form extends OPElement implements OPElementInterface
{

    protected $selectorChanges = [
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' ],
        [ 'optinPostActionPopoverlayTrigger', ' [name="optin-post-action-popoverlay-trigger"]', 'optinPostActionPopOverlayTrigger', ' [name="optin-post-action-popoverlay-trigger"]' ],

        // New-new border
        [ 'backgroundImage', ' > [data-op3-background="overlay"]::before, > [data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background="overlay"]::before, > [data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', '', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'transitionDuration', '', null, ', > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderTopWidth', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderTopStyle', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomStyle', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderLeftStyle', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderRightStyle', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],

        // New-new border input fix
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]', null, ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' ],
    ];

    /**
     * We do not want to expose email to frontend,
     * so we're removing it from form (api can get
     * email by pageId/elementUuid)
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        // set adminEmail (if not set)
        $html = preg_replace('/(<input\s.*?name="admin-email"\s.*?\b)value=""/', '$1value="' . op3_admin_email() . '"', $html);

        if (op3_is_admin())
            return $html;

        // we need pageId/elementUuid
        $prepend = ''
            . '<input type="hidden" name="optin-current-page-id" value="'.$this->page->id.'" />'
            . '<input type="hidden" name="optin-current-element-uuid" value="'.$this->uuid.'" />';
        $html = preg_replace('/(<form[^>]*>)/' , '$1'.$prepend, $html);


        // we don't need admin-email and stuff
        $remove = array(
            'admin-email',
            'optin-integration',
            'optin-list',
            'optin-tag',
            'optin-goal',
            'optin-webhook-url',
            'optin-gdpr-consent1-tag-confirmed',
            'optin-gdpr-consent1-tag-declined',
            'optin-gdpr-consent1-tag-not-shown',
            'optin-gdpr-consent2-tag-confirmed',
            'optin-gdpr-consent2-tag-declined',
            'optin-gdpr-consent2-tag-not-shown',
        );

        // remove
        foreach ($remove as $field) {
            $pattern = '/<input [^>]*name="'.$field.'"[^>]*>/';
            $html = preg_replace($pattern , '', $html);
        }

        // if we have a form on the frontend side of things,
        // lets check GDPR options for it
        // and act on it
        if (!op3_is_admin()
            && class_exists('OPDashboard\Services\GeoIp')
            && isset($this->options->all->optinGdprActivate)) {

            // First selector value
            $gdprLocation = reset($this->options->all->optinGdprActivate);

            // if GDPR set to show to EU only
            // and customer is not from EU
            if ($gdprLocation == 'eu' && ! GeoIp::isFromEu()) {
                $options['hideGdpr'] = true;
                $html = preg_replace('/<form([^>]*)>/' , '<form$1 data-op3-gdpr-disabled>', $html);
            }
        }

        return $html;
    }
}
