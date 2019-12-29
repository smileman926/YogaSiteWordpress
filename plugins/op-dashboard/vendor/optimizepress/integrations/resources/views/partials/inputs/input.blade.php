@if ($input->type == "hidden")
    @include('optimizepress-integrations::partials.inputs.hidden')
@else
    <div id="box-input-{{ $input->id }}" class="form-group box-input{{ $input->enabled ? '' : ' input-disabled' }}">
        @include('optimizepress-integrations::partials.inputs.' . $input->type, ['class' => (isset($class) ? $class : null), 'group_class' => (isset($group_class) ? $group_class : null) ])
    </div>
@endif
