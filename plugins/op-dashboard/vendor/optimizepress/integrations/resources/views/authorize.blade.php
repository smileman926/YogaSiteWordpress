@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.title')

    <hr>

    @if ($integration->type == 'oauth' and ! $integration->authorizesThroughSL())
        <div class="form-group">
            <label class="control-label">OAuth Callback URL</label>
            <input type="text" name="oauth_callback_url" class="form-control" placeholder="http://..." value="{{ $integration->getCallbackUrl() ?: route('optimizepress.integrations.oauth_callback.uid', $integration->uid) }}" readonly disabled>
            <span id="helpBlock" class="help-block">Make sure to set the correct callback URL in you <a href="{{ $integration->serviceUrl() }}" target="_blank">OAuth application</a>.</span>
        </div>

        <hr>
    @endif

    <div>
        <a href="{{ $integration->getAuthorizationUrl() }}" class="btn btn-success">Authorize integration</a>
    </div>
@stop
