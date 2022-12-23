<?php

/**
 * Plugin Name: All-In-One Crypto (AIOC) - Cryptocurrency Packs
 * Plugin URI: #
 * Description: All crypto related solutions in one single plugin.
 * Version: 1.0.0
 * Requires at least: 4.3.0
 * Requires PHP: 5.6
 * Author: niyankhadka
 * Author URI: https://github.com/niyankhadka/
 * Text Domain: all-in-one-crypto
 * Domain Path: /languages
 * License:  GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {

    die;
}

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {

    require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

/**
 * The code that runs during plugin activation
 */
function activate_all_in_one_crypto_plugin() {
    
	Inc\Admin\Base\Activator::activate();
}
register_activation_hook( __FILE__, 'activate_all_in_one_crypto_plugin' );

/**
 * The code that runs during plugin deactivation
 */
function deactivate_all_in_one_crypto_plugin() {

	Inc\Admin\Base\Deactivator::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_all_in_one_crypto_plugin' );

if ( class_exists( 'Inc\\Init' ) ) {

    Inc\Init::registerServices();
}

function debug( $var ) {
    echo '<pre>';
    var_dump( $var );
    echo '</pre>';
}