<?php

namespace OPBuilder\Http;

use Exception;
use OPBuilder\Repositories\PageRepository;
use OPBuilder\Templates\CustomerTemplates;
use OPDashboard\SL\SL;
use OPBuilder\Templates\Templates;
use function OPDashboard\sl_url;

class PagesController extends Controller
{
    /**
     * Display interface for creating new OptimizePress page
     *
     * @return void
     */
    public static function create()
    {
        // Try to fetch customer
        if (! $customer = SL::getCustomer()) {
            header('Location: ' . admin_url('admin.php?page=op-suite'));
            die();
        }

        // Fetch categories from SL
        $categories  = SL::getTemplateCategories();
        $collections = SL::getTemplateCollections();

        echo op3_view('pages/create', [
            'categories' => $categories,
            'collections' => $collections,
        ]);
    }

    /**
     * Store a new OP3 page
     *
     * @return void
     * @throws Exception
     */
    public static function store()
    {
        // Create the template
        $templateId = $_POST['template_id'];
        $categoryUid = $_POST['category_uid'];
        if ('customer-templates' === $categoryUid) {
            $pageId = CustomerTemplates::createPageFromCustomerTemplate($templateId, $_POST);
        } else {
            $pageId = Templates::createPageFromTemplate($templateId, $_POST);
        }

        // Build up URL for editor
        $editUrl = get_edit_post_link($pageId, '') . '#op-builder';

        // And redirect to editor
        wp_redirect($editUrl);
        die();
    }

    /**
     * Endpoint for exporting template to SL
     *
     * @return bool
     * @throws Exception
     */
    public static function exportTemplate()
    {
        // Fetch required data
        $pages  = new PageRepository;
        $pageId = $_POST['page_id'];
        $page   = $pages->find($pageId, false);

        // Prepare variables
        $uid   = 'opdb-' . op3_unique_id();
        $title = 'Imported template ' . $uid;
        $data   = get_post_meta($page->id, '_op3_data', true);

        // Try to import the template
        $templateUid = SL::importTemplate([
            'uid'   => $uid,
            'title' => $title,
            'data'  => $data,
        ]);

        if ($templateUid) {
            return wp_redirect(sl_url('templates/builder-import/' . $templateUid));
            die();
        }

        return wp_die('Error when importing template.');
    }

    /**
     * Endpoint for exporting template to SL
     *
     * @return bool
     * @throws Exception
     */
    public static function exportBlock()
    {
        // Fetch required data
        $pages       = new PageRepository;
        $pageId      = $_POST['page_id'];
        $elementId   = $_POST['element_id'];
        $page        = $pages->find($pageId, false);
        $elementData = $page->findElementDataById($elementId);

        // If nothing is found simply throw error message
        if (! $elementData) {
            wp_die('<strong>Section block was not found</strong>.<br><br> Please make sure you save the OptimizePress page before exporting blocks.');
        }

        // Prepare variables
        $uid   = 'opdbl-' . op3_unique_id();
        $title = 'Imported block ' . $uid;
        $data   = @json_encode($elementData);

        // Try to import the template
        $blockUid = SL::importBlock([
            'uid'   => $uid,
            'title' => $title,
            'data'  => $data,
        ]);

        if ($blockUid) {
            return wp_redirect(sl_url('blocks/builder-import/' . $blockUid));
            die();
        }

        return wp_die('Error when importing template.');
    }

    /**
     * Redirect to Global Elements management page
     */
    public static function globalElements()
    {
        $url = admin_url('edit.php?post_type=op_global_element');
        echo '<script>document.location = "' . $url . '"</script>';
        die();
    }
}
