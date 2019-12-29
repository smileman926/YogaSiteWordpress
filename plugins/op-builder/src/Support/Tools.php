<?php

namespace OPBuilder\Support;

use OPBuilder\Repositories\PageRepository;
use function OPDashboard\is_post_type_enabled;

class Tools
{
    /**
     * Check if page is in OP editor mode
     *
     * @param $pageId
     * @return bool
     */
    public static function isOPPage($pageId)
    {
        $opMode = (bool) get_post_meta($pageId, '_op3_mode', true);

        return $opMode;
    }

    /**
     * Check if page is a OP2 page
     *
     * @param $pageId
     * @return bool
     */
    public static function isOP2Page($pageId)
    {
        // Run this when OP2 is enabled
        if (function_exists('is_le_page') and is_le_page($pageId)) {
            return true;
        }

        // When plugin is not active simply check the post meta
        if (get_post_meta($pageId, '_optimizepress_pagebuilder', true) === 'Y') {
            return true;
        }

        return false;
    }

    /**
     * Return URL for editing page in OP editor
     *
     * @param  int $id
     * @return string
     */
    public static function editOPPageUrl($id)
    {
        return get_edit_post_link($id)."#op-builder";
    }

    /**
     * Check if a user can edit a page
     *
     * @param  $userId
     * @param  $pageId
     * @return bool
     */
    public static function userCanEditPage($userId, $pageId)
    {
        // Get page/post ID
        $pageId = $pageId ?: get_the_ID();

        // Trashed pages can't be edited in OP
        if (get_post_status($pageId) == 'trash') {
            return false;
        }

        // Check permissions for post type
        $postType = get_post_type_object(get_post_type($pageId));

        // Needs to have a valid post type
        if (! $postType) {
            return false;
        }

        // Check permissions for editing
        if ( ! isset($postType->cap->edit_post)) {
            return false;
        }

        // Now check if user has permission
        $editPermission = $postType->cap->edit_post;
        if ( ! user_can($userId, $editPermission, $pageId)) {
            return false;
        }

        return true;
    }

    /**
     * Duplicate exiting OP3 page
     *
     * @param  int   $pageId
     * @param  array $data
     * @return mixed
     */
    public static function duplicatePage($pageId, $data = [])
    {
        $repository = new PageRepository;

        return $repository->duplicatePage($pageId, $data);
    }

    /**
     * Check if current user can edit a page
     *
     * @param  $pageId
     * @return bool
     */
    public static function currentUserCanEditPage($pageId)
    {
        return self::userCanEditPage(get_current_user_id(), $pageId);
    }

    /**
     * Check if post type can be edited with OP
     *
     * @param  string $postType
     * @return bool
     */
    public static function isPostTypeEnabled($postType)
    {
        if (function_exists('\OPDashboard\is_post_type_enabled')) {
            return \OPDashboard\is_post_type_enabled($postType);
        }

        return true;
    }
}
