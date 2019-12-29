<?php

namespace OPBuilder\Editor;

use Exception;
use OPBuilder\Repositories\PageRepository;
use OptimizePress\Support\Collection;
use stdClass;

class MembershipPages
{
    /**
     * Flag for preventing multiple menu syncs
     *
     * @var bool
     */
    public static $synced = false;

    /**
     * Syncing Pages changes with the OP Membership Content List is handled here
     * We also need to sync the styling so this could get expensive
     *
     * @param  Page  $page
     * @return Collection
     * @throws Exception
     */
    public static function sync(Page $page)
    {
        $shouldISync = true;
        // We need the page repository
        $pages = new PageRepository;

        // Let's get all Membership Content Lists on the actual page
        $pageContentLists = $page->findElementsByType('membershipcontentlist');

        // if we already synced, bail
        if (self::$synced) {
            return $pageContentLists;
        }

        // Loop through the Content List elements
        if ($pageContentLists && count($pageContentLists)) {
            foreach ($pageContentLists as &$pageContentList) {
                $shouldISync = true;
                // let's get Content list element options and query the db for
                // proper page structure and order
                $params = [
                    'pageId'        => $page->id,
                    'showChildren'  => op3_element_option_value($pageContentList, 'membershipShowPageChildren'),
                    'sort'          => op3_element_option_value($pageContentList, 'membershipSort'),
                    'product'       => op3_element_option_value($pageContentList, 'membershipProduct'),
                    'category'      => op3_element_option_value($pageContentList, 'membershipCategory')
                ];

                $childrenPages = self::pageSearch($params, true);
                $childrenItems = $pageContentList->children;

                if (! self::shouldWeSync($childrenPages, $childrenItems, $page)) {
                    $shouldISync = false;
                    continue;
                }
                // emptying the children
                $pageContentList->children = [];

                $index = 0;

                foreach ($childrenPages as $WPPage) {
                    // Build up a content list item from the WP menu
                    $membershipContentListItem = self::buildContentListItemElementFromWPPage($page, $WPPage, $childrenItems, $index);

                    // And push the content list item to the OP page menu element
                    $pageContentList->children[] = $membershipContentListItem;
                    $index++;
                }
            }

            // Fetch updated data
            $pageData = $page->getData();

            if ($shouldISync) {
                // And write updated data to DB
                if (isset($pageData['data']) && $pageData['data']) {
                    $pages->updateData($page->id, $pageData['data']);
                    $pages->updateSummary($page->id, $pageData['data']);

                    // Invalidate page cache
                    delete_post_meta($page->id, '_op3_cache');
                    delete_post_meta($page->id, '_op3_cache_timestamp');

                    // We also need to update the modified date
                    wp_update_post(['ID' => $page->id]);
                }

                // Mark synced
                self::$synced = true;
            }

        }

        return $pageContentLists;
    }

    /**
     * Sync Membership Pages if needed
     *
     * @param  Page  $page
     * @param  bool  $force
     * @return bool|Collection
     * @throws Exception
     */
    public static function syncIfUpdated(Page $page, $force = false)
    {
        return self::sync($page);
    }

    /**
     * Builds up a OP Membership Content List element
     *
     * @param Page $page Current Page
     * @param $WPPage - Post from which we are building an element
     * @param array $pageContentListItems Flattened list items
     * @return object
     */
    public static function buildContentListItemElementFromWPPage(Page $page, $WPPage, $pageContentListItems = [], $index = 0)
    {
        // Find UUIDs to exclude so we don't get duplicates
        $exclude = isset($page->summary->uuids) ? $page->summary->uuids : [];

        // Generate a fresh element UUID
        $uuid = op3_element_uuid($exclude);

        if (isset($pageContentListItems[$index])) {
            $contentListItem = $pageContentListItems[$index];
        } else {
            // we have deleted all children before, but now have children
            // let's build an empty element object, so we can iterate it below
            // and set proper options
            $contentListItem = self::generateEmptyMembershipContentListItem($exclude);
        }

        // We need to check if we have any options/styling for this element
        // Get content list item options from old data
        $contentListItemOptions = $contentListItem->options->all;

        // get data
        if ($thumb = get_the_post_thumbnail_url($WPPage->ID)) {
            $image = $thumb;
        } else {
            $image = op3_asset('img/img-placeholder.png');
        }
        $permalink = get_permalink($WPPage->ID);
        $title = $WPPage->post_title;
        $description = op3_get_page_description($WPPage->ID) ? op3_get_page_description($WPPage->ID) : '<p>&nbsp;</p>';

        $contentListItemOptions->hrefFull = (object) [' a' => 'href="' . $permalink . '"'];
        $contentListItemOptions->href = (object) [' a' => $permalink];

        $children = [];

        $contentListItemChildren = $contentListItem->children;

        foreach ($contentListItemChildren as $child) {
            // Build up default options
            $options = (object) [];
            $oldOptions = $child->options->all;
            switch ($child->type) {
                case 'image':
                    $oldOptions->hrefFull = (object) [' a' => 'href=""'];
                    $options->src = (object) [' img' => $image];
                    $options->alt = (object) [' img' => $title];
                break;
                case 'headline':
                    $options->html = (object) [' [data-op3-contenteditable]' => '<h2>' . $title . '</h2>'];
                    break;
                case 'text':
                    $options->html = (object) [' [data-op3-contenteditable]' => '<p>' . $description . '</p>'];
                    break;
            }

            $options = (object) array_merge((array) $oldOptions, (array) $options);

            // And build up a fresh membership content list item element
            $children[] = (object) [
                'uuid'  => $child->uuid,
                'type'  => $child->type,
                'style' => '',
                'options' => (object) [
                    'all'                            => $options,
                    'screen and (max-width: 1023px)' => (object) [],
                    'screen and (max-width: 767px)'  => (object) [],
                ],
                'children' => [],
            ];
        }

        // And build up a fresh membership content list item element
        $listItem = (object) [
            'uuid'  => $uuid,
            'type'  => 'membershipcontentlistitem',
            'style' => '',
            'options' => (object) [
                'all'                            => $contentListItemOptions,
                'screen and (max-width: 1023px)' => (object) [],
                'screen and (max-width: 767px)'  => (object) [],
            ],
            'children' => $children,
        ];

        return $listItem;
    }

