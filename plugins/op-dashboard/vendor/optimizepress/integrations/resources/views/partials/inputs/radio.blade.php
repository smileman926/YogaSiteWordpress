<label class="control-label radio-group-label">{{ $input->label }}</label>

@foreach ($input->values as $key => $option)
    <div class="radio">
        <label>
            <input type="radio" name="{{ $input->name }}" value="{{ $option["value"] }}" {{ $input->required ? 'required' : '' }}>
            {{ $option["label"] }}
        </label>
    </div>
@endforeach
