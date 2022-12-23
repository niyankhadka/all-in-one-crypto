<?php 

/**
 * Options required for the plugin
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

use Inc\Admin\Base\BaseController;

class Options extends BaseController
{

    /**
	 * Options for admin panel of plugin
     * 
	 * @since    1.0.0
	 */
    public function admin_panel() {

        $option = $this->get_settings();

        $panel_options = array(

            'dashboard' => array(

                'enable_price' => array(

                    'template' => 'card',
                    'theme' => 'purple',
                    'title' => esc_html__( 'Crypto Price', 'all-in-one-crypto' ), 
                    'description' => esc_html__( 'Enable this option if you want to use crypto price features for your website.', 'all-in-one-crypto' ), 
                    'icon' => 'shield',
                    'image' => 'https://i.pinimg.com/originals/f2/d1/f9/f2d1f900f688ddca0765ec8e2d3900e1.png',
                    'type' => 'checkbox',
                    'name' => 'enable_price',
                    'i_class' => 'aioc-input_toggle_source',
                    'label' => '',
                    'l_class' => 'aioc-input_toggle_label',
                    'value' => '1',
                    'checked' => isset( $option[ 'enable_price' ] ) ? $option[ 'enable_price' ] : 0,
                
                ),

                'enable_donation' => array(

                    'template' => 'card',
                    'theme' => 'yellow',
                    'title' => esc_html__( 'Crypto Donation', 'all-in-one-crypto' ),
                    'description' => esc_html__( 'Enable this option if you want to use crypto donation features for your website.', 'all-in-one-crypto' ), 
                    'icon' => 'shield',
                    'image' => 'https://i.pinimg.com/originals/f2/d1/f9/f2d1f900f688ddca0765ec8e2d3900e1.png',
                    'type' => 'checkbox',
                    'name' => 'enable_donation',
                    'i_class' => 'aioc-input_toggle_source',
                    'label' => '',
                    'l_class' => 'aioc-input_toggle_label',
                    'value' => '1',
                    'checked' => isset( $option[ 'enable_donation' ] ) ? $option[ 'enable_donation' ] : 0,
                
                ),

                'enable_converter' => array(

                    'template' => 'card',
                    'theme' => 'blue',
                    'title' => esc_html__( 'Crypto Converter', 'all-in-one-crypto' ),
                    'description' => esc_html__( 'Enable this option if you want to use crypto conversion features for your website.', 'all-in-one-crypto' ), 
                    'icon' => 'shield',
                    'image' => 'https://i.pinimg.com/originals/f2/d1/f9/f2d1f900f688ddca0765ec8e2d3900e1.png',
                    'type' => 'checkbox',
                    'name' => 'enable_converter',
                    'i_class' => 'aioc-input_toggle_source',
                    'label' => '',
                    'l_class' => 'aioc-input_toggle_label',
                    'value' => '1',
                    'checked' => isset( $option[ 'enable_converter' ] ) ? $option[ 'enable_converter' ] : 0,
                
                ),

            ),

        );

        return $panel_options;
    }

    /**
	 * Default Options for plugin
     * 
	 * @since    1.0.0
	 */
    public static function default_options() {

        $options = array(

            'enable_price' => false,
            'enable_donation' => false,
            'enable_converter' => false,

        );

        return $options;
    }

}