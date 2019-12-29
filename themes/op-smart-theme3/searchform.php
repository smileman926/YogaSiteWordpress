<form method="get" id="searchform" class="searchform" action="<?php echo esc_url(home_url()); ?>">
    <p>
        <input type="text" name="s" id="s" value="<?php echo esc_attr(get_search_query()); ?>" size="22" class="form-control" placeholder="<?php echo esc_attr_x('Search term', 'Search form placeholder', 'op3_smart'); ?>">
    </p>
    <p>
        <input name="submit" type="submit" id="searchsubmit" value="<?php echo esc_attr_x('Search', 'Search submit button', 'op3_smart'); ?>" class="btn btn-primary">
    </p>
</form>
