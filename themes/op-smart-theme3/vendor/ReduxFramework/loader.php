<?php

if(!function_exists('redux_register_custom_extension_loader')) :
	function redux_register_custom_extension_loader($ReduxFramework) {
		$path = dirname( __FILE__ ) . '/extensions/';
		$folders = scandir( $path, 1 );
		foreach($folders as $folder) {
			if ($folder === '.' or $folder === '..' or !is_dir($path . $folder) ) {
				continue;
			}
			$extension_class = 'ReduxFramework_Extension_' . $folder;
			if( !class_exists( $extension_class ) ) {
				// In case you wanted override your override, hah.
				$class_file = $path . $folder . '/extension_' . $folder . '.php';
				$class_file = apply_filters( 'redux/extension/'.$ReduxFramework->args['opt_name'].'/'.$folder, $class_file );
				if( $class_file ) {
					require_once( $class_file );
					$extension = new $extension_class( $ReduxFramework );
				}
			}
		}
	}
	// Modify redux_demo to match your opt_name
	add_action("redux/extensions/op_options/before", 'redux_register_custom_extension_loader', 0);
endif;