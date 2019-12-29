<label class="control-label select-group-label" for="select-{{ $input->name }}">{{ $input->label }}</label>

<div class="select">
    <select class="{{ isset($class) ? $class : null }} form-control" id="select-{{ $input->name }}" name="{{ $input->name }}[]" {{ $input->required ? 'required' : '' }} multiple>
        <option value="" disabled selected>{{ $input->placeholder ?: $input->label }}</option>

        @foreach ($input->values as $key => $option)
            <option value="{{ $option["value"] }}">{{ $option["label"] }}</option>
        @endforeach
    </select>
</div>
