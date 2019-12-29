<?php
    if ( ! defined( 'ABSPATH' ) ) {
        exit;
    }

    // Check categories
    if ( ! isset($categories) && $categories->count() === 0) {
        return;
    }
?>
<section class="opb_create-new-page-slider">
    <div class="slider">
        <div class="Wallop Wallop--slide">
            <div class="Wallop-list">
                <?php foreach ($categories as $index => $category) : ?>
                    <?php if ($category->template_count > 0) : ?>
                        <div class="Wallop-item" data-category-uid="<?php echo $category->uid ?>">
                            <?php echo op3_view('pages/partials/templates', ['categoryUid' => $category->uid]) ?>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>

                <div class="Wallop-item">
                    <div class="opb-template-list d-flex flex-wrap justify-content-center">
                        <?php if ($collections and count($collections)) : ?>
                            <?php foreach ($collections as $collection) : ?>
                                <div class="opb-template-list-item">
                                    <div class="ops-white-box">
                                        <div class="opb-template-preview ops-moving-image">
                                            <?php if ($previewImage = $collection->preview('medium')) : ?>
                                                <img src="<?php echo $previewImage; ?>" alt="<?php echo $collection->title; ?>">
                                            <?php endif; ?>
                                        </div>

                                        <div class="opb-inner">
                                            <h4><?php echo $collection->title; ?></h4>
                                            <p><?php echo $collection->description; ?></p>
                                            <div class="opb-hover">
                                                <a class="opb-view-collection-btn ops-button"
                                                   data-collection-title="<?php echo $collection->title; ?>"
                                                   data-collection-uid="<?php echo $collection->uid; ?>"
                                                   href=""
                                                >
                                                    <?php _e('View Collection', 'optimizepress3'); ?>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="Wallop-item" data-category-uid="customer-templates">
                    <?php echo op3_view('pages/partials/templates', ['categoryUid' => 'customer-templates']) ?>
                </div>
            </div>
        </div>
    </div>
</section>
