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

	private $wpdb;

	private $tablename;

	public $price_db_version;

	public function register() {

		if ( ! $this->get_settings()['enable_price'] ) return;

		global $wpdb;

		$this->wpdb = $wpdb;

		$this->tablename = $this->wpdb->base_prefix . "all_in_one_crypto_prices";

		$this->price_db_version = '1.0.0';

		$this->settings = new SettingsApi();

		$this->page_callbacks = new AdminPageCallbacks();

		$this->setSubpages();

		$this->settings->addSubPages( $this->subpages )->register();

		add_action( 'admin_init', array( $this, 'setPriceDBTable' ) );
		
		add_action( 'init', array( $this, 'registerCustomPostTypes' ) );
		add_action( 'add_meta_boxes', array( $this,'registerPriceShortcodeMetaBox') );

		add_filter( 'manage_aioc_crypto_price_posts_columns', array( $this,'setEditColumns') );
		add_action( 'manage_posts_custom_column', array( $this,'customEditColumns'), 10, 2 );

		add_shortcode( 'aioc_price', array( $this, 'addShortcode' ) );

		add_action( 'aiocRegisterBlocks', array( $this, 'registerPriceBlocks' ) );

		add_action( 'rest_api_init', array( $this, 'registerPriceRestApi' ) );

	}

	public function setPriceDBTable() {

		global $wpdb;

		$table_name = $wpdb->base_prefix . "all_in_one_crypto_prices";

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE IF NOT EXISTS `{$table_name}` (
			`id` mediumint(9) NOT NULL AUTO_INCREMENT,
			`name` varchar(100) NOT NULL,
			`symbol` varchar(10) NOT NULL,
			`slug` varchar(100) NOT NULL,
			`img` varchar(200) NOT NULL,
			`rank` int(5) NOT NULL,
			`price_usd` decimal(24,14) NOT NULL,
			`price_btc` decimal(10,8) NOT NULL,
			`volume_usd_24h` decimal(22,2) NOT NULL,
			`market_cap_usd` decimal(22,2) NOT NULL,
			`high_24h` decimal(20,10) NOT NULL,
			`low_24h` decimal(20,10) NOT NULL,
			`available_supply` decimal(22,2) NOT NULL,
			`total_supply` decimal(22,2) NOT NULL,
			`ath` decimal(20,10) NOT NULL,
			`ath_date` int(11) UNSIGNED NOT NULL,
			`price_change_24h` decimal(20,10) NOT NULL,
			`percent_change_1h` decimal(7,2) NOT NULL,
			`percent_change_24h` decimal(7,2) NOT NULL,
			`percent_change_7d` decimal(7,2) NOT NULL,
			`percent_change_30d` decimal(7,2) NOT NULL,
			`weekly` longtext NOT NULL,
			`weekly_expire` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			`keywords` varchar(255) NOT NULL,
			`custom` text NULL,
			UNIQUE KEY `id` (`id`),
			UNIQUE (`slug`)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta($sql);

		$prices_options = array(

			'db_version' => $this->price_db_version,

		);

		add_option( 'all_in_one_crypto_price', $prices_options );

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
            ] 
		);

		register_block_type( $this->plugin_path . 'inc/Admin/Blocks/build/price/aioc-price-chart' );
		register_block_type( $this->plugin_path . 'inc/Admin/Blocks/build/price/aioc-price-sample' );

		// wp_localize_script( 'all-in-one-crypto-aioc-price-label-editor-script', 'price_label_obj',
        //     array( 
        //         'symbol' => 'BTC',
        //         'name' => 'Bitcoin',
        //         'price' => '123',
        //     )
        // );
        
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

	/**
	 * Register rest api
     * 
	 * @since    1.0.0
	 */
	public function registerPriceRestApi() {

		register_rest_route( 'aioc/v1', '/cryptoprice/(?P<query>[a-z]+)/(?P<slug>[a-z]+)', [
			'method' => 'GET',
			'callback' => [ $this, 'restRouteCryptoPrice' ],
			'permission_callback' => '__return_true'
		]);

	}

	/**
	 * Return crypto prices api
     * 
	 * @since    1.0.0
	 */
	public function restRouteCryptoPrice( $data ) {

		if( !empty( $data ) ) {

			$this->fetchCryptoPrices();

			$response = $this->queryCryptoPrices( $data['query'], $data['slug'] );

			if( empty( $response ) || ! $response ) {

				$response = 'Data Not Found';

			}

		} else {

			$response = 'Invalid Arguments Passed';
		
		}

		return rest_ensure_response($response);

	}

	/**
	 * Get crypto prices from source api
     * 
	 * @since    1.0.0
	 */
	public function fetchCryptoPrices() {

		$cache = get_transient('all-in-one-crypto-fetch-prices-datatime');

		$config['api'] = 'default';
		$config['api_interval'] = 900;
            
		$api_interval = ($config['api'] == 'default') ? 900 : $config['api_interval'];

		if ($cache === false || $cache < (time() - $api_interval)) {
			
			switch ($config['api']) {

				case 'default':

					$request = wp_remote_get('https://api.blocksera.com/v1/tickers');

					if (is_wp_error($request) || wp_remote_retrieve_response_code($request) != 200) {
						$this->wpdb->get_results("SELECT `slug` FROM `{$this->tablename}`");

						if ($this->wpdb->num_rows > 0) {
							set_transient('all-in-one-crypto-fetch-prices-datatime', time(), 60);
						}
						return false;
					}

					$body = wp_remote_retrieve_body($request);
					$data = json_decode($body);

					if (!empty($data)) {
			
							$this->wpdb->query("TRUNCATE `{$this->tablename}`");
			
							$btc_price = $data[0]->current_price;

							$values = [];

							foreach ($data as $coin) {
								if (!($coin->market_cap === null || $coin->market_cap_rank === null)) {
									$coin->price_btc = $coin->current_price / $btc_price;
									$coin->image = strpos($coin->image, 'coingecko.com') ? strtok($coin->image, '?') : $this->plugin_url . 'assets/public/img/missing.png';
									$values[] = array($coin->name, strtoupper($coin->symbol), $coin->id, $coin->image, $coin->market_cap_rank, floatval($coin->current_price), floatval($coin->price_btc), floatval($coin->total_volume), floatval($coin->market_cap), floatval($coin->high_24h), floatval($coin->low_24h), floatval($coin->circulating_supply), floatval($coin->total_supply), floatval($coin->ath), strtotime($coin->ath_date), floatval($coin->price_change_24h), floatval($coin->price_change_percentage_1h), floatval($coin->price_change_percentage_24h), floatval($coin->price_change_percentage_7d), floatval($coin->price_change_percentage_30d), gmdate("Y-m-d H:i:s"));
								}
							}

							$values = array_chunk($values, 100, true);

							foreach ($values as $chunk) {
								$placeholder = "(%s, %s, %s, %s, %d, %0.14f, %0.8f, %0.2f, %0.2f, %0.10f, %0.10f, %0.2f, %0.2f, %0.10f, %d, %0.10f, %0.2f, %0.2f, %0.2f, %0.2f, %s)";
								$query = "INSERT IGNORE INTO `{$this->tablename}` (`name`, `symbol`, `slug`, `img`, `rank`, `price_usd`, `price_btc`, `volume_usd_24h`, `market_cap_usd`, `high_24h`, `low_24h`, `available_supply`, `total_supply`, `ath`, `ath_date`, `price_change_24h`, `percent_change_1h`, `percent_change_24h`, `percent_change_7d`, `percent_change_30d`, `weekly_expire`) VALUES ";
								$query .= implode(", ", array_fill(0, count($chunk), $placeholder));
								$this->wpdb->query($this->wpdb->prepare($query, call_user_func_array('array_merge', $chunk)));
							}
							set_transient('all-in-one-crypto-fetch-prices-datatime', time());
					}

					break;
			}

		}

	}

	/**
	 * Query crypto prices from database
     * 
	 * @since    1.0.0
	 */
	public function queryCryptoPrices( $query, $slug ) {

		if( empty( $query ) && empty( $slug ) ) {

			return false;
		}

		switch( $query ) {

			case 'all' :

				if( $slug === 'all' ) {

					$response = $this->wpdb->get_results( "SELECT * FROM `{$this->tablename}`" );
					
				} else {

					$response = $this->wpdb->get_row($this->wpdb->prepare( "SELECT * FROM `{$this->tablename}` WHERE `slug` = %s", $slug ) );

				}
				break;

			case 'nasl' :

				if( $slug === 'all' ) {

					$response = $this->wpdb->get_results( "SELECT `name`, `slug` FROM `{$this->tablename}`" );
					
				} else {

					$response = $this->wpdb->get_row($this->wpdb->prepare("SELECT `name`, `slug` FROM `{$this->tablename}` WHERE `slug` = %s", $slug ) );

				}
				break;

			case 'nasysl' :

				if( $slug === 'all' ) {

					$response = $this->wpdb->get_results( "SELECT `name`, `symbol`, `slug` FROM `{$this->tablename}`" );
					
				} else {

					$response = $this->wpdb->get_row($this->wpdb->prepare( "SELECT `name`, `symbol`, `slug` FROM `{$this->tablename}` WHERE `slug` = %s", $slug ) );

				}
				break;

			default:
				return false;

		}

		return $response;

	}

}