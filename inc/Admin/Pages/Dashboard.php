<?php 

/**
 * Pages defined on the Admin Dashboard
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Pages;

use \Inc\Admin\Api\SettingsApi;
use \Inc\Admin\Base\BaseController;
use \Inc\Admin\Base\Options;
use \Inc\Admin\Base\Forms;
use \Inc\Admin\Api\Callbacks\AdminPageCallbacks;
use \Inc\Admin\Api\Callbacks\SanitizeCallbacks;

class Dashboard extends BaseController
{

    public $settings;

    public $page_callbacks;

    public $sanitize_callbacks;

    public $options;

    public $forms;

    public $pages = array();

    /**
	 * Method to register for Dashboard
     * 
	 * @since    1.0.0
	 */
    public function register() {

        $this->settings = new SettingsApi();

        $this->page_callbacks = new AdminPageCallbacks();

        $this->sanitize_callbacks = new SanitizeCallbacks();

        $this->options = new Options();

        $this->forms = new Forms();

        $this->setPages();

        $this->setSettings();
		$this->setSections();
		$this->setFields();

		$this->settings->addPages( $this->pages )->withSubPage( 'Dashboard' )->register();
        
    }

    public function setPages() {

        $this->pages = array(

            array(

                'page_title' => esc_html__( 'All-In-One Crypto - Dashboard', 'all-in-one-crypto' ),
                'menu_title' => esc_html__( 'All-In-One Crypto (AIOC)', 'all-in-one-crypto' ),
                'capability' => 'manage_options',
                'menu_slug' => 'all_in_one_crypto',
                'callback' => array( $this->page_callbacks, 'adminDashboard' ),
                'icon_url' => 'dashicons-rest-api',
                'position' => 100

            )

        );
    }

    public function setSettings() {

		$args = array(

			array(

				'option_group' => 'all_in_one_crypto_settings_group',
				'option_name' => 'all_in_one_crypto',
				'callback' => array( $this->sanitize_callbacks, 'checkboxSanitize' )

			)
		);

		$this->settings->setSettings( $args );
	}

	public function setSections() {

		$args = array(

			array(

				'id' => 'all_in_one_crypto_dashboard_section',
				'title' => '',
				'page' => 'all_in_one_crypto'

			)
		);

		$this->settings->setSections( $args );
	}

	public function setFields() {

		$args = array();

		foreach ( $this->options->admin_panel()[ 'dashboard' ] as $key => $values ) {

			$args[] = array(

				'id' => $key,
				'title' => '',
				'callback' => array( $this->forms, 'render_template' ),
				'page' => 'all_in_one_crypto',
				'section' => 'all_in_one_crypto_dashboard_section',
				'args' => array(

					'option_name' => 'all_in_one_crypto',
					'values' => $values,

				)

			);
		}

		$this->settings->setFields( $args );
	}

}