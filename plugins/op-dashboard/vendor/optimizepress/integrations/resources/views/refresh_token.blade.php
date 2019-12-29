@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.title')

    <hr>

    <h3>Refreshing Token</h3>

    <hr>

    @php
        dump($token)
    @endphp

    <hr>

    <div class="form-group">
        <a href="{{ route('optimizepress.integrations.index') }}" class="btn btn-default">Back</a>

        <span class="text-right pull-right">
            <a href="{{ route('optimizepress.integrations.edit', $integration->uid) }}" class="btn btn-primary">Edit</a>
            <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}" class="btn btn-info">Details</a>
        </span>
    </div>
@stop
