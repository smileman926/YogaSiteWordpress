@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.alerts')

    @include('optimizepress-integrations::partials.title')

    @if ($integration->hasLists())
        <hr>

        <h3>Lists</h3>

        @if ($lists and count($lists))
            <table class="table">
                <thead>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </thead>
                <tbody>
                    @foreach ($lists as $list)
                        <tr>
                            <td>{{ $list->id }}</td>
                            <td>{{ $list->name }}</td>
                            <td>{{ str_limit($list->description) ?: '-' }}</td>
                            <td class="text-right">
                                <a href="{{ route('optimizepress.integrations.lists.show', [$integration->uid, $list->id]) }}" class="btn btn-sm btn-primary">Details / Optin</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="alert alert-warning">No lists found.</div>
        @endif
    @endif


    @if ($integration->hasTags() and $tags = $integration->getTags())
        <hr>

        <h3>Tags</h3>

        @if ($tags and count($tags))
            <table class="table">
                <thead>
                    <th>Tag ID</th>
                    <th>Tag</th>
                </thead>
                <tbody>
                    @foreach ($tags as $tag)
                        <tr>
                            <td>{{ $tag->id }}</td>
                            <td>{{ $tag->name }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="alert alert-warning">No tags found.</div>
        @endif
    @endif

    @if ($integration->type === 'webhook')
        @include('optimizepress-integrations::partials.optin_form_webhook', ['fields' => $integration->getFields()])
    @endif

    <hr>

    <div class="form-group">
        <a href="{{ route('optimizepress.integrations.edit', $integration->uid) }}" class="btn btn-info">Edit</a>
        <a href="{{ route('optimizepress.integrations.index') }}" class="btn btn-default">Back</a>

        @if ($integration->isOauth() and ! $integration->isConnected())
            <a href="{{ route('optimizepress.integrations.authorize', $integration->uid) }}" class="btn btn-success pull-right">Connect</a>
        @elseif ($integration->isOauth() and $integration->isConnected())
            <form class="form-inline pull-right" action="{{ route('optimizepress.integrations.disconnect', $integration->uid) }}" method="post">
                {{ csrf_field() }}
                <button type="submit" class="btn btn-warning">Disconnect</button>
            </form>
        @endif
    </div>
@stop
