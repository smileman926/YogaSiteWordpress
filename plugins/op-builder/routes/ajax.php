<?php

$templatesController    = new OPBuilder\Http\TemplatesController;

// Load sub pages only if api is connected!
if (\OPDashboard\SL\SL::isConnected()) {

    // List of templates in category/collection
    add_action('wp_ajax_opb_templates', function() use ($templatesController) { $templatesController->index(); });

}
