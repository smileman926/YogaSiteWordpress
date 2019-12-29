<?php

namespace OPBuilder\Http\Api;

use OPBuilder\Editor\PageIntegrations;
use OPBuilder\Repositories\PageRepository;
use OPBuilder\Services\Integrations;
use function OPDashboard\get_connected_integrations;
use function OPFunnel\get_next_page_in_funnel;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Support\Collection;
use WP_REST_Request;
use WP_REST_Response;
use function OPFunnel\get_prev_page_in_funnel;
use function OPFunnel\get_step_page_in_funnel;

class IntegrationsController extends Controller
{
    use PageIntegrations;

    /**
     * Get list of all integrations
     * (without their details)
     *
     * @return WP_REST_Response
     */
    public static function index()
    {
        $response = [];

        if (self::isDashboardEnabled()) {
            $integrations = \OPDashboard\get_available_providers();

            // Remove some unnecessary data
            foreach ($integrations as $integration) {
                $response[] = self::transformIntegration($integration);
            }
        }

        return static::apiResponse($response, 200);
    }

    /**
     * Get list of connected integrations
     * (without their details)
     *
     * @return WP_REST_Response
     */
    public static function connected()
    {
        $response = [];

        if (self::isDashboardEnabled()) {
            $integrations = get_connected_integrations(true);

            // Remove some unnecessary data
            foreach ($integrations as $integration) {
                $response[] = self::transformIntegration($integration);
            }
        }
        return static::apiResponse($response, 200);
    }

