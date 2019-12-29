<div class="text-center">
    <a href="{{ route('optimizepress.integrations.opsl.authorize') }}" class="btn btn-primary btn-lg">
        {{ $integration->isConnected() ? 'Re-' : '' }}Connect to OptimizePress SL
    </a>
</div>
