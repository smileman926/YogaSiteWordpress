<?php

namespace OPBuilder\Http\Api;

use OPBuilder\Repositories\PageRepository;
use function OPDashboard\clear_all_cache;
use OPDashboard\SL\SL;
use function OPDashboard\sl_url;
use WP_REST_Request;

class ExportController extends Controller
{

    /**
     * Export SL proxy
     *
     * @param WP_REST_Request $request
     * @return \WP_REST_Response
     * @throws \Exception
     */
    public static function submit(WP_REST_Request $request)
    {
        // Data in request looks something like this:
        // {
        //      "page_id": 100,
        //      "element_id": null,
        //      "title": "Landing Page",
        //      "description": "This is Landing Page",
        //      "preview": "data:image/png;base64,iVBORw0KGgo...Jggg==",
        // }
        // or
        // {
        //      "page_id": 101,
        //      "element_id": "xA0s8a66",
        //      "title": "Fancy Testimonial",
        //      "description": "This is Fancy Testimonial"
        //      "preview": null,
        // }
        //
        // Now, who am I... ??? Am I admin or common user.
        // Admin exports data as template/block and common
        // user exports data to it's cloud (backend knows
        // who the user is). Data (json) is taken from DB
        // (by page_id and element_id) and send to SL
        // (along with title, description and preview).
        // Admins are redirect to SL so complete the
        // export, while common user receives the
        // success message...
        // @todo

        $elementId = $request->get_param('element_id');

        // Prepare request data
        $requestData = [
            'exportType'    => empty($elementId) ? 'template' : 'block',
            'pageId'        => $request->get_param('page_id'),
            'elementId'     => $elementId,
            'title'         => $request->get_param('title'),
            'description'   => $request->get_param('description'),
            'preview'       => $request->get_param('preview'),
            'template'      => 'blank'
        ];

        // Find the page
        $pages = new PageRepository;
        $page  = $pages->find($requestData['pageId'], false);

        if ($requestData['exportType'] === 'template') {
            $requestData['uid']     = 'opdb-' . op3_unique_id();
            $elementData            = @json_decode(get_post_meta($page->id, '_op3_data', true));
        } else {
            $requestData['uid']     = 'opdbl-' . op3_unique_id();
            $requestData['style']   = $request->get_param('style') ?: 'light';
            $elementData            = $page->findElementDataById($requestData['elementId']);
        }

        // Process data for exporting the template
        $elementData->children = $page->processElementsForExport($elementData->children);

        // Add template data to request data
        $requestData['data'] = @json_encode($elementData);

        // Run the import to SL
        $result = SL::import($requestData);

        clear_all_cache();

        // Response should look something like this
        // {
        //      "message": "Yes, you did it! Element is imported!",
        // }
        // or
        // {
        //      "redirect": "https://hub.optimizepress.com/templates/builder-import/opdb-op5d64fdaa11a5a3-51045296",
        //      "target": "_blank",
        //      "timeout": 5000,
        //      "message": "Redirecting in 5 seconds...",
        // }
        return static::apiResponse($result);
    }
}