    /**
     * Return integration details with lists, tags and default fields
     *
     * @param  WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function integration(WP_REST_Request $request)
    {
        $response = [];

        if (self::isDashboardEnabled()) {
            $provider = $request->get_param('integration');
            $integration = self::findIntegration($provider);

            // Try the cache
            $cacheKey = 'opd_integration_details_for_'.$provider;
            $response = self::cacheGet($cacheKey);

            if ($integration) {
                if (! $response) {
                    if ($integration->isConnected()) {
                        $lists  = $integration->hasLists() ? $integration->getLists() : [];
                        $tags   = $integration->hasTags() ? $integration->getTags() : [];
                        $fields = $integration->getFields();
                        $goals  = $integration->hasGoals() ? $integration->getGoals() : [];
                    } else {
                        $lists = $tags = $fields = $goals = null;
                    }

                    // Build up the response
                    $response = self::transformIntegration($integration, $lists, $tags, $fields, $goals);

                    // Save to cache - 10 minutes
                    self::cachePut($cacheKey, $response, 10);
                }
            }

            return self::apiResponse($response);
        }

        return self::apiErrorResponse('Integration ' . $request->get_param('integration') . ' invalid');
    }

    /**
     * Return integration lists
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function lists(WP_REST_Request $request)
    {
        if (self::isDashboardEnabled()) {
            $provider    = $request->get_param('integration');
            $integration = self::findIntegration($provider);

            // Try the cache
            $cacheKey = 'op_integration_lists_for_'.$provider;
            $response = self::cacheGet($cacheKey);

            if ($integration->isConnected()) {
                if ($response) {
                    return self::apiResponse($response);
                } else {
                    $lists    = $integration->getLists();
                    $response = self::transformPayload($lists);

                    // Save to cache
                    self::cachePut($cacheKey, $response);

                    return self::apiResponse($response);
                }
            } elseif ($integration and ! $integration->isConnected()) {
                return self::apiErrorResponse('Integration is not connected');
            } elseif ($response) {
                return self::apiResponse($response);
            }
        }

        return self::apiErrorResponse('Integration ' . $request->get_param('integration') . ' invalid');
    }

    /**
     * Return integration tags
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function tags(WP_REST_Request $request)
    {
        if (self::isDashboardEnabled()) {
            $provider    = $request->get_param('integration');
            $integration = self::findIntegration($provider);

            // Try the cache
            $cacheKey = 'op_integration_tags_for_'.$provider;
            $response = self::cacheGet($cacheKey);

            if ($integration and $integration->isConnected() and $integration->hasTags()) {
                if ($response) {
                    return self::apiResponse($response);
                } else {
                    $tags = $integration->getTags();

                    if ($tags and count($tags)) {
                        $response = self::transformPayload($tags);

                        // Save to cache
                        self::cachePut($cacheKey, $response);

                        return self::apiResponse($response);
                    } else {
                        return self::apiErrorResponse('No tags were found', 'integration_tags_empty');
                    }
                }
            } elseif ($integration and ! $integration->isConnected()) {
                return self::apiErrorResponse('Integration is not connected', 'integration_disconnected');
            } elseif ($integration and ! $integration->hasTags()) {
                return self::apiErrorResponse('Tags are disabled for this provider', 'integration_tags_disabled');
            }
        }

        return self::apiErrorResponse('Integration ' . $request->get_param('integration') . ' invalid');
    }

    /**
     * Return integration goals.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function goals(WP_REST_Request $request)
    {
        if (self::isDashboardEnabled()) {
            $provider    = $request->get_param('integration');
            $integration = self::findIntegration($provider);

            // Try the cache
            $cacheKey = 'op_integration_goals_for_' . $provider;
            $response = self::cacheGet($cacheKey);

            if ($integration and $integration->isConnected() and $integration->hasGoals()) {
                if ($response) {
                    return self::apiResponse($response);
                } else {
                    $goals = $integration->getGoals();

                    if ($goals and count($goals)) {
                        $response = self::transformPayload($goals);

                        // Save to cache
                        self::cachePut($cacheKey, $response);

                        return self::apiResponse($response);
                    } else {
                        return self::apiErrorResponse('No goals were found', 'integration_tags_empty');
                    }
                }
            } elseif ($integration and ! $integration->isConnected()) {
                return self::apiErrorResponse('Integration is not connected', 'integration_disconnected');
            } elseif ($integration and ! $integration->hasTags()) {
                return self::apiErrorResponse('Goals are disabled for this provider', 'integration_tags_disabled');
            }
        }

        return self::apiErrorResponse('Integration ' . $request->get_param('integration') . ' invalid');
    }

    /**
     * Return fields for list of default
     *
     * @param  WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function fields(WP_REST_Request $request)
    {
        if (self::isDashboardEnabled()) {
            $provider    = $request->get_param('integration');
            $integration = self::findIntegration($provider);
            $listId      = $request->get_param('list');

            // Try the cache
            $cacheKey = 'op_integration_fields_for_'.$provider.'_list_'.$listId;
            $response = self::cacheGet($cacheKey);

            if ($integration and $integration->isConnected()) {
                if ($response) {
                    return self::apiResponse($response);
                } else {
                    $fields = $integration->getFields($listId);

                    if ($fields and count($fields)) {
                        $response = self::transformPayload($fields);

                        // Save to cache
                        self::cachePut($cacheKey, $response);

                        return self::apiResponse($response);
                    } else {
                        return self::apiErrorResponse('No fields were found');
                    }
                }
            } elseif ($integration and ! $integration->isConnected()) {
                return self::apiErrorResponse('Integration is not connected');
            }
        }

        return self::apiErrorResponse('Integration ' . $request->get_param('integration') . ' invalid');
    }

    /**
     * Show integration data for a page
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function pageIntegrations(WP_REST_Request $request)
    {
        $integrationService = new Integrations;
        $integrations       = $integrationService->getPageIntegrations($request->get_param('id'));

        if ($integrations) {
            return self::apiResponse($integrations);
        }

        return self::apiErrorResponse('Page ' . $request->get_param('id') . ' invalid');
    }

    /**
     * Optin to provider integration list
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function optin(WP_REST_Request $request)
    {
        // Get current page data
        $currentPageId  = $request->get_param('optin-current-page-id');
        $formElementUid = $request->get_param('optin-current-element-uuid');
        $currentPage    = get_post($currentPageId);

        // Run optin process
        $service = new Integrations;
        $optin   = $service->optinFromRESTRequest($request);

        if ($optin->isSuccessful()) {
            // Special action for funnel pages
            if ($currentPage and $currentPage->post_type === 'opf_funnel') {
                // First we need to get the form element options
                $pages          = new PageRepository;
                $page           = $pages->findOrFail($currentPageId, false);
                $elementOptions = $page->getElementOptions($formElementUid);

                if (isset($elementOptions['optinPostAction'])) {
                    // Take action
                    if ($elementOptions['optinPostAction'] === 'goToFunnelStep') {
                        $stepId        = $elementOptions['optinPostActionFunnelStep'];
                        $funnelPage    = get_step_page_in_funnel($stepId, $currentPageId);
                        $funnelPageUrl = $funnelPage ? get_permalink($funnelPage->ID) : null;
                    } elseif ($elementOptions['optinPostAction'] === 'prevFunnelStep') {
                        $funnelPage    = get_prev_page_in_funnel($currentPageId);
                        $funnelPageUrl = $funnelPage ? get_permalink($funnelPage->ID) : null;
                    } else {
                        $funnelPage    = get_next_page_in_funnel($currentPageId);
                        $funnelPageUrl = $funnelPage ? get_permalink($funnelPage->ID) : null;
                    }

                    // Add URL to response
                    $responseData = ['redirect_url' => $funnelPageUrl];
                }
            } else {
                $responseData = ['message' => 'Optin success'];
            }

            return self::apiResponse($responseData);
        }

        return self::apiErrorResponse($optin->message(), $optin->errorCode(), $optin->errorCode());
    }

    /**
     * Optin to provider integration list from Smart Theme
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function optinSmart(WP_REST_Request $request)
    {
        // Run optin process
        $service = new Integrations;
        $optin   = $service->optinFromSmartThemeRESTRequest($request);

        if ($optin->isSuccessful()) {
            $responseData = ['message' => 'Optin success'];

            return self::apiResponse($responseData);
        }

        return self::apiErrorResponse('Optin failed', $optin->errorCode(), $optin->errorCode());
    }

    /**
     * Transform integration data for simple response
     *
     * @param  IntegrationList   $list
     * @param  Collection|array  $fields
     * @return array
     */
    public static function transformList($list, $fields = [])
    {
        $result = [];

        if ($list) {
            $result = [
                'id'    => $list->id,
                'name'  => $list->name,
            ];

            if ($fields) {
                $result['fields'] = $fields ? $fields->toArray() : [];
            }
        }

        return $result;
    }

