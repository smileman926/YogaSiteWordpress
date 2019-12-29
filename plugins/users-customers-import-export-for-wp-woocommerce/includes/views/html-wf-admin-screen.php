<div class="woocommerce">
    <div class="icon32" id="icon-woocommerce-importer"><br></div>
    <?php
    include_once('html-wf-common-header.php');
    switch ($tab) {
        case "export" :
            $this->admin_export_page();
            include_once("market.php");
            break;
        case "help" :
            $this->admin_help_page();
            break;
        default :
            $this->admin_export_page();
            break;
    }
    ?>
    
</div>