<?php

namespace OPBuilder\Repositories;

use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Elements\OPGlobalElement;
use OPBuilder\Editor\Page;
use OptimizePress\Support\Collection;
use WP_Error;
use WP_Post;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\object_get;

class GlobalElementRepository extends WordpressRepository
{
    /**
     * @var string
     */
    protected $postType = 'op_global_element';

    /**
     * @var string
     */
    protected $metaKey = '_op3_ge_meta';

    /**
     * @var string
     */
    protected $defaultThumb = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    /**
     * @var string
     */
    protected $metaKeyForRelatedPages = '_op3_ge_related_pages';

    /**
     * @var string
     */
    protected $metaKeyForRelatedGlobalElements = '_op3_ge_related_global_elements';

    /**
     * All global elements
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->get(-1);
    }

    /**
     * Get limited numbers of elements
     *
     * @param  int  $count
     * @return Collection
     */
    public function get($count = -1): Collection
    {
        $elements = new Collection;
        $posts = get_posts([
            'post_type'   => $this->postType,
            'post_status' => 'publish',
            'numberposts' => $count,
        ]);

        // Convert to global element objects
        foreach ($posts as $post) {
            $element = $this->setupElement((array) $post);

            $elements->push($element);
        }

        return $elements;
    }

    /**
     * Get global elements without OP3 data
     *
     * @param  int  $count
     * @return Collection
     */
    public function getWithoutData($count = -1): Collection
    {
        $elements = new Collection;
        $posts = get_posts([
            'post_type'   => $this->postType,
            'post_status' => 'publish',
            'numberposts' => $count,
        ]);

        // Convert to global element objects
        foreach ($posts as $post) {
            $element = $this->setupElement((array) $post, false);

            $elements->push($element);
        }

        return $elements;
    }

    /**
     * Find all global element on a page
     *
     * @param $pageId
     * @return Collection
     */
    public function allOnPage($pageId): Collection
    {
        $elements = new Collection;

        // Find page and the summary
        $summary = @json_decode(get_post_meta($pageId, '_op3_summary', true), false);

        if ($summary && isset($summary->gids) && $summary->gids) {
            // Get posts by IDs
            $posts = get_posts(['post__in' => $summary->gids, 'post_type' => $this->postType]);

            // Now push all found elements to the collection
            foreach ($posts as $post) {
                $element = $this->setupElement((array) $post);

                $elements->push($element);
            }
        }

        return $elements;
    }

    /**
     * Find global element by ID
     *
     * @param  int  $id
     * @return OPGlobalElement|null
     */
    public function find($id)
    {
        $post = get_post($id);

        return $post ? $this->setupElement((array) $post) : null;
    }

    /**
     * Create a new global element
     *
     * @param $data
     * @return OPGlobalElement
     */
    public function create($data): OPGlobalElement
    {
        $id = wp_insert_post([
            'post_title'  => array_get($data, 'title', array_get($data, 'name')),
            'post_type'   => $this->postType,
            'post_status' => 'publish',
        ]);

        // Get existing meta data
        $meta = (object) @json_decode(get_post_meta($id, $this->metaKey, true), false);

        // Then we need to process the preview images
        $previewData = array_get($data, 'preview');
        $previewUrl  = $previewData ? $this->processElementPreview($id, $previewData) : null;

        // Build up element meta data
        if (isset($data['type']))        $meta->type        = array_get($data, 'type');
        if (isset($data['title']))       $meta->title       = trim(array_get($data, 'title'));
        if (isset($data['description'])) $meta->description = trim(array_get($data, 'description'));
        if (isset($data['category_id'])) $meta->category_id = array_get($data, 'category_id');

        // Add preview
        if (! $previewUrl && isset($data['thumb'])) $meta->thumb = $data['thumb'];
        if ($previewUrl)                            $meta->thumb = $previewUrl;

        // Default thumb needed?
        if (! $meta->thumb) $meta->thumb = $this->defaultThumb;

        // Update the post meta
        $metaStr    = @json_encode($meta);
        $metaStr    = wp_slash($metaStr);
        update_post_meta($id, $this->metaKey, $metaStr);

        // Add new gid to data
        if (isset($data['data']) && is_array($data['data'])) {
            $data['data']['gid'] = (string) $id;
        } elseif (isset($data['data']) && is_object($data['data'])) {
            $data['data']->gid = (string) $id;
        }

        // And add element data
        $elementData    = @json_encode(array_get($data, 'data'));
        $elementData    = wp_slash($elementData);
        update_post_meta($id, '_op3_data', $elementData);

        // Fetch post again
        return $this->find($id);
    }

