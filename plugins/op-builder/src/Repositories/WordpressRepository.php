<?php

namespace OPBuilder\Repositories;

use Exception;
use OPBuilder\Editor\Page;
use WP_Post;

class WordpressRepository
{
    /**
     * Format the data
     *
     * @param  WP_Post  $page
     * @param  bool  $prerender
     * @return Page
     * @throws Exception
     */
    public function formatPage($page, $prerender = true)
    {
        $result = [
            'id'          => $page->ID,
            'title'       => $page->post_title,
            'content'     => $page->post_content,
            'status'      => $page->post_status,
            'data'        => $page->op3_data,
            'summary'     => $page->op3_summary,
            'url'         => $page->op3_url,
            'live_editor' => $page->op3_live_editor,
            'editor_url'  => $page->op3_editor_url,
            'created_at'  => $page->post_date,
            'updated_at'  => $page->post_modified,
        ];

        // Add metadata
        if ($page->meta and isset($page->meta['_op3_data'])) {
            $result['data'] = $page->meta['_op3_data'];
        }
        if ($page->meta and isset($page->meta['_op3_summary'])) {
            $result['summary'] = $page->meta['_op3_summary'];
        }
        if (isset($page->op3_summary)) {
            $result['summary'] = $page->op3_summary;
        }
        if (isset($page->op3_page_template)) {
            $result['page_template'] = $page->op3_page_template;
        }

        return new Page($result, $prerender);
    }

    /**
     * Abort a request
     *
     * @param  integer $code
     * @param  string  $message
     * @return void
     */
    public function abort($code = 500, $message = 'Server error')
    {
        status_header($code, $message);
        echo @json_encode(array('error' => true, 'code' => $code, 'message' => $message));
        die();
    }
}
