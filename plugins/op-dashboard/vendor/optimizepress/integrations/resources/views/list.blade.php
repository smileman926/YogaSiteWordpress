@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.alerts')

    <h2>List details</h2>

    <p>
        ID: <strong>{{ $list->id }}</strong><br />
        Name: <strong>{{ $list->name }}</strong><br />
        Provider: <strong>{{ $list->getProviderName() }}</strong><br />
    </p>

    <hr>

    <h3>Fields</h3>

    @include('optimizepress-integrations::partials.list_fields', ['fields' => $list->getFields()])

    <hr>

    @if ($integration->hasTags())
        <h3>Tags</h3>

        @include('optimizepress-integrations::partials.list_tags', ['tags' => $list->getTags()])

        <hr>
    @endif

    <h3>Test Optin</h3>

    <hr>

    @include('optimizepress-integrations::partials.optin_form', ['fields' => $list->getFields()])

    <hr>

    <div class="form-group">
        <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}" class="btn btn-default">Back</a>
    </div>
@stop