    /**
     * Update existing global element
     *
     * @param  int   $id
     * @param  array $data
     * @return OPGlobalElement
     */
    public function update($id, $data): OPGlobalElement
    {
        // Update the post
        wp_update_post([
            'ID' => $id,
            'post_title' => array_get($data, 'title', array_get($data, 'name')),
        ]);

        // Get existing meta data
        $meta = (object) @json_decode(get_post_meta($id, $this->metaKey, true), false);

        // Then we need to process the preview images
        $previewData = array_get($data, 'preview');
        $previewUrl  = $previewData ? $this->processElementPreview($id, $previewData) : null;

        // Build up element meta data
        if (isset($data['type']))        $meta->type        = array_get($data, 'type');
        if (isset($data['title']))       $meta->title       = trim(array_get($data, 'title'));
        if (isset($data['description'])) $meta->description = trim(array_get($data, 'description'));
        if (isset($data['category_id'])) $meta->category_id = array_get($data, 'category_id');

        // Add preview
        if (! $previewUrl && isset($data['thumb'])) $meta->thumb = $data['thumb'];
        if ($previewUrl)                            $meta->thumb = $previewUrl;

        // Update the post meta
        $metaStr    = @json_encode($meta);
        $metaStr    = wp_slash($metaStr);
        update_post_meta($id, $this->metaKey, $metaStr);

        // And finally add element data
        $elementData    = @json_encode(array_get($data, 'data'));
        $elementData    = wp_slash($elementData);
        update_post_meta($id, '_op3_data', $elementData);

        return $this->find($id);
    }

    /**
     * Setup new global element from passed data
     *
     * @param  array  $data
     * @param  bool   $includeData
     * @return OPGlobalElement
     */
    public function setupElement(array $data = [], $includeData = true): OPGlobalElement
    {
        $elementId = (int) array_get($data, 'ID', array_get($data, 'id'));

        // Create new element
        $element = new OPGlobalElement([
            'id'          => $elementId,
            'type'        => array_get($data, 'type'),
            'title'       => array_get($data, 'title', array_get($data, 'name')),
            'description' => trim(array_get($data, 'description')),
            'thumb'       => array_get($data, 'thumb', $this->defaultThumb),
            'category_id' => array_get($data, 'category_id'),
        ]);

        // Load meta data
        $element = $this->loadMeta($element, $includeData);

        return $element;
    }

    /**
     * Load meta data for element
     *
     * @param OPGlobalElement $element
     * @param bool            $includeData
     * @return OPGlobalElement
     */
    public function loadMeta(OPGlobalElement $element, $includeData = true): OPGlobalElement
    {
        // Fetch meta data from post meta table
        $meta = (object) @json_decode(get_post_meta($element->gid, $this->metaKey, true), false);

        // And assign it to the element
        $element->assignMeta([
            'type'        => object_get($meta, 'type'),
            'title'       => trim(object_get($meta, 'title')),
            'description' => trim(object_get($meta, 'description')),
            'category_id' => object_get($meta, 'category_id'),
            'thumb'       => object_get($meta, 'thumb', $this->defaultThumb),
        ]);

        // Also add OP3 data
        if ($includeData) {
            $element->assignMeta(['data' => (object) @json_decode((string) get_post_meta($element->gid, '_op3_data', true), false)]);
        }

        return $element;
    }

    /**
     * Add featured image to global element
     *
     * @param  string   $elementId
     * @param  string   $imageData
     * @return string
     */
    public function processElementPreview($elementId, $imageData): string
    {
        $previewUrl = '';

        if ($imageData) {
            $uploadDirectory = wp_upload_dir();
            $uploadPath      = str_replace('/', DIRECTORY_SEPARATOR, $uploadDirectory['path']) . DIRECTORY_SEPARATOR;

            // Prepare image and save it to uploads
            $decoded        = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData));
            $filename       = 'op-ge-preview-' . $elementId . '.jpg';
            $hashedFilename = $filename;
            $imageUpload    = file_put_contents($uploadPath . $hashedFilename, $decoded);

