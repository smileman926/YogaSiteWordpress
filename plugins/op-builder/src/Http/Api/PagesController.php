<?php

namespace OPBuilder\Http\Api;

use Exception;
use OPBuilder\Repositories\GlobalElementRepository;
use OPBuilder\Repositories\PageRepository;
use WP_REST_Request;
use WP_REST_Response;

class PagesController extends Controller
{
    /**
     * Return all WP posts by post_type.
     * By default it will return all posts with post_type = page.
     *
     * @param  WP_REST_Request $request
     * @return array
     */
    public static function index(WP_REST_Request $request)
    {
        $pages   = new PageRepository;
        $keyword = $request->get_param('query');

        return $pages->search($keyword);
    }

    /**
     * Return data for a OP page
     *
     * @param  WP_REST_Request $request
     * @return array
     */
    public static function show(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Get the page
        $page = $pages->findOrFail((int) $request->get_param('id'));

        return $page->toArray();
    }

    /**
     * Update existing page
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     * @throws Exception
     */
    public static function update(WP_REST_Request $request)
    {
        return self::updateData($request);
    }

    /**
     * Update page template
     *
     * @param WP_REST_Request $request
     * @return array
     */
    public static function updateTemplate(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Find the page
        $page = $pages->findOrFail((int) $request->get_param('id'));

        // Then update the data
        $pages->updateTemplate($page->id, $request->get_param('template'));

        // Create default data for page if needed
        $pages->createDefaultData($page->id);

        // Re-fetch the page
        $page = $pages->findOrFail((int) $request->get_param('id'));

        return ['success' => true, 'page' => $page->id, 'summary' => $page->summary];
    }

    /**
     * Autosave some page data
     *
     * @param  WP_REST_Request  $request
     * @return array
     */
    public static function autosave(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Find the page
        $page = $pages->findOrFail((int) $request->get_param('id'));

        // Then update the data
        if ($template = $request->get_param('template')) {
            $pages->updateTemplate($page->id, $template);
        }
        if ($title = $request->get_param('title')) {
            $pages->updateTitle($page->id, $title);
        }

        // Create default data for page if needed
        $pages->createDefaultData($page->id);

        // Re-fetch the page
        $page = $pages->findOrFail((int) $request->get_param('id'));

        return ['success' => true, 'page' => $page->id, 'summary' => $page->summary];
    }

    /**
     * List of all global elements on current page
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function globalElements(WP_REST_Request $request): WP_REST_Response
    {
        // Find the page
        $pageId = (int) $request->get_param('id');
        $page   = get_post($pageId);

        if (! $page) {
            return static::apiErrorResponse('Page not found.', 404);
        }

        // Now find all elements on existing page
        $repository = new GlobalElementRepository;
        $elements   = $repository->allOnPage($pageId);

        return static::apiResponse($elements->toArray());
    }

    /**
     * Update OP edit mode for page
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function updateOPMode(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Find the page
        $page = $pages->findOrFail((int) $request->get_param('id'), false);

        // Then update the data
        $pages->setPageEditorMode($page->id, $request->get_param('mode'));

        // Create default data for page if needed
        $pages->createDefaultData($page->id);

        // Re-fetch the page
        $page = $pages->findOrFail((int) $request->get_param('id'), false);

        return static::apiResponse([
            'success' => true,
            'summary' => $page->summary,
            'params'  => $request->get_params(),
        ]);
    }

    /**
     * Update element data for a page
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     * @throws Exception
     */
    public static function updateData(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Find the page
        $page = $pages->findOrFail((int) $request->get_param('id'));
        $data = $request->get_body();

        // Save revision
        $revisions = $pages->createRevision($page->id);

        // Then update the data
        $pages->updateData($page->id, @json_decode($data));
        $pages->updateSummary($page->id, @json_decode($data, true));
        $pages->updatePostContent($page->id);
        $pages->updateElementStorage($page->id);

        return static::apiResponse([
            'success'   => true,
            'revisions' => $revisions,
        ]);
    }

    /**
     * Fetch unified page data with that's needed to initialize a builder page
     *
     * @param  WP_REST_Request  $request
     * @return array|WP_REST_Response
     * @throws Exception
     */
    public static function pageData(WP_REST_Request $request)
    {
        // Fetch data repository
        $pages = new PageRepository;

        // Find and refresh the page if needed
        $pageId = $request->get_param('id');
        $page = $pages->find($pageId, false);
        $page->refreshData();

        // And build up response data
        $pageData = $pages->buildPageData($page);

        return static::apiResponse($pageData);
    }

    /**
     * Endpoint for changing page status
     * (draft|publish)
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function updatePageStatus(WP_REST_Request $request)
    {
        $query = wp_update_post([
            'ID'          => $request->get_param('id'),
            'post_status' => $request->get_param('post_status')
        ]);

        if ($query) {
            return static::apiResponse(['updated' => true]);
        }

        return static::apiResponse(['updated' => false]);
    }

    /**
     * Return list of page revisions
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function revisions(WP_REST_Request $request)
    {
        $pages = new PageRepository;
        $revisions = [];

        // Get the page and revision ID's
        $page = $pages->findOrFail((int) $request->get_param('id'), false);
        $revisionIds = $pages->getPageRevisions($page->id);

        // Build up the response
        foreach ($revisionIds as $revisionId) {
            $date = date_create_from_format('YmdHis', $revisionId);
            $revisions[] = [
                'id' => $revisionId,
                'human_time' => $date->format('jS M \a\t H:i')
            ];
        }

        return static::apiResponse($revisions, 200);
    }

    /**
     * Restore a revision by revision and page id
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     * @throws Exception
     */
    public static function restoreRevision(WP_REST_Request $request)
    {
        $pages = new PageRepository;

        // Find the page
        $page     = $pages->findOrFail((int) $request->get_param('id'));
        $revisionId     = $request->get_param('revisionId');

        // we are getting the data and summary from clicked revision
        $data = get_post_meta($page->id, '_op3_data_' . $revisionId, true);
        $summary = get_post_meta($page->id, '_op3_summary_' . $revisionId, true);

        // Save revision
        $revisions = $pages->createRevision($page->id);

        // Then update the data
        $pages->updateData($page->id, json_decode($data));
        $pages->updateSummary($page->id, json_decode($summary, true));
        $pages->updatePostContent($page->id);
        $pages->updateElementStorage($page->id);

        return static::apiResponse([
            'success'   => true,
            'revisions' => $revisions,
        ]);
    }
}
