<?php

/**
 * Widget for displaying of social profile links.
 */
class Op_Social_Profiles_Widget extends WP_Widget
{
    /**
     * Register widget with WordPress.
     */
    public function __construct()
    {
        $args = array(
            'class_name' => 'Op_Social_Profiles_Widget',
            'description' => _x('Display social profile links in your sidebar', 'Widgets', 'op3_smart'),
        );

        parent::__construct('Op_Social_Profiles_Widget', _x('OptimizePress Social Profiles', 'Widgets', 'op3_smart'), $args);
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget($args, $instance)
    {
        echo $args['before_widget'];

        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }

        echo '<div class="sm-wrap social-profiles-widget">';
            op_social_profiles();
        echo '</div>';

        echo $args['after_widget'];
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form($instance)
    {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _ex('Title:', 'Widgets', 'op3_smart'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p><?php printf(_x('Only non empty profiles defined in <a href="%s">Theme options / Social / Profile Options</a> will be displayed.', 'Widgets', 'op3_smart'), admin_url('themes.php?page=_options')); ?></p>
        <?php
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update($new_instance, $old_instance)
    {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';

        return $instance;
    }
}

/**
 * Widget for displaying of optin form
 */
class Op_Optin_Form_Widget extends WP_Widget
{
    /**
     * Register widget with WordPress.
     */
    public function __construct()
    {
        $args = array(
            'class_name' => 'Op_Optin_Form_Widget',
            'description' => _x('Add an optin form defined in Theme Options > Widget section.', 'Widgets', 'op3_smart'),
        );

        parent::__construct('Op_Optin_Form_Widget', _x('OptimizePress Optin Form', 'Widgets', 'op3_smart'), $args);
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget($args, $instance)
    {
        echo $args['before_widget'];

        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }

        // $shortcode = op_generate_optin_shortcode_code('widget_');
        $html = op3_generate_optin_form('widget_optin_' . $instance['style'], 'widget');
        echo $html;

        // Switch widget style
        // if (!empty($instance['style'])) {
            // $shortcode = str_replace('style="optin-style-1"', 'style="' . $instance['style'] . '"', $shortcode);
        // }
        // echo do_shortcode($shortcode);

        echo $args['after_widget'];
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form($instance)
    {
        global $op_options;

        $title = !empty($instance['title']) ? $instance['title'] : '';
        $style = !empty($instance['style']) ? $instance['style'] : 'optin-style-1';
        ?>
        <!-- <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _ex('Title:', 'Content', 'op3_smart'); ?></label><br>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p> -->
        <p>
            <label for="<?php echo $this->get_field_id('style'); ?>"><?php _ex('Style:', 'Content', 'op3_smart'); ?></label><br>
            <select class="widefat" id="<?php echo $this->get_field_id('style'); ?>" name="<?php echo $this->get_field_name('style'); ?>">
                <?php
                for ($i = 1; $i <= 3; $i++) {
                    $form_enabled_str = 'widget_optin_' . $i . '_form_enabled';
                    $integration_str = 'widget_optin_' . $i . '_integration';
                    if (isset($op_options[$form_enabled_str]) && (int) $op_options[$form_enabled_str] === 1
                        && isset($op_options[$integration_str]) && !empty($op_options[$integration_str])
                    ) {
                        echo '<option value="' . $i . '" ' . selected($style, 'optin-style-' . $i) . '>Form #' . $i . '</option>';
                    }
                }
                ?>
            </select>
        </p>
        <?php
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update($new_instance, $old_instance)
    {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['style'] = (!empty($new_instance['style'])) ? strip_tags($new_instance['style']) : '';

        return $instance;
    }
}
