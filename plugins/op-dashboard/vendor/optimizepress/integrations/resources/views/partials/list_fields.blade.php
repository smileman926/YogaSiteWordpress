<table class="table">
    <thead>
        <tr>
            <th>#</th>
            <th>Label</th>
            <th>Name</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($fields as $field)
            <tr>
                <td>{{ $field->order }}</td>
                <td>{{ $field->label }}</td>
                <td>{{ $field->name }}</td>
                <td>{{ $field->type }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
