<header id="header" class="op3-header">
    <nav class="header-nav">
        <span class="nav-group op3-tabs" data-tab-content="sidebar-tabs">
            <button class="tab-button header-btn" data-tab="elements" data-unfocus="true">
                <span class="op3-icon op3-icon-circle-add-1"></span>
                <span class="op3-header-text">Elements</span>
            </button>
            <button class="tab-button header-btn" data-tab="global-elements" data-unfocus="true">
                <span class="op3-icon op3-icon-globe-1"></span>
                <span class="op3-header-text">Globals</span>
            </button>
            <button class="tab-button header-btn" data-tab="blocks" data-unfocus="true">
                <span class="op3-icon op3-icon-playlist-1"></span>
                <span class="op3-header-text">Sections</span>
            </button>
            <button class="tab-button header-btn" data-tab="settings" data-unfocus="true">
                <span class="op3-icon op3-icon-settings-gear-63-1"></span>
                <span class="op3-header-text">Settings</span>
            </button>
            <!-- <button class="tab-button header-btn" data-tab="favourites" data-unfocus="true">
                <span class="op3-icon op3-icon-bookmark-add-2-1"></span>
                <span class="op3-header-text">Favourites</span>
            </button> -->
            <div class="tab-button header-btn popoverlay">
                <span class="op3-icon op3-icon-select-1"></span>
                <span class="op3-header-text">Pop Overlay</span>
                <ul class="popoverlay-menu">
                    <ul class="popoverlay-menu-list">
                        <li class="popoverlay-menu-item">
                            <button class="popoverlay-create-new">Create New Overlay</button>
                        </li>
                    </ul>
                </ul>
            </div>
        </span>

        <span class="group op3-breadcrumbs"></span>

        <span class="nav-group nav-group--options">
            <a class="header-btn undo disabled" href="#" title="Undo" style="display: none;">
                <span class="op3-icon op3-icon-undo-29-2"></span>
                <span class="visually-hidden">Undo</span>
            </a>
            <a class="header-btn redo disabled" href="#" title="Redo" style="display: none;">
                <span class="op3-icon op3-icon-undo-29-2 op3-icon-flip-y"></span>
                <span class="visually-hidden">Redo</span>
            </a>

            <div class="header-btn header-btn--devices" title="Device Preview">
                <span class="op3-icon op3-icon-tablet-mobile-1"></span>
                <span class="visually-hidden">Device Preview</span>
                <ul class="devices-menu" id="op3-devices-menu">
                    <li>
                        <a class="op3-device op3-device-desktop" onclick="return !!OP3.LiveEditor.device('desktop')" href="#device_preview_desktop">
                            Desktop <small>Default Preview</small>
                        </a>
                    </li>
                    <li>
                        <a class="op3-device op3-device-tablet" onclick="return !!OP3.LiveEditor.device('tablet')" href="#device_preview_tablet">
                            Tablet <small>Preview for 768px</small>
                        </a>
                    </li>
                    <li>
                        <a class="op3-device op3-device-mobile" onclick="return !!OP3.LiveEditor.device('mobile')" href="#device_preview_mobile">
                            Mobile <small>Preview for 360px</small>
                        </a>
                    </li>
                </ul>
            </div>

            <a class="header-btn" href="<?php echo op3_get_preview_url($_GET['id']); ?>" target="_blank" title="Preview Page">
                <span class="op3-icon op3-icon-parking-sensors-1"></span>
                <span class="visually-hidden">Preview Page</span>
            </a>

            <a class="header-btn" href="https://docs.optimizepress.com/" target="_blank" title="Help">
                <span class="op3-icon op3-icon-support-17-2"></span>
                <span class="visually-hidden">Help</span>
            </a>

            <button class="header-btn global-element-cancel" title="Discard Changes">
                <span class="op3-icon op3-icon-log-out-2-1"></span>
                <span class="visually-hidden">Discard Changes</span>
            </button>

            <a class="header-btn global-element-save" data-op3-button-status="default">
                <div data-op3-button-status-area="default">
                    <span>Apply</span>
                </div>
                <div data-op3-button-status-area="pending">
                    <i class="op3-icon op3-icon-refresh-02-1"></i>
                    <span>Applying</span>
                </div>
                <div data-op3-button-status-area="success">
                    <i class="op3-icon op3-icon-check-2-2"></i>
                    <span>Applied</span>
                </div>
                <div data-op3-button-status-area="error">
                    <i class="op3-icon op3-icon-alert-circle-exc-2"></i>
                    <span>Error</span>
                </div>
            </a>

            <button class="header-btn close" title="Close LiveEditor" onclick="return !!OP3.LiveEditor.close()">
                <span class="op3-icon op3-icon-log-out-2-1"></span>
                <span class="visually-hidden">Close LiveEditor</span>
            </button>

            <a class="header-btn save" data-op3-button-status="default">
                <div data-op3-button-status-area="default">
                    <span>Save</span>
                </div>
                <div data-op3-button-status-area="pending">
                    <i class="op3-icon op3-icon-refresh-02-1"></i>
                    <span>Saving</span>
                </div>
                <div data-op3-button-status-area="success">
                    <i class="op3-icon op3-icon-check-2-2"></i>
                    <span>Saved</span>
                </div>
                <div data-op3-button-status-area="error">
                    <i class="op3-icon op3-icon-alert-circle-exc-2"></i>
                    <span>Error</span>
                </div>
                <div data-op3-button-progress-area></div>
            </a>
        </span>
    </nav>
</header>
