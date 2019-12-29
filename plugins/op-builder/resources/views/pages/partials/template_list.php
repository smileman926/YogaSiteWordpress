<?php wp_nonce_field('nonce-create-new-page', 'nonce-create-new-page'); ?>

<?php if ($templates and count($templates)) : ?>
    <?php foreach ($templates as $template) : ?>
        <div class="opb-template-list-item" data-category-uid="<?php echo $categoryUid ?>" data-template-uid="<?php echo $template->uid ?>" data-big-image="<?php echo $template->preview('medium') ?>">
            <div class="ops-white-box">
                <div class="opb-template-preview ops-moving-image">
                    <?php if ($previewImage = $template->preview('medium')) : ?>
                        <img src="<?php echo $previewImage; ?>" alt="<?php echo $template->title ?>">
                    <?php endif; ?>
                </div>
                <div class="opb-inner">
                    <h4><?php echo $template->title ?></h4>
                    <p><?php echo $template->category_title ?></p>

                    <div class="opb-hover">
                        <?php if ($template->preview_link) : ?>
                            <a class="opb-preview-link-template-btn ops-button ops-transparent" href="<?php echo $template->preview_link; ?>" target="_blank">
                                <i class="ops-icon ops-zoom-plus-icon"></i>
                                <?php _e('Preview Template', 'optimizepress3'); ?>
                            </a>
                        <?php else : ?>
                            <a class="opb-preview-template-btn ops-button ops-transparent" href="">
                                <i class="ops-icon ops-zoom-plus-icon"></i>
                                <?php _e('Preview Template', 'optimizepress3'); ?>
                            </a>
                        <?php endif; ?>
                        <a class="opb-use-template-btn ops-button" href="<?php echo admin_url('admin.php'); ?>"><?php _e('Use This Template', 'optimizepress3'); ?></a>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
<?php elseif ($templates === false) : ?>
    <div class="opb-template-list-item">
        <div class="ops-white-box ops-danger text-center opb-no-template">
            <p>
                <i class="op3-icon op3-icon-refresh-02-1 op3-icon-is-spinning" style="position: relative; top: 2px; margin-right: 8px;"></i>
                <?php _e('Loading templates...', 'optimizepress3'); ?>
            </p>
        </div>
    </div>
<?php else : ?>
    <div class="opb-template-list-item">
        <div class="ops-white-box ops-danger text-center opb-no-template">
            <p><?php _e('No templates found in this category', 'optimizepress3'); ?></p>
        </div>
    </div>
<?php endif; ?>
