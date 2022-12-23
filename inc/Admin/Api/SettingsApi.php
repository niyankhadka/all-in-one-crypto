<?php 

/**
 * Base Controller of plugin
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Api;

class SettingsApi
{

    public $admin_pages = array();

	public $admin_subpages = array();

	public $settings = array();

	public $sections = array();

	public $fields = array();

	public function register() {

		if ( ! empty($this->admin_pages) || ! empty($this->admin_subpages) ) {
			add_action( 'admin_menu', array( $this, 'addAdminMenu' ) );
		}

		if ( !empty($this->settings) ) {
			add_action( 'admin_init', array( $this, 'registerCustomFields' ) );
		}
	}

	public function addPages( array $pages ) {

		$this->admin_pages = $pages;

		return $this;
	}

	public function withSubPage( string $title = null ) {

		if ( empty( $this->admin_pages ) ) {
			return $this;
		}

		$admin_page = $this->admin_pages[0];

		$subpage = array(
			array(
				'parent_slug' => $admin_page['menu_slug'], 
				'page_title' => $admin_page['page_title'], 
				'menu_title' => ($title) ? $title : $admin_page['menu_title'], 
				'capability' => $admin_page['capability'], 
				'menu_slug' => $admin_page['menu_slug'], 
				'callback' => $admin_page['callback']
			)
		);

		$this->admin_subpages = $subpage;

		return $this;
	}

	public function addSubPages( array $pages ) {
        
		$this->admin_subpages = array_merge( $this->admin_subpages, $pages );

		return $this;
	}

	public function addAdminMenu() {
        
		foreach ( $this->admin_pages as $page ) {
			add_menu_page( $page['page_title'], $page['menu_title'], $page['capability'], $page['menu_slug'], $page['callback'], $page['icon_url'], $page['position'] );
		}

		foreach ( $this->admin_subpages as $page ) {
			add_submenu_page( $page['parent_slug'], $page['page_title'], $page['menu_title'], $page['capability'], $page['menu_slug'], $page['callback'] );
		}
	}

	public function setSettings( array $settings ) {
        
		$this->settings = $settings;

		return $this;
	}

	public function setSections( array $sections ) {
        
		$this->sections = $sections;

		return $this;
	}

	public function setFields( array $fields ) {
        
		$this->fields = $fields;

		return $this;
	}

	public function registerCustomFields() {
        
		// register setting
		foreach ( $this->settings as $setting ) {
			register_setting( $setting["option_group"], $setting["option_name"], ( isset( $setting["callback"] ) ? $setting["callback"] : '' ) );
		}

		// add settings section
		foreach ( $this->sections as $section ) {
			add_settings_section( $section["id"], $section["title"], ( isset( $section["callback"] ) ? $section["callback"] : '' ), $section["page"] );
		}

		// add settings field
		foreach ( $this->fields as $field ) {
			add_settings_field( $field["id"], $field["title"], ( isset( $field["callback"] ) ? $field["callback"] : '' ), $field["page"], $field["section"], ( isset( $field["args"] ) ? $field["args"] : '' ) );
		}
	}

	public static function do_settings_sections_custom( $page ) {

		global $wp_settings_sections, $wp_settings_fields;

		if ( ! isset( $wp_settings_sections[ $page ] ) ) {

			return;
		}

		foreach ( (array) $wp_settings_sections[ $page ] as $section ) {

			if ( '' !== $section['before_section'] ) {

				if ( '' !== $section['section_class'] ) {

					echo wp_kses_post( sprintf( $section['before_section'], esc_attr( $section['section_class'] ) ) );

				} else {

					echo wp_kses_post( $section['before_section'] );
				}
			}

			if ( $section['title'] ) {

				echo "<h2>{$section['title']}</h2>\n";
			}

			if ( $section['callback'] ) {

				call_user_func( $section['callback'], $section );
			}

			if ( ! isset( $wp_settings_fields ) || ! isset( $wp_settings_fields[ $page ] ) || ! isset( $wp_settings_fields[ $page ][ $section['id'] ] ) ) {

				continue;
			}

			self::do_settings_fields_custom( $page, $section['id'] );

			if ( '' !== $section['after_section'] ) {

				echo wp_kses_post( $section['after_section'] );
			}

		}

	}

	protected static function do_settings_fields_custom( $page, $section ) {

		global $wp_settings_fields;

		if ( ! isset( $wp_settings_fields[ $page ][ $section ] ) ) {

			return;
		}

		foreach ( (array) $wp_settings_fields[ $page ][ $section ] as $field ) {

			$class = '';

			if ( ! empty( $field['args']['class'] ) ) {

				$class = ' class="' . esc_attr( $field['args']['class'] ) . '"';
				
			}

			call_user_func( $field['callback'], $field['args'] );

		}

	}

}