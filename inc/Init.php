<?php 

/**
 * Init of the plugin
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc;

final class Init
{

    /**
	 * Store all the classes inside in an array
     * 
     * @return array full list of classes
     * 
	 * @since    1.0.0
	 */
    public static function getServices() {

        return [
            Admin\Base\SettingsLinks::class,
            Admin\Base\Enqueue::class,
            Admin\Pages\Dashboard::class,
            Admin\Pages\CryptoPrice::class,
            Admin\Blocks\Blocks::class,
        ];
    }

    /**
	 * Loop through the classes, initialize them,
     * and call the register() method if it exists
     * 
     * @return
     * 
	 * @since    1.0.0
	 */
    public static function registerServices() {

        foreach( self::getServices() as $class ) {

            $service = self::instantiate( $class );

            if( method_exists( $service, 'register' ) ) {

                $service->register();
            }
        }
    }

    /**
	 * Initialize the class
     * 
     * @parm class $class from the services array
     * 
     * @return class new instance of the class
     * 
	 * @since    1.0.0
	 */
    private static function instantiate( $class ) {

        $service = new $class();

        return $service;
    }
}