    /**
     * Transform payload for simple response
     *
     * @param  Collection|array $payload
     * @return array
     */
    public static function transformPayload($payload = [])
    {
        return $payload ? $payload->toArray() : [];
    }

    /**
     * Find integration by provider key
     *
     * @param  string $provider
     * @return Integration
     */
    protected static function findIntegration($provider)
    {
        $integrations = \OPDashboard\get_available_providers();

        foreach ($integrations as $integration) {
            if ($provider == $integration->provider->key) {
                return $integration;
            }
        }

        return null;
    }

    /**
     * Clear the integration cache
     *
     * @return WP_REST_Response
     */
    public static function clearCache()
    {
        global $wpdb;

        $wpdb->query("DELETE FROM `$wpdb->options` WHERE `option_name` LIKE ('_transient_op_integration_%')");
        $wpdb->query("DELETE FROM `$wpdb->options` WHERE `option_name` LIKE ('_transient_op_page_integrations_for_%')");

        return new WP_REST_Response(["success" => true]);
    }

    /**
     * Clear the page integration cache
     *
     * @return WP_REST_Response
     */
    public static function clearPageCache()
    {
        global $wpdb;

        $wpdb->query("DELETE FROM `$wpdb->options` WHERE `option_name` LIKE ('_transient_op_page_integrations_for_%')");

        return new WP_REST_Response(["success" => true]);
    }
}
