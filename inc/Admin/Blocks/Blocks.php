<?php 

/**
 * Blocks
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Blocks;

use \Inc\Admin\Base\BaseController;

class Blocks extends BaseController
{

    /**
	 * Method to register
     * 
	 * @since    1.0.0
	 */
    public function register() {

        /**
		 * Actions/Filters.
		 */
        add_filter( 'block_categories_all', [ $this, 'addBlockCategories' ] );

		add_action( 'init', [ $this, 'registerBlocks' ] );

    }

	/**
	 * Register blocks
	 *
	 */
	public function registerBlocks() {

        /**
        * Hook - aiocRegisterBlocks
        *
        */
		do_action( 'aiocRegisterBlocks' );

	}

    /**
	 * Add a block category
	 *
	 * @param array $categories Block categories.
	 *
	 * @return array
	 */
	public function addBlockCategories( $categories ) {

		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return in_array( 'all_in_one_crypto', $category_slugs, true ) ? $categories : array_merge(
			
			[
				[
					'slug'  => 'all_in_one_crypto',
					'title' => __( 'All-In-One Crypto Blocks', 'all-in-one-crypto' ),
					'icon'  => 'table-row-after',
				],
			],
			$categories,
		);

	}

}