            // Now handle the upload and include required libraries
            if (! function_exists('wp_handle_sideload')) {
                require_once(ABSPATH . 'wp-admin/includes/file.php');
                require_once(ABSPATH . 'wp-admin/includes/image.php');
            }
            if(! function_exists('wp_get_current_user')) {
                require_once(ABSPATH . 'wp-includes/pluggable.php');
            }

            // Prepare file data
            $file = [
                'error'    => '',
                'tmp_name' => $uploadPath . $hashedFilename,
                'name'     => $hashedFilename,
                'type'     => 'image/png',
                'size'     => filesize($uploadPath . $hashedFilename),
            ];

            // Upload file to server
            $fileReturn = wp_handle_sideload($file, ['test_form' => false]);

            if (isset($fileReturn['file'])) {
                // And create WP post attachment
                $filename   = $fileReturn['file'];
                $previewUrl = $uploadDirectory['url'] . '/' . basename($filename);
                $attachment = [
                    'post_mime_type' => $fileReturn['type'],
                    'post_title'     => preg_replace('/\.[^.]+$/', '', basename($filename)),
                    'post_content'   => '',
                    'post_status'    => 'inherit',
                    'guid'           => $previewUrl,
                ];
                $attachmentId = wp_insert_attachment($attachment, $filename);

                // Resize the image
                if (! function_exists('wp_generate_attachment_metadata'))
                    include_once( ABSPATH . 'wp-admin/includes/image.php' );
                wp_update_attachment_metadata($attachmentId, wp_generate_attachment_metadata($attachmentId, $fileReturn['file']) );

                // And mark image as featured image
                set_post_thumbnail($elementId, $attachmentId);
            }
        }

        return $previewUrl;
    }

    /**
     * Delete existing global element
     *
     * @param $id
     * @return false|WP_Post|null
     */
    public function delete($id)
    {
        return wp_delete_post($id, true);
    }

    /**
     * Return all pages containing specific global element
     *
     * @param  int $gid
     * @return Collection
     */
    public function relatedPages($gid): Collection
    {
        $pages   = new Collection;
        $pageIds = $this->relatedPageIds($gid);

        if ($pageIds) {
            $pageObjects = get_posts(['post__in' => $pageIds, 'post_type' => 'any', 'posts_per_page' => -1, 'post_status' => ['publish', 'pending', 'draft', 'inherit']]);

            if ($pageObjects) {
                $pages = new Collection($pageObjects);
            }
        }

        return $pages;
    }

    /**
     * Return all IDs of pages that contain this global element
     *
     * @param  int $gid
     * @return array
     */
    public function relatedPageIds($gid): array
    {
        return (array) @json_decode(get_post_meta($gid, $this->metaKeyForRelatedPages, true));
    }

    /**
     * Return all pages containing specific global element
     *
     * @param  int   $pageId
     * @param  bool  $includeData
     * @return Collection
     */
    public function relatedGlobalElements($pageId, $includeData = false): Collection
    {
        $globalElements   = new Collection;
        $globalElementIds = $this->relatedGlobalElementIds($pageId);

        if ($globalElementIds) {
            $gePostObjects = get_posts(['post__in' => $globalElementIds, 'post_type' => 'any', 'posts_per_page' => -1, 'post_status' => ['publish', 'pending', 'draft', 'inherit']]);

            if ($gePostObjects) {
                foreach ($gePostObjects as $gePostObject) {
                    $globalElements->push($this->setupElement((array) $gePostObject, $includeData));
                }
            }
        }

        return $globalElements;

    }

    /**
     * Return all IDs of pages that contain this global element
     *
     * @param  int $pageId
     * @return array
     */
    public function relatedGlobalElementIds($pageId): array
    {
        return (array) @json_decode(get_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, true));
    }

    /**
     * Create a relation between a global element and a page
     *
     * @param int $gid
     * @param int $pageId
     */
    public function addRelationToPage($gid, $pageId)
    {
        // Get stored related IDs
        $relatedPageIds          = (array) @json_decode(get_post_meta($gid,    $this->metaKeyForRelatedPages,          true));
        $relatedGlobalElementIds = (array) @json_decode(get_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, true));

        // Sync the ID's
        if (! in_array($pageId, $relatedPageIds, true))          $relatedPageIds[]          = (int) $pageId;
        if (! in_array($gid, $relatedGlobalElementIds, true)) $relatedGlobalElementIds[] = (int) $gid;

        // Sort and unique the arrays
        $relatedPageIds          = array_unique(array_map('intval', $relatedPageIds));
        $relatedGlobalElementIds = array_unique(array_map('intval', $relatedGlobalElementIds));
        sort($relatedPageIds);
        sort($relatedGlobalElementIds);

        // And store back into meta storage
        update_post_meta($gid,    $this->metaKeyForRelatedPages,          @json_encode($relatedPageIds));
        update_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, @json_encode($relatedGlobalElementIds));
    }

    /**
     * Remove the relation between a page and a global element
     *
     * @param int $gid
     * @param int $pageId
     */
    public function removeRelationToPage($gid, $pageId)
    {
        // Get stored related IDs
        $relatedPageIds          = (array) @json_decode(get_post_meta($gid,    $this->metaKeyForRelatedPages,          true));
        $relatedGlobalElementIds = (array) @json_decode(get_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, true));

        // Remove the values
        if (($key = array_search($pageId, $relatedPageIds, true)) !== false) {
            unset($relatedPageIds[$key]);
        }
        if (($key = array_search($gid, $relatedGlobalElementIds, true)) !== false) {
            unset($relatedGlobalElementIds[$key]);
        }

        // Sort and unique the arrays
        $relatedPageIds          = array_unique(array_map('intval', $relatedPageIds));
        $relatedGlobalElementIds = array_unique(array_map('intval', $relatedGlobalElementIds));
        sort($relatedPageIds);
        sort($relatedGlobalElementIds);

        // And store back into meta storage
        if ($relatedPageIds) {
            update_post_meta($gid, $this->metaKeyForRelatedPages, @json_encode($relatedPageIds));
        } else {
            delete_post_meta($gid, $this->metaKeyForRelatedPages);
        }

        if ($relatedGlobalElementIds) {
            update_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, @json_encode($relatedGlobalElementIds));
        } else {
            delete_post_meta($pageId, $this->metaKeyForRelatedGlobalElements);
        }
    }

    /**
     * Remove all relations to pages for specific global element
     * Used for when a global element is deleted
     *
     * @param  int $gid
     * @return void
     */
    public function removeRelationToPagesForGlobalElement($gid)
    {
        $pageIds = (array) @json_decode(get_post_meta($gid, $this->metaKeyForRelatedPages, true));

        // Now go through all pages and remove the relation
        foreach ($pageIds as $pageId) {
            // Find all pages that have the global element
            $this->removeRelationToPage($gid, $pageId);
        }
    }

    /**
     * Remove all relations to global elements for a page
     * Used for when a page is deleted
     *
     * @param  int $pageId
     * @return void
     */
    public function removeRelationToGlobalElementsForPage($pageId)
    {
        // Find all global elements on the page
        $globalElementIds = (array) @json_decode(get_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, true));

        // Now go through all global elements and remove the relation
        foreach ($globalElementIds as $gid) {
            // Find all pages that have the global element
            $this->removeRelationToPage($gid, $pageId);
        }
    }

    /**
     * Update global element registry for a page
     * This method syncs the relations, meaning it will delete missing GID's
     *
     * @param int   $pageId
     * @param array $gids
     */
    public function updatePageRegistry($pageId, $gids)
    {
        // First let's update the page relations
        $relatedGids = $this->relatedGlobalElementIds($pageId);
        update_post_meta($pageId, $this->metaKeyForRelatedGlobalElements, @json_encode(array_map('intval', $gids)));

        // And then we update the global element relations
        foreach ($gids as $gid) {
            $this->addRelationToPage($gid, $pageId);
        }
    }
}
