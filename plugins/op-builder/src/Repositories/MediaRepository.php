<?php

namespace OPBuilder\Repositories;

use OPBuilder\Editor\Page;
use OPBuilder\Templates\Templates;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\object_get;
use OptimizePress\Support\Str;
use stdClass;

class MediaRepository extends WordpressRepository
{
    /**
     * Import image from remote URL to WordPress media library
     *
     * @param  string $url
     * @param  int    $postId
     * @return array|\WP_Post|null
     */
    public function importImageFromUrl($url, $postId = null)
    {
        $attachmentId = null;

        // Match only URL's that don't contain "wp-content/uploads"
        if (strpos($url, 'wp-content/uploads') === false) {
            // Let's first check if the image already exists in the our library
            $exists = Templates::findAttachmentByMediaUrl($url);

            // Import the image from the URL to the WP media library if it's not already imported
            if ($exists) {
                // Return the existing stuff
                $attachmentId  = $exists->ID;
                $attachmentUrl = wp_get_attachment_url($attachmentId);
            } else {
                // Create attachment
                $attachmentId  = Templates::insertAttachmentFromUrl($url, $postId);
                $attachmentUrl = wp_get_attachment_url($attachmentId);

                // And update meta data
                update_post_meta($attachmentId, '_op_media_id',  'block_'.uniqid());
                update_post_meta($attachmentId, '_op_media_url', $url);
            }
        }

        // Fetch the uploaded media object
        return $attachmentId ? get_post($attachmentId) : null;
    }
}
