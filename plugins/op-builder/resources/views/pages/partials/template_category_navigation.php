<div class="ops-secondary-menu opb-template-category-menu text-center">
    <ul class="ops-nav ops-nav-pills ops-nav-collapsible ops-nav-center">
        <?php foreach ($categories as $index => $category) : ?>
            <?php if ($category->template_count > 0) : ?>
                <li class="ops-nav-item <?php echo $index === 0 ? 'ops-active' : null ?>">
                    <a href="#template-category-<?php echo $category->uid ?>" class="ops-nav-link">
                        <?php echo $category->title ?>
                    </a>
                </li>
            <?php endif; ?>
        <?php endforeach; ?>

        <li class="ops-nav-item" data-category-uid="0">
            <a href="#collections" class="ops-nav-link">
                <?php _e('Collections', 'opdash') ?>
            </a>
        </li>

        <li class="ops-nav-item" data-category-uid="0">
            <a href="#customer-templates" class="ops-nav-link">
                <?php _e('My Templates', 'opdash') ?>
            </a>
        </li>

        <li class="ops-nav-item ops-nav-item-more" data-category-uid="0"><a href="#" class="ops-nav-link-more"><?php _e('See more', 'opdash') ?></a></li>
        <li class="ops-nav-item ops-nav-item-less" data-category-uid="0"><a href="#" class="ops-nav-link-less"><?php _e('See less', 'opdash') ?></a></li>
    </ul>
</div>
