<?php 

/**
 * Crypto Price Page defined on the Admin Dashboard
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Pages;

use \Inc\Admin\Api\SettingsApi;
use \Inc\Admin\Base\BaseController;
use \Inc\Admin\Api\Callbacks\AdminPageCallbacks;
use \Inc\Admin\Blocks\Blocks;

class CryptoPrice extends BaseController
{

    public $settings;

	public $page_callbacks;

	public $subpages = array();

	public function register() {

		if ( ! $this->get_settings()['enable_price'] ) return;

		$this->settings = new SettingsApi();

		$this->page_callbacks = new AdminPageCallbacks();

		$this->setSubpages();

		$this->settings->addSubPages( $this->subpages )->register();

		add_action( 'init', array( $this, 'registerCustomPostTypes' ) );
		add_action( 'add_meta_boxes', array( $this,'registerPriceShortcodeMetaBox') );

		add_filter( 'manage_aioc_crypto_price_posts_columns', array( $this,'setEditColumns') );
		add_action( 'manage_posts_custom_column', array( $this,'customEditColumns'), 10, 2 );

		add_shortcode( 'aioc_price', array( $this, 'addShortcode' ) );

		add_action( 'aiocRegisterBlocks', array( $this, 'registerPriceBlocks' ) );

	}

	public function setSubpages() {

		$this->subpages = array(

			array(

				'parent_slug' => 'all_in_one_crypto', 
				'page_title' => esc_html__( 'All-In-One Crypto - Crypto Price', 'all-in-one-crypto' ),
				'menu_title' => esc_html__( 'Crypto Price', 'all-in-one-crypto' ),
				'capability' => 'manage_options', 
				'menu_slug' => 'all_in_one_crypto_crypto_price', 
				'callback' => array( $this->page_callbacks, 'adminCryptoPrice' )

			)

		);
	}

	public function registerCustomPostTypes() {

		register_post_type( 'aioc_crypto_price',

			array(

				'labels' => array(

					'name'                  => _x( 'Crypto Price', 'Post Type General Name', 'all-in-one-crypto' ),
					'singular_name'         => _x( 'Crypto Price', 'Post Type Singular Name', 'all-in-one-crypto' ),
					'menu_name'             => __( 'Crypto Price', 'all-in-one-crypto' ),
					'name_admin_bar'        => __( 'Crypto Price', 'all-in-one-crypto' ),
					'archives'              => __( 'Crypto Price Archives', 'all-in-one-crypto' ),
					'attributes'            => __( 'Crypto Price Attributes', 'all-in-one-crypto' ),
					'parent_item_colon'     => __( 'Parent Crypto Price:', 'all-in-one-crypto' ),
					'all_items'             => __( 'All Crypto Prices', 'all-in-one-crypto' ),
					'add_new_item'          => __( 'Add New Crypto Price', 'all-in-one-crypto' ),
					'add_new'               => __( 'Add New', 'all-in-one-crypto' ),
					'new_item'              => __( 'New Crypto Price', 'all-in-one-crypto' ),
					'edit_item'             => __( 'Edit Crypto Price', 'all-in-one-crypto' ),
					'update_item'           => __( 'Update Crypto Price', 'all-in-one-crypto' ),
					'view_item'             => __( 'View Crypto Price', 'all-in-one-crypto' ),
					'view_items'            => __( 'View Crypto Prices', 'all-in-one-crypto' ),
					'search_items'          => __( 'Search Crypto Prices', 'all-in-one-crypto' ),
					'not_found'             => __( 'Not found', 'all-in-one-crypto' ),
					'not_found_in_trash'    => __( 'Not found in Trash', 'all-in-one-crypto' ),
					'featured_image'        => __( 'Featured Image', 'all-in-one-crypto' ),
					'set_featured_image'    => __( 'Set featured image', 'all-in-one-crypto' ),
					'remove_featured_image' => __( 'Remove featured image', 'all-in-one-crypto' ),
					'use_featured_image'    => __( 'Use as featured image', 'all-in-one-crypto' ),
					'insert_into_item'      => __( 'Insert into Crypto Price', 'all-in-one-crypto' ),
					'uploaded_to_this_item' => __( 'Uploaded to this Crypto Price', 'all-in-one-crypto' ),
					'items_list'            => __( 'Crypto Prices list', 'all-in-one-crypto' ),
					'items_list_navigation' => __( 'Crypto Prices List Navigation', 'all-in-one-crypto' ),
					'filter_items_list'     => __( 'Filter Crypto Prices List', 'all-in-one-crypto' ),
				),

				'label'                 => __( 'Crypto Price', 'all-in-one-crypto' ),
				'description'           => __( 'Crypto Prices Post Type Description', 'all-in-one-crypto' ),
				'supports'              => array( 'title', 'editor' ),
				'taxonomies'            => array(''),
				'hierarchical'          => false,
				'public' 				=> false,  // it's not public, it shouldn't have it's own permalink, and so on
				'show_ui'               => true,
				'show_in_nav_menus' 	=> false,  // you shouldn't be able to add it to menus
				'menu_position'         => 101,
				'show_in_admin_bar'     => false,
				'show_in_menu'          => true,
				'can_export'            => true,
				'has_archive' 			=> false,  // it shouldn't have archive page
				'rewrite' 				=> false,  // it shouldn't have rewrite rules
				'exclude_from_search'   => true,
				'publicly_queryable'    => true,
				'menu_icon'           	=> 'dashicons-chart-pie',
				'capability_type'       => 'page',
				'show_in_rest'			=> true,

			)

		);

	}

	public function registerPriceShortcodeMetaBox() {

	    add_meta_box( 'aioc-price-shortcode', 'Crypto Price Shortcode', array( $this, 'priceShortcodeMeta' ), 'aioc_crypto_price', 'side', 'core' );

    }

	public function priceShortcodeMeta( $post ) {
		
		echo '<div class="aioc-price-shortcode-wrap">';
		echo '<div class="aioc-price-shortcode">';
		echo '<input type="text" id="aiocpriceshortcode" readonly="readonly" class="selectize-input text" value="' . esc_attr('[aioc_price id="' . $post->ID . '"]') . '" />';
		echo '<button class="aoic-price-button" data-clipboard-action="copy" data-clipboard-target="#aiocpriceshortcode"><i class="dashicons-before dashicons-edit-page"></i></button>';
		echo '</div>';
		echo '<p class="aioc-price-desc">Paste this shortcode anywhere like page, post or widgets</p>';
		echo '</div>';

    }

	public function setEditColumns( $columns ) {

		$ncolumns = array();

		foreach($columns as $key => $title) {

			if ($key=='date') {

				$ncolumns['shortcode'] = __( 'Shortcode', 'all-in-one-crypto' );
				$ncolumns['type'] = __( 'Crypto Price Type', 'all-in-one-crypto' );

			}

			$ncolumns[$key] = $title;
		}

		return $ncolumns;

     }
	 
	public function customEditColumns( $column, $post_id ) {

        switch ($column) {

			case 'type':

				// $type = get_post_meta($post_id, 'type', true);
				// _e(ucfirst($type), 'massive-cryptocurrency-widgets');
				echo 'display type here';
				break;

			case 'shortcode':

				echo '<div class="aioc-price-shortcode">';
				echo '<input type="text" id="aiocpriceshortcode" readonly="readonly" class="selectize-input text" value="' . esc_attr('[aioc_price id="' . $post_id . '"]') . '" />';
				echo '</div>';
				break;

		}

    }

	public function addShortcode( $attrs ) {

		$post = get_post( $attrs['id'] );

		if( ( $post->post_status != 'publish') && ( !is_admin() ) ) {
			return;
		}

		return apply_filters( 'the_content', $post->post_content );
        
    }
	
	public function registerPriceBlocks() {

		register_block_type( $this->plugin_path . 'inc/Admin/Blocks/build/price/aioc-price-starter' );

        register_block_type( $this->plugin_path . 'inc/Admin/Blocks/build/price/aioc-price-label', 
            [ 
                'render_callback' => [ $this, 'blockPriceLabelCallback' ] 
            ] );

		register_block_type( $this->plugin_path . 'inc/Admin/Blocks/build/price/aioc-price-chart' );
        
    }

	public function blockPriceLabelCallback( $attributes, $content, $block_instance ) {

        ob_start();
        /**
         * Keeping the markup to be returned in a separate file is sometimes better, especially if there is very complicated markup.
         * All of passed parameters are still accessible in the file.
         */
        require $this->plugin_path . 'inc/Admin/Blocks/templates/price/aioc-price-label/render-template.php';
        return ob_get_clean();

    }

}