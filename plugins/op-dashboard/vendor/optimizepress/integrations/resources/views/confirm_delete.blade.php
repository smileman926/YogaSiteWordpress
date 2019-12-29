@extends(config('optimizepress-integrations.views.layout'))

@section('main')
    @include('optimizepress-integrations::partials.title')

    <hr>

    <p>Are you sure you want to delete this integration?</p>

    <hr>

    <form action="{{ route('optimizepress.integrations.delete', $integration->uid) }}" method="post">
        {{ csrf_field() }}
        {{ method_field('delete') }}

        <div class="form-group">
            <button type="submit" class="btn btn-danger">Delete this integration?</button>
        </div>
    </form>
@stop
