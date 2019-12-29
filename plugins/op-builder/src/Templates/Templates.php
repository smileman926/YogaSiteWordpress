<?php

namespace OPBuilder\Templates;

use Exception;
use OPBuilder\Editor\Menus;
use OPBuilder\Repositories\PageRepository;
use function OPDashboard\get_http_timeout_value;
use OPDashboard\SL\SL;
use OPDashboard\Templates\Template;
use WP_Error;
use WP_Query;
use function OptimizePress\Support\array_get;

class Templates
{
    /**
     * Find template by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function find($id)
    {
        return SL::getTemplate($id);
    }

    /**
     * Create new WP page from a OP template
     *
     * @param  mixed  $id
     * @param  array  $data
     * @return int|WP_Error
     * @throws Exception
     */
    public static function createPageFromTemplate($id, $data = [])
    {
        // Get repo
        $pages    = new PageRepository;
        $postType = array_get($data, 'post_type', 'page');

        // Get template
        $template = self::find($id);

        // Prepare post data
        $postData = array_merge([
            'post_title' => array_get($data, 'title', 'OP3 Page ' . uniqid()),
            'post_type'  => $postType,
        ], $data);

        // Create page
        $pageId = wp_insert_post($postData);

        // Add the page templates for the page
        $wpTemplate = $template->wp_template;
        if ($wpTemplate === 'blank' || $wpTemplate === 'full_width') {
            $wpTemplate = 'op_builder_' . $wpTemplate;
        }
        if ($wpTemplate === '' || $wpTemplate === null) {
            $wpTemplate = 'op_builder_blank';
        }
        $pages->updateTemplate($pageId, $wpTemplate);

        // Set page as OP3 page mode
        $pages->setPageEditorMode($pageId, 1);

        // Find images
        $templateData = self::replaceImagePlaceholders($template);
        // $templateData = self::importImages($pageId, $template);

        // Add template JSON data with replaced images, and also create summary
        $pages->updateData($pageId, @json_decode($templateData), true);
        $pages->updateSummary($pageId, @json_decode($templateData, true));

        // We also need to sync the menu elements
        $page = $pages->find($pageId);
        Menus::sync($page);

        return $pageId;
    }

    /**
     * Find images in JSON data and import them into our storage
     *
     * @param  int     $id
     * @param Template $template
     * @return mixed|string
     */
    public static function importImages($id, Template $template)
    {
        // Fetch template JSON data
        $data = $template->structure();

        if (is_array($template->media) and count($template->media) and $template->media) {
            foreach ($template->media as $placeholder => $mediaUrl) {
                $exists = static::findAttachmentByMediaId($placeholder);

                // Import the image from the URL to the WP media library if it's not already imported
                if ($exists) {
                    // Return the existing stuff
                    $attachmentId  = $exists->ID;
                    $attachmentUrl = wp_get_attachment_url($attachmentId);
                } else {
                    // Create attachment
                    $attachmentId  = self::insertAttachmentFromUrl($mediaUrl, $id);
                    $attachmentUrl = wp_get_attachment_url($attachmentId);

                    // And update meta data
                    update_post_meta($attachmentId, '_op_media_id', $placeholder);
                    update_post_meta($attachmentId, '_op_media_url', $mediaUrl);
                }

                // Then rewrite the template data placeholder with the URL in the WP media library
                $data = str_replace('%' . $placeholder . '%', $attachmentUrl, $data);
            }
        }

        return $data;
    }

    /**
     * Find attachment post by the OP media ID
     *
     * @param  int $mediaId
     * @return \WP_Post|null
     */
    public static function findAttachmentByMediaId($mediaId)
    {
        // Find the post object
        $media = null;
        $query = new WP_Query([
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'meta_query'  => [['key' => '_op_media_id', 'value' => $mediaId, 'compare' => '=']]
        ]);

        // Find the first attachment
        if ($query->have_posts()) {
            $media = $query->posts[0];
        }

        return $media;
    }

    /**
     * Find attachment post by the OP media URL
     *
     * @param  string $mediaUrl
     * @return \WP_Post|null
     */
    public static function findAttachmentByMediaUrl($mediaUrl)
    {
        // Find the post object
        $media = null;
        $query = new WP_Query([
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'meta_query'  => [['key' => '_op_media_url', 'value' => $mediaUrl, 'compare' => '=']]
        ]);

        // Find the first attachment
        if ($query->have_posts()) {
            $media = $query->posts[0];
        }

        return $media;
    }

    /**
     * Simply replace image placeholders and return string
     *
     * @param  Template $template
     * @return mixed|string
     */
    public static function replaceImagePlaceholders(Template $template)
    {
        // Fetch template JSON data
        $data = $template->structure();

        if (! empty($template->media) and $template->media) {
            foreach ($template->media as $placeholder => $mediaUrl) {
                // Then rewrite the template data placeholder with the URL in the WP media library
                $data = str_replace('%' . $placeholder . '%', $mediaUrl, $data);
            }
        }

        return $data;
    }

    /**
     * Insert an attachment from an URL address.
     *
     * @param  string $url
     * @param  int    $postId
     * @return Int    Attachment ID
     */
    public static function insertAttachmentFromUrl($url, $postId = null)
    {
        if (! class_exists('WP_Http')) {
            include_once(ABSPATH . WPINC . '/class-http.php');
        }

        // We need to parse the URL
        $parsedUrl = parse_url($url);
        $filename  = basename($parsedUrl['scheme'] . '://' . $parsedUrl['host'] . (isset($parsedUrl['path']) ? $parsedUrl['path'] : ''));

        // Create new HTTP client
        $http = new \WP_Http();
        $response = $http->request($url, ['timeout' => function_exists('\OPDashboard\get_http_timeout_value') ? get_http_timeout_value() : 300]);
        if (is_wp_error($response) or (is_array($response) and $response['response']['code'] != 200)) {
            return false;
        }

        // Check if filename is ok
        $fileParts = pathinfo($filename);

        // Check extension and add if needed
        if (! isset($fileParts['extension']) or ! $fileParts['extension']) {
            $mimeType  = $response['headers']['content-type'];
            $extension = op3_mime_type_to_extension($mimeType);
            $filename  = $fileParts['basename'] . '.' . $extension;
        }

        // Upload by bits
        $upload = wp_upload_bits($filename, null, $response['body']);
        if (! empty($upload['error'])) {
            return false;
        }

        // Prepare names and directory
        $filePath        = $upload['file'];
        $fileName        = basename($filePath);
        $fileType        = wp_check_filetype($fileName, null);
        $attachmentTitle = sanitize_file_name(pathinfo($fileName, PATHINFO_FILENAME));
        $wpUploadDir     = wp_upload_dir();

        // Prepare attachment post info
        $postInfo = [
            'guid'				=> $wpUploadDir['url'] . '/' . $fileName,
            'post_mime_type'	=> $fileType['type'],
            'post_title'		=> $attachmentTitle,
            'post_content'		=> '',
            'post_status'		=> 'inherit',
        ];

        // Create the attachment
        $attachmentId = wp_insert_attachment($postInfo, $filePath, $postId);

        // Include image.php
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        // Define attachment metadata
        $attachData = wp_generate_attachment_metadata($attachmentId, $filePath);

        // Assign metadata to attachment
        wp_update_attachment_metadata($attachmentId, $attachData);

        return $attachmentId;
    }
}
