<?php 

/**
 * Pages defined on the Admin Dashboard
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

use Inc\Admin\Base\BaseController;

class Enqueue extends BaseController
{
    /**
	 * Method to register for Enqueue
     * 
	 * @since    1.0.0
	 */
    public function register() {

        add_action( 'admin_enqueue_scripts', array( $this, 'adminEnqueue' ) );
    }

    /**
	 * Method to call style and scripts
     * 
	 * @since    1.0.0
	 */
    public function adminEnqueue() {

        $current_screen = get_current_screen();

        if ( isset( $current_screen->base ) && 'toplevel_page_all_in_one_crypto' === $current_screen->base ) {

            wp_enqueue_style( 'aioc-admin-dashboard-style', $this->plugin_url . 'assets/build/admin/css/dashboard.css', array(), $this->plugin_version, 'all' );
            wp_enqueue_script( 'aioc-admin-dashboard-script', $this->plugin_url . 'assets/build/admin/js/dashboard.js', array( 'jquery' ), $this->plugin_version, false );
        }
        
        if ( isset( $current_screen->post_type ) && 'aioc_crypto_price' === $current_screen->post_type ) {

            wp_enqueue_style( 'aioc-admin-crypto-price-style', $this->plugin_url . 'assets/build/admin/css/crypto-price.css', array(), $this->plugin_version, 'all' );
            wp_enqueue_script( 'aioc-admin-crypto-price-script', $this->plugin_url . 'assets/build/admin/js/crypto-price.js', array( 'jquery', 'clipboard' ), $this->plugin_version, false );
        }
    }

}