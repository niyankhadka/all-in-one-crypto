<?php 

/**
 * Admin Forms on plugin page
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Base;

use Inc\Admin\Base\Util;

class Forms 
{

    /**
	 * Form input method
     * 
	 * @since    1.0.0
	 */
    public function input( $options ) {

        // Check if args passed is an array.
		if ( ! is_array( $options ) ) {
			return 'Variable passed not an array';
		}

        $option_name = $options['option_name'];

        $args = $options['values'];

		// Define variable.
		$input = '';

        switch( $args[ 'type' ] ) {

            case 'checkbox' :

                $i_class = Util::array_string( $args, 'i_class', '' );
                $disabled = Util::array_string( $args, 'disabled', '' );
                $label = Util::array_string( $args, 'label', '' );
                $l_class = Util::array_string( $args, 'l_class', '' );
                ?>
			    <input class="<?php echo esc_attr( $i_class ) ?>" name="<?php echo esc_attr( $option_name ); ?>[<?php echo esc_attr( $args[ 'name' ] ) ?>]" id="<?php echo esc_attr( $option_name ); ?>[<?php echo esc_attr( $args[ 'name' ] ) ?>]" type="checkbox" <?php checked( $args[ 'checked' ], $args[ 'value' ] )  ?> value="<?php echo esc_attr( $args[ 'value' ] ) ?>" <?php echo esc_attr( $disabled ) ?> />
                <label class="<?php echo esc_attr( $l_class ) ?>" for="<?php echo esc_attr( $option_name ); ?>[<?php echo esc_attr( $args[ 'name' ] ) ?>]"><?php esc_html( $label ) ?></label>
                <?php
                break;

            default :
                echo "Not defined type";
            
        }
    }

    /**
	 * Render template for admin pages
     * 
	 * @since    1.0.0
	 */
    public function render_template( $options ) {

        // Check if args passed is an array.
		if ( ! is_array( $options ) ) {
			return 'Variable passed not an array';
		}

        $option_name = $options['option_name'];

        $args = $options['values'];

		// Define variable.
		$input = '';

        switch( $args[ 'template' ] ) {

            case 'card' :

                $theme = Util::array_string( $args, 'theme', 'blue' );
                $title = Util::array_string( $args, 'title', '' );
                $description = Util::array_string( $args, 'description', '' );
                $icon = Util::array_string( $args, 'icon', 'tick_tv' );
                $image = Util::array_string( $args, 'image', '' );
                $checked = isset( $args['checked'] ) ? ( $args['checked'] ? true : false) : false;
                ?>
                <aside class="aioc-responsive-banner aioc-<?php echo esc_attr( $theme ); ?>">
                    <div class="aioc-container-envelope">
                        <svg class="aioc-aioc-cirle-a" height="160" width="160">
                            <circle cx="80" cy="80" r="80"/>
                        </svg>
                        <svg class="aioc-cirle-b" height="60" width="60">
                            <circle cx="30" cy="30" r="30"/>
                        </svg>
                        <svg class="aioc-cirle-c" height="600" width="600">
                            <circle cx="300" cy="300" r="300"/>
                        </svg>
                        <svg class="aioc-cirle-d" height="60" width="60">
                            <circle cx="30" cy="30" r="30"/>
                        </svg>
                        <?php
                            if( !empty( $image ) ) {
                                ?>
                                <img src="<?php echo esc_url( $image ); ?>" />
                                <?php
                            }
                        ?>
                        <div class="aioc-col-xs-12">
                            <?php
                            if( !empty( $title ) ) {
                                ?>
                                <h2><?php echo esc_html( $title ); ?></h2>
                                <?php
                            }
                            ?>
                            <?php
                            if( !empty( $title ) ) {
                                ?>
                                <p><?php echo esc_html( $description ); ?></p>
                                <?php
                            }
                            
                            ?>
                            <div class="aioc-toggle_wrap">
                                <div class="aioc-toggle_item <?php echo ( $checked ? esc_attr( 'aioc-toggle_item_is-active' ) : '' ) ?>">
                                    <label class="aioc-toggle_label aioc-toggle_label_<?php echo esc_attr( $icon ); ?>" for="<?php echo esc_attr( $option_name ); ?>[<?php echo esc_attr( $args[ 'name' ] ) ?>]">
                                        <?php ( $checked ? esc_html_e( 'Enabled', 'all-in-one-crypto' ) : esc_html_e( 'Disabled', 'all-in-one-crypto' ) ) ?>
                                    </label>
                                    <div class="aioc-toggle_input input aioc-input_toggle aioc-input_toggle_theme_light">
                                        <?php
                                            $this->input( $options );
                                        ?>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>
                <?php
                break;

            default :
                echo 'Not defined template';
            
        }
    }

}