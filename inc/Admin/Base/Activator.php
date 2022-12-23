<?php 

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;
use Inc\Admin\Base\Options;

class Activator
{
    /**
	 * Activate method for plugin activation
     * 
	 * @since    1.0.0
	 */
    public static function activate() {

        flush_rewrite_rules();

        $default = Options::default_options();

		if ( ! get_option( 'all_in_one_crypto' ) ) {

			update_option( 'all_in_one_crypto', $default );
		}
    }

}