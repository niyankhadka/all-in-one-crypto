<?php 

/**
 * Callbacks function defined for Manager section
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Api\Callbacks;

use Inc\Admin\Base\BaseController;
use Inc\Admin\Base\Options;

class SanitizeCallbacks extends BaseController
{

    public function checkboxSanitize( $input ) {

		$output = array();

		foreach ( Options::default_options() as $key => $value ) {

			$output[$key] = isset( $input[$key] ) ? true : false;
		}

		return $output;
	}

}