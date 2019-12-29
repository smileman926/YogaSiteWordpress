@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.alerts')

    @if (count($integrations))
        <table class="table">
            <thead>
                <th></th>
                <th>Name / UID</th>
                <th>Provider</th>
                <th>Type</th>
                <th>SL</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                @foreach ($integrations as $integration)
                    <tr>
                        <th><i class="fa fa-globe" style="{{ $integration->isConnected() ? 'color: #0c0;' : 'color: #999;' }}"></i></th>
                        <td>
                            <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}">
                                <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}">{{ $integration->title }}</a>&nbsp;
                                <small class="label label-info">{{ $integration->uid }}</small>
                            </a>
                        </td>
                        <td>{{ $integration->provider_title }}</td>
                        <td>{{ strtoupper($integration->type) }}</td>
                        <td>{{ $integration->authorizesThroughSL() ? 'YES' : 'NO' }}</td>
                        <td class="text-right">
                            @if ($integration->isOAuth() and $integration->canAuthorize())
                                @if ($integration->isConnected())
                                    <form class="form-inline" action="{{ route('optimizepress.integrations.disconnect', $integration->uid) }}" method="post">
                                        {{ csrf_field() }}
                                        <button type="submit" class="btn btn-warning btn-sm">Disconnect</button>
                                    </form>
                                @else
                                    <a href="{{ route('optimizepress.integrations.authorize', $integration->uid) }}" class="btn btn-success btn-sm">Connect</a>
                                @endif
                            @endif
                        </td>
                        <td class="text-right">
                            <a href="{{ route('optimizepress.integrations.show', $integration->uid) }}" class="btn btn-primary btn-sm"><i class="fa fa-search"></i></a>
                            <a href="{{ route('optimizepress.integrations.edit', $integration->uid) }}" class="btn btn-info btn-sm"><i class="fa fa-pencil"></i></a>
                            <a href="{{ route('optimizepress.integrations.confirm_delete', $integration->uid) }}" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <div class="alert alert-warning">No integrations found.</div>
    @endif

    <div>
        <a href="{{ route('optimizepress.integrations.create') }}" class="btn btn-primary">New connection</a>
    </div>
@stop
