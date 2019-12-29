@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.title')

    <hr>

    <form action="{{ route('optimizepress.integrations.update', $integration->uid) }}" method="post">
        {{ csrf_field() }}
        {{ method_field('put') }}

        @include('optimizepress-integrations::partials.alerts')

        <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" name="title" value="{{ $integration->title }}" placeholder="Name your integration (eg. MailChimp 001)" required>
        </div>

        @if ($integration->isOauth() and ! $integration->isSL())
            <div class="form-group">
                <label class="control-label">OAuth Authorization</label>
                <select class="form-control" name="sl_auth">
                    <option value="0">Direct</option>
                    <option value="1" {{ $integration->authorizesThroughSL() ? 'selected' : null }}>Through OptimizePress SL</option>
                </select>
            </div>
        @endif

        @foreach ($integration->getConnectionFields() as $field)
            <div class="form-group">
                <label class="control-label">{{ $field->label }}</label>
                <input type="text" name="{{ $field->id }}" class="form-control" placeholder="{{ $field->label }}" value="{{ $field->value }}" {{ ($field->readonly or $integration->authorizesThroughSL()) ? 'readonly disabled' : null }}>
            </div>
        @endforeach

        @if ($integration->type == 'oauth' and ! $integration->isSL())
            <div class="form-group">
                <label class="control-label">OAuth Callback URL</label>
                <input type="text" name="oauth_callback_url" class="form-control" placeholder="http://..." value="{{ route('optimizepress.integrations.oauth_callback.uid', $integration->uid) }}" readonly>
                <span id="helpBlock" class="help-block">Make sure to set the correct callback URL in you <a href="{{ $integration->serviceUrl() }}" target="_blank">OAuth application</a>.</span>
            </div>
        @endif

        <hr>

        <span class="form-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('optimizepress.integrations.index') }}" class="btn btn-default">Cancel</a>

            <span class="text-right pull-right">
                @if ($integration->isConnected())
                    @if ($integration->isOauth())
                        <a href="{{ route('optimizepress.integrations.oauth_refresh_token', $integration->uid) }}" class="btn btn-default">Refresh Token</a>
                    @endif

                    @if (! $integration->isSL())
                        <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}" class="btn btn-info">Details</a>
                    @endif
                @endif

                @if ($integration->isSL())
                    <a href="{{ route('optimizepress.integrations.opsl.authorize') }}" class="btn btn-success">{{ $integration->isConnected() ? 'Re-Authorize' : 'Connect' }}</a>
                @elseif ($integration->authorizesThroughSL())
                    {{--<a href="{{ route('optimizepress.integrations.opsl.authorize') }}" class="btn btn-success">{{ $integration->isConnected() ? 'Re-Authorize' : 'Connect' }}</a>--}}
                    <a href="{{ route('optimizepress.integrations.authorize', $integration->uid) }}" class="btn btn-success">{{ $integration->isConnected() ? 'Re-Authorize' : 'Connect' }}</a>
                @elseif ($integration->canAuthorize())
                    <a href="{{ route('optimizepress.integrations.authorize', $integration->uid) }}" class="btn btn-success">{{ $integration->isConnected() ? 'Re-Authorize' : 'Connect' }}</a>
                @endif
            </span>
        </div>
    </form>
@stop
