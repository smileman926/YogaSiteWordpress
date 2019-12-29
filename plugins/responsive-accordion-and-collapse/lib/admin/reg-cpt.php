<?php

			$labels = array(
				'name'                => _x( 'Responsive Accordion', 'Responsive Accordion', wpshopmart_accordion_text_domain ),
				'singular_name'       => _x( 'Responsive Accordion', 'Responsive Accordion', wpshopmart_accordion_text_domain ),
				'menu_name'           => __( 'Responsive Accordion', wpshopmart_accordion_text_domain ),
				'parent_item_colon'   => __( 'Parent Item:', wpshopmart_accordion_text_domain ),
				'all_items'           => __( 'All Accordion', wpshopmart_accordion_text_domain ),
				'view_item'           => __( 'View Accordion', wpshopmart_accordion_text_domain ),
				'add_new_item'        => __( 'Add New Accordion', wpshopmart_accordion_text_domain ),
				'add_new'             => __( 'Add New Accordion', wpshopmart_accordion_text_domain ),
				'edit_item'           => __( 'Edit Accordion', wpshopmart_accordion_text_domain ),
				'update_item'         => __( 'Update Accordion', wpshopmart_accordion_text_domain ),
				'search_items'        => __( 'Search Accordion', wpshopmart_accordion_text_domain ),
				'not_found'           => __( 'No Accordion Found', wpshopmart_accordion_text_domain ),
				'not_found_in_trash'  => __( 'No Accordion found in Trash', wpshopmart_accordion_text_domain ),
			);
			$args = array(
				'label'               => __( 'Responsive Accordion', wpshopmart_accordion_text_domain ),
				'description'         => __( 'Responsive Accordion', wpshopmart_accordion_text_domain ),
				'labels'              => $labels,
				'supports'            => array( 'title', '', '', '', '', '', '', '', '', '', '', ),
				//'taxonomies'          => array( 'category', 'post_tag' ),
				 'hierarchical'        => false,
				'public'              => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => false,
				'show_in_admin_bar'   => false,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-feedback',
				'can_export'          => true,
				'has_archive'         => true,
				'exclude_from_search' => false,
				'publicly_queryable'  => false,
				'capability_type'     => 'page',
			);
			register_post_type( 'responsive_accordion', $args );
			add_filter( 'manage_edit-responsive_accordion_columns', array(&$this, 'responsive_accordion_columns' )) ;
			add_action( 'manage_responsive_accordion_posts_custom_column', array(&$this, 'responsive_accordion_manage_columns' ), 10, 2 );
	
 ?>