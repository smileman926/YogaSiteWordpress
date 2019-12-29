<?php
/**
 * Template part for displaying header style
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

?>
                <div class="navbar op-removable-top">
                    <div class="container op-container">
                       <a class="navbar-brand navbar-center" href="<?php echo esc_url(home_url('/')); ?>">
                            <?php op_logo(); ?>
                        </a>
                        <div class="navbar-header">
                            <button class="navbar-toggle glyphicon glyphicon-menu-hamburger" data-toggle="collapse" data-target="#mainNav">
                                <span class="sr-only"><?php _ex('Toggle navigation', 'Content', 'op3_smart'); ?></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="navbar" class="navbar-menu">
                    <div class="nav-close-wrap text-right">
                        <span class="glyphicon glyphicon-remove closenav"></span>
                    </div>
                    <div class="navbar-centered-menu container">
                        <?php
                            if (has_nav_menu('primary')) {
                                wp_nav_menu(array(
                                    'depth' => 7,
                                    'theme_location' => 'primary',
                                    'items_wrap' => '<ul id="%1$s" class="nav navbar-nav">%3$s</ul>'
                                ));
                            }
                        ?>
                    </div>
                </div>
