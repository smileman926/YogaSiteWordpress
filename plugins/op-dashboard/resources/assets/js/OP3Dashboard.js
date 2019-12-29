import OPDIntegrations from "./Pages/Integrations";
import OPDSettings from "./Pages/Settings";

class OP3Dashboard {
    constructor() {
        this.integrations = new OPDIntegrations();
        this.settings = new OPDSettings();

        // All links leading to docs.optimizepress.com are opened in a new tab
        jQuery(function($) {
            $("a[href*='docs.optimizepress.com']").attr('target', '_blank');
        });
    }
}

export default OP3Dashboard;
