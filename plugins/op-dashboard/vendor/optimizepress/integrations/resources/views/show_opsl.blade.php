@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.title')

    <hr>

    @include('optimizepress-integrations::partials.connect_sl')

    <hr>

    <div class="form-group">
        <a href="{{ route('optimizepress.integrations.edit', $integration->uid) }}" class="btn btn-info">Edit</a>
        <a href="{{ route('optimizepress.integrations.index') }}" class="btn btn-default">Back</a>

        {{--@if ($integration->isOauth() and ! $integration->isConnected())--}}
            {{--<a href="{{ route('optimizepress.integrations.authorize', $integration->uid) }}" class="btn btn-success pull-right">Connect</a>--}}
        {{--@elseif ($integration->isOauth() and $integration->isConnected())--}}
            {{--<form class="form-inline pull-right" action="{{ route('optimizepress.integrations.disconnect', $integration->uid) }}" method="post">--}}
                {{--{{ csrf_field() }}--}}
                {{--<button type="submit" class="btn btn-warning">Disconnect</button>--}}
            {{--</form>--}}
        {{--@endif--}}
    </div>
@stop
