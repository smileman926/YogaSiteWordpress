@if (session('opalert'))
    <div class="alert alert-{{ session('opalert_state', 'success') }}">
        {{ session('opalert') }}
    </div>
@endif
