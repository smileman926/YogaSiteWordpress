<?php
add_shortcode( 'WPSM_AC', 'AccordionShortCode' );
function AccordionShortCode( $Id ) {
	ob_start();	
	if(!isset($Id['id'])) 
	 {
		$WPSM_AC_ID = "";
	 } 
	else 
	{
		$WPSM_AC_ID = $Id['id'];
	}
	require("ac-content.php"); 
	wp_reset_query();
    return ob_get_clean();
}
?>