<?php

namespace OPBuilder\Editor;

use OptimizePress\Integrations\Integration;
use function OPDashboard\integration_authorize_url;
use function OptimizePress\Support\array_get;

trait PageIntegrations
{
    /**
     * Find all integrations on a OP page
     *
     * @return array
     */
    public function getPageIntegrations()
    {
        $elements = $this->getChildren();
        $forms    = $this->findIntegrationForms($elements);
        $response = $this->findFormIntegrations($forms);

        return $response;
    }

    /**
     * Find all integration forms in OP elements collection
     *
     * @param $elements
     * @return array
     */
    public function findIntegrationForms($elements)
    {
        $forms = [];

        // Loop through all elements and collect the forms
        if ($elements) {
            foreach ($elements as $element) {
                if ($element->type === 'form') {
                    $forms[] = $element;
                }

                // Also check the child elements
                if (method_exists($element, 'getChildren') and $element->getChildren()) {
                    $childForms = $this->findIntegrationForms($element->getChildren());

                    // And merge the forms with the main collection
                    $forms = array_merge($forms, $childForms);
                }
            }
        }

        return $forms;
    }

    /**
     * Find all integrations for all forms on OP page
     *
     * @param $forms
     * @return array
     */
    public function findFormIntegrations($forms)
    {
        $response = [];

        if (op3_dashboard_enabled()) {
            $integrations = \OPDashboard\get_available_providers();

            // Loop through all forms and find connected ones
            foreach ($integrations as $integration) {
                $lists              = [];
                $tags               = [];
                $fields             = [];
                $goals              = [];

                // Now lets add lists and tags for integrations on this page
                foreach ($forms as $form) {
                    $optinIntegrations = array_values((array) array_get($form->options, 'all.optinIntegration'));
                    $optinIntegration  = isset($optinIntegrations[0]) ? $optinIntegrations[0] : null;

                    if ($optinIntegration and $integration->provider->key == $optinIntegration) {
                        //$lists = $integration->isConnected() ? $integration->getLists() : [];
                        //$tags  = ($integration->isConnected() and $integration->hasTags()) ? $integration->getTags() : [];
                        //$goals = ($integration->isConnected() and $integration->hasGoals()) ? $integration->getGoals() : [];

                        // Also get the fields for connected list
//                        $optinLists = array_values((array) $form->options['all']['optinList']);
//                        $optinList  = isset($optinLists[0]) ? $optinLists[0] : null;
//
//                        if ($optinList and $optinList != "-") {
//                            $fields = $integration->getFields($optinList);
//                            if ($lists && count($lists)) {
//                                foreach ($lists as &$list) {
//                                    if ($list->id == $optinList) {
//                                        $list->fields = $fields->toArray();
//                                    }
//                                }
//                            }
//                        }
                    }
                }

                // Add it all to the response collection
                $response[] = $this->transformIntegration($integration, $lists, $tags, $fields, $goals);
            }
        }

        return $response;
    }

    /**
     * Transform integration data for simple response
     *
     * @param Integration $integration
     * @param array $lists
     * @param array $tags
     * @param array $fields
     * @param array $goals
     * @return array
     */
    public static function transformIntegration(Integration $integration, $lists = [], $tags = [], $fields = [], $goals = [])
    {
        $result = [];

        if ($integration) {
            $result = [
                'uid'                     => $integration->uid,
                'provider'                => $integration->provider->key,
                'title'                   => $integration->title,
                'connected'               => $integration->isConnected(),
                'image'                   => OPD_URL . 'public/assets/images/providers/integration-' . $integration->provider->key . '-2x.png',
                'type'                    => $integration->type,
                'has_lists'               => method_exists($integration, 'hasLists') ? (bool) $integration->hasLists() : true,
                'has_tags'                => (bool) $integration->config->has_tags,
                'has_lead_options'        => (bool) $integration->config->has_lead_options,
                'has_webhook_url'         => $integration->type == 'webhook',
                'webhook_url'             => $integration->getConnectionValue('webhook_url'),
                'connection_requirements' => $integration->config->connection_requirements,
                'has_gdpr'                => $integration->config->has_gdpr,
                'gdpr_tag_source'         => $integration->config->gdpr_tag_source,
                'gdpr_notes'              => $integration->config->gdpr_notes,
                'has_goals'               => (bool) $integration->config->has_goals,
                'list_label'              => ($integration->config->list_label) ? $integration->config->list_label : '',
                'tag_label'               => ($integration->config->tag_label) ? $integration->config->tag_label : '',
                'goal_label'              => ($integration->config->goal_label) ? $integration->config->goal_label : '',
                'list_copy'               => ($integration->config->list_copy)  ? $integration->config->list_copy  : '',
                'gdpr_label'              => ($integration->config->gdpr_label) ? $integration->config->gdpr_label : '',
                'has_form_id'             => (bool) $integration->config->has_form_id,
                'has_double_optin_checkbox'   => (bool) $integration->config->has_double_optin_checkbox,
                'has_admin_email'         => (bool) $integration->config->has_admin_email,
            ];

            // Add OAuth connect URL if needed
            if ($integration->isOAuth()) {
                $result['connect_url'] = integration_authorize_url($integration);
            } else {
                $result['connect_url'] = admin_url() . 'admin.php?page=op-dashboard-integrations';
            }

            // Add lists to response
            if ($integration->type === 'email') {
                $result['has_lists'] = false;
            } elseif ($lists && count($lists)) {
                $result['lists'] = $lists ? $lists->toArray() : [];

                // Filter out and cas
                foreach ($result['lists'] as &$resultList) {
                    $resultList['id'] = (string) $resultList['id'];
                    unset($resultList['integration'], $resultList);
                }
            }

            // Add tags to response
            $result['tags'] = $tags ? $tags->toArray() : null;

            // Add fields to response
            $result['fields'] = $fields ? $fields->toArray() : null;

            // Add Goals to response
            $result['goals'] = $goals ? $goals->toArray() : null;
        }

        return $result;
    }
}
