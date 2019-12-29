<?php

namespace OptimizePress\Integrations\Http\Controllers;

use OptimizePress\Integrations\Storage\IntegrationEloquentRepository;

/**
 * Handle lists
 */
class OAuthControllerOPSL extends Controller
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
     * @return \Illuminate\Http\Response
     */
    public function authorize()
    {
        $url = config('optimizepress-integrations.optimizepress_sl_url').'connect?redirect='.route('optimizepress.integrations.opsl')."/";

        return redirect()->to($url);
    }

    /**
     * OAuth callback by integration UID with token
     *
     * @return mixed
     */
    public function process()
    {
        $integration = $this->integrations->findByProviderOrCreate('optimizepress', $this->getUserId());

        if ($integration) {
            $clientId     = request()->input('client_id');
            $clientSecret = request()->input('client_secret');

            $integration->storage()->updateConnectionFields($integration->uid, [
                'client_id'     => $clientId,
                'client_secret' => $clientSecret,
            ]);

            $urlParams = [
                'client_id'     => $clientId,
                'response_type' => 'code',
                'redirect_uri'  => route('optimizepress.integrations.opsl.callback'),
                'scope'         => '*',
            ];
            $url = config('optimizepress-integrations.optimizepress_sl_url').'oauth/authorize?'.http_build_query($urlParams);

            return redirect()->to($url);
        }

        return abort(500, 'Failed to find integration.');
    }

    /**
     * The OAuth callback endpoint that stores the token
     *
     * @param  string $uid
     * @return mixed
     */
    public function callback($uid = null)
    {
        $integration = $this->integrations->findByUid($uid);
        $data        = array_merge(request()->all(), ['sl' => true]);
        $integration->authorize($data);

        return redirect()->route('optimizepress.integrations.edit', $integration->uid)->with('opalert', 'Authorized.');
    }

    /**
     * Refresh the token
     * @param  string $uid
     * @return mixed
     */
    public function refreshToken($uid)
    {
        return abort(500, 'Not implemented yet for: '.$uid);
    }
}
