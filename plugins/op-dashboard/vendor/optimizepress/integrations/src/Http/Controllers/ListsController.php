<?php

namespace OptimizePress\Integrations\Http\Controllers;

use Illuminate\View\View;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\Storage\IntegrationEloquentRepository;

/**
 * Handle lists
 */
class ListsController extends Controller
{
    /**
     * @var IntegrationEloquentRepository
     */
    protected $integrations;

    /**
     * Init
     */
    public function __construct()
    {
        $this->integrations = new IntegrationEloquentRepository;
    }

    /**
     * Show integration list details
     *
     * @param  string $integrationUid
     * @param  mixed  $listId
     * @return View
     */
    public function show($integrationUid, $listId = null)
    {
        $integration = $this->integrations->findByUid($integrationUid, $this->getUserId());
        $list        = $integration->hasLists() ? $integration->getList($listId) : null;

        return view('optimizepress-integrations::list')->with('integration', $integration)->with('list', $list);
    }

    /**
     * Display list of fields for integration list
     *
     * @param  string $integrationUid
     * @param  mixed  $listId
     * @return View
     */
    public function fields($integrationUid, $listId = null)
    {
        $integration = $this->integrations->findByUid($integrationUid, $this->getUserId());
        $list        = $integration->hasLists() ? $integration->getList($listId) : null;

        return view('optimizepress-integrations::fields')->with('list', $list);
    }

    /**
     * Show list optin form
     *
     * @param  string $integrationUid
     * @param  mixed  $listId
     * @return View
     */
    public function optinForm($integrationUid, $listId = null)
    {
        $integration = $this->integrations->findByUid($integrationUid, $this->getUserId());
        $list        = $integration->hasLists() ? $integration->getList($listId) : null;

        return view('optimizepress.integrations.lists.optin_form')->with('integration', $integration)->with('list', $list);
    }

    /**
     * Process the optin form
     *
     * @param  string $integrationUid
     * @param  mixed  $listId
     * @return \Redirect
     */
    public function optin($integrationUid, $listId = null)
    {
        $integration = $this->integrations->findByUid($integrationUid, $this->getUserId());
        $list        = $integration->hasLists() ? $integration->getList($listId) : null;

        // Create lead options from your optin box settings
        // Simulate double optin for this demo
        $leadOptions = new LeadOptions([
            'double_optin' => true,
        ]);

        // Build up OptinData
        $optinData = new OptinData(array_merge(request()->except(['_token']), [
           'list_id' => $listId,
        ]));

        // Run optin
        $optin = $integration->optin($optinData, $leadOptions);

        if ($integration->hasLists()) {
            return redirect()->route('optimizepress.integrations.lists.show', [$integrationUid, $listId])
                ->with('opalert', 'Success.')
                ->with('optin', $optin)
                ->with('list', $listId);
        } else {
            return redirect()->route('optimizepress.integrations.show', [$integrationUid])
                ->with('opalert', 'Success.')
                ->with('optin', $optin);
        }
    }
}
