<script type="text/template" id="tmpl-unsplash">
	<ul class="frame-content-header">
		<li><input class="search" <# if (data.query) { #> value="{{{ data.query }}}" <# } #> type="search" placeholder="Search Unsplash" onkeypress="OP3.WpMediaFramePost.handleSearch(event, this)"></li>
		<li><a href="https://docs.optimizepress.com/article/2019-unsplash-integration" target="_blank">Tutorial</a></li>
	</ul>

	<div class="frame-content">
		<ul class="photos">
			<# if (data.photos && data.photos.length === 0) { #>
				<h3>Sorry, nothing matched your query</h3>
			<# }#>

			<# _.each(data.photos, function(photo) { #>
				<li class="photo">
					<div class="photo-wrapper" onclick="OP3.WpMediaFramePost.handleUnsplashImageClick(event, this)" data-download-url="{{{ photo.urls.regular }}}" data-photo-id="{{{ photo.id }}}">
						<img src="{{{ photo.urls.thumb }}}" />
						<a class="author" href="https://unsplash.com/@{{{ photo.user.username }}}?utm_source=op&utm_medium=referral" target="_blank">{{{ photo.user.name }}}</a>
					</div>
				</li>
			<# }) #>
		</ul>
		<# if (data.photos && data.photos.length !== 0) { #>
			<div class="button-wrapper">
				<button id="load-more" class="button media-button button-primary button-large" type="button" data-unsplash-next-url="{{{ data.urls.next }}}">Load More</button>
			</div>
		<# } #>
	</div>
</script>

<script type="text/template" id="tmpl-unsplash-photo">
	<div class="photo-wrapper" onclick="OP3.WpMediaFramePost.handleUnsplashImageClick(event, this)" data-download-url="{{{ data.urls.regular }}}">
		<img src="{{{ data.urls.thumb }}}" />
		<a class="author" href="https://unsplash.com/@{{{ data.user.username }}}?utm_source=op&utm_medium=referral" target="_blank">{{{ data.user.name }}}</a>
	</div>
</script>
