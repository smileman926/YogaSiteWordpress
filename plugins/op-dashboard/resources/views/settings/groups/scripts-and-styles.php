<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">
    <h3><?php _e('Enable Scripts And Styles', 'opdash'); ?></h3>
    <p style="margin-bottom: 35px;">By default all external plugins/theme scripts and styles are disabled on OP3 Blank Template. <br>Settings here will also affect any page created with templates in our template library.</p>
    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="scripts-and-styles">
        <input type="hidden" name="action" value="opd_update_settings">

        <div class="container">
            <div class="column">
                <div class="disable-scripts-styles">
                    <table class="plugins">
                        <thead>
                            <tr>
                                <th>Plugin</th>
                                <th>Type</th>
                                <th class="enable-js" data-type="js">Js</th>
                                <th class="enable-css" data-type="css">Css</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $plugins = get_plugins();

                                foreach ($plugins as $pluginFilePath => $plugin) {
                                    // Skip disabled plugins
                                    if (!is_plugin_active($pluginFilePath))
                                        continue;

                                    // Skip optimizepress3 and opdashboard plugins
                                    if (strpos($pluginFilePath, 'op-builder') !== false ||
                                        strpos($pluginFilePath, 'op-dashboard') !== false)
                                        continue;

                                    $temp = explode('/', $pluginFilePath);
                                    $temp = explode('.', $temp[0]);
                                    $pluginDirName = $temp[0];
                                    ?>
                                    <tr>
                                        <th>
                                            <label for=""><?php echo $plugin['Name']; ?></label>
                                        </th>
                                        <th>Frontend</th>
                                        <th>
                                            <input type="checkbox" name="opd_external_plugins[js][]" value="<?php echo $pluginDirName; ?>" <?php echo is_array(get_option('opd_external_plugins')) && array_key_exists('js', get_option('opd_external_plugins')) && in_array($pluginDirName, get_option('opd_external_plugins')['js']) ? "checked" : ""?> />
                                        </th>
                                        <th>
                                            <input type="checkbox" name="opd_external_plugins[css][]" value="<?php echo $pluginDirName; ?>" <?php echo is_array(get_option('opd_external_plugins')) && array_key_exists('css', get_option('opd_external_plugins')) && in_array($pluginDirName, get_option('opd_external_plugins')['css']) ? "checked" : ""?>/>
                                        </th>
                                    </tr>
                                    <?php
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="column">
                <div class="disable-scripts-styles">
                    <table class="plugins">
                        <thead>
                            <tr>
                                <th>Plugin</th>
                                <th>Type</th>
                                <th class="enable-js" data-type="js">Js</th>
                                <th class="enable-css" data-type="css">Css</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $plugins = get_plugins();
                                foreach ($plugins as $pluginFilePath => $plugin) {
                                    // Skip disabled plugins
                                    if (!is_plugin_active($pluginFilePath))
                                        continue;

                                    // Skip optimizepress3 and opdashboard plugins
                                    if (strpos($pluginFilePath, 'op-builder') !== false ||
                                        strpos($pluginFilePath, 'op-dashboard') !== false)
                                        continue;

                                    $temp = explode('/', $pluginFilePath);
                                    $temp = explode('.', $temp[0]);
                                    $pluginDirName = $temp[0];
                                    ?>
                                    <tr>
                                        <th>
                                            <label for=""><?php echo $plugin['Name']; ?></label>
                                        </th>
                                        <th>Backend</th>
                                        <th>
                                            <input type="checkbox" name="opd_admin_external_plugins[js][]" value="<?php echo $pluginDirName; ?>" <?php echo is_array(get_option('opd_admin_external_plugins')) && array_key_exists('js', get_option('opd_admin_external_plugins')) && in_array($pluginDirName, get_option('opd_admin_external_plugins')['js']) ? "checked" : ""?>/>
                                        </th>
                                        <th>
                                            <input type="checkbox" name="opd_admin_external_plugins[css][]" value="<?php echo $pluginDirName; ?>" <?php echo is_array(get_option('opd_admin_external_plugins')) && array_key_exists('css', get_option('opd_admin_external_plugins')) && in_array($pluginDirName, get_option('opd_admin_external_plugins')['css']) ? "checked" : ""?>/>
                                        </th>
                                    </tr>
                                    <?php
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="column">
                <div class="disable-scripts-styles">
                    <table class="themes">
                        <thead>
                            <tr>
                                <th>Theme</th>
                                <th>Type</th>
                                <th class="enable-js" data-type="js">Js</th>
                                <th class="enable-css" data-type="css">Css</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $uri = get_template_directory_uri();
                                $temp = explode('/', $uri);
                                $themeDirName = end($temp);
                            ?>
                            <tr>
                                <th><?php echo wp_get_theme()->name; ?></th>
                                <th>Frontend</th>
                                <th>
                                    <input type="checkbox" name="opd_external_themes[js][]" value="<?php echo $themeDirName; ?>" <?php echo is_array(get_option('opd_external_themes')) && array_key_exists('js', get_option('opd_external_themes')) && in_array($themeDirName, get_option('opd_external_themes')['js']) ? "checked" : ""?>/>
                                </th>
                                <th>
                                    <input type="checkbox" name="opd_external_themes[css][]" value="<?php echo $themeDirName; ?>" <?php echo is_array(get_option('opd_external_themes')) && array_key_exists('css', get_option('opd_external_themes')) && in_array($themeDirName, get_option('opd_external_themes')['css']) ? "checked" : ""?>/>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="column">
                <div class="disable-scripts-styles">
                    <table class="themes">
                        <thead>
                            <tr>
                                <th>Theme</th>
                                <th>Type</th>
                                <th class="enable-js" data-type="js">Js</th>
                                <th class="enable-css" data-type="css">Css</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $uri = get_template_directory_uri();
                                $temp = explode('/', $uri);
                                $themeDirName = end($temp);
                            ?>
                            <tr>
                                <th><?php echo wp_get_theme()->name; ?></th>
                                <th>Backend</th>
                                <th>
                                    <input type="checkbox" name="opd_admin_external_themes[js][]" value="<?php echo $themeDirName; ?>" <?php echo is_array(get_option('opd_admin_external_themes')) && array_key_exists('js', get_option('opd_admin_external_themes')) && in_array($themeDirName, get_option('opd_admin_external_themes')['js']) ? "checked" : ""?>/>
                                </th>
                                <th>
                                    <input type="checkbox" name="opd_admin_external_themes[css][]" value="<?php echo $themeDirName; ?>" <?php echo is_array(get_option('opd_admin_external_themes')) && array_key_exists('css', get_option('opd_admin_external_themes')) && in_array($themeDirName, get_option('opd_admin_external_themes')['css']) ? "checked" : ""?>/>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>
</div>

<script>
    var action = jQuery(".enable-js, .enable-css");

    action.on("click", function(e) {
        var $target = jQuery(e.target);
        var attr = $target.attr("data-type");
        var $inputs = $target
            .closest("table")
            .find("input[name*='" + attr + "']");

        $inputs.prop("checked", !$inputs.prop("checked"));
    })
</script>
