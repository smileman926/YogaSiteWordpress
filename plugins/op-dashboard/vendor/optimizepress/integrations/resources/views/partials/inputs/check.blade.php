<label class="control-label checkbox-group-label">{{ $input->label }}</label>

@foreach ($input->values as $key => $option)
    <div class="checkbox">
        <label>
            <input type="checkbox" name="{{ $input->name }}[]" value="{{ $option->value }}" {{ $input->required ? 'required' : '' }}>
            {{ $option->label }}
        </label>
    </div>
@endforeach