    /**
     * @param $exclude
     * @return stdClass
     */
    public static function generateEmptyMembershipContentListItem($exclude)
    {
        $uuid = op3_element_uuid($exclude);

        // Membership Content List Item
        $contentListItem        = new StdClass;
        $contentListItem->uuid  = $uuid;
        $contentListItem->type  = 'membershipcontentlistitem';
        $contentListItem->style = '';

        $contentListItem->options = new StdClass;
        $contentListItem->options->all = new StdClass;
        $contentListItem->options->{'screen and (max-width: 1023px)'} = new StdClass;
        $contentListItem->options->{'screen and (max-width: 767px)'} = new StdClass;

        $uuid = op3_element_uuid($exclude);

        $contentListItem->children = [];

        // Membership Content List Item - Image
        $contentListItem->children[0] = new StdClass;
        $contentListItem->children[0]->uuid = $uuid;
        $contentListItem->children[0]->type = 'image';
        $contentListItem->children[0]->style = 'style';
        $contentListItem->children[0]->options = new StdClass;
        $contentListItem->children[0]->options->all = new StdClass;
        $contentListItem->children[0]->options->all->src = new StdClass;
        $contentListItem->children[0]->options->all->title = new StdClass;
        $contentListItem->children[0]->options->all->alt = new StdClass;
        $contentListItem->children[0]->options->all->attrWidth = new StdClass;
        $contentListItem->children[0]->options->all->attrHeight = new StdClass;
        $contentListItem->children[0]->options->all->action = new StdClass;
        $contentListItem->children[0]->options->all->action->{' a'} = 'link';
        $contentListItem->children[0]->options->all->target = new StdClass;
        $contentListItem->children[0]->options->all->target->{' a'} = '_self';
        $contentListItem->children[0]->options->all->target->{' a'} = '_self';
        $contentListItem->children[0]->options->all->relNoFollowFull = new StdClass;
        $contentListItem->children[0]->options->all->relNoFollowFull->{' figure > a'} = '';
        $contentListItem->children[0]->options->all->popOverlayTrigger = new StdClass;
        $contentListItem->children[0]->options->all->popOverlayTrigger->{' a'} = 'none';
        $contentListItem->children[0]->options->all->selectFunnelStep = new StdClass;
        $contentListItem->children[0]->options->all->class = '';
        $contentListItem->children[0]->options->all->codeBeforeElement = '';
        $contentListItem->children[0]->options->all->codeAfterElement = '';
        $contentListItem->children[0]->options->all->href = new StdClass;
        $contentListItem->children[0]->options->{'screen and (max-width: 1023px)'} = new StdClass;
        $contentListItem->children[0]->options->{'screen and (max-width: 767px)'} = new StdClass;
        $contentListItem->children[0]->options->children = new StdClass;

        $uuid = op3_element_uuid($exclude);

        // Membership Content List Item - Headline
        $contentListItem->children[1] = new StdClass;
        $contentListItem->children[1]->uuid = $uuid;
        $contentListItem->children[1]->type = 'headline';
        $contentListItem->children[1]->style = 'style';
        $contentListItem->children[1]->options = new StdClass;
        $contentListItem->children[1]->options->all = new StdClass;
        $contentListItem->children[1]->options->all->html = new StdClass;
        $contentListItem->children[1]->options->all->class = '';
        $contentListItem->children[1]->options->all->codeBeforeElement = '';
        $contentListItem->children[1]->options->all->codeAfterElement = '';
        $contentListItem->children[1]->options->{'screen and (max-width: 1023px)'} = new StdClass;
        $contentListItem->children[1]->options->{'screen and (max-width: 767px)'} = new StdClass;
        $contentListItem->children[1]->options->children = new StdClass;

        $uuid = op3_element_uuid($exclude);

        // Membership Content List Item - Text
        $contentListItem->children[2] = new StdClass;
        $contentListItem->children[2]->uuid = $uuid;
        $contentListItem->children[2]->type = 'text';
        $contentListItem->children[2]->style = 'style';
        $contentListItem->children[2]->options = new StdClass;
        $contentListItem->children[2]->options->all = new StdClass;
        $contentListItem->children[2]->options->all->html = new StdClass;
        $contentListItem->children[2]->options->all->class = '';
        $contentListItem->children[2]->options->all->codeBeforeElement = '';
        $contentListItem->children[2]->options->all->codeAfterElement = '';
        $contentListItem->children[2]->options->{'screen and (max-width: 2023px)'} = new StdClass;
        $contentListItem->children[2]->options->{'screen and (max-width: 767px)'} = new StdClass;
        $contentListItem->children[2]->options->children = new StdClass;

        return $contentListItem;
    }

