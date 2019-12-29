<div style="overflow-y: auto; max-height: 200px; border: 1px solid #ddd; padding: 10px; margin: 2px 0; border-radius: 3px;">
    @foreach ($tags as $tag)
        <span class="label label-primary">{{ $tag->name }}</span>
    @endforeach
</div>
