<?php

namespace OPBuilder\Editor;

use OPBuilder\Repositories\PageRepository;

/**
 * Handle the live editor
 */
class Renderer
{
    /**
     * Repository for handling page data
     *
     * @var PageRepository
     */
    protected $pages;

    /**
     * Find current page ID and render the page
     *
     * @param  string $revision
     * @return string
     */
    public function renderCurrentPage($revision = null)
    {
        wp_reset_query();

        // Find the current page ID
        $pageId = get_the_ID();

        // Then render the page
        return $this->renderPage($pageId, $revision);
    }

    /**
     * Render the page
     *
     * @param  int $id
     * @param string $revision
     * @return string
     */
    public function renderPage($id, $revision = null)
    {
        // Do not render shortcodes in Live Editor
        if (op3_is_admin()) {
            remove_all_shortcodes();
        }

        // Create the page object
        $page = $this->findPage($id, true, $revision);

        // Refresh page data if needed
        $page->refreshData($revision);
        $page->updateFromData();

        if ($page) {
            return $page->render();
        }
    }

    /**
     * Enqueue all page assets
     *
     * @param  int $id
     * @return void
     */
    public function enqueuePageAssets($id)
    {
        // Create the page object
        $page = $this->findPage($id, true);

        if ($page) {
            $page->enqueueAssets();
        }
    }

    /**
     * Find the page
     *
     * @param  int  $id
     * @param  bool  $prerender
     * @param  string  $revision
     * @return Page
     * @throws \Exception
     */
    public function findPage($id, $prerender = true, $revision = null)
    {
        if ($prerender) {
            return $this->repository()->findAndPrerender($id, $revision);
        }

        return $this->repository()->find($id, false, $revision);
    }

    /**
     * Build up repository object
     *
     * @return PageRepository
     */
    public function repository()
    {
        if (! $this->pages) {
            $this->pages = new PageRepository;
        }

        return $this->pages;
    }
}
