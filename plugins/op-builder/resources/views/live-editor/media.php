<script>
jQuery(function() {
    var frame = wp.media({
        title: 'Select or Upload Media Of Your Chosen Persuasion',
        button: {
            text: 'Use this media'
        },
        multiple: false  // Set to true to allow multiple files to be selected
    });
    frame.open();
});
</script>

<style>
	#wpwrap { display: none; }
</style>
