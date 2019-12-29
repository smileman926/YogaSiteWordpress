<?php

namespace OptimizePress\Integrations\Http\Controllers;

use OptimizePress\Integrations\Storage\IntegrationEloquentRepository;
use OptimizePress\Integrations\Services\ProviderRepository;

/**
 * Handle integrations
 */
class IntegrationsController extends Controller
{
    /**
     * @var IntegrationEloquentRepository
     */
    protected $integrations;

    /**
     * @var ProviderRepository
     */
    protected $providers;

    /**
     * Init
     */
    public function __construct()
    {
        $this->integrations = new IntegrationEloquentRepository;
        $this->providers    = new ProviderRepository;
    }

    /**
     * Display all integrations
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $user         = $this->getUser();
        $integrations = $this->integrations->allForUser($user->id);

        return view('optimizepress-integrations::index')->with(['integrations' => $integrations]);
    }

    /**
     * Form for creating new integration connection
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $providers = \OptimizePress\Integrations\get_available_providers();

        return view('optimizepress-integrations::create')->with(['providers' => $providers]);
    }

    /**
     * Store a new integration
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $providerId  = request()->input('provider');
        $provider    = $this->providers->find($providerId);
        $integration = $this->integrations->create([
            'title'    => request()->input('title'),
            'provider' => $provider->id,
            'user_id'  => $this->getUserId(),
        ]);

        return redirect()->route('optimizepress.integrations.edit', $integration->uid)->with('opalert', 'Stored.');
    }

    /**
     * Show an integration
     *
     * @param  string $uid
     * @return \Illuminate\View\View
     */
    public function show($uid)
    {
        $userId      = $this->getUserId();
        $integration = $this->integrations->findByUid($uid, $userId);

        if ($integration->isSL() or ($integration->needsSLConnection() and ! $integration->isConnectedToSL())) {
            return view('optimizepress-integrations::show_opsl')->with('integration', $integration);
        } else {
            $lists = $integration->hasLists() ? $integration->getLists() : null;

            return view('optimizepress-integrations::show')->with('integration', $integration)->with('lists', $lists);
        }
    }

    /**
     * Edit integration settings
     *
     * @param  string $uid
     * @return \Illuminate\View\View
     */
    public function edit($uid)
    {
        $userId      = $this->getUserId();
        $integration = $this->integrations->findByUid($uid, $userId);

        return view('optimizepress-integrations::edit')->with('integration', $integration);
    }

    /**
     * Update integration settings
     *
     * @param  string $uid
     * @return \Illuminate\Http\Response
     */
    public function update($uid)
    {
        $integration = $this->integrations->findByUid($uid);
        $integration = $this->integrations->update($integration->uid, request()->except(['_token', '_method']));

        // Also try to ping and authorize for non-OAuth integrations
        if (! $integration->isOauth()) {
            $integration->authorize();
        }

        return redirect()->route('optimizepress.integrations.edit', $integration->uid)->with('opalert', 'Saved.');
    }

    /**
     * Disconnect connection to provider
     *
     * @param  string $uid
     * @return \Illuminate\Http\Response
     */
    public function disconnect($uid)
    {
        $integration = $this->integrations->findByUid($uid);
        $integration->disconnect();

        return redirect()->route('optimizepress.integrations.index')->with('opalert', 'Disconnected.');
    }

    /**
     * Confirm you want to delete the integration
     *
     * @param  string $uid
     * @return \Illuminate\Http\Response
     */
    public function confirmDelete($uid)
    {
        $integration = $this->integrations->findByUid($uid);

        return view('optimizepress-integrations::confirm_delete')->with('integration', $integration);
    }

    /**
     * Delete an integration
     *
     * @param  string $uid
     * @return \Illuminate\Http\Response
     */
    public function destroy($uid)
    {
        $integration = $this->integrations->findByUid($uid);

        if ($integration) {
            $this->integrations->destroy($uid);
        }

        return redirect()->route('optimizepress.integrations.index')->with('opalert', 'Deleted.');
    }
}
