<?php 

/**
 * Settings Links on plugin page
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

use Inc\Admin\Base\BaseController;

class SettingsLinks extends BaseController
{

    /**
	 * Method to filter for Settings Links
     * 
	 * @since    1.0.0
	 */
    public function register() {

        add_filter( "plugin_action_links_$this->plugin_basename", array( $this, 'settingsLink' )  );
    }

    /**
	 * Method to return for Settings Links
     * 
	 * @since    1.0.0
	 */
    public function settingsLink( $links ) {

        $settings_link = '<a href="admin.php?page=all_in_one_crypto">Dashboard</a>';

        array_push( $links, $settings_link );

        return $links;
    }

}