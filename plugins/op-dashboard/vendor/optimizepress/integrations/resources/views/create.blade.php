@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    <h2>Create new integration</h2>

    <hr>

    <form action="{{ route('optimizepress.integrations.store') }}" method="post">
        {{ csrf_field() }}

        <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" name="title" value="" placeholder="Name your integration (eg. MailChimp 001)" required>
        </div>

        <div class="form-group">
            <label class="control-label">Provider</label>
            <select name="provider" class="form-control" required>
                <option value="">- Choose one -</option>
                @foreach ($providers as $providerId => $provider)
                    <option value="{{ $providerId }}">{{ $provider->title }}</option>
                @endforeach
            </select>
        </div>

        <hr>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('optimizepress.integrations.index') }}" class="btn btn-default">Cancel</a>
        </div>
    </form>
@stop
