<?php 

/**
 * Base Controller of plugin
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

use Inc\Admin\Base\Util;

class BaseController
{

  public $plugin_path;

  public $plugin_url;

  public $plugin_basename;

  public $plugin_name;

  public $plugin_version;

  public function __construct() {

    $this->plugin_path = plugin_dir_path( dirname( __FILE__, 3 ) );

    $this->plugin_url = plugin_dir_url( dirname( __FILE__, 3 ) );

    $this->plugin_basename = plugin_basename( dirname( __FILE__, 4 ) ) . '/all-in-one-crypto.php';

    $this->plugin_name = 'all-in-one-crypto';

    $this->plugin_version = '1.0.0';

  }

  public function get_settings( string $name = '' ) {

    $key = !empty( $name ) ? $name : 'all_in_one_crypto';

    $option = get_option( $key, false );

		return $option;
    
  }

}