    /**
     * Check if we should sync the element
     *
     * @param $WpPages
     * @param $children
     * @param Page $page
     * @return bool
     */
    public static function shouldWeSync($WpPages, $children, Page $page)
    {
        // if number of children changed, we should sync
        if (count($WpPages) != count($children)) {
            return true;
        } else {
            // current page timestamp is taken and
            // compared to a newest timestamp of children pages
            // if current page timestamp is bigger, we should sync
            global $post;
            $pageTimestamp = strtotime($post->post_modified);

            // ordering children pages by post_modified_gmt desc
            usort($WpPages, function($a, $b) {return strcmp($b->post_modified, $a->post_modified);});

            // getting the newest page and if it exists, we will compare the timestamps
            if (isset($WpPages[0])) {
                $childTimestamp = strtotime($WpPages[0]->post_modified);
                if ($childTimestamp > $pageTimestamp) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
 * Build up data for initial release
 *
 * @param string $pageId
 * @return array
 */
    public static function directPageChildren($pageId = '')
    {
        $result = [];

        $args = [
            'post_parent' => $pageId,
            'posts_per_page' => '-1',
            'post_type' => 'page',
            'orderby' => 'title',
            'order'   => 'ASC',
        ];

        $query = new \WP_Query($args);

        if ($query->have_posts()) {
            foreach ($query->posts as $post) {
                if ($thumb = get_the_post_thumbnail_url($post->ID)) {
                    $image = $thumb;
                } else {
                    $image = op3_asset('img/img-placeholder.png');
                }
                $result[] = [
                    'id'    => $post->ID,
                    'title' => $post->post_title,
                    'description' => op3_get_page_description($post->ID) ? op3_get_page_description($post->ID) : '<p>&nbsp;</p>',
                    'image' => $image,
                    'href' => get_permalink($post)
                ];
            }
        }

        return $result;
    }

    /**
     * Get pages by params
     *
     * @param $params
     * @param bool $returnPosts
     * @return array
     */
    public static function pageSearch($params, $returnPosts = false)
    {
        $tempSort = explode(':', $params['sort']);
        $orderBy = $tempSort[0];
        $order = $tempSort[1];

        $result = [];

        // this overrides other options like products and categories
        if (! empty($params['showChildren'])) {
            $args = [
                'post_parent' => $params['pageId'],
                'posts_per_page' => '-1',
                'post_type' => 'page',
                'orderby' => $orderBy,
                'order'   => $order,
            ];
        } else {
            if (! empty($params['category'])) {
                $postParent = $params['category'];
            } else {
                $postParent= $params['product'];
            }

            if (empty($postParent)) {
                return $result;
            }

            $args = [
                'post_parent' => $postParent,
                'posts_per_page' => '-1',
                'post_type' => 'page',
                'orderby' => $orderBy,
                'order'   => $order,
            ];
        }

        $query = new \WP_Query($args);

        if ($returnPosts)
            return $query->posts;

        if ($query->have_posts()) {
            foreach ($query->posts as $post) {
                if ($thumb = get_the_post_thumbnail_url($post->ID)) {
                    $image = $thumb;
                } else {
                    $image = op3_asset('img/img-placeholder.png');
                }
                $result[] = [
                    'id'    => $post->ID,
                    'title' => $post->post_title,
                    'description' => op3_get_page_description($post->ID) ? op3_get_page_description($post->ID) : '<p>&nbsp;</p>',
                    'image' => $image,
                    'href' => get_permalink($post)
                ];
            }
        }

        return $result;
    }

    /**
     * Get the date when the menu was last updated
     *
     * @param  string $menuId
     * @return string|bool
     */
    public static function getUpdatedAt($menuId = null)
    {
        if ($menuId) {
            return get_transient(self::updateTransientKey($menuId)) ?: false;
        }

        return get_transient(self::updateTransientKey()) ?: false;
    }

    /**
     * Generate key for transient option
     *
     * @param  string $pageId
     * @return string
     */
    protected static function updateTransientKey($pageId = null)
    {
        if ($pageId) {
            return 'op__opb_page__' . $pageId . '__updated_at';
        }

        return 'op__opb_all_pages__updated_at';
    }
}
