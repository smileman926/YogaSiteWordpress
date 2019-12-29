<h2>
    <i class="fa fa-globe" style="{{ $integration->isConnected() ? 'color: #0c0;' : 'color: #999;' }}"></i>
    {{ $integration->title }}
    <span class="label label-default" style="font-size: 11px;">{{ $integration->provider_title }}</span>

    @if (! $integration->authorizesThroughSL())
        @if ($integration->isOauth() and $integration->serviceUrl())
            <p class="pull-right"><a href="{{ $integration->serviceUrl() }}" class="btn btn-info" target="_blank">Manage your {{ $integration->provider_title }} OAuth apps</a></p>
        @elseif ($integration->serviceUrl())
            <p class="pull-right"><a href="{{ $integration->serviceUrl() }}" class="btn btn-info" target="_blank">Find your {{ $integration->provider_title }} API credentials</a></p>
        @endif
    @endif
</h2>
