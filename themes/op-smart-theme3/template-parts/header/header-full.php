<?php
/**
 * Template part for displaying header style
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

?>
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>">
                            <?php op_logo(); ?>
                        </a>
                        <button type="button" class="navbar-toggle collapsed glyphicon glyphicon-menu-hamburger" aria-controls="navbar">
                            <span class="sr-only"><?php _ex('Toggle navigation', 'Content', 'op3_smart'); ?></span>
                        </button>
                    </div> <!--/.navbar-header -->
                    <div id="navbar" class="pull-right navbar-menu">
                        <div class="nav-close-wrap text-right ">
                            <span class="glyphicon glyphicon-remove closenav"></span>
                        </div>
                        <?php
                            if (has_nav_menu('primary')) {
                                wp_nav_menu(array(
                                    'depth' => 7,
                                    'theme_location' => 'primary',
                                    'items_wrap' => '<ul id="%1$s" class="nav navbar-nav">%3$s</ul>'
                                ));
                            }
                        ?>
                    </div><!--/.nav-collapse -->
                </div> <!--/.container-fluid -->
