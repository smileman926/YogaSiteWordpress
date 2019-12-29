<?php

namespace OptimizePress\Integrations\Http\Controllers;

use OptimizePress\Integrations\Storage\IntegrationEloquentRepository;

/**
 * Handle lists
 */
class OAuthController extends Controller
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
     * Display view for OAuth authorization
     *
     * @param  string $uid
     * @return \Illuminate\Http\Response
     */
    public function authorize($uid)
    {
        $integration = $this->integrations->findByUid($uid);

        return view('optimizepress-integrations::authorize')->with('integration', $integration);
    }

    /**
     * OAuth callback with token
     *
     * @return mixed
     */
    public function callbackbyRequest()
    {
        // Get response callback (token) and store it in the connection
        // @TODO: Only needed for OptimizeLeads, need to implement
        // dd(request()->all());
    }

    /**
     * OAuth callback by integration UID with token
     *
     * @param  string $uid
     * @return mixed
     */
    public function callbackByUid($uid)
    {
        // Get response callback (token) and store it in the connection
        $integration = $this->integrations->findByUid($uid);
        $integration->authorize(request()->all());

        return redirect()->route('optimizepress.integrations.edit', $integration->uid)->with('opalert', 'Authorized.');
    }

    /**
     * Refresh the token
     * @param  string $uid
     * @return string
     */
    public function refreshToken($uid)
    {
        $integration = $this->integrations->findByUid($uid);
        $refresh     = $integration->refreshToken(true);

        return view('optimizepress-integrations::refresh_token')->with('integration', $integration)->with('token', $refresh);
    }
}
