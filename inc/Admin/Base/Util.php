<?php 

/**
 * Utilities Class
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

class Util
{

	public static function convert_array( $args, $in_array = false ) {

		if ( ! is_array( $args ) ) {
			return 'Variable passed not an array';
		}

		$return = json_encode( $args );

		$return = json_decode( $return, $in_array );

		return $return;
	}

	public static function array_string( $args, $check, $return = '' ) {

		if ( ! is_array( $args ) ) {
			return 'Variable passed not an array';
		}

		if( empty( $check ) ) {
			return 'Check variable is empty';
		}

		if( isset( $args[ $check ] ) ) {

			if( !empty( $args[ $check ] ) ) {

				$return = $args[ $check ];

			}

		}

		return $return;
	}

}