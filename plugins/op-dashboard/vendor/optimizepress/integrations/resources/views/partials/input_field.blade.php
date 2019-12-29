@if ($input->type == "hidden")
    @include('optimizepress-integrations::partials.fields.hidden')
@else
    <div id="integration-field-{{ $input->id }}" class="form-group integration-field {{ $input->enabled ? '' : ' input-disabled' }}">
        @include('optimizepress-integrations::partials.fields.' . $input->type)
    </div>
@endif
