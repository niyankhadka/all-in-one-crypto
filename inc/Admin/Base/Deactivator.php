<?php 

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

class Deactivator
{
    /**
	 * Deactivate method for plugin activation
     * 
	 * @since    1.0.0
	 */
    public static function deactivate() {

        flush_rewrite_rules();
    }

}

