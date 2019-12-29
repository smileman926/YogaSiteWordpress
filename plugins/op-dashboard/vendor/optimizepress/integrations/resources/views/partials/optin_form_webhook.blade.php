<div class="row">
    <div class="col-md-8 col-offset-md-2">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Optin to webhook: <strong>...</strong></h3>
            </div>
            <div class="panel-body">
                <form action="{{ route('optimizepress.integrations.lists.optin', [$integration->uid]) }}" method="post">
                    {{ csrf_field() }}

                    @foreach ($fields as $field)
                        @include('optimizepress-integrations::partials.inputs.input', ['input' => $field])
                    @endforeach

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Optin